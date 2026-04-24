import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const PAGE_OUTLINE = [
  { label: 'What you can do', href: '#create' },
  { label: 'Styles', href: '#styles' },
  { label: 'Who it is for', href: '#audience' },
  { label: 'Highlights', href: '#features' },
  { label: 'Steps', href: '#steps' },
];

const CREATION_METHODS = [
  {
    title: 'Describe your story',
    description:
      'Add a title and story on the Create page, pick a style preset and panel count. The server splits your text and requests one image per panel via Hugging Face.',
    bullets: [
      'Lives in the Create page in this app',
      'Captions and prompts are stored per panel',
      'Needs a valid API token and inference access (see backend README)',
    ],
    accent: 'from-indigo-500 to-violet-500',
  },
  {
    title: 'Browse finished comics',
    description:
      'Every comic appears in your library with a thumbnail, style, and panel count. Open one to read top-to-bottom or delete it from the database.',
    bullets: [
      'Same navigation bar as the rest of the site',
      'Optional prompt text per panel',
      'Delete button removes the comic from the database',
    ],
    accent: 'from-rose-500 to-orange-500',
  },
];

const STYLES = [
  { emoji: '⚔️', label: 'Shounen' },
  { emoji: '🌸', label: 'Shoujo' },
  { emoji: '🎭', label: 'Seinen' },
  { emoji: '🌹', label: 'Josei' },
  { emoji: '🌟', label: 'Kodomo' },
  { emoji: '🍥', label: 'Chibi' },
  { emoji: '✨', label: 'Isekai' },
  { emoji: '🤖', label: 'Mecha' },
  { emoji: '☕', label: 'Slice of Life' },
  { emoji: '👻', label: 'Horror' },
  { emoji: '⚽', label: 'Sports' },
  { emoji: '💕', label: 'Romance' },
];

const USE_CASES = [
  { title: 'Aspiring storytellers', desc: 'Prototype a short comic from prose without drawing each frame by hand.' },
  { title: 'Writers', desc: 'Visualize a scene or chapter as sequential panels.' },
  { title: 'Fans of manga aesthetics', desc: 'Experiment with shounen, shoujo, and other style prompts.' },
  { title: 'Builders', desc: 'Fork the repo and swap in a stronger image or chat model.' },
];

const FEATURES = [
  { title: 'Panel split + images', desc: 'One story becomes N panel descriptions, then N generated images.' },
  { title: 'Style keywords', desc: 'Presets add manga-style direction to every image prompt.' },
  { title: 'Library view', desc: 'Grid of comics with quick metadata, a detail reader, and delete.' },
  { title: 'Open stack', desc: 'React UI, Express API, MongoDB, Hugging Face Inference.' },
];

const STEPS = [
  { n: 1, title: 'Write', desc: 'Title and story on the Create page.' },
  { n: 2, title: 'Configure', desc: 'Style preset and number of panels (2–8).' },
  { n: 3, title: 'Generate', desc: 'Server calls Hugging Face; can take a minute.' },
  { n: 4, title: 'Read', desc: 'Open the comic from your library to see panels in order.' },
];

export default function MangaAIPage() {
  return (
    <PageShell
      eyebrow="Guide"
      title="Comic generator overview"
      description="Longer-form context for what this app does and how it fits together. Everything here uses the same header and routes as Home, Create, and Comics."
      actions={
        <>
          <Link
            to="/comics/create"
            className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-sm"
          >
            Create a comic
          </Link>
          <Link
            to="/comics"
            className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          >
            View comics
          </Link>
        </>
      }
    >
      <div className="space-y-12 max-w-4xl">
        <nav
          aria-label="On this page"
          className="rounded-xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-3">
            On this page
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {PAGE_OUTLINE.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-indigo-700 hover:text-indigo-900 border-b border-transparent hover:border-indigo-300 pb-0.5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <section className="relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-indigo-600 via-violet-600 to-rose-500 p-8 sm:p-10 text-center text-white shadow-lg scroll-mt-28">
          <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-rose-300/20 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-3">
              Manga-style panels from text
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight max-w-2xl mx-auto leading-snug">
              Turn a written story into a short comic inside this single app
            </h2>
            <p className="mt-4 text-white/90 max-w-xl mx-auto leading-relaxed">
              The same top navigation everywhere: Home, Comics, Create, and this guide. No separate
              marketing site—only different pages.
            </p>
          </div>
        </section>

        <section id="create" className="scroll-mt-28 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">What you can do in this app</h2>
          <p className="text-gray-600 leading-relaxed">
            The running product is the Create and Comics flows—this page only explains them in more
            detail. Use the buttons in the page header above to jump in.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {CREATION_METHODS.map((m) => (
              <div
                key={m.title}
                className="relative overflow-hidden rounded-xl border border-white/70 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <span aria-hidden className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${m.accent}`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{m.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{m.description}</p>
                <ul className="space-y-2">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                      <span className="text-indigo-600 shrink-0 mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="styles" className="scroll-mt-28 space-y-6 pt-4 border-t border-white/60">
          <h2 className="text-xl font-bold text-gray-900">Style presets</h2>
          <p className="text-gray-600 text-sm">
            The Create page exposes a subset; extras below are examples of how prompts could be
            extended in code.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {STYLES.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-xl border border-white/70 bg-white p-4 shadow-sm"
              >
                <span className="text-2xl mb-1" aria-hidden>
                  {s.emoji}
                </span>
                <span className="text-xs font-medium text-gray-800">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="audience" className="scroll-mt-28 space-y-6 pt-4 border-t border-white/60">
          <h2 className="text-xl font-bold text-gray-900">Who it is for</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {USE_CASES.map((u) => (
              <div key={u.title} className="rounded-xl border border-white/70 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{u.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="scroll-mt-28 space-y-6 pt-4 border-t border-white/60">
          <h2 className="text-xl font-bold text-gray-900">What the stack does</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/70 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="steps" className="scroll-mt-28 space-y-6 pt-4 border-t border-white/60">
          <h2 className="text-xl font-bold text-gray-900">Flow in four steps</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-xl border border-white/70 bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white shadow mb-3">
                  {s.n}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </PageShell>
  );
}
