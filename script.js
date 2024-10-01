// Отримуємо поточний рік
const currentYear = new Date().getFullYear();

// Встановлюємо значення року в елемент із id "year"
document.getElementById('year').textContent = currentYear;
