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


//   // Рух градієнта за курсором
// document.addEventListener("mousemove", (e) => {
//   let x = (e.clientX / window.innerWidth) * 100;
//   let y = (e.clientY / window.innerHeight) * 100;
//   document.body.style.setProperty("--x", `${x}%`);
//   document.body.style.setProperty("--y", `${y}%`);
// });

// Плавний рух градієнта
let targetX = 50, targetY = 50; // ціль
let currentX = 50, currentY = 50; // поточна позиція

document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth) * 100;
  targetY = (e.clientY / window.innerHeight) * 100;
});

function animateGradient() {
  // коефіцієнт інерції (0.05 = дуже плавно, 0.2 = швидше)
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  document.body.style.setProperty("--x", `${currentX}%`);
  document.body.style.setProperty("--y", `${currentY}%`);

  requestAnimationFrame(animateGradient);
}
animateGradient();


});


let targetX = 50, targetY = 50;
let currentX = 50, currentY = 50;

document.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth) * 100;
  targetY = (e.clientY / window.innerHeight) * 100;
});

function animateGradient() {
  // плавність
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;

  // тільки якщо зміна суттєва (>0.1%)
  if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
    document.body.style.setProperty("--x", `${currentX.toFixed(2)}%`);
    document.body.style.setProperty("--y", `${currentY.toFixed(2)}%`);
  }

  requestAnimationFrame(animateGradient);
}
animateGradient();


// 📦 оптимізований IntersectionObserver
document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".glass, header, .project");

  blocks.forEach(block => {
    block.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    block.style.transformOrigin = "center top";
    block.style.transform = "scale(0.97)";
    block.style.opacity = 0.85;
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const ratio = entry.intersectionRatio;
      const scale = 0.97 + 0.03 * ratio;
      const opacity = 0.85 + 0.15 * ratio;
      entry.target.style.transform = `scale(${scale.toFixed(3)})`;
      entry.target.style.opacity = opacity.toFixed(3);
    });
  }, {
    threshold: [0, 0.25, 0.5, 0.75, 1] // ❗ достатньо
  });

  blocks.forEach(block => observer.observe(block));
});



// Перемикач теми
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  // зберігаємо вибір у localStorage
  if (document.body.classList.contains("light-theme")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

// При завантаженні сторінки — підтягуємо тему
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
  }
});





