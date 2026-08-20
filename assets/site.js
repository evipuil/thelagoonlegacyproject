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


// Chapter leadership directory filter
const leadershipDirectory = document.querySelector("[data-leadership-directory]");
if (leadershipDirectory) {
  const leadershipSearch = document.querySelector("[data-leadership-search]");
  const leadershipChapter = document.querySelector("[data-leadership-chapter]");
  const leadershipStatus = document.querySelector("[data-leadership-status]");
  const leadershipEmpty = document.querySelector("[data-leadership-empty]");
  const leadershipCards = Array.from(leadershipDirectory.querySelectorAll("[data-leadership-card]"));
  const chapterGroups = Array.from(leadershipDirectory.querySelectorAll("[data-chapter-group]"));

  const normalize = (value) => (value || "").toLowerCase().trim();

  const filterLeadership = () => {
    const query = normalize(leadershipSearch ? leadershipSearch.value : "");
    const selectedChapter = leadershipChapter ? leadershipChapter.value : "all";
    let visibleCount = 0;

    leadershipCards.forEach((card) => {
      const matchesChapter = selectedChapter === "all" || card.dataset.chapter === selectedChapter;
      const searchable = normalize(card.dataset.search || card.textContent);
      const matchesSearch = !query || searchable.includes(query);
      const visible = matchesChapter && matchesSearch;

      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    chapterGroups.forEach((group) => {
      const hasVisibleOfficer = Array.from(group.querySelectorAll("[data-leadership-card]")).some((card) => !card.hidden);
      group.hidden = !hasVisibleOfficer;
    });

    if (leadershipStatus) {
      leadershipStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "officer" : "officers"} shown`;
    }
    if (leadershipEmpty) {
      leadershipEmpty.hidden = visibleCount !== 0;
    }
  };

  if (leadershipSearch) leadershipSearch.addEventListener("input", filterLeadership);
  if (leadershipChapter) leadershipChapter.addEventListener("change", filterLeadership);
  filterLeadership();
}
