"use client";

import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

export type LeadEnergy = {
  consumption_kwh_year: string;
  costs_eur_year: string;
};

export default function StepEnergy({
  data,
  setData,
  onNext,
  onBack,
}: {
  data: LeadEnergy;
  setData: (patch: Partial<LeadEnergy>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Energie</h2>

      <div className="grid gap-4">
        <Input
          label="Stromverbrauch (kWh/Jahr)"
          value={data.consumption_kwh_year}
          onChange={(v) => setData({ consumption_kwh_year: v })}
          placeholder="z. B. 4500"
        />

        <Input
          label="Stromkosten (€/Jahr)"
          value={data.costs_eur_year}
          onChange={(v) => setData({ costs_eur_year: v })}
          placeholder="z. B. 1600"
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={onBack}>
          Zurück
        </Button>
        <Button onClick={onNext}>Weiter</Button>
      </div>
    </div>
  );
}