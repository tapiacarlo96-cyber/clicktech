// ── REVEAL ON SCROLL ──
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObserver.observe(el));

// ── NAV SCROLL EFFECT ──
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}, { passive: true });

// ── HAMBURGER MENU ──
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    navToggle.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Cerrar al hacer click en un link
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Cerrar al hacer click afuera
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ── DARK MODE TOGGLE ──
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("clicktech-theme");

if (savedTheme === "light") {
  document.body.classList.add("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("clicktech-theme", isLight ? "light" : "dark");
  });
}

// ── MODAL OPEN ──
document.querySelectorAll("button.btn-service[data-dialog]").forEach(btn => {
  btn.addEventListener("click", () => {
    const dialog = document.getElementById(btn.dataset.dialog);
    if (dialog) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
  });
});

// ── MODAL CLOSE WITH ANIMATION ──
function closeWithAnimation(dialog) {
  dialog.classList.add("closing");
  dialog.addEventListener("animationend", () => {
    dialog.classList.remove("closing");
    dialog.close();
    document.body.style.overflow = "";
  }, { once: true });
}

document.querySelectorAll(".modal [data-close]").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    closeWithAnimation(closeBtn.closest("dialog"));
  });
});

// Cerrar al hacer click afuera del modal
document.querySelectorAll(".modal").forEach(dialog => {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeWithAnimation(dialog);
  });
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeWithAnimation(dialog);
  });
});

// ── SMOOTH SCROLL FOR NAV LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});