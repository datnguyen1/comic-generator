import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const STEPS = [
  { n: 1, title: 'Write your story', body: 'Add a title and a short scene or plot in plain language.' },
  { n: 2, title: 'Pick style & panels', body: 'Choose a manga-style preset and how many panels to generate.' },
  { n: 3, title: 'Review the comic', body: 'Open your comic to read captions and see each panel in order.' },
];

const HomePage = () => {
  return (
    <PageShell
      eyebrow="Comic Generator"
      title="Turn a written story into a panel comic"
      description="The app splits your text into panels and generates images for each one. Quality depends on the configured image model—use the Create flow to see exactly what you get today."
      actions={
        <>
          <Link
            to="/comics/create"
            className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create a comic
          </Link>
          <Link
            to="/comics"
            className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View comics
          </Link>
        </>
      }
    >
      <div className="space-y-10">
        <section aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
            How it works
          </h2>
          <ol className="grid gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex gap-4"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800"
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

        <section className="rounded-xl border border-dashed border-gray-300 bg-gray-50/80 p-6">
          <h2 className="text-sm font-semibold text-gray-900">Product overview</h2>
          <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-2xl">
            For a full feature walkthrough and positioning, open the{' '}
            <Link to="/manga-ai" className="text-blue-600 font-medium hover:text-blue-700">
              Manga AI
            </Link>{' '}
            page. The editor and your saved comics always live under{' '}
            <span className="font-medium text-gray-800">Create</span> and{' '}
            <span className="font-medium text-gray-800">Comics</span> in the navigation bar.
          </p>
        </section>
      </div>
    </PageShell>
  );
};

export default HomePage;
