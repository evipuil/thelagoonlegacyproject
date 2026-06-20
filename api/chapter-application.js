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

  const required = ["name", "email", "county", "school", "message"];
  const missing = required.filter((key) => !String(body[key] || "").trim());

  if (missing.length) {
    return res.status(400).json({ error: "Name, email, county, school, and message are required." });
  }

  const submission = {
    type: "lagoon_legacy_chapter_application",
    receivedAt: new Date().toISOString(),
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    county: String(body.county || "").trim(),
    school: String(body.school || "").trim(),
    role: String(body.role || "").trim(),
    message: String(body.message || "").trim(),
  };

  console.log(JSON.stringify(submission));

  if (process.env.CHAPTER_APPLICATION_WEBHOOK_URL) {
    try {
      await fetch(process.env.CHAPTER_APPLICATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    } catch (error) {
      console.error("chapter_application_webhook_failed", error);
    }
  }

  return res.status(200).json({ ok: true });
}
