const BASE =
  process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL ||
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1`;

const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function post(name: string, body: any) {
  const res = await fetch(`${BASE}/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: ANON,
      Authorization: `Bearer ${ANON}`,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  return json;
}

export function getLeadByToken(token: string) {
  return post("lead-get", { token });
}

export function submitLead(payload: any) {
  return post("lead-submit", payload);
}
