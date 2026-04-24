import { InferenceClient } from '@huggingface/inference';

function getToken() {
  const token = process.env.HUGGINGFACE_TOKEN;
  if (!token) throw new Error('HUGGINGFACE_TOKEN is not configured');
  return token;
}

const STYLE_PROMPTS = {
  shounen:
    'Japanese shounen manga style, dynamic action, bold lines, dramatic angles, black and white with screen tones',
  shoujo:
    'Japanese shoujo manga style, romantic, soft lines, sparkles, expressive eyes, black and white with screen tones',
  seinen:
    'Japanese seinen manga style, mature, detailed, realistic proportions, gritty, black and white with screen tones',
  chibi:
    'Chibi manga style, cute proportions, big head, small body, kawaii, black and white with screen tones',
  isekai:
    'Isekai fantasy manga style, otherworldly, magic, adventurers, black and white with screen tones',
  default:
    'Japanese manga style, clean lines, expressive, black and white with screen tones',
};

const CHAT_MODELS = [
  'meta-llama/Llama-3.2-3B-Instruct',
  'Qwen/Qwen2.5-0.5B-Instruct',
  'google/gemma-2-2b-it',
  'mistralai/Mistral-7B-Instruct-v0.2',
];

function buildImageAttempts() {
  const attempts = [];
  const seen = new Set();
  const add = (model, provider) => {
    const key = `${model}||${provider || ''}`;
    if (seen.has(key)) return;
    seen.add(key);
    attempts.push({ model, provider: provider || undefined });
  };

  if (process.env.HF_IMAGE_MODEL) {
    add(process.env.HF_IMAGE_MODEL, process.env.HF_IMAGE_PROVIDER || undefined);
  }

  add('stabilityai/stable-diffusion-2-1');
  add('runwayml/stable-diffusion-v1-5');
  add('stabilityai/stable-diffusion-xl-base-1.0');
  add('black-forest-labs/FLUX.1-schnell', 'fal-ai');
  add('black-forest-labs/FLUX.1-schnell', 'replicate');

  return attempts;
}

function formatInferenceError(lastErr, step, triedLabels) {
  const detail = lastErr?.message || String(lastErr);
  let message = `Failed during ${step}: ${detail}`;
  if (triedLabels.length) {
    message += ` [attempted: ${triedLabels.join(', ')}]`;
  }
  message +=
    ' — Check HUGGINGFACE_TOKEN (fine-grained: Inference / Inference Providers), enable providers at https://hf.co/settings/inference-providers, and see backend README. Optional: HF_CHAT_PROVIDER (e.g. groq), HF_IMAGE_MODEL, HF_IMAGE_PROVIDER (e.g. fal-ai for FLUX).';
  return new Error(message);
}

