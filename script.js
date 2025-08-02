"use strict";
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
  // queBody(0);
});

let Questions = [];

const QueFetch = async function () {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=50&category=18&difficulty=medium"
    );
    const data = await response.json();
    Questions = data.results.map((q) => ({
      question: q.question,
      // OpenTDB provides correct and incorrect answers separately
      options: shuffle([q.correct_answer, ...q.incorrect_answers]),
      answer: q.correct_answer,
    }));
    let Que_count = 0;
    const nextBtn = quizBox.querySelector(".next-btn");

    const queBody = function (index) {
      const queText = document.querySelector(".que-text");
      const option = document.querySelector(".option-list");
      let queTag = `<span>${Questions[index].question}</span>`;
      queText.innerHTML = queTag;
      let optionTag = Questions[index].options
        .map((opt) => `<div class="option">${opt} <span></span></div>`)
        .join("");
      option.innerHTML = optionTag;
    };

    nextBtn.addEventListener("click", () => {
      Que_count++;
      if (Que_count < Questions.length) {
        queBody(Que_count);
      }
    });

    // Render the first question
    queBody(0);
  } catch (error) {
    console.error(error.message);
  }
};

// Helper to shuffle options
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

QueFetch();
