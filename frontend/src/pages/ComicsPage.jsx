import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, uploadsUrl } from '../services/api';
import PageShell from '../components/PageShell';

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
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <PageShell
        eyebrow="Your work"
        title="Comics"
        description="All generated comics, newest first in this list."
      >
        <div className="flex justify-center py-16 rounded-xl border border-gray-200 bg-white">
          <p className="text-gray-500 text-sm">Loading…</p>
        </div>
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell eyebrow="Your work" title="Comics" description="Browse everything you have generated.">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 text-sm">{error}</div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Your work"
      title="Comics"
      description="Each card opens the full comic with panels in reading order."
      actions={
        <Link
          to="/comics/create"
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          New comic
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comics.length === 0 ? (
          <div className="col-span-full rounded-xl border border-gray-200 bg-white py-16 px-6 text-center shadow-sm">
            <p className="text-gray-600 mb-4">No comics yet.</p>
            <Link to="/comics/create" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Create your first comic →
            </Link>
          </div>
        ) : (
          comics.map((c) => (
            <Link
              key={c._id}
              to={`/comics/${c._id}`}
              className="group block rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:border-gray-300 hover:shadow-md transition"
            >
              <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                {c.panels?.[0]?.imagePath ? (
                  <img
                    src={uploadsUrl(c.panels[0].imagePath)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-gray-400" aria-hidden>
                    📖
                  </span>
                )}
              </div>
              <div className="p-4 border-t border-gray-100">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 truncate">{c.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  <span className="capitalize">{c.style}</span>
                  <span className="mx-1.5 text-gray-300">·</span>
                  <span>{c.panels?.length ?? 0} panels</span>
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </PageShell>
  );
}
