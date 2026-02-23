import type { LeadDraft } from "./lead-schema";

function key(token: string) {
  return `capme-lead:draft:${token}`;
}

function toInt(v: unknown, fallback = 0) {
  const n = typeof v === "number" ? v : Number.parseInt(String(v ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
}

export async function loadMock(token: string): Promise<LeadDraft | null> {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(key(token));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as any;

    // ✅ normalize step + status minimal (damit UI stabil bleibt)
    const normalized: LeadDraft = {
      ...parsed,
      step: toInt(parsed?.step, 0),
      status: parsed?.status === "received" ? "received" : "open",
      data: parsed?.data ?? {},
    };

    return normalized;
  } catch {
    return null;
  }
}

export async function saveMock(token: string, draft: LeadDraft): Promise<void> {
  if (typeof window === "undefined") return;

  // ✅ always store step as number
  const safe: LeadDraft = {
    ...draft,
    step: toInt((draft as any)?.step, 0),
    status: draft.status === "received" ? "received" : "open",
    data: (draft as any)?.data ?? {},
  };

  localStorage.setItem(key(token), JSON.stringify(safe));
}