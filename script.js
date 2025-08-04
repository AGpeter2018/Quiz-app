"use strict";
const startBtn = document.querySelector(".start-btn");
const infoBox = document.querySelector(".info-box");
const quizBox = document.querySelector(".quiz-box");
const quitBtn = document.querySelector(".quit");
const continueBtn = document.querySelector(".restart");
const option = document.querySelector(".option-list");
const timerCount = document.querySelector(".timer-sec");
const counterBaseLine = document.querySelector(".time-line");

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

    const nextBtn = quizBox.querySelector(".next-btn");
    const resultBox = document.querySelector(".result-box");
    const restartBtn = document.querySelector(".restart");
    const quitBtn = document.querySelector(".quit");

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

      let tickIcon = `<div class="icon tick"><i class="fas fa-check"><i></div>`;
      let crossIcon = `<div class="icon cross"><i class="fas fa-times"><i></div>`;

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
      let userScore = 0;

      // Separate function to set event listeners for options
      function setOptionListeners() {
        const optionList = document.querySelectorAll(".option");
        optionList.forEach((el) => {
          el.addEventListener("click", (e) => {
            clearInterval(counter);
            clearInterval(counterLine);

            const optionClick = e.currentTarget.textContent.trim();
            // console.log(optionClick);
            if (correct_answer === optionClick) {
              el.classList.add("correct");
              el.insertAdjacentHTML("beforeend", tickIcon);
              userScore += 1;
              console.log(userScore);
              console.log("correct");
            } else {
              el.classList.add("incorrect");
              el.insertAdjacentHTML("beforeend", crossIcon);
              console.log("wrong");
              // Also highlight the correct answer
              Array.from(option.children).forEach((child) => {
                if (child.textContent.trim() === correct_answer) {
                  child.classList.add("correct");
                  child.insertAdjacentHTML("beforeend", tickIcon);
                }
              });
            }
            // when answer is selected others cannot be selected
            Array.from(option.children).forEach((child) => {
              child.classList.add("disable");
              nextBtn.style.display = "block";
            });
          });
        });
      }
    };

    function setAnswerFunction() {
      infoBox.classList.remove("info-box-active-info");
      quizBox.classList.remove("quiz-box-active-box");
      resultBox.classList.add("result-box-active");
    }

    let Que_count = 0;
    let counter;
    let counterLine = 0;
    let countTimer = 15;
    let widthValue = 0;

    // set timer for the quiz
    const setTimer = function (time) {
      const timer = function () {
        timerCount.textContent = time;
        time--;
        if (time < 0) {
          clearInterval(counter);
          timerCount.textContent = "0";
        }
        let addZero = timerCount.textContent;
        if (time < 9) {
          timerCount.textContent = `0${addZero}`;
        }
      };
      counter = setInterval(timer, 1000);
    };
    setTimer(countTimer);
    // counter baseline
    const setTimerBaseline = function (time) {
      const timer = function () {
        time += 1;
        counterBaseLine.style.width = `${time}px`;

        if (time > 549) {
          clearInterval(counterLine);
        }
      };
      counterLine = setInterval(timer, 29);
    };
    setTimerBaseline(0);

    nextBtn.addEventListener("click", () => {
      Que_count++;
      if (Que_count < Questions.length) {
        queBody(Que_count);
        clearInterval(counter);
        setTimer(countTimer);
        clearInterval(counterLine);
        setTimerBaseline(widthValue);
      } else {
        console.log("question completed");
        setAnswerFunction();
      }
      nextBtn.style.display = "none";
    });

    // Render the first question
    queBody(Que_count);
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
