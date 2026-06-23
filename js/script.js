const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 90);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));
document.querySelectorAll("button.btn-service[data-dialog]").forEach(btn => {
  btn.addEventListener("click", () => {
    const dialog = document.getElementById(btn.dataset.dialog);
    if (dialog) dialog.showModal();
  });
});

function closeWithAnimation(dialog) {
  dialog.classList.add("closing");
  dialog.addEventListener("animationend", () => {
    dialog.classList.remove("closing");
    dialog.close();
  }, { once: true });
}

document.querySelectorAll(".modal [data-close]").forEach(closeBtn => {
  closeBtn.addEventListener("click", () => {
    closeWithAnimation(closeBtn.closest("dialog"));
  });
});

// cerrar al hacer click afuera del modal
document.querySelectorAll(".modal").forEach(dialog => {
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) closeWithAnimation(dialog);
  });
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeWithAnimation(dialog);
  });
});