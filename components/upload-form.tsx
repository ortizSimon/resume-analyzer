"use client";

import { useState, useRef, DragEvent } from "react";
import { AnalysisResult } from "@/lib/types";

interface UploadFormProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onError: (error: string) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function UploadForm({
  onAnalysisComplete,
  onError,
  onLoadingChange,
}: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSubmit =
    file !== null && jobDescription.trim().length >= 20;

  function handleDrag(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }

  function validateAndSetFile(f: File) {
    if (f.type !== "application/pdf") {
      onError("Please upload a PDF file.");
      return;
    }
    if (f.size > 4 * 1024 * 1024) {
      onError("File must be under 4MB.");
      return;
    }
    setFile(f);
  }

  async function handleSubmit() {
    if (!file || !canSubmit) return;

    onLoadingChange(true);
    onError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription.trim());

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Server returned an invalid response. Please try again.");
      }

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      onAnalysisComplete(data as AnalysisResult);
    } catch (err) {
      onError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      onLoadingChange(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Analyze Your Resume
        </h2>
        <p className="mt-2 text-gray-600">
          Upload your resume and paste the job description to get AI-powered
          insights
        </p>
      </div>

      {/* PDF Upload */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Resume (PDF)
        </label>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
            dragActive
              ? "border-indigo-400 bg-indigo-50"
              : file
                ? "border-indigo-300 bg-indigo-50/50"
                : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) validateAndSetFile(f);
            }}
          />
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <svg
                className="h-8 w-8 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <div className="text-left">
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="ml-2 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div>
              <svg
                className="mx-auto h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
              <p className="mt-2 text-sm font-medium text-gray-900">
                Drop your PDF here or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-500">PDF up to 4MB</p>
            </div>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div>
        <label
          htmlFor="jobDescription"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Job Description
        </label>
        <textarea
          id="jobDescription"
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the full job description here..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
        <p className="mt-1 text-xs text-gray-500">
          {jobDescription.trim().length < 20
            ? `${20 - jobDescription.trim().length} more characters needed`
            : `${jobDescription.trim().length} characters`}
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Analyze Resume
      </button>
    </div>
  );
}
