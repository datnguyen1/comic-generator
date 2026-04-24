import { Link } from 'react-router-dom';

const STEPS = [
  {
    n: 1,
    title: 'Write your story',
    body: 'Add a title and a short scene or plot in plain language.',
    accent: 'from-indigo-500 to-blue-500',
  },
  {
    n: 2,
    title: 'Pick style & panels',
    body: 'Choose a manga-style preset and how many panels to generate.',
    accent: 'from-violet-500 to-fuchsia-500',
  },
  {
    n: 3,
    title: 'Review the comic',
    body: 'Open your comic to read captions and step through panels.',
    accent: 'from-rose-500 to-orange-500',
  },
];

const HomePage = () => {
  return (
    <div className="px-4 py-6 sm:px-0 space-y-10">
      <section
        aria-label="Hero"
        className="relative overflow-hidden rounded-2xl border border-white/70 bg-gradient-to-br from-indigo-600 via-violet-600 to-rose-500 p-8 sm:p-12 text-white shadow-lg"
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -left-16 -bottom-16 h-56 w-56 rounded-full bg-rose-300/20 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-3">
            Stories → manga panels
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            Build a short comic in three steps
          </h1>
          <p className="mt-4 text-white/90 leading-relaxed">
            No drawing required. Each generation gives you a sequence of panels you can read top to
            bottom and keep in your library.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/comics/create"
              className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-indigo-700 bg-white hover:bg-indigo-50 shadow-sm"
            >
              Start creating →
            </Link>
            <Link
              to="/guide"
              className="inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium text-white border border-white/40 hover:bg-white/10"
            >
              Read the guide
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-heading">
        <h2
          id="how-heading"
          className="text-sm font-semibold uppercase tracking-wider text-indigo-700 mb-4"
        >
          How it works
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <li
              key={s.n}
              className="relative overflow-hidden rounded-xl border border-white/70 bg-white p-5 shadow-sm flex gap-4"
            >
              <span
                aria-hidden
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.accent}`}
              />
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${s.accent} text-sm font-bold text-white shadow`}
                aria-hidden
              >
                {s.n}
              </span>
              <div>
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default HomePage;
