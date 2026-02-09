interface AtsTipsProps {
  tips: string[];
}

export function AtsTipsCard({ tips }: AtsTipsProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
        ATS Optimization Tips
      </h3>
      <ol className="space-y-3">
        {tips.map((tip, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-700">
              {i + 1}
            </span>
            <p className="text-sm leading-relaxed text-gray-700">{tip}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
