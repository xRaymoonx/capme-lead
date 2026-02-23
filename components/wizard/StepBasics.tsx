"use client";

import React, { useMemo, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";

type LeadBasics = {
  name: string;
  phone: string;
  email: string;
  consent_privacy: boolean;
};

export default function StepBasics({
  data,
  setData,
  onNext,
  onBack,
}: {
  data: LeadBasics;
  setData: (patch: Partial<LeadBasics>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [touched, setTouched] = useState(false);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};

    if (!data.name || data.name.trim().length < 2) {
      e.name = "Bitte Namen eintragen.";
    }

    const p = (data.phone || "").replace(/\s+/g, "");
    if (!p || p.length < 6) {
      e.phone = "Bitte Telefonnummer eintragen.";
    }

    if (!data.consent_privacy) {
      e.consent_privacy = "Bitte bestätigen.";
    }

    return e;
  }, [data]);

  const canContinue = Object.keys(errors).length === 0;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Basisdaten</h2>

      <div className="grid gap-4">
        <Input
          label="Name *"
          value={data.name}
          onChange={(v) => setData({ name: v })}
          error={touched ? errors.name : undefined}
        />

        <Input
          label="Telefon *"
          value={data.phone}
          onChange={(v) => setData({ phone: v })}
          error={touched ? errors.phone : undefined}
        />

        <Input
          label="E-Mail (optional)"
          value={data.email}
          onChange={(v) => setData({ email: v })}
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <Checkbox
          checked={data.consent_privacy}
          onChange={(v) => setData({ consent_privacy: v })}
          label={
            <span className="text-sm text-zinc-200">
              Ich habe die{" "}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-emerald-300"
              >
                Datenschutzhinweise
              </a>{" "}
              gelesen und stimme zu. <span className="text-zinc-300">*</span>
            </span>
          }
        />

        <div className="mt-2 text-xs text-zinc-500">
          Hinweis: Wir nutzen Ihre Angaben nur zur Bearbeitung Ihrer Anfrage und Planung.
        </div>

        {touched && errors.consent_privacy ? (
          <div className="mt-2 text-sm text-red-300">{errors.consent_privacy}</div>
        ) : null}
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={onBack}>
          Zurück
        </Button>

        <Button
          onClick={() => {
            setTouched(true);
            if (canContinue) onNext();
          }}
        >
          Weiter
        </Button>
      </div>
    </div>
  );
}