import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import PageShell from '../components/PageShell';
import SectionBlock from '../components/SectionBlock';

const STYLES = [
  { value: 'shounen', label: 'Shounen', desc: 'Action, adventure, bold' },
  { value: 'shoujo', label: 'Shoujo', desc: 'Romance, soft, expressive' },
  { value: 'seinen', label: 'Seinen', desc: 'Mature, detailed, gritty' },
  { value: 'chibi', label: 'Chibi', desc: 'Cute, kawaii' },
  { value: 'isekai', label: 'Isekai', desc: 'Fantasy, otherworldly' },
];

const PANEL_OPTS = [2, 4, 6, 8];

export default function CreateComicPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [style, setStyle] = useState('shounen');
  const [numPanels, setNumPanels] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!title.trim()) {
      setError('Please enter a title.');
      return;
    }
    if (!story.trim()) {
      setError('Please enter a story for the AI to illustrate.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/comics', {
        title: title.trim(),
        story: story.trim(),
        style,
        numPanels,
      });
      navigate(`/comics/${data.data._id}`);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to create comic.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell
      eyebrow="Generator"
      title="Create a comic"
      description="Fill in the sections below in order. The server splits your story into panels and requests an image per panel—generation can take a minute."
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <SectionBlock
          id="section-story"
          title="1. Comic text"
          description="What readers will see as the premise; the model also uses this to decide what goes in each panel."
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. The Last Samurai"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="story" className="block text-sm font-medium text-gray-700 mb-2">
                Story
              </label>
              <textarea
                id="story"
                rows={6}
                value={story}
                onChange={(e) => setStory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your story or scene descriptions. The AI will turn them into comic panels."
                disabled={loading}
              />
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          id="section-look"
          title="2. Look & length"
          description="Style presets map to the image prompt; panel count is how many images are generated."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              >
                {STYLES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label} — {s.desc}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="panels" className="block text-sm font-medium text-gray-700 mb-2">
                Panels
              </label>
              <select
                id="panels"
                value={numPanels}
                onChange={(e) => setNumPanels(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              >
                {PANEL_OPTS.map((n) => (
                  <option key={n} value={n}>
                    {n} panels
                  </option>
                ))}
              </select>
            </div>
          </div>
        </SectionBlock>

        {error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-red-800 text-sm">{error}</div>
        ) : null}

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-sm font-medium"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating…' : 'Generate comic'}
          </button>
        </div>
      </form>
    </PageShell>
  );
}
