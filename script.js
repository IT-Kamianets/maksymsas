// Динамічний рік у футері
document.getElementById("year").textContent = new Date().getFullYear();

// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close-btn");

document.querySelectorAll(".project-img").forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src; // вставляємо шлях до картинки
    lightboxImg.alt = img.alt;
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