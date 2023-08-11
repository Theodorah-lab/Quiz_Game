const quizData = [
  {
    question: " Which function is used to add an element to the end of an array in JavaScript?",
    a: "push()",
    b: "unshift()",
    c: "pop()",
    d: "shift()",
    correct: "a",
  },
  {
    question: "What is the purpose of the `addEventListener` method in JavaScript?",
    a: "To create a new element in the DOM",
    b: "To remove an event listener from an element",
    c: "To add an event listener to an element",
    d: "To modify the styling of an element",
    correct: "c",
  },
 
  {
    question: "Does JavaScript allow exception handling?",
    a: "No",
    b: "Yes, but it provides only try block",
    c: "Yes, but it provides only Try catch block, but does not allow throw exception",
    d: "Yes, it provides try, catch as well as throw key word for exception handling",
    correct: "d",
  },
  {
    question: "What is the result of the following expression? javascript typeof null",
    a: "null",
    b: "object",
    c: "undefined",
    d:"string",
 
    correct: "b",
  },
  {
    question: " What is the correct way to declare a variable in JavaScript?",
    a: "var myVariable",
    b: "variable myVariable",
    c: "let myVariable",
    d: "const myVariable",
    correct: "c",
  },
  {
    question: "Which of the following is not a valid JavaScript loop?",
    a: "for loop",
    b: "while loop",
    c: "until loop",
    d: "do...while loop",
 
    correct: "c",
  },
  {
    question: "How can you convert a string to an integer in JavaScript",
    a: "parseInt()",
    b: "toString()",
    c: "parseFloat()",
    d: "toInteger()",
 
    correct: "a",
  },
  {
    question: "What is the purpose of the `querySelector` method in JavaScrip?",
    a: "To select an element from the DOM based on its ID",
    b: "To select multiple elements from the DOM",
    c: "To select an element from the DOM based on its class name",
    d: " To select the first element from the DOM that matches a specific CSS selector",
    correct: "d",
  },
  {
    question: "What does the `JSON.parse()` function do in JavaScript?",
    a: "Converts a JSON string to a JavaScript object",
    b: "Converts a JavaScript object to a JSON string",
    c: "Parses HTML code into a DOM tree",
    d: "Encrypts data using the JSON format",

    correct: "a",
  },
  {
    question: " Which function is used to add an element to the end of an array in JavaScript?",
    a: "push()",
    b: "unshift()",
    c: "pop()",
    d: "shift()",
    correct: "a",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const e_text = document.getElementById("e_text");

const submitBtn = document.getElementById("submit");
const startQuiz = document.getElementById("start-quiz");
const timerDisplay = document.getElementById("timer");
const quizResult = document.getElementById("quiz-result");
const activeQuiz = document.getElementById("active-quiz");
const answerStatus = document.getElementById("answer-status");

let currentQuiz = 0;
let score = 0;
let intervalId;

function onStartQuiz() {
  score = 0;
  currentQuiz = 0;
  activeQuiz.style.display = "block";
  quizResult.style.display = "none";
  loadQuiz();
  document.getElementById("quiz").style.display = "block";
  document.getElementById("welcome-section").style.display = "none";
  let timeRemaining = 60;
  timerDisplay.innerText = `Time: ${timeRemaining}`;

  intervalId = setInterval(function () {
    timerDisplay.innerText = `Time: ${--timeRemaining}`;

    if (timeRemaining === 0) {
      showResults()
    }
  }, 1000);
}

startQuiz.onclick = onStartQuiz;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

submitBtn.addEventListener("click", () => {
  console.log("click");

  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
      answerStatus.className = "answer-status correct";
      answerStatus.innerText = "Correct!";
      answerStatus.style.display = "block";
    } else {
      answerStatus.className = "answer-status incorrect";
      answerStatus.innerText = "Wrong!";
      answerStatus.style.display = "block";
    }

    setTimeout(() => {
        answerStatus.style.display = "none";
    }, 1000);

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      showResults();
    }
  }
});

function showResults() {
    clearInterval(intervalId);
    timerDisplay.innerText = `Time: 0`;
    activeQuiz.style.display = "none";
    quizResult.style.display = "block";
    quizResult.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly</h2>
                ${score < 5? `
                  <p style="text-align: center">You scored below average. Please try again.</p>
                  <button onclick="onStartQuiz()">Retry</button>
                  `:``}
            `;
}
