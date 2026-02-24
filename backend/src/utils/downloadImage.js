import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_ROOT = path.join(__dirname, '../../uploads');

/**
 * Save image buffer to uploads/comics/:comicId/panel-:index.png
 * @param {Buffer} buffer - Image bytes
 * @param {string} comicId - Comic document ID
 * @param {number} index - Panel index
 * @returns {Promise<string>} Relative path like "comics/:comicId/panel-0.png"
 */
export async function savePanelImage(buffer, comicId, index) {
  const dir = path.join(UPLOADS_ROOT, 'comics', String(comicId));
  await fs.mkdir(dir, { recursive: true });

  const basename = `panel-${index}.png`;
  const filePath = path.join(dir, basename);
  const relativePath = path.join('comics', String(comicId), basename).replace(/\\/g, '/');

  await fs.writeFile(filePath, buffer);
  return relativePath;
}
