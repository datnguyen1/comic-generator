import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api, uploadsUrl } from '../services/api';

export default function ComicDetailPage() {
  const { id } = useParams();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function fetchComic() {
      try {
        const { data } = await api.get(`/comics/${id}`);
        if (!cancelled) setComic(data.data);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message || 'Failed to load comic.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) fetchComic();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-center py-12">
          <p className="text-gray-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (error || !comic) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="rounded-lg bg-red-50 p-4 text-red-700 mb-4">
          {error || 'Comic not found.'}
        </div>
        <Link to="/comics" className="text-blue-600 hover:text-blue-700 font-medium">
          ← Back to comics
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{comic.title}</h2>
          <p className="text-gray-500 mt-1">
            {comic.style} · {comic.panels?.length ?? 0} panels
          </p>
        </div>
        <Link
          to="/comics"
          className="text-gray-600 hover:text-gray-900 font-medium"
        >
          ← Back to comics
        </Link>
      </div>
      {comic.description && (
        <p className="text-gray-600 mb-8 max-w-2xl">{comic.description}</p>
      )}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-100">
          {(comic.panels || []).map((panel, i) => (
            <div key={i} className="p-4 sm:p-6">
              <div className="max-w-2xl mx-auto">
                <img
                  src={uploadsUrl(panel.imagePath)}
                  alt={panel.caption || `Panel ${i + 1}`}
                  className="w-full rounded-lg border border-gray-200"
                />
                {panel.caption && (
                  <p className="mt-2 text-sm text-gray-500 italic">{panel.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
