// Динамічний рік у футері
document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close-btn");

  let scale = 1; // масштаб картинки

  // Відкриття картинки
  document.querySelectorAll(".project-img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      scale = 1; // скидаємо масштаб
      lightboxImg.style.transform = `scale(${scale})`;
    });
  });

  // Закриття по кліку на хрестик
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  // Закриття по кліку поза картинкою
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  // Масштабування колесиком
  lightbox.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (!lightbox.classList.contains("active")) return;

    if (e.deltaY < 0) {
      // Прокрутка вгору → збільшуємо
      scale = Math.min(scale + 0.1, 3);
    } else {
      // Прокрутка вниз → зменшуємо
      scale = Math.max(scale - 0.1, 0.5);
    }
    lightboxImg.style.transform = `scale(${scale})`;
  });
});
