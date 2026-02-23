export type LeadStatus = "open" | "received";

export type LeadData = {
  name: string;
  email?: string;
  phone: string;

  street?: string;
  zip?: string;
  city?: string;

  building_type: string;
  owner: string;

  roof_type: string;
  roof_orientation: string;
  shading: string;

  consumption_kwh_year?: number;
  costs_eur_year?: number;

  interests: Record<string, boolean>;
  timeline: string;
  note?: string;

  budget_mode: "unknown" | "total" | "monthly";
  budget_value?: number;

  consent_privacy: boolean;
};

export type LeadDraft = {
  step: number;
  status: LeadStatus;
  data: LeadData;
};

// super simple validation (für Phase 1 – mock)
export function validateBasics(data: LeadData): Record<string, string> {
  const e: Record<string, string> = {};
  if (!data.name || data.name.trim().length < 2) e.name = "Bitte Namen eintragen.";
  const p = (data.phone || "").replace(/\s+/g, "");
  if (!p || p.length < 6) e.phone = "Bitte Telefonnummer eintragen.";
  if (!data.consent_privacy) e.consent_privacy = "Bitte bestätigen.";
  return e;
}