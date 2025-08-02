"use strict";
const startBtn = document.querySelector(".start-btn");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const quitBtn = document.querySelector(".quit");
const continueBtn = document.querySelector(".restart");
const option = document.querySelector(".option-list");

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
    console.log(data);
    Questions = data.results.map((q) => ({
      question: q.question,

      options: shuffle([q.correct_answer, ...q.incorrect_answers]),
      answer: q.correct_answer,
    }));
    let Que_count = 0;
    const nextBtn = quizBox.querySelector(".next-btn");

    const queBody = function (index) {
      const queText = document.querySelector(".que-text");

      const quizNum = document.querySelector(".total-que");
      // Show question number and total
      let queTag = `<div class="question-number"> ${index + 1}.</div><span>${
        Questions[index].question
      }</span>`;
      let optionTag = Questions[index].options
        .map((opt, i) => `<div class="option">${opt} <span></span></div>`)
        .join("");
      let counterQue = `   <span
            ><p>${index + 1}</p>
            of
            <p>${Questions.length}</p>
            questions</span
          >`;
      queText.innerHTML = queTag;
      option.innerHTML = optionTag;
      quizNum.innerHTML = counterQue;

      setOptionListeners();
      let correct_answer = Questions[index].answer;
      console.log(correct_answer);
      // Separate function to set event listeners for options
      function setOptionListeners() {
        const optionList = document.querySelectorAll(".option");
        optionList.forEach((el) => {
          el.addEventListener("click", (e) => {
            const optionClick = e.currentTarget.textContent.trim();
            // console.log(optionClick);
            if (correct_answer === optionClick) {
              el.classList.add("correct");
              console.log("correct");
            } else {
              el.classList.add("incorrect");
              console.log("wrong");
            }
            Array.from(option.children).forEach((child) => {
              child.classList.add("disable");
            });
          });
        });
      }
    };

    nextBtn.addEventListener("click", () => {
      Que_count++;
      if (Que_count < Questions.length - 1) {
        queBody(Que_count);
      } else {
        console.log("question completed");
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
