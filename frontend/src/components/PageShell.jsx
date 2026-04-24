/**
 * Shared page header + width wrapper. Adds a colored accent strip
 * so pages do not feel like a wall of white.
 */
export default function PageShell({ eyebrow, title, description, actions, children }) {
  return (
    <div className="px-4 py-6 sm:px-0">
      <header className="relative mb-8 overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-6 sm:p-8 shadow-sm backdrop-blur">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500"
        />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 max-w-3xl">
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-2">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
            {description ? (
              <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>
          ) : null}
        </div>
      </header>
      {children}
    </div>
  );
}
