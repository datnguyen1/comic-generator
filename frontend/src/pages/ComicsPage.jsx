import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, uploadsUrl } from '../services/api';

export default function ComicsPage() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function fetchComics() {
      try {
        const { data } = await api.get('/comics');
        if (!cancelled) setComics(data.data || []);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message || 'Failed to load comics.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchComics();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comics</h2>
        <div className="flex justify-center py-12">
          <p className="text-gray-500">Loading…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Comics</h2>
        <div className="rounded-lg bg-red-50 p-4 text-red-700">{error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comics</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comics.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 mb-4">No comics yet.</p>
            <Link
              to="/comics/create"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create your first comic →
            </Link>
          </div>
        ) : (
          comics.map((c) => (
            <Link
              key={c._id}
              to={`/comics/${c._id}`}
              className="group block bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition"
            >
              <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                {c.panels?.[0]?.imagePath ? (
                  <img
                    src={uploadsUrl(c.panels[0].imagePath)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-gray-400">📖</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 truncate">
                  {c.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {c.style} · {c.panels?.length ?? 0} panels
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
