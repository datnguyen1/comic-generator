import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

/** Full URL for an uploaded asset (e.g. comic panel imagePath). */
export function uploadsUrl(relativePath) {
  const base = API_URL.replace(/\/$/, '');
  const p = (relativePath || '').replace(/^\//, '');
  return `${base}/uploads/${p}`;
}

export default api;
