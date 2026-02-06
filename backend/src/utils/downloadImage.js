import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_ROOT = path.join(__dirname, '../../uploads');

/**
 * Download image from URL and save to uploads/comics/:comicId/panel-:index.png
 * @param {string} imageUrl - Source URL
 * @param {string} comicId - Comic document ID
 * @param {number} index - Panel index
 * @returns {Promise<string>} Relative path like "comics/:comicId/panel-0.png"
 */
export async function downloadAndSavePanelImage(imageUrl, comicId, index) {
  const dir = path.join(UPLOADS_ROOT, 'comics', String(comicId));
  await fs.mkdir(dir, { recursive: true });

  const basename = `panel-${index}.png`;
  const filePath = path.join(dir, basename);
  const relativePath = path.join('comics', String(comicId), basename).replace(/\\/g, '/');

  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(filePath, buf);

  return relativePath;
}
