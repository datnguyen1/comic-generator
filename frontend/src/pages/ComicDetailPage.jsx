import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api, uploadsUrl } from '../services/api';
import PageShell from '../components/PageShell';

function formatDate(iso) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return null;
  }
}

export default function ComicDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comic, setComic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  // 'forward' | 'backward' — drives which page-turn keyframe plays
  const [direction, setDirection] = useState('forward');
  // Bumped on every turn so the page node remounts and the CSS animation replays
  const [turnTick, setTurnTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchComic() {
      try {
        const { data } = await api.get(`/comics/${id}`);
        if (!cancelled) {
          setComic(data.data);
          setIndex(0);
        }
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || err.message || 'Failed to load comic.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (id) fetchComic();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const panels = comic?.panels || [];
  const panelCount = panels.length;

  const turnTo = useCallback(
    (target, dir) => {
      if (!panelCount) return;
      const next = ((target % panelCount) + panelCount) % panelCount;
      setDirection(dir);
      setIndex(next);
      setTurnTick((t) => t + 1);
    },
    [panelCount]
  );

  const goPrev = useCallback(() => {
    if (!panelCount) return;
    turnTo(index - 1, 'backward');
  }, [index, panelCount, turnTo]);

  const goNext = useCallback(() => {
    if (!panelCount) return;
    turnTo(index + 1, 'forward');
  }, [index, panelCount, turnTo]);

  useEffect(() => {
    if (!panelCount) return undefined;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panelCount, goPrev, goNext]);

  async function handleDelete() {
    if (!comic) return;
    const ok = window.confirm(`Delete "${comic.title}"? This cannot be undone.`);
    if (!ok) return;
    setDeleting(true);
    try {
      await api.delete(`/comics/${comic._id}`);
      navigate('/comics', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete comic.');
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <PageShell eyebrow="Comic" title="Loading…" description="Fetching panels and metadata.">
        <div className="flex justify-center py-16 rounded-xl border border-white/70 bg-white/80 backdrop-blur shadow-sm">
          <p className="text-gray-500 text-sm">Loading…</p>
        </div>
      </PageShell>
    );
  }

  if (error || !comic) {
    return (
      <PageShell eyebrow="Comic" title="Could not open comic">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 text-sm mb-4">
          {error || 'Comic not found.'}
        </div>
        <Link to="/comics" className="text-indigo-700 hover:text-indigo-900 font-medium text-sm">
          ← Back to comics
        </Link>
      </PageShell>
    );
  }

  const created = formatDate(comic.createdAt);
  const current = panels[index];
  const safeIndex = panelCount ? Math.min(index, panelCount - 1) : 0;

  return (
    <PageShell
      eyebrow="Comic"
      title={comic.title}
      description="Use the left and right arrows (or keyboard ← →) to step through panels."
      actions={
        <>
          <Link
            to="/comics"
            className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          >
            ← Back
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            {deleting ? 'Deleting…' : 'Delete comic'}
          </button>
        </>
      }
    >
      <article className="relative max-w-3xl rounded-2xl border border-white/70 bg-white shadow-sm overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500"
        />

        <header className="px-6 sm:px-8 pt-8 pb-6 bg-gradient-to-b from-indigo-50/70 to-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {comic.title}
          </h2>
          <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <dt className="text-gray-500">Style</dt>
              <dd className="font-medium text-gray-900 capitalize">{comic.style}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-gray-500">Panels</dt>
              <dd className="font-medium text-gray-900">{panelCount}</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="text-gray-500">Created</dt>
              <dd className="font-medium text-gray-900">{created || '—'}</dd>
            </div>
          </dl>
          {comic.description ? (
            <p className="mt-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap max-w-2xl">
              {comic.description}
            </p>
          ) : null}
        </header>

        <div className="px-4 sm:px-8 py-8">
          {panelCount === 0 ? (
            <p className="text-sm text-gray-500 italic text-center py-12">
              No panels were generated for this comic.
            </p>
          ) : (
            <section
              aria-label="Panel viewer"
              aria-roledescription="carousel"
              aria-live="polite"
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-7 items-center px-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-xs font-bold uppercase tracking-wider text-white shadow">
                  Panel {safeIndex + 1} of {panelCount}
                </span>
                <span className="text-xs text-gray-500 hidden sm:inline">Use ← → keys</span>
              </div>

              <div className="relative page-stage">
                <div
                  key={`${safeIndex}-${turnTick}`}
                  className={
                    direction === 'backward' ? 'page-turn-backward' : 'page-turn-forward'
                  }
                >
                  <img
                    src={uploadsUrl(current.imagePath)}
                    alt={current.caption || `Panel ${safeIndex + 1}`}
                    className="w-full rounded-lg border border-gray-200 shadow-sm bg-gray-50"
                  />

                  {current.caption ? (
                    <figcaption className="mt-5 mx-auto max-w-2xl rounded-lg border-l-4 border-indigo-400 bg-indigo-50/70 px-5 py-4 shadow-sm">
                      <p className="font-serif text-base sm:text-lg leading-relaxed text-gray-900 italic">
                        {current.caption}
                      </p>
                    </figcaption>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={goPrev}
                  disabled={panelCount < 2}
                  aria-label="Previous panel"
                  className="absolute left-2 sm:-left-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 border border-gray-200 shadow-md text-gray-800 hover:bg-white hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed z-10"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 010 1.06L9.06 10l3.73 3.71a.75.75 0 11-1.06 1.06l-4.25-4.24a.75.75 0 010-1.06l4.25-4.24a.75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={panelCount < 2}
                  aria-label="Next panel"
                  className="absolute right-2 sm:-right-4 top-1/2 -translate-y-1/2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/95 border border-gray-200 shadow-md text-gray-800 hover:bg-white hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed z-10"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 010-1.06L10.94 10 7.21 6.29a.75.75 0 111.06-1.06l4.25 4.24a.75.75 0 010 1.06l-4.25 4.24a.75.75 0 01-1.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {panels.map((_, i) => {
                  const active = i === safeIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => turnTo(i, i >= safeIndex ? 'forward' : 'backward')}
                      aria-label={`Go to panel ${i + 1}`}
                      aria-current={active ? 'true' : undefined}
                      className={[
                        'h-2.5 rounded-full transition-all',
                        active
                          ? 'w-6 bg-gradient-to-r from-indigo-500 to-violet-500'
                          : 'w-2.5 bg-gray-300 hover:bg-gray-400',
                      ].join(' ')}
                    />
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <footer className="px-6 sm:px-8 py-4 border-t border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-3">
          <Link to="/comics" className="text-sm font-medium text-indigo-700 hover:text-indigo-900">
            ← Back to library
          </Link>
          <Link
            to="/comics/create"
            className="text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Create another →
          </Link>
        </footer>
      </article>
    </PageShell>
  );
}
