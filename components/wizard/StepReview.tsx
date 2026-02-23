"use client";

import React, { useMemo, useState } from "react";
import Button from "../ui/Button";

function Field({ label, value }: { label: string; value?: string }) {
  const v = typeof value === "string" ? value.trim() : "";
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-sm text-zinc-100">
        {v ? v : <span className="text-zinc-500">–</span>}
      </div>
    </div>
  );
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "ok" | "warn";
}) {
  const cls =
    tone === "ok"
      ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
      : tone === "warn"
      ? "border-rose-500/25 bg-rose-500/10 text-rose-200"
      : "border-zinc-700 bg-zinc-900/40 text-zinc-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${cls}`}
    >
      {children}
    </span>
  );
}

function Chips({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
      <div className="text-xs text-zinc-400">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((t) => (
          <span
            key={t}
            className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-200"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function isFilled(v: any) {
  if (v === null || v === undefined) return false;
  if (typeof v === "string") return v.trim().length > 0;
  return !!v;
}

function toIntOrNull(v: any) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (!s) return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return Math.trunc(n);
}

function toNumberOrNull(v: any) {
  if (v === null || v === undefined) return null;
  const s = String(v).trim().replace(",", ".");
  if (!s) return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return n;
}

export default function StepReview({
  token,
  basics,
  building,
  energy,
  motivation,
  budget,
  onBack,
  onEdit,
  onSubmit,
}: {
  token: string;

  basics: any;
  building: any;
  energy: any;
  motivation: any;
  budget: any;

  onBack: () => void;
  onEdit: (stepIndex: number) => void;

  // Wird nach erfolgreichem Insert aufgerufen (damit du StepDone setzen kannst).
  onSubmit?: (leadId: string) => void | Promise<void>;
}) {
  const [ui, setUi] = useState<"idle" | "saving" | "error">("idle");
  const [errMsg, setErrMsg] = useState<string>("");
  const [createdLeadId, setCreatedLeadId] = useState<string>("");

  const interestLabels: Record<string, string> = {
    autarkie: "Mehr Autarkie",
    kosten_senken: "Kosten senken",
    speicher: "Speicher",
    wallbox: "Wallbox",
    notstrom: "Notstrom",
    warmepumpe: "Wärmepumpe",
  };

  const interests = useMemo(() => {
    const src = motivation?.interests ?? {};
    return Object.entries(src)
      .filter(([, v]) => !!v)
      .map(([k]) => interestLabels[k] ?? k);
  }, [motivation?.interests]);

  const budgetModeLabel =
    budget?.budget_mode === "total"
      ? "Gesamtbudget"
      : budget?.budget_mode === "monthly"
      ? "Monatliche Rate"
      : "Noch offen";

  const budgetValueLabel = (() => {
    const v = String(budget?.budget_value ?? "").trim();
    if (!v) return "";
    return budget?.budget_mode === "monthly" ? `${v} €/Monat` : `${v} €`;
  })();

  // -----------------------------
  // Pflichtfelder / Validierung
  // -----------------------------
  const missing = useMemo(() => {
    const m: Array<{ step: number; label: string }> = [];

    // Basis (Step 1)
    if (!isFilled(basics?.name)) m.push({ step: 1, label: "Name" });
    if (!isFilled(basics?.phone)) m.push({ step: 1, label: "Telefon" });
    if (!basics?.consent_privacy)
      m.push({ step: 1, label: "Datenschutz-Zustimmung" });

    // Gebäude (Step 2)
    if (!isFilled(building?.building_type))
      m.push({ step: 2, label: "Gebäudetyp" });

    if (!isFilled(building?.owner)) m.push({ step: 2, label: "Eigentum" });

    if (!isFilled(building?.roof_type)) m.push({ step: 2, label: "Dachtyp" });

    if (!isFilled(building?.roof_orientation))
      m.push({ step: 2, label: "Ausrichtung" });

    // Pflicht: Adresse
    if (!isFilled(building?.street))
      m.push({ step: 2, label: "Straße / Hausnummer" });

    if (!isFilled(building?.zip)) m.push({ step: 2, label: "PLZ" });
    if (!isFilled(building?.city)) m.push({ step: 2, label: "Ort" });

    // Energie (Step 3): mindestens 1 Wert
    const hasKwh = isFilled(energy?.consumption_kwh_year);
    const hasCosts = isFilled(energy?.costs_eur_year);
    if (!hasKwh && !hasCosts)
      m.push({ step: 3, label: "Verbrauch oder Kosten" });

    return m;
  }, [basics, building, energy]);

  const canSubmit = missing.length === 0 && ui !== "saving";

  // -----------------------------
  // Payload Mapping für /api/leads/submit
  // -----------------------------
  const payload = useMemo(() => {
    return {
      token,

      // Kundendaten
      name: basics?.name ?? null,
      phone: basics?.phone ?? null,
      email: basics?.email ?? null,

      // Gebäude
      street: building?.street ?? null,
      zip: building?.zip ?? null,
      city: building?.city ?? null,
      building_type: building?.building_type ?? null,
      owner: building?.owner ?? null,
      roof_type: building?.roof_type ?? null,
      roof_orientation: building?.roof_orientation ?? null,
      shading: building?.shading ?? null,

      // Energie
      consumption_kwh_year: toIntOrNull(energy?.consumption_kwh_year),
      costs_eur_year: toNumberOrNull(energy?.costs_eur_year),

      // Motivation
      timeline: motivation?.timeline ?? null,
      note: motivation?.note ?? null,
      interests: motivation?.interests ?? null, // jsonb (object)

      // Budget
      budget_mode: budget?.budget_mode ?? null,
      budget_value: toNumberOrNull(budget?.budget_value),
    };
  }, [token, basics, building, energy, motivation, budget]);

  async function handleSubmit() {
    if (ui === "saving") return;

    // Hard stop, falls Pflichtfelder fehlen
    if (missing.length > 0) {
      setUi("error");
      setErrMsg("Bitte fehlende Pflichtfelder ergänzen, bevor Sie absenden.");
      return;
    }

    if (!token || !String(token).trim()) {
      setUi("error");
      setErrMsg("Ungültiger Link (Token fehlt). Bitte öffnen Sie den Link erneut.");
      return;
    }

    setUi("saving");
    setErrMsg("");

    try {
      const res = await fetch("/api/leads/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const j = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        throw new Error(j?.error ?? "Fehler beim Absenden. Bitte später erneut versuchen.");
      }

      const id = String(j?.id ?? "").trim();
      if (id) setCreatedLeadId(id);

      // Parent-Flow (z.B. setStep(Done))
      await onSubmit?.(id);

      setUi("idle");
    } catch (e: any) {
      setUi("error");
      setErrMsg(e?.message ? String(e.message) : "Unbekannter Fehler beim Absenden.");
    }
  }

  // Gruppierung für “Fehlt in Kapitel …”
  const missingByStep = useMemo(() => {
    const map: Record<number, string[]> = {};
    for (const x of missing) {
      map[x.step] = map[x.step] ?? [];
      map[x.step].push(x.label);
    }
    return map;
  }, [missing]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-2xl font-semibold">Zusammenfassung</div>
          <div className="mt-2 text-zinc-300 leading-relaxed">
            Bitte einmal in Ruhe durchlesen. Wenn etwas nicht passt, können Sie einzelne Kapitel kurz korrigieren.
          </div>
        </div>

        <div className="pt-1 space-y-2 flex flex-col items-end">
          <Badge tone={basics?.consent_privacy ? "ok" : "warn"}>
            Datenschutz: {basics?.consent_privacy ? "zugestimmt" : "fehlt"}
          </Badge>

          {createdLeadId ? (
            <Badge tone="ok">Lead gespeichert</Badge>
          ) : null}
        </div>
      </div>

      {/* Pflichtfelder Hinweis */}
      {missing.length > 0 && (
        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-rose-200">
                Es fehlen noch Pflichtfelder
              </div>
              <div className="mt-1 text-sm text-rose-200/90">
                Bitte ergänzen, dann können Sie absenden.
              </div>

              <div className="mt-3 space-y-2 text-sm text-rose-100/90">
                {missingByStep[1]?.length ? (
                  <div>
                    <span className="font-semibold">Kapitel 1 (Basis):</span>{" "}
                    {missingByStep[1].join(", ")}
                  </div>
                ) : null}
                {missingByStep[2]?.length ? (
                  <div>
                    <span className="font-semibold">Kapitel 2 (Gebäude):</span>{" "}
                    {missingByStep[2].join(", ")}
                  </div>
                ) : null}
                {missingByStep[3]?.length ? (
                  <div>
                    <span className="font-semibold">Kapitel 3 (Energie):</span>{" "}
                    {missingByStep[3].join(", ")}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {missingByStep[1]?.length ? (
                <Button variant="secondary" onClick={() => onEdit(1)}>
                  Zu Basis
                </Button>
              ) : null}
              {missingByStep[2]?.length ? (
                <Button variant="secondary" onClick={() => onEdit(2)}>
                  Zu Gebäude
                </Button>
              ) : null}
              {missingByStep[3]?.length ? (
                <Button variant="secondary" onClick={() => onEdit(3)}>
                  Zu Energie
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Kapitel: Basis */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-300">Kapitel 1 • Basis</div>
        <button
          type="button"
          onClick={() => onEdit(1)}
          className="text-sm text-emerald-300 hover:text-emerald-200"
        >
          bearbeiten
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" value={basics?.name} />
        <Field label="Telefon" value={basics?.phone} />
        <Field label="E-Mail" value={basics?.email} />
        <Field
          label="Datenschutz"
          value={basics?.consent_privacy ? "zugestimmt" : "nicht bestätigt"}
        />
      </div>

      {/* Kapitel: Gebäude */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-300">Kapitel 2 • Gebäude</div>
        <button
          type="button"
          onClick={() => onEdit(2)}
          className="text-sm text-emerald-300 hover:text-emerald-200"
        >
          bearbeiten
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Gebäudetyp" value={building?.building_type} />
        <Field label="Eigentum" value={building?.owner} />
        <Field label="Dachtyp" value={building?.roof_type} />
        <Field label="Ausrichtung" value={building?.roof_orientation} />
        <Field label="Verschattung" value={building?.shading} />
        <Field
          label="Adresse"
          value={[building?.street, building?.zip, building?.city]
            .filter(Boolean)
            .join(", ")}
        />
      </div>

      {/* Kapitel: Energie */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-300">Kapitel 3 • Energie</div>
        <button
          type="button"
          onClick={() => onEdit(3)}
          className="text-sm text-emerald-300 hover:text-emerald-200"
        >
          bearbeiten
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field
          label="Verbrauch (kWh/Jahr)"
          value={energy?.consumption_kwh_year}
        />
        <Field label="Kosten (€/Jahr)" value={energy?.costs_eur_year} />
      </div>

      {/* Kapitel: Wünsche */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-300">Kapitel 4 • Wünsche</div>
        <button
          type="button"
          onClick={() => onEdit(4)}
          className="text-sm text-emerald-300 hover:text-emerald-200"
        >
          bearbeiten
        </button>
      </div>
      <div className="space-y-3">
        <Chips title="Interessen" items={interests} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Zeitrahmen" value={motivation?.timeline} />
          <Field label="Hinweis" value={motivation?.note} />
        </div>
      </div>

      {/* Kapitel: Budget */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-300">Kapitel 5 • Budget</div>
        <button
          type="button"
          onClick={() => onEdit(5)}
          className="text-sm text-emerald-300 hover:text-emerald-200"
        >
          bearbeiten
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Planungsart" value={budgetModeLabel} />
        <Field label="Wert" value={budgetValueLabel} />
      </div>

      {/* Error */}
      {ui === "error" && errMsg && (
        <div className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-4 text-sm text-rose-200">
          {errMsg}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" onClick={onBack} disabled={ui === "saving"}>
          Zurück
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit}>
          {ui === "saving" ? "Sende…" : "Absenden"}
        </Button>
      </div>

      <div className="text-xs text-zinc-500">
        Tipp: Wenn etwas fehlt, klicken Sie oben auf „bearbeiten“ – dann direkt im passenden Kapitel ergänzen.
      </div>

      {/* Optional: Debug/Support */}
      {createdLeadId ? (
        <div className="text-xs text-zinc-600">
          Referenz: <span className="text-zinc-400">{createdLeadId}</span>
        </div>
      ) : null}
    </div>
  );
}