import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <PageShell eyebrow="Comic" title="Loading…" description="Fetching panels and metadata.">
        <div className="flex justify-center py-16 rounded-xl border border-gray-200 bg-white">
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
        <Link to="/comics" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          ← Back to comics
        </Link>
      </PageShell>
    );
  }

  const panelCount = comic.panels?.length ?? 0;
  const created = formatDate(comic.createdAt);

  return (
    <PageShell
      eyebrow="Comic"
      title={comic.title}
      description="Summary and panels in order. Captions appear under each image when the model provided them."
      actions={
        <Link
          to="/comics"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          ← Back to comics
        </Link>
      }
    >
      <div className="space-y-8 max-w-3xl">
        <section
          aria-labelledby="meta-heading"
          className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
        >
          <h2 id="meta-heading" className="sr-only">
            Comic details
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Style</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900 capitalize">{comic.style}</dd>
            </div>
            <div className="px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Panels</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{panelCount}</dd>
            </div>
            <div className="px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">Created</dt>
              <dd className="mt-1 text-sm font-medium text-gray-900">{created || '—'}</dd>
            </div>
          </dl>
          {comic.description ? (
            <div className="px-5 py-4 border-t border-gray-100">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Story summary
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{comic.description}</p>
            </div>
          ) : null}
        </section>

        <section aria-labelledby="panels-heading">
          <h2 id="panels-heading" className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
            Panels ({panelCount})
          </h2>
          <ol className="space-y-6 list-none p-0 m-0">
            {(comic.panels || []).map((panel, i) => (
              <li
                key={i}
                className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/80 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-gray-900">
                    Panel {i + 1}
                    {panelCount ? (
                      <span className="font-normal text-gray-500">
                        {' '}
                        of {panelCount}
                      </span>
                    ) : null}
                  </span>
                </div>
                <div className="p-4 sm:p-6">
                  <img
                    src={uploadsUrl(panel.imagePath)}
                    alt={panel.caption || `Panel ${i + 1}`}
                    className="w-full rounded-lg border border-gray-200"
                  />
                  {panel.caption ? (
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{panel.caption}</p>
                  ) : null}
                  {panel.prompt ? (
                    <details className="mt-3 group">
                      <summary className="text-xs font-medium text-gray-500 cursor-pointer hover:text-gray-700">
                        Image prompt used
                      </summary>
                      <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap break-words bg-gray-50 rounded-lg p-3 border border-gray-100">
                        {panel.prompt}
                      </pre>
                    </details>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </PageShell>
  );
}
