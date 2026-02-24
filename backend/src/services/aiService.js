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
const IMAGE_MODEL = 'black-forest-labs/FLUX.1-schnell';

/**
 * Call Hugging Face InferenceClient for text generation. Tries multiple models.
 */
async function hfText(prompt, options = {}) {
  const token = getToken();
  const client = new InferenceClient(token);
  let lastError;
  for (const model of CHAT_MODELS) {
    try {
      const out = await client.chatCompletion({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: options.max_new_tokens ?? 1024,
        temperature: options.temperature ?? 0.7,
      });
      const text = out?.choices?.[0]?.message?.content ?? '';
      if (text) return text;
    } catch (err) {
      lastError = err;
      continue;
    }
  }
  throw lastError || new Error('No chat model succeeded');
}

/**
 * Call Hugging Face for image generation via Inference client.
 */
async function hfImage(prompt) {
  const token = getToken();
  const client = new InferenceClient(token);
  const blob = await client.textToImage({
    model: IMAGE_MODEL,
    inputs: prompt.slice(0, 1000),
  });
  return Buffer.from(await blob.arrayBuffer());
}

/**
 * Split a story into N panel descriptions using Hugging Face.
 */
export async function splitStoryIntoPanels(story, numPanels) {
  const system = `You are a comic script writer. Split the user's story into exactly ${numPanels} sequential panel descriptions.
Each description should be a single scene or moment suitable for one comic panel. Be concise (1-2 sentences each).
Output ONLY a valid JSON array of exactly ${numPanels} strings. Use double quotes. No markdown, no extra text.
Example format: ["First panel scene.", "Second panel scene.", "Third panel scene."]`;

  const prompt = `${system}\n\nUser story:\n${story.slice(0, 1500)}`;

  const raw = await hfText(prompt, { max_new_tokens: 512 });
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
    // Fallback: fix common LLM issues (single quotes, trailing commas)
    const fixed = jsonStr
      .replace(/'/g, '"')
      .replace(/,\s*]/g, ']')
      .replace(/,\s*}/g, '}');
    try {
      arr = JSON.parse(fixed);
    } catch {
      // Last resort: extract quoted strings from array-like structure
      const stringMatches = jsonStr.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g);
      const extracted = [...stringMatches].map((m) => (m[1] ?? m[2] ?? '').replace(/\\"/g, '"').trim()).filter(Boolean);
      if (extracted.length >= numPanels) {
        arr = extracted.slice(0, numPanels);
      } else {
        throw new Error('Failed to parse panel descriptions as JSON');
      }
    }
  }

  if (!Array.isArray(arr) || arr.length !== numPanels) {
    throw new Error(`Expected ${numPanels} panel descriptions, got ${arr?.length ?? 0}`);
  }

  return arr.map((s) => String(s).trim()).filter(Boolean);
}

/**
 * Generate a single comic panel image. Returns image buffer (not URL).
 */
export async function generatePanelImage(panelDescription, styleKey) {
  const stylePrompt = STYLE_PROMPTS[styleKey] || STYLE_PROMPTS.default;
  const prompt = `Single vertical comic panel, ${stylePrompt}. Scene: ${panelDescription}. No text or speech bubbles in the image.`;
  const buffer = await hfImage(prompt);
  return { buffer };
}

/**
 * Generate images for all panels. Returns array of { buffer, caption, prompt }.
 */
export async function generateAllPanelImages(panelDescriptions, styleKey) {
  const results = [];
  for (let i = 0; i < panelDescriptions.length; i++) {
    const { buffer } = await generatePanelImage(panelDescriptions[i], styleKey);
    results.push({
      buffer,
      caption: panelDescriptions[i],
      prompt: panelDescriptions[i],
    });
  }
  return results;
}
