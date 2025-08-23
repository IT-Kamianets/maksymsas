window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 3000); // чекаємо, поки всі блоки з'їдуть
});
