"use client";

import { useState } from "react";
import { AnalysisResult } from "@/lib/types";
import { UploadForm } from "@/components/upload-form";
import { LoadingState } from "@/components/loading-state";
import { ScoreCard } from "@/components/score-card";
import { SkillsGapCard } from "@/components/skills-gap";
import { SuggestionsCard } from "@/components/suggestions";
import { AtsTipsCard } from "@/components/ats-tips";
import { CoverLetterCard } from "@/components/cover-letter";

type AppState = "upload" | "analyzing" | "results" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  function handleAnalysisComplete(data: AnalysisResult) {
    setResult(data);
    setAppState("results");
  }

  function handleError(message: string) {
    setError(message);
    if (message) setAppState("error");
  }

  function handleLoadingChange(loading: boolean) {
    if (loading) {
      setAppState("analyzing");
      setError("");
    }
  }

  function handleStartOver() {
    setResult(null);
    setError("");
    setAppState("upload");
  }

  if (appState === "analyzing") {
    return <LoadingState />;
  }

  if (appState === "results" && result) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Analysis Results
          </h2>
          <button
            onClick={handleStartOver}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
              />
            </svg>
            Start Over
          </button>
        </div>

        <ScoreCard score={result.matchScore} summary={result.matchSummary} />

        <div className="grid gap-6 md:grid-cols-2">
          <SkillsGapCard skills={result.missingSkills} />
          <AtsTipsCard tips={result.atsTips} />
        </div>

        <SuggestionsCard suggestions={result.suggestions} />
        <CoverLetterCard letter={result.coverLetter} />
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mx-auto mb-6 max-w-2xl rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}
      <UploadForm
        onAnalysisComplete={handleAnalysisComplete}
        onError={handleError}
        onLoadingChange={handleLoadingChange}
      />
    </div>
  );
}
