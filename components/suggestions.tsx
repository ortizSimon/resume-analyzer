import { Suggestion } from "@/lib/types";

interface SuggestionsProps {
  suggestions: Suggestion[];
}

export function SuggestionsCard({ suggestions }: SuggestionsProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
        Resume Improvements
      </h3>
      <div className="space-y-4">
        {suggestions.map((s, i) => (
          <div
            key={i}
            className="rounded-lg border border-gray-100 bg-gray-50 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-md bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
                {s.section}
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs font-medium uppercase text-gray-400">
                  Current
                </p>
                <p className="text-sm text-gray-600">{s.current}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-emerald-600">
                  Suggested
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {s.improved}
                </p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">{s.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
