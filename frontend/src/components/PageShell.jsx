/**
 * Shared page header + width wrapper for a clear content outline.
 */
export default function PageShell({ eyebrow, title, description, actions, children }) {
  return (
    <div className="px-4 py-6 sm:px-0">
      <header className="mb-8 max-w-3xl border-b border-gray-200 pb-6">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-700 mb-2">
            {eyebrow}
          </p>
        ) : null}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h1>
            {description ? (
              <p className="mt-2 text-gray-600 leading-relaxed">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div> : null}
        </div>
      </header>
      {children}
    </div>
  );
}
