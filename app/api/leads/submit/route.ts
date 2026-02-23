import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // NUR server-side!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Minimal-Schutz (du hast Validation im Wizard, aber serverseitig trotzdem prüfen)
    if (!body?.token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    const payload = {
      source: "capme_lead",
      token: body.token,
      status: "new",

      name: body.name ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,

      street: body.street ?? null,
      zip: body.zip ?? null,
      city: body.city ?? null,
      building_type: body.building_type ?? null,
      owner: body.owner ?? null,
      roof_type: body.roof_type ?? null,
      roof_orientation: body.roof_orientation ?? null,
      shading: body.shading ?? null,

      consumption_kwh_year: body.consumption_kwh_year ?? null,
      costs_eur_year: body.costs_eur_year ?? null,

      timeline: body.timeline ?? null,
      note: body.note ?? null,
      interests: body.interests ?? null,

      budget_mode: body.budget_mode ?? null,
      budget_value: body.budget_value ?? null,
    };

    const { data, error } = await supabaseAdmin
      .from("leads")
      .insert(payload)
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ id: data.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unknown error" }, { status: 500 });
  }
}