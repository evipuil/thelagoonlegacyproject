const form = document.querySelector("[data-contact-form]");
const statusEl = document.querySelector("[data-contact-status]");

if (form && statusEl) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.className = "form-status";
    statusEl.textContent = "Sending...";

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to send message.");
      }

      form.reset();
      statusEl.className = "form-status success";
      statusEl.textContent = "Message recorded. Thank you for reaching out.";
    } catch (error) {
      statusEl.className = "form-status error";
      statusEl.textContent = error.message || "Unable to send message.";
    }
  });
}