async function hfText(prompt, options = {}) {
  const token = getToken();
  const client = new InferenceClient(token);
  const provider = process.env.HF_CHAT_PROVIDER || undefined;
  let lastError;
  const tried = [];

  for (const model of CHAT_MODELS) {
    tried.push(model + (provider ? ` (${provider})` : ''));
    try {
      const out = await client.chatCompletion({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: options.max_new_tokens ?? 1024,
        temperature: options.temperature ?? 0.7,
        ...(provider ? { provider } : {}),
      });
      const text = out?.choices?.[0]?.message?.content ?? '';
      if (text) return text;
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw formatInferenceError(lastError || new Error('No chat model succeeded'), 'story → panels (chat)', tried);
}

async function hfImage(prompt) {
  const token = getToken();
  const client = new InferenceClient(token);
  const input = prompt.slice(0, 1500);
  const attempts = buildImageAttempts();
  let lastErr;
  const triedLabels = [];

  for (const { model, provider } of attempts) {
    triedLabels.push(provider ? `${model}@${provider}` : model);
    try {
      const blob = await client.textToImage({
        model,
        inputs: input,
        ...(provider ? { provider } : {}),
      });
      return Buffer.from(await blob.arrayBuffer());
    } catch (err) {
      lastErr = err;
    }
  }

  throw formatInferenceError(lastErr || new Error('No image model succeeded'), 'panel image (text-to-image)', triedLabels);
}

/**
 * Split source text into N text segments, never breaking mid-sentence; distributes whole
 * sentences across panels and falls back to clause splits if there are too few sentences.
 * Returns an array of N strings (raw segments only — narration polishing happens elsewhere).
 */
function chunkStoryIntoSegments(story, numPanels) {
  const text = String(story || '')
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) {
    return Array.from({ length: numPanels }, (_, i) => `Panel ${i + 1}.`);
  }

  let units = text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (units.length < numPanels) {
    const expanded = [];
    for (const sentence of units) {
      const parts = sentence
        .split(/(?:[,;:]| (?:and|then|but|so|after|before|while|because|when|until)\s)/i)
        .map((p) => p.trim())
        .filter(Boolean);
      if (parts.length <= 1) {
        expanded.push(sentence);
      } else {
        expanded.push(...parts);
      }
    }
    if (expanded.length > units.length) units = expanded;
  }

  while (units.length < numPanels) {
    units.push(units[units.length - 1] || text);
  }

  const out = [];
  for (let p = 0; p < numPanels; p++) {
    const start = Math.round((p * units.length) / numPanels);
    const end = Math.round(((p + 1) * units.length) / numPanels);
    const slice = units.slice(start, Math.max(end, start + 1));
    let part = slice.join(' ').trim();
    if (!/[.!?…]$/.test(part)) part += '.';
    out.push(part);
  }
  return out;
}

/**
 * Heuristic split into panels with both narration (story prose) and scene (visual description).
 * Used when the chat call fails or is disabled. narration === scene here because we have no LLM
 * to rewrite the source into vivid visual cues, so we let the original prose serve both purposes.
 */
export function splitStoryIntoPanelsHeuristic(story, numPanels) {
  const segments = chunkStoryIntoSegments(story, numPanels);
  return segments.map((seg) => ({ narration: seg, scene: seg }));
}

async function splitStoryIntoPanelsWithChat(story, numPanels) {
  const system = `You are a comic book writer and storyboard artist. Read the user's story and break it into exactly ${numPanels} sequential comic panels.

For each panel, produce TWO things:
1. "narration": 2-3 sentences of vivid storybook prose narrating this panel's moment. Use past tense and a consistent narrative voice. Read together in order, all ${numPanels} narrations must form ONE continuous, cohesive story that covers the user's story end-to-end with no gaps and no repetition. Each panel's narration should pick up from where the previous one left off.
2. "scene": 1-2 sentences describing what to DRAW in this single panel — the setting, time of day, which characters are present (carry over the same names and look every panel), the specific action shown, and the mood. This is for an image generator, not for the reader.

Cover the entire story. Do not invent content beyond what the user wrote. Do not cut a sentence in half across panels.

Output ONLY a valid JSON array of exactly ${numPanels} objects with keys "narration" and "scene". Use double quotes. No markdown, no commentary.
Example: [{"narration":"Akira gripped the hilt of his katana, breath fogging in the cold dawn air.","scene":"Close-up of Akira, a teenage boy with spiky black hair and a red headband, drawing his katana in a snowy bamboo grove at sunrise, dramatic backlighting, tense mood."}]`;

  const prompt = `${system}\n\nUser story:\n${story.slice(0, 2000)}`;

  const raw = await hfText(prompt, { max_new_tokens: 1400 });
  if (!raw || typeof raw !== 'string') throw new Error('No panel descriptions returned from AI');

  const trimmed = raw.trim();
  let arr;
  let jsonStr = trimmed
    .replace(/^```(?:json|javascript)?\s*/i, '')
    .replace(/\s*```\s*$/i, '')
    .trim();
  const bracketMatch = jsonStr.match(/\[[\s\S]*\]/);
  if (bracketMatch) jsonStr = bracketMatch[0];

  try {
    arr = JSON.parse(jsonStr);
  } catch {
    const fixed = jsonStr
      .replace(/'/g, '"')
      .replace(/,\s*]/g, ']')
      .replace(/,\s*}/g, '}');
    arr = JSON.parse(fixed);
  }

  if (!Array.isArray(arr) || arr.length !== numPanels) {
    throw new Error(`Expected ${numPanels} panel objects, got ${arr?.length ?? 0}`);
  }

  // Normalize: tolerate models that return strings instead of {narration, scene}.
  return arr.map((item, i) => {
    if (typeof item === 'string') {
      const s = item.trim();
      return { narration: s, scene: s };
    }
    const narration = String(item?.narration ?? item?.caption ?? item?.text ?? '').trim();
    const scene = String(item?.scene ?? item?.description ?? item?.image ?? narration).trim();
    if (!narration && !scene) {
      throw new Error(`Panel ${i + 1} is missing both narration and scene`);
    }
    return { narration: narration || scene, scene: scene || narration };
  });
}

