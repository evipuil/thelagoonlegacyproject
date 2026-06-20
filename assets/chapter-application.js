const chapterForm = document.querySelector("[data-chapter-form]");
const chapterStatus = document.querySelector("[data-chapter-status]");

if (chapterForm && chapterStatus) {
  chapterForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    chapterStatus.className = "form-status";
    chapterStatus.textContent = "Sending...";

    const formData = new FormData(chapterForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/chapter-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit application.");
      }

      chapterForm.reset();
      chapterStatus.className = "form-status success";
      chapterStatus.textContent = "Application recorded. Thank you for applying.";
    } catch (error) {
      chapterStatus.className = "form-status error";
      chapterStatus.textContent = error.message || "Unable to submit application.";
    }
  });
}
