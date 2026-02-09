import OpenAI from "openai";
import { AnalysisResult } from "./types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeResumeMatch(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const systemPrompt = `You are an expert career consultant, resume analyst, and ATS (Applicant Tracking System) specialist.

Analyze the provided resume against the job description and return a JSON object with this EXACT structure:

{
  "matchScore": <number 0-100>,
  "matchSummary": "<2-3 sentences explaining the overall match>",
  "missingSkills": [
    {
      "skill": "<skill name>",
      "importance": "<critical | important | nice-to-have>",
      "suggestion": "<how to acquire or demonstrate this skill>"
    }
  ],
  "suggestions": [
    {
      "section": "<resume section name>",
      "current": "<what is currently there or 'missing'>",
      "improved": "<specific rewritten text>",
      "reason": "<why this change helps>"
    }
  ],
  "atsTips": [
    "<specific, actionable ATS optimization tip>"
  ],
  "coverLetter": "<a complete, personalized cover letter tailored to this job>"
}

Rules:
- matchScore must be a realistic assessment, not inflated
- missingSkills should list 3-8 skills, prioritized by importance
- suggestions should cover 3-6 specific improvements with actual rewritten text
- atsTips should include 4-6 actionable tips specific to this resume+job combo
- coverLetter should be professional, 3-4 paragraphs, referencing specific experience from the resume
- All text should be professional and specific, never generic`;

  const userPrompt = `## RESUME:
${resumeText}

## JOB DESCRIPTION:
${jobDescription}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_tokens: 4000,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response received from OpenAI");
  }

  const result: AnalysisResult = JSON.parse(content);

  if (
    typeof result.matchScore !== "number" ||
    result.matchScore < 0 ||
    result.matchScore > 100
  ) {
    throw new Error("Invalid match score in AI response");
  }

  return result;
}
