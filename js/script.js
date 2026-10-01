// ── REVEAL ON SCROLL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ── HAMBURGER MENU ──
const nav = document.querySelector("nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMenu() {
  navLinks.classList.remove("active");
  navToggle.classList.remove("active");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  navToggle.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

document.addEventListener("click", (e) => {
  if (!nav.contains(e.target)) closeMenu();
});

// ── MODALES ──
function closeWithAnimation(dialog) {
  dialog.classList.add("closing");
  dialog.addEventListener("animationend", () => {
    dialog.classList.remove("closing");
    dialog.close();
    document.body.style.overflow = "";
  }, { once: true });
}

document.querySelectorAll("button.btn-service[data-dialog]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.dialog).showModal();
    document.body.style.overflow = "hidden";
  });
});

document.querySelectorAll(".modal").forEach(dialog => {
  dialog.querySelector("[data-close]").addEventListener("click", () => closeWithAnimation(dialog));
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeWithAnimation(dialog);
  });
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeWithAnimation(dialog);
  });
});
