"use client";

import React, { useMemo } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

export type LeadBuilding = {
  street: string;
  zip: string;
  city: string;
  building_type: string;
  owner: string;
  roof_type: string;
  roof_orientation: string;
  shading: string;
};

function Alert({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-100">
      {text}
    </div>
  );
}

export default function StepBuilding({
  data,
  setData,
  onNext,
  onBack,
  attempted = false,
}: {
  data: LeadBuilding;
  setData: (patch: Partial<LeadBuilding>) => void;
  onNext: () => void;
  onBack: () => void;
  attempted?: boolean;
}) {
  const missing = useMemo(() => {
    const m: string[] = [];
    if (!data.building_type) m.push("Gebäudetyp");
    if (!data.owner) m.push("Eigentum");
    if (!data.roof_type) m.push("Dachtyp");
    if (!data.roof_orientation) m.push("Ausrichtung");
    if (!data.street.trim()) m.push("Straße / Hausnummer");
    if (!data.zip.trim()) m.push("PLZ");
    if (!data.city.trim()) m.push("Ort");
    return m;
  }, [data]);

  const showError = attempted && missing.length > 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Gebäude</h2>

      {showError && (
        <Alert
          text={`Bitte folgende Felder ausfüllen: ${missing.join(", ")}.`}
        />
      )}

      <div className="grid gap-4">
        <Select
          label="Gebäudetyp *"
          value={data.building_type}
          onChange={(v) => setData({ building_type: v })}
          options={[
            { value: "", label: "Bitte wählen" },
            { value: "einfamilienhaus", label: "Einfamilienhaus" },
            { value: "zweifamilienhaus", label: "Zweifamilienhaus" },
            { value: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
            { value: "gewerbe", label: "Gewerbe" },
          ]}
        />

        <Select
          label="Eigentum *"
          value={data.owner}
          onChange={(v) => setData({ owner: v })}
          options={[
            { value: "", label: "Bitte wählen" },
            { value: "eigentuemer", label: "Eigentümer" },
            { value: "mieter", label: "Mieter" },
            { value: "hv", label: "Hausverwaltung" },
          ]}
        />

        <Select
          label="Dachtyp *"
          value={data.roof_type}
          onChange={(v) => setData({ roof_type: v })}
          options={[
            { value: "", label: "Bitte wählen" },
            { value: "satteldach", label: "Satteldach" },
            { value: "pultdach", label: "Pultdach" },
            { value: "flachdach", label: "Flachdach" },
            { value: "sonstiges", label: "Sonstiges" },
          ]}
        />

        <Select
          label="Ausrichtung *"
          value={data.roof_orientation}
          onChange={(v) => setData({ roof_orientation: v })}
          options={[
            { value: "", label: "Bitte wählen" },
            { value: "sued", label: "Süd" },
            { value: "ost_west", label: "Ost/West" },
            { value: "ost", label: "Ost" },
            { value: "west", label: "West" },
            { value: "nord", label: "Nord" },
            { value: "unbekannt", label: "Unbekannt" },
          ]}
        />

        <Select
          label="Verschattung"
          value={data.shading}
          onChange={(v) => setData({ shading: v })}
          options={[
            { value: "", label: "Bitte wählen" },
            { value: "keine", label: "Keine / gering" },
            { value: "mittel", label: "Mittel" },
            { value: "stark", label: "Stark" },
            { value: "unbekannt", label: "Unbekannt" },
          ]}
        />

        <Input
          label="Straße / Hausnummer *"
          value={data.street}
          onChange={(v) => setData({ street: v })}
        />

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="PLZ *"
            value={data.zip}
            onChange={(v) => setData({ zip: v })}
          />
          <div className="col-span-2">
            <Input
              label="Ort *"
              value={data.city}
              onChange={(v) => setData({ city: v })}
            />
          </div>
        </div>
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