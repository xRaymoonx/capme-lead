"use client";

import React from "react";
import Button from "../ui/Button";
import Select from "../ui/Select";
import Input from "../ui/Input";

export type LeadBudget = {
  budget_mode: "unknown" | "total" | "monthly";
  budget_value: string;
};

export default function StepBudget({
  data,
  setData,
  onNext,
  onBack,
}: {
  data: LeadBudget;
  setData: (patch: Partial<LeadBudget>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Budget</h2>

      <Select
        label="Wie möchten Sie planen?"
        value={data.budget_mode}
        onChange={(v) => setData({ budget_mode: v as any, budget_value: "" })}
        options={[
          { value: "unknown", label: "Noch unklar" },
          { value: "total", label: "Investitionsbudget (gesamt)" },
          { value: "monthly", label: "Monatliche Rate" },
        ]}
      />

      {data.budget_mode !== "unknown" ? (
        <Input
          label={data.budget_mode === "total" ? "Budget in €" : "Rate in € / Monat"}
          value={data.budget_value}
          onChange={(v) => setData({ budget_value: v })}
          placeholder={data.budget_mode === "total" ? "z. B. 18000" : "z. B. 220"}
        />
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4 text-sm text-zinc-300">
          Wenn es noch unklar ist, ist das völlig okay.
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onNext}>Weiter</Button>
      </div>
    </div>
  );
}