import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Start Creating', href: '#create' },
  { label: 'View Examples', href: '#gallery' },
];

const BADGES = [
  'Free Trial',
  '14 Manga Genres',
  'HD Export',
];

const GENRE_CHIPS = [
  { emoji: '⚔️', label: 'Shounen' },
  { emoji: '🌸', label: 'Shoujo' },
  { emoji: '🎭', label: 'Seinen' },
  { emoji: '✨', label: 'Isekai' },
  { emoji: '🍥', label: 'Chibi' },
];

const CREATION_METHODS = [
  {
    title: 'Upload Your Characters',
    description:
      'Have photos of people or character designs? Upload them and our AI will transform them into manga characters, maintaining their unique features across all panels in authentic manga style.',
    bullets: ['Perfect for OC manga', 'Manga-style expressions', 'Consistent character design'],
    cta: 'Upload Characters',
  },
  {
    title: 'Describe Your Story',
    description:
      "Just type your story or scene descriptions, and AI will generate everything - characters, backgrounds, and action sequences in authentic manga style.",
    bullets: ['Authentic manga panels', 'AI-designed characters', 'No images needed'],
    cta: 'Write Your Story',
  },
];

const EXAMPLE_MANGA = [
  { title: 'Demon Blade Chronicles', genre: 'Shounen Battle', style: 'Shounen', panels: 7 },
  { title: 'Sakura First Love', genre: 'School Romance', style: 'Shoujo', panels: 4 },
  { title: 'Tokyo Noir', genre: 'Mystery Thriller', style: 'Seinen', panels: 7 },
  { title: 'Reborn as a Slime', genre: 'Isekai Fantasy', style: 'Isekai', panels: 6 },
  { title: 'Café Memories', genre: 'Slice of Life', style: 'Josei', panels: 4 },
  { title: 'Mecha Genesis', genre: 'Sci-Fi Action', style: 'Mecha', panels: 6 },
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
  { title: 'Aspiring Mangaka', desc: 'Bring your manga dreams to life without years of art training.' },
  { title: 'Light Novel Authors', desc: 'Visualize your light novel scenes and create manga adaptations.' },
  { title: 'Anime Fans', desc: 'Create original manga stories inspired by your favorite genres and styles.' },
  { title: 'Content Creators', desc: 'Make manga-style content for social media and YouTube.' },
];

const FEATURES = [
  { title: 'Authentic Manga AI', desc: 'AI trained on manga art to create authentic Japanese-style illustrations.' },
  { title: 'Character Consistency', desc: 'Characters maintain their unique design across all panels and pages.' },
  { title: 'Panel Layouts', desc: 'Traditional manga panel layouts and compositions.' },
  { title: 'Speed Lines & Effects', desc: 'Automatic manga effects like speed lines, screen tones, and SFX.' },
];

const STEPS = [
  { n: 1, title: 'Choose Input', desc: 'Upload character designs or describe your story in text.' },
  { n: 2, title: 'Select Manga Style', desc: 'Pick from shounen, shoujo, seinen, and more authentic styles.' },
  { n: 3, title: 'Customize Panels', desc: 'Choose panel layouts and manga-specific effects.' },
  { n: 4, title: 'Download & Share', desc: 'Get high-resolution manga pages ready for publishing.' },
];

const STATS = [
  { value: 'Worldwide', label: 'Manga Created' },
  { value: '12 Styles', label: 'Available' },
  { value: '60-90 sec', label: 'Generation Time' },
];

