const CONTACT_EMAIL = "thelagoonlegacyproject@gmail.com";

function parseBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body || "{}");
  }

  return {};
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  let body;
  try {
    body = parseBody(req);
  } catch {
    return res.status(400).json({ error: "Invalid request body" });
  }

  const county = String(body.county || "").trim();
  const message = String(body.message || "").trim();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();

  if (!county || !message) {
    return res.status(400).json({ error: "County and message are required." });
  }

  const submission = {
    type: "lagoon_legacy_contact",
    receivedAt: new Date().toISOString(),
    county,
    message,
    name,
    email,
    contactEmail: CONTACT_EMAIL,
  };

  console.log(JSON.stringify(submission));

  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch (error) {
      console.error("contact_webhook_failed", error);
    }
  }

  return res.status(200).json({ ok: true });
}
