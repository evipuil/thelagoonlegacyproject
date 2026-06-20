const header = document.getElementById("header");
if (header) {
  const alwaysSolid = header.classList.contains("solid");
  const onScroll = () => header.classList.toggle("solid", alwaysSolid || window.scrollY > 80);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("on");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("on"));
}