export default function MangaAIPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-zen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/manga-ai" className="text-xl font-bold tracking-tight">
              Manga AI
            </Link>
            <div className="flex items-center gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-slate-400 hover:text-white transition"
                >
                  {label}
                </a>
              ))}
              <a
                href="#create"
                className="rounded-full bg-rose-500 px-4 py-2 text-sm font-medium text-white hover:bg-rose-600 transition"
              >
                Try Free — No Payment Required
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-rose-950/20 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-rose-400/90 text-sm font-medium uppercase tracking-wider mb-4">
            Your Story, Illustrated in Manga Style
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Turn Your Ideas Into Authentic Manga — Zero Art Skills Required
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto">
            Transform stories into manga pages instantly. Upload character references or describe scenes
            in text, pick from shounen, shoujo, seinen aesthetics, and let AI craft your vision with
            authentic Japanese style.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#create"
              className="rounded-full bg-rose-500 px-6 py-3 text-base font-semibold text-white hover:bg-rose-600 transition"
            >
              Start Creating
            </a>
            <a
              href="#gallery"
              className="rounded-full border border-slate-600 px-6 py-3 text-base font-medium text-slate-300 hover:border-slate-500 hover:text-white transition"
            >
              View Examples
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
            {BADGES.map((b) => (
              <span key={b} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                {b}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {GENRE_CHIPS.map(({ emoji, label }) => (
              <span
                key={label}
                className="rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-sm text-slate-300"
              >
                {emoji} {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Two Ways to Create */}
      <section id="create" className="py-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Two Ways to Create Your Manga</h2>
          <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
            Choose the creation method that works best for your manga story
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {CREATION_METHODS.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-slate-700 transition"
              >
                <h3 className="text-xl font-bold mb-4">{m.title}</h3>
                <p className="text-slate-400 mb-6">{m.description}</p>
                <ul className="space-y-2 mb-8">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-slate-300">
                      <span className="text-rose-500">•</span> {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="#create"
                  className="inline-block rounded-full bg-rose-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-rose-600 transition"
                >
                  {m.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Manga Created with Manga AI</h2>
          <p className="text-slate-400 text-center mb-12">
            From action-packed shounen to heartfelt shoujo — see what&apos;s possible
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXAMPLE_MANGA.map((m) => (
              <div
                key={m.title}
                className="group rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden hover:border-slate-600 transition"
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-6xl opacity-50 group-hover:opacity-70 transition">📖</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{m.title}</h3>
                  <p className="text-slate-500 text-sm">{m.genre}</p>
                  <div className="mt-2 flex gap-2 text-xs text-slate-400">
                    <span>{m.style}</span>
                    <span>•</span>
                    <span>{m.panels} panels</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href="#gallery"
              className="text-rose-400 hover:text-rose-300 font-medium"
            >
              View Full Manga Gallery →
            </a>
          </div>
        </div>
      </section>

      {/* Choose Your Manga Style */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Manga Style</h2>
          <p className="text-slate-400 text-center mb-12">
            Authentic manga art styles for every type of story
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {STYLES.map((s) => (
              <a
                key={s.label}
                href="#create"
                className="flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-rose-500/50 hover:bg-slate-800/50 transition"
              >
                <span className="text-3xl mb-2">{s.emoji}</span>
                <span className="text-sm font-medium text-slate-300">{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Perfect For */}
      <section className="py-20 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Perfect For Every Manga Creator</h2>
          <p className="text-slate-400 text-center mb-12">
            From aspiring mangaka to seasoned artists — Manga AI empowers everyone
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USE_CASES.map((u) => (
              <div
                key={u.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <h3 className="font-bold text-lg mb-2">{u.title}</h3>
                <p className="text-slate-400 text-sm">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose Manga AI?</h2>
          <p className="text-slate-400 text-center mb-12">
            Professional manga creation made simple
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              >
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Steps */}
      <section className="py-20 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">Create Your Manga in 4 Simple Steps</h2>
          <p className="text-slate-400 text-center mb-12">
            Begin with complimentary credits — no payment info needed
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-lg font-bold text-white mb-4">
                  {s.n}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="#create"
              className="inline-block rounded-full bg-rose-500 px-8 py-4 text-base font-semibold text-white hover:bg-rose-600 transition"
            >
              Start Creating Manga Now →
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-rose-400/90 text-sm font-medium uppercase tracking-wider mb-4">
            Complimentary Credits — No Payment Needed
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Become a Manga Creator?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join the community of storytellers bringing their visions to life. Try free today —
            artistic talent not required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-slate-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#create"
              className="rounded-full bg-rose-500 px-8 py-4 text-base font-semibold text-white hover:bg-rose-600 transition"
            >
              Start Creating Now
            </a>
            <a
              href="#gallery"
              className="rounded-full border border-slate-600 px-8 py-4 text-base font-medium text-slate-300 hover:border-slate-500 hover:text-white transition"
            >
              Browse Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
            <span>Try Before You Buy</span>
            <span>60-90 Second Generation</span>
            <span>High-Res Export</span>
          </div>
          <div className="mt-6 text-center">
            <Link to="/" className="text-slate-500 hover:text-slate-400 text-sm">
              ← Back to Comic Generator
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
