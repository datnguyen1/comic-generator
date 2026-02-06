import Replicate from 'replicate';

function getClient() {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error('REPLICATE_API_TOKEN is not configured');
  }
  return new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
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

const LLM_MODEL = 'meta/meta-llama-3-8b-instruct';
const IMAGE_MODEL = 'black-forest-labs/flux-schnell';

/**
 * Split a story into N panel descriptions for comic layout using Llama.
 * @param {string} story - Raw story text
 * @param {number} numPanels - Number of panels (e.g. 4 or 6)
 * @returns {Promise<string[]>} Panel description strings
 */
export async function splitStoryIntoPanels(story, numPanels) {
  const system = `You are a comic script writer. Split the user's story into exactly ${numPanels} sequential panel descriptions.
Each description should be a single scene or moment suitable for one comic panel. Be concise (1-2 sentences each).
Output ONLY a JSON array of ${numPanels} strings, no other text. Example: ["Scene 1...", "Scene 2...", ...]`;

  const prompt = `${system}\n\nUser story:\n${story}`;

  const replicate = getClient();
  const output = await replicate.run(LLM_MODEL, {
    input: {
      prompt,
      max_tokens: 1024,
      temperature: 0.7,
    },
  });

  const raw = typeof output === 'string' ? output : (output?.join?.('') ?? output?.output ?? String(output));
  if (!raw || typeof raw !== 'string') throw new Error('No panel descriptions returned from AI');

  const trimmed = raw.trim();
  let arr;
  try {
    const json = trimmed.replace(/^```json?\s*|\s*```$/g, '').trim();
    arr = JSON.parse(json);
  } catch {
    throw new Error('Failed to parse panel descriptions as JSON');
  }

  if (!Array.isArray(arr) || arr.length !== numPanels) {
    throw new Error(`Expected ${numPanels} panel descriptions, got ${arr?.length ?? 0}`);
  }

  return arr.map((s) => String(s).trim()).filter(Boolean);
}

/**
 * Generate a single comic panel image via FLUX Schnell.
 * @param {string} panelDescription - Scene description for this panel
 * @param {string} styleKey - Style key (e.g. shounen, shoujo)
 * @returns {Promise<{ url: string }>}
 */
export async function generatePanelImage(panelDescription, styleKey) {
  const stylePrompt = STYLE_PROMPTS[styleKey] || STYLE_PROMPTS.default;
  const prompt = `Single vertical comic panel, ${stylePrompt}. Scene: ${panelDescription}. No text or speech bubbles in the image.`;

  const replicate = getClient();
  const output = await replicate.run(IMAGE_MODEL, {
    input: { prompt: prompt.slice(0, 1000) },
  });

  const first = Array.isArray(output) ? output[0] : output;
  const url = typeof first?.url === 'function' ? first.url() : first?.url ?? first;
  if (!url) throw new Error('No image URL returned from Replicate');
  return { url };
}

/**
 * Generate images for all panels. Runs sequentially to avoid rate limits.
 */
export async function generateAllPanelImages(panelDescriptions, styleKey) {
  const results = [];
  for (let i = 0; i < panelDescriptions.length; i++) {
    const { url } = await generatePanelImage(panelDescriptions[i], styleKey);
    results.push({ url, caption: panelDescriptions[i], prompt: panelDescriptions[i] });
  }
  return results;
}
