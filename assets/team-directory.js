(function () {
  "use strict";

  const team = window.LAGOON_TEAM;
  if (!team) return;

  const generalRoot = document.querySelector("[data-general-leadership]");
  const directoryRoot = document.querySelector("[data-leadership-directory]");
  const searchInput = document.querySelector("[data-leadership-search]");
  const chapterSelect = document.querySelector("[data-leadership-chapter]");
  const statusLine = document.querySelector("[data-leadership-status]");
  const emptyState = document.querySelector("[data-leadership-empty]");

  function initials(name) {
    return String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join("");
  }

  function createPortrait(person) {
    if (!person.photo) {
      const placeholder = document.createElement("div");
      placeholder.className = "member-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.textContent = initials(person.name);
      return placeholder;
    }

    const image = document.createElement("img");
    image.className = "member-photo";
    image.src = person.photo;
    image.alt = person.name;
    image.loading = "lazy";

    image.addEventListener("error", function () {
      const placeholder = document.createElement("div");
      placeholder.className = "member-placeholder";
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.textContent = initials(person.name);
      image.replaceWith(placeholder);
    }, { once: true });

    return image;
  }

  function createLinks(links) {
    if (!Array.isArray(links) || !links.length) return null;

    const container = document.createElement("div");
    container.className = "member-links";

    links.forEach(link => {
      if (!link || !link.url || !link.label) return;
      const anchor = document.createElement("a");
      anchor.className = "source-link";
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.textContent = link.label;
      container.appendChild(anchor);
    });

    return container.childElementCount ? container : null;
  }

  function createCard(person, chapter) {
    const article = document.createElement("article");
    article.className = "member-card";

    if (chapter) {
      article.dataset.leadershipCard = "";
      article.dataset.name = person.name;
      article.dataset.role = person.role;
      article.dataset.chapter = chapter.id;
      article.dataset.search = [person.name, person.role, chapter.name, chapter.label].join(" ");
    }

    article.appendChild(createPortrait(person));

    const body = document.createElement("div");
    body.className = "member-body";

    const role = document.createElement("p");
    role.className = "member-role";
    role.textContent = person.role;

    const name = document.createElement("h3");
    name.textContent = person.name;

    const bio = document.createElement("p");
    bio.textContent = person.bio || "";

    body.append(role, name, bio);

    const links = createLinks(person.links);
    if (links) body.appendChild(links);

    article.appendChild(body);
    return article;
  }

  function renderGeneralLeadership() {
    if (!generalRoot) return;
    generalRoot.replaceChildren();
    team.generalLeadership.forEach(person => generalRoot.appendChild(createCard(person, null)));
  }

  function renderChapterDirectory() {
    if (!directoryRoot) return;

    directoryRoot.querySelectorAll("[data-generated-chapter]").forEach(node => node.remove());

    team.chapters.forEach(chapter => {
      const section = document.createElement("section");
      section.className = "chapter-group";
      section.dataset.generatedChapter = "";
      section.dataset.chapterGroup = chapter.id;

      const headingId = `${chapter.id}-leadership-heading`;
      section.setAttribute("aria-labelledby", headingId);

      const head = document.createElement("div");
      head.className = "chapter-group-head";

      const titleWrap = document.createElement("div");
      const label = document.createElement("p");
      label.className = "section-label";
      label.textContent = chapter.label || `${chapter.name} Chapter`;

      const heading = document.createElement("h3");
      heading.id = headingId;
      heading.textContent = chapter.name;
      titleWrap.append(label, heading);

      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = chapter.status || "";

      head.append(titleWrap, tag);

      const grid = document.createElement("div");
      grid.className = "team-grid-page";
      chapter.officers.forEach(person => grid.appendChild(createCard(person, chapter)));

      section.append(head, grid);
      directoryRoot.insertBefore(section, emptyState || null);
    });
  }

  function populateChapterFilter() {
    if (!chapterSelect) return;
    chapterSelect.replaceChildren();

    const all = document.createElement("option");
    all.value = "all";
    all.textContent = "All chapters";
    chapterSelect.appendChild(all);

    team.chapters.forEach(chapter => {
      const option = document.createElement("option");
      option.value = chapter.id;
      option.textContent = chapter.name;
      chapterSelect.appendChild(option);
    });
  }

  function applyFilter() {
    if (!directoryRoot) return;

    const query = (searchInput?.value || "").trim().toLowerCase();
    const selectedChapter = chapterSelect?.value || "all";
    let shown = 0;

    directoryRoot.querySelectorAll("[data-chapter-group]").forEach(group => {
      const groupChapter = group.dataset.chapterGroup;
      const chapterAllowed = selectedChapter === "all" || groupChapter === selectedChapter;
      let groupShown = 0;

      group.querySelectorAll("[data-leadership-card]").forEach(card => {
        const haystack = (card.dataset.search || "").toLowerCase();
        const matches = chapterAllowed && (!query || haystack.includes(query));
        card.hidden = !matches;
        if (matches) {
          shown += 1;
          groupShown += 1;
        }
      });

      group.hidden = groupShown === 0;
    });

    if (statusLine) {
      statusLine.textContent = `${shown} officer${shown === 1 ? "" : "s"} shown.`;
    }
    if (emptyState) {
      emptyState.hidden = shown !== 0;
    }
  }

  renderGeneralLeadership();
  populateChapterFilter();
  renderChapterDirectory();
  applyFilter();

  searchInput?.addEventListener("input", applyFilter);
  chapterSelect?.addEventListener("change", applyFilter);
})();