/**
 * Split a story into N panels. Each entry is { narration, scene }.
 * - narration: storybook prose shown to the reader under the panel image.
 * - scene: visual description fed to the image generator (hidden from reader).
 * Tries Hugging Face chat first; on failure (or HF_PANELS_CHAT=0), uses a local heuristic
 * where narration === scene === the user's original prose for that panel.
 */
export async function splitStoryIntoPanels(story, numPanels) {
  const chatEnabled = process.env.HF_PANELS_CHAT !== '0';
  if (chatEnabled) {
    try {
      return await splitStoryIntoPanelsWithChat(story, numPanels);
    } catch (err) {
      console.warn('[aiService] Chat panel split failed; using heuristic panels:', err.message);
    }
  }
  return splitStoryIntoPanelsHeuristic(story, numPanels);
}

/**
 * Compose the image prompt for a single panel using the comic title, style, and a short
 * recap of the surrounding story so the model has consistent context per panel.
 */
function buildPanelImagePrompt({ scene, panelIndex, totalPanels, styleKey, title, storyExcerpt }) {
  const stylePrompt = STYLE_PROMPTS[styleKey] || STYLE_PROMPTS.default;
  const titleLine = title ? `Comic title: "${title}".` : '';
  const positionLine = `Panel ${panelIndex + 1} of ${totalPanels}.`;
  const contextLine = storyExcerpt ? `Overall story context: ${storyExcerpt}` : '';
  const sceneLine = `Scene to draw in this panel: ${scene}`;

  return [
    `Single vertical comic panel, ${stylePrompt}.`,
    titleLine,
    positionLine,
    contextLine,
    sceneLine,
    'Keep characters consistent with previous panels in this comic.',
    'No text, no speech bubbles, no captions, no watermarks in the image.',
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Generate a single comic panel image. `panel` is { narration, scene } from splitStoryIntoPanels.
 * Returns { buffer, prompt } where `prompt` is the full text-to-image prompt actually sent.
 */
export async function generatePanelImage(panel, styleKey, ctx = {}) {
  const scene = typeof panel === 'string' ? panel : panel?.scene || panel?.narration || '';
  const prompt = buildPanelImagePrompt({
    scene,
    panelIndex: ctx.panelIndex ?? 0,
    totalPanels: ctx.totalPanels ?? 1,
    styleKey,
    title: ctx.title,
    storyExcerpt: ctx.storyExcerpt,
  });
  const buffer = await hfImage(prompt);
  return { buffer, prompt };
}

/**
 * Generate images for every panel. `panels` is an array of { narration, scene }.
 * Returns array of { buffer, caption, prompt } where:
 *   - caption = narration (storybook prose shown to the reader)
 *   - prompt  = the full text-to-image prompt (hidden from the reader)
 */
export async function generateAllPanelImages(panels, styleKey, ctx = {}) {
  const total = panels.length;
  const storyExcerpt = ctx.story
    ? String(ctx.story).replace(/\s+/g, ' ').trim().slice(0, 400)
    : '';
  const results = [];
  for (let i = 0; i < total; i++) {
    const panel = panels[i];
    const narration =
      typeof panel === 'string' ? panel : panel?.narration || panel?.scene || '';
    const { buffer, prompt } = await generatePanelImage(panel, styleKey, {
      title: ctx.title,
      panelIndex: i,
      totalPanels: total,
      storyExcerpt,
    });
    results.push({
      buffer,
      caption: narration,
      prompt,
    });
  }
  return results;
}
