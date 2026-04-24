import { useId } from 'react';

/**
 * Bordered section with optional title for scannable layouts.
 */
export default function SectionBlock({ id, title, description, children, className = '' }) {
  const headingId = useId();
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {(title || description) && (
        <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
          {title ? (
            <h2 id={headingId} className="text-lg font-semibold text-gray-900">
              {title}
            </h2>
          ) : null}
          {description ? <p className="mt-1 text-sm text-gray-600 leading-relaxed">{description}</p> : null}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
