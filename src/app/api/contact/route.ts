export async function POST(request: Request) {
  const formData = await request.formData();
  const honeypot = formData.get("honeypot");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return Response.json(
      { message: "Blocked by spam protection." },
      { status: 400 },
    );
  }

  return Response.json({ ok: true });
}
