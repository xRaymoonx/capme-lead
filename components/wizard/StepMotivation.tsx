"use client";

import React from "react";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Input from "../ui/Input";

export type LeadMotivation = {
  timeline: string;
  note: string;
  interests: Record<string, boolean>;
};

export default function StepMotivation({
  data,
  setData,
  onNext,
  onBack,
}: {
  data: LeadMotivation;
  setData: (patch: Partial<LeadMotivation>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const interests = data.interests || {};

  function toggle(k: string) {
    setData({ interests: { ...interests, [k]: !interests[k] } });
  }

  const chips: Array<[string, string]> = [
    ["autarkie", "Mehr Autarkie"],
    ["kosten_senken", "Kosten senken"],
    ["speicher", "Speicher"],
    ["wallbox", "Wallbox"],
    ["notstrom", "Notstrom"],
    ["warmepumpe", "Wärmepumpe"],
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Wünsche & Motivation</h2>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
        <div className="mb-3 text-sm text-zinc-300">Was ist Ihnen wichtig? (optional)</div>
        <div className="flex flex-wrap gap-2">
          {chips.map(([k, label]) => {
            const active = !!interests[k];
            return (
              <button
                key={k}
                type="button"
                onClick={() => toggle(k)}
                className={[
                  "rounded-full border px-3 py-2 text-sm transition-colors",
                  active
                    ? "border-emerald-600 bg-emerald-900/30 text-emerald-200"
                    : "border-zinc-800 bg-zinc-950 text-zinc-200 hover:bg-zinc-900",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <Select
        label="Zeitrahmen (optional)"
        value={data.timeline}
        onChange={(v) => setData({ timeline: v })}
        options={[
          { value: "", label: "Bitte wählen" },
          { value: "sofort", label: "Sofort / zeitnah" },
          { value: "1_3_monate", label: "In 1–3 Monaten" },
          { value: "3_6_monate", label: "In 3–6 Monaten" },
          { value: "spaeter", label: "Später / unklar" },
        ]}
      />

      <Input
        label="Hinweis (optional)"
        value={data.note}
        onChange={(v) => setData({ note: v })}
        placeholder="Freitext, falls wichtig"
      />

      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onNext}>Weiter</Button>
      </div>
    </div>
  );
}