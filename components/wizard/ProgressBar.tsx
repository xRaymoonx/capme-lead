"use client";

import React from "react";

export type StepStatus = "idle" | "active" | "done" | "error";

const steps = [
  { i: 0, label: "Intro" },
  { i: 1, label: "Basis" },
  { i: 2, label: "Gebäude" },
  { i: 3, label: "Energie" },
  { i: 4, label: "Wünsche" },
  { i: 5, label: "Budget" },
  { i: 6, label: "Review" },
] as const;

function dotClass(status: StepStatus) {
  // Neutral by default (weiß/grau)
  if (status === "idle")
    return "border-white/15 bg-white/5 text-zinc-400";
  if (status === "active")
    return "border-white/30 bg-white/10 text-zinc-100";
  if (status === "done")
    return "border-emerald-500/35 bg-emerald-500/20 text-emerald-100";
  // error
  return "border-red-500/45 bg-red-500/20 text-red-100";
}

function labelClass(status: StepStatus) {
  if (status === "idle") return "text-zinc-500";
  if (status === "active") return "text-zinc-200";
  if (status === "done") return "text-emerald-200";
  return "text-red-200";
}

function isStepClickable(
  idx: number,
  currentStep: number,
  statuses?: StepStatus[]
) {
  // klickbar: vergangene Schritte + der aktuelle Schritt (oder bereits "done")
  const st = statuses?.[idx] ?? "idle";
  return idx <= currentStep || st === "done";
}

function hasAnyError(statuses?: StepStatus[]) {
  return (statuses ?? []).some((s) => s === "error");
}

export default function ProgressBar({
  currentStep,
  statuses,
  onJump,
}: {
  currentStep: number;
  statuses?: StepStatus[];
  onJump?: (to: number) => void;
}) {
  const total = steps.length;
  const safeStep =
    typeof currentStep === "number" && !Number.isNaN(currentStep)
      ? currentStep
      : 0;

  const clampedStep = Math.max(0, Math.min(safeStep, total - 1));

  const progress = total <= 1 ? 0 : clampedStep / (total - 1);

  // Line-Farbe: neutral wenn nicht "done"/"active", rot wenn irgendwo error
  const lineClass = hasAnyError(statuses)
    ? "bg-red-500/60"
    : clampedStep === 0
    ? "bg-white/25"
    : "bg-emerald-500/65";

  const clickable = typeof onJump === "function";

  return (
    <div className="space-y-3">
      {/* Line */}
      <div className="h-2 w-full overflow-hidden rounded-full border border-white/10 bg-white/5">
        <div
          className={["h-full transition-all duration-300", lineClass].join(" ")}
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </div>

      {/* Dots */}
      <div className="grid grid-cols-7 gap-2">
        {steps.map((s) => {
          const st: StepStatus = statuses?.[s.i] ?? "idle";
          const canJump = clickable && isStepClickable(s.i, clampedStep, statuses);

          return (
            <button
              key={s.i}
              type="button"
              onClick={() => (canJump ? onJump?.(s.i) : undefined)}
              disabled={!canJump}
              className={[
                "group flex flex-col items-center gap-2",
                canJump ? "cursor-pointer" : "cursor-default opacity-60",
              ].join(" ")}
              aria-label={`${s.label} (${st})`}
              title={canJump ? "Zum Schritt springen" : undefined}
            >
              <div
                className={[
                  "h-4 w-4 rounded-full border transition-transform",
                  dotClass(st),
                  canJump ? "group-hover:scale-110" : "",
                ].join(" ")}
              />
              <div className={["text-xs transition", labelClass(st)].join(" ")}>
                {s.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}