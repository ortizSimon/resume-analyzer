import { SkillGap } from "@/lib/types";

interface SkillsGapProps {
  skills: SkillGap[];
}

const badgeStyles = {
  critical: "bg-red-100 text-red-700",
  important: "bg-amber-100 text-amber-700",
  "nice-to-have": "bg-blue-100 text-blue-700",
};

export function SkillsGapCard({ skills }: SkillsGapProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
        Missing Skills
      </h3>
      <div className="space-y-3">
        {skills.map((skill) => (
          <div
            key={skill.skill}
            className="rounded-lg border border-gray-100 bg-gray-50 p-3"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{skill.skill}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${badgeStyles[skill.importance]}`}
              >
                {skill.importance}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{skill.suggestion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
