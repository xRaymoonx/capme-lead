export const runtime = "edge"; // optional, kann auch weg

export async function GET() {
  return Response.json({ ok: true, ts: new Date().toISOString() });
}