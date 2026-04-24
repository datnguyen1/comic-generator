import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, uploadsUrl } from '../services/api';
import PageShell from '../components/PageShell';

export default function ComicsPage() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

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

  async function handleDelete(comic) {
    const ok = window.confirm(`Delete "${comic.title}"? This cannot be undone.`);
    if (!ok) return;
    setDeletingId(comic._id);
    try {
      await api.delete(`/comics/${comic._id}`);
      setComics((prev) => prev.filter((c) => c._id !== comic._id));
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to delete comic.';
      window.alert(msg);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return (
      <PageShell
        eyebrow="Your work"
        title="Comics"
        description="All generated comics, newest first."
      >
        <div className="flex justify-center py-16 rounded-xl border border-white/70 bg-white/80 backdrop-blur shadow-sm">
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
      description={
        comics.length
          ? `You have ${comics.length} comic${comics.length === 1 ? '' : 's'}. Click a card to read; use Delete to remove from the database.`
          : 'No comics yet. Generate your first one to start a library.'
      }
      actions={
        <Link
          to="/comics/create"
          className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-sm"
        >
          New comic
        </Link>
      }
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {comics.length === 0 ? (
          <div className="col-span-full rounded-xl border border-white/70 bg-white py-16 px-6 text-center shadow-sm">
            <p className="text-gray-600 mb-4">No comics yet.</p>
            <Link
              to="/comics/create"
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
            >
              Create your first comic →
            </Link>
          </div>
        ) : (
          comics.map((c) => {
            const isDeleting = deletingId === c._id;
            return (
              <div
                key={c._id}
                className="group relative overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm hover:shadow-md transition"
              >
                <Link to={`/comics/${c._id}`} className="block">
                  <div className="aspect-[3/4] bg-gradient-to-br from-indigo-100 via-violet-100 to-rose-100 flex items-center justify-center">
                    {c.panels?.[0]?.imagePath ? (
                      <img
                        src={uploadsUrl(c.panels[0].imagePath)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl text-indigo-400" aria-hidden>
                        📖
                      </span>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 group-hover:text-indigo-700 truncate">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      <span className="capitalize">{c.style}</span>
                      <span className="mx-1.5 text-gray-300">·</span>
                      <span>{c.panels?.length ?? 0} panels</span>
                    </p>
                  </div>
                </Link>
                <div className="flex items-center justify-between gap-2 px-4 pb-4">
                  <Link
                    to={`/comics/${c._id}`}
                    className="text-xs font-medium text-indigo-700 hover:text-indigo-900"
                  >
                    Read →
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(c)}
                    disabled={isDeleting}
                    className="inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isDeleting ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </PageShell>
  );
}
