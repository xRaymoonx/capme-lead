"use client";

import React from "react";
import TopHeader from "./TopHeader";
import ProgressBar, { StepStatus } from "./ProgressBar";

export default function WizardShell({
  step,
  totalSteps,
  stepLabel,
  onJump,
  stepStatuses,
  children,
}: {
  step: number;
  totalSteps: number; // z.B. 7
  stepLabel: string;
  onJump?: (to: number) => void;
  stepStatuses: StepStatus[]; // Länge = totalSteps (Intro..Review)
  children: React.ReactNode;
}) {
  const safeStep = Number.isFinite(step) ? step : 0;
  const displayStep = Math.max(0, Math.min(safeStep, totalSteps - 1));
  const page = Math.min(displayStep + 1, totalSteps);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <TopHeader />

      {/* Hintergrund Glow */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute -top-40 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl space-y-6 px-4 py-10">
        {/* Kapitel + Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-zinc-400">
              Kapitel: <span className="text-zinc-200">{stepLabel}</span>
            </div>
            <div className="text-xs text-zinc-500">
              Seite {page}/{totalSteps}
            </div>
          </div>

          <ProgressBar
            currentStep={displayStep}
            statuses={stepStatuses}
            onJump={onJump}
          />
        </div>

        {/* Inhalt: clean, ohne Wrapper-Card */}
        <div key={safeStep} className="animate-fade">
          {children}
        </div>
      </div>
    </div>
  );
}