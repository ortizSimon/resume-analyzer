"use client";

import { useState, useEffect } from "react";

const steps = [
  { label: "Parsing your resume...", icon: "document" },
  { label: "Analyzing skills and experience...", icon: "search" },
  { label: "Comparing with job requirements...", icon: "compare" },
  { label: "Generating recommendations...", icon: "lightbulb" },
];

function StepIcon({
  type,
  active,
}: {
  type: string;
  active: boolean;
}) {
  const cls = `h-5 w-5 ${active ? "text-indigo-600" : "text-gray-400"}`;
  switch (type) {
    case "document":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      );
    case "search":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      );
    case "compare":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
        </svg>
      );
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
        </svg>
      );
  }
}

export function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="mb-8">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
      </div>
      <h3 className="mb-6 text-lg font-semibold text-gray-900">
        Analyzing your resume...
      </h3>
      <div className="space-y-3 text-left">
        {steps.map((step, i) => (
          <div
            key={step.label}
            className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-500 ${
              i <= currentStep
                ? "bg-indigo-50 text-indigo-700"
                : "text-gray-400"
            }`}
          >
            {i < currentStep ? (
              <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            ) : (
              <StepIcon type={step.icon} active={i === currentStep} />
            )}
            <span className={`text-sm ${i === currentStep ? "font-medium" : ""}`}>
              {step.label}
            </span>
            {i === currentStep && (
              <div className="ml-auto flex gap-1">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-600" style={{ animationDelay: "0ms" }} />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-600" style={{ animationDelay: "150ms" }} />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-600" style={{ animationDelay: "300ms" }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-500">
        This usually takes 15-30 seconds
      </p>
    </div>
  );
}
