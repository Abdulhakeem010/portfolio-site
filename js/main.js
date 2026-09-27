const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 280)}ms`;
  observer.observe(item);
});

// Light / dark mode
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) root.dataset.theme = savedTheme;
  function updateThemeButton() {
    const light = root.dataset.theme === "light";
    themeToggle.querySelector(".theme-icon").textContent = light ? "☾" : "☼";
    themeToggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  }
  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    localStorage.setItem("portfolio-theme", root.dataset.theme);
    updateThemeButton();
  });
}

// Journey archive — ordered chronologically, starting at 2023.
// Each year's backdrop borrows the mood of a real computing epoch:
// 2023 -> Babbage/Lovelace/Hollerith (1822-1890), 2024 -> Turing/transistor/IC (1936-1958),
// 2025 -> the Web & early cloud/quantum (1990-2016), 2026 -> the generative AI era (2020s).
const eraContentEl = document.getElementById("eraContent");
if (eraContentEl) {
  const eras = {
    "2023": {
      title: "Learned HTML, CSS & JavaScript",
      kicker: "ORIGIN / FIRST WEB BUILDS",
      description: "Started building for the web, guided early on by a brother working professionally as a frontend developer. The first step was learning how pages are structured, styled, and made interactive.",
      stamp: "BABBAGE & LOVELACE ERA",
      caption: "2023 / THE DIFFERENCE ENGINE & THE FIRST ALGORITHM (1822–1890)",
      progress: "25%"
    },
    "2024": {
      title: "Freelance & Client Work",
      kicker: "CLIENT WORK / EARLY BUILDS",
      description: "Took on small landing pages and storefront builds, learning to translate client briefs into working interfaces and to think beyond code about the people using what I built.",
      stamp: "THE TRANSISTOR AGE",
      caption: "2024 / THE TURING MACHINE & THE MICROCHIP (1936–1958)",
      progress: "50%"
    },
    "2025": {
      title: "Actively Learning React & TypeScript",
      kicker: "LEARNING / DIGITAL EDITION",
      description: "Spent this period actively learning React and TypeScript, studying component-based development, types, props, state, and modern frontend patterns through practice projects and experimentation.",
      stamp: "THE WEB & CLOUD BOOM",
      caption: "2025 / THE WORLD WIDE WEB & EARLY QUANTUM CLOUD (1990–2016)",
      progress: "75%"
    },
    "2026": {
      title: "Started Computer Science",
      kicker: "UNIVERSITY / PRESENT DAY",
      description: "Began a Computer Science degree at the University of Ilorin, focusing early coursework alongside independent frontend study.",
      stamp: "CURRENT EDITION",
      caption: "2026 / THE GENERATIVE AI ERA",
      progress: "100%"
    }
  };

  const stage = eraContentEl.closest(".journey-stage");
  const year = document.getElementById("eraYear");
  const kicker = document.getElementById("eraKicker");
  const title = document.getElementById("eraTitle");
  const desc = document.getElementById("eraDescription");
  const stamp = document.getElementById("eraStamp");
  const caption = document.getElementById("eraCaption");
  const progress = document.getElementById("eraProgress");
  const tabs = [...document.querySelectorAll(".era-tab")];
  const eraNav = document.querySelector(".era-nav");
  const years = ["2023", "2024", "2025", "2026"];
  let committed = "2023";

  // Pure render — updates the visible card/highlight without "locking in" a year.
  function renderEra(selectedYear) {
    const data = eras[selectedYear];
    stage.className = `journey-stage reveal visible era-${selectedYear}`;
    year.textContent = selectedYear;
    kicker.textContent = data.kicker;
    title.textContent = data.title;
    desc.textContent = data.description;
    stamp.textContent = data.stamp;
    caption.textContent = data.caption;
    progress.style.width = data.progress;
    tabs.forEach(tab => tab.classList.toggle("active", tab.dataset.era === selectedYear));
  }

  // Commit — hovering previews a year; clicking (or using the arrows) locks it in.
  function commitEra(selectedYear) {
    committed = selectedYear;
    renderEra(selectedYear);
  }

  tabs.forEach(tab => {
    tab.addEventListener("mouseenter", () => renderEra(tab.dataset.era));
    tab.addEventListener("focus", () => renderEra(tab.dataset.era));
    tab.addEventListener("click", () => commitEra(tab.dataset.era));
  });
  if (eraNav) {
    eraNav.addEventListener("mouseleave", () => renderEra(committed));
    eraNav.addEventListener("focusout", (e) => {
      if (!eraNav.contains(e.relatedTarget)) renderEra(committed);
    });
  }

  const nextEra = document.getElementById("nextEra");
  const prevEra = document.getElementById("prevEra");
  if (nextEra) nextEra.addEventListener("click", () => {
    commitEra(years[(years.indexOf(committed) + 1) % years.length]);
  });
  if (prevEra) prevEra.addEventListener("click", () => {
    commitEra(years[(years.indexOf(committed) - 1 + years.length) % years.length]);
  });

  commitEra("2023");
}

// Header hides on downward scroll and returns upward.
let previousY = window.scrollY;
const header = document.querySelector(".site-header");
if (header) {
  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    header.style.transform = currentY > previousY && currentY > 140 ? "translateY(-100%)" : "translateY(0)";
    header.style.transition = "transform .3s ease";
    previousY = currentY;
  }, { passive: true });
}

// Scroll-spy — highlight the nav link (desktop + mobile) for whichever
// section is currently in view, so the green underline marks where you are.
const navLinks = [...document.querySelectorAll(".nav a[href^=\"#\"], .mobile-nav a[href^=\"#\"]")];
if (navLinks.length) {
  const sectionMap = navLinks
    .map(link => ({ link, section: document.querySelector(link.getAttribute("href")) }))
    .filter(entry => entry.section);
  if (sectionMap.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navLinks.forEach(link => link.classList.toggle("current", link.getAttribute("href") === id));
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    sectionMap.forEach(({ section }) => spy.observe(section));
  }
}

// Mobile hamburger menu — glassy full-screen overlay. While it's open, the
// header is pinned (see body.menu-open rule in CSS) so its close button stays
// reachable even as the page scrolls beneath it.
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
if (menuToggle && mobileNav) {
  function setMenu(open) {
    mobileNav.classList.toggle("open", open);
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  }
  menuToggle.addEventListener("click", () => setMenu(!mobileNav.classList.contains("open")));
  mobileNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
}
