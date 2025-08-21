// ==== Динамічний рік у футері ====
document.getElementById("year").textContent = new Date().getFullYear();

// ==== Лайтбокс ====
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close-btn");
  const themeSwitcher = document.querySelector(".theme-switcher"); // 🎯 свічер

  let scale = 1;

  document.querySelectorAll(".project-img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      themeSwitcher.classList.add("hidden"); // 🎯 ховаємо
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      scale = 1;
      lightboxImg.style.transform = `scale(${scale})`;
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    themeSwitcher.classList.remove("hidden"); // 🎯 показуємо назад
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (!lightbox.classList.contains("active")) return;
    scale += (e.deltaY < 0 ? 0.1 : -0.1);
    scale = Math.max(0.5, Math.min(3, scale));
    lightboxImg.style.transform = `scale(${scale})`;
  }, { passive: false });
});

// ==== Плавний рух градієнта від курсору ====
(() => {
  let targetX = 50, targetY = 50;
  let currentX = 50, currentY = 50;

  document.addEventListener("pointermove", (e) => {
    targetX = (e.clientX / window.innerWidth) * 100;
    targetY = (e.clientY / window.innerHeight) * 100;
  });

  function animate() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
      document.body.style.setProperty("--x", `${currentX.toFixed(2)}%`);
      document.body.style.setProperty("--y", `${currentY.toFixed(2)}%`);
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// ==== IntersectionObserver: плавне "випливання" блоків ====
document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".glass, header, .project");

  blocks.forEach(block => {
    block.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    block.style.transformOrigin = "center top";
    block.style.transform = "scale(0.97)";
    block.style.opacity = 0.85;
  });

  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const ratio = entry.intersectionRatio;
      const scale = 0.97 + 0.03 * ratio;
      const opacity = 0.85 + 0.15 * ratio;
      entry.target.style.transform = `scale(${scale.toFixed(3)})`;
      entry.target.style.opacity = opacity.toFixed(3);
    }
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });

  blocks.forEach(block => observer.observe(block));
});

// ==== Тумблер теми + збереження вибору ====
document.addEventListener("DOMContentLoaded", () => {
  const checkbox = document.getElementById("theme-switch");

  const saved = localStorage.getItem("theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const shouldLight = saved ? saved === "light" : prefersLight;

  document.body.classList.toggle("light-theme", shouldLight);
  checkbox.checked = shouldLight;

  checkbox.addEventListener("change", () => {
    const light = checkbox.checked;
    document.body.classList.toggle("light-theme", light);
    localStorage.setItem("theme", light ? "light" : "dark");
  });

  if (!saved && window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    mq.addEventListener("change", (e) => {
      document.body.classList.toggle("light-theme", e.matches);
      checkbox.checked = e.matches;
    });
  }
});
