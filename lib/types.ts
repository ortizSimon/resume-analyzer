export interface AnalysisResult {
  matchScore: number;
  matchSummary: string;
  missingSkills: SkillGap[];
  suggestions: Suggestion[];
  atsTips: string[];
  coverLetter: string;
}

export interface SkillGap {
  skill: string;
  importance: "critical" | "important" | "nice-to-have";
  suggestion: string;
}

export interface Suggestion {
  section: string;
  current: string;
  improved: string;
  reason: string;
}
