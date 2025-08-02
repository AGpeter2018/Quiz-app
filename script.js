const startBtn = document.querySelector(".start-btn");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const quitBtn = document.querySelector(".quit");
const continueBtn = document.querySelector(".restart");

startBtn.addEventListener("click", () => {
  startBtn.style.opacity = "0";
  infoBox.classList.add("info-box-active-info");
});

quitBtn.addEventListener("click", () => {
  infoBox.classList.remove("info-box-active-info");
  startBtn.style.opacity = "1";
});

continueBtn.addEventListener("click", () => {
  infoBox.classList.remove("info-box-active-info");
  quizBox.classList.add("quiz-box-active-box");
});
