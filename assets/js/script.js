const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");
const gameOverScreen = document.getElementById("all-Done!");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const endButton = document.getElementById("end-button");
const saveScoreButton = document.getElementById("saveScore");
const timeleftElement = document.getElementById("timeleft");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 180;
let timer;

// Array of quiz questions
const interviewQuestions = [
  {
    question: "What does CSS stand for in web development?",
    options: [
      "Computer Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
      "Creative Style Sheets",
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    question: "What is the output of `console.log(2 + '2')` in JavaScript?",
    options: ["4", "22", "Error", "undefined"],
    correctAnswer: "22",
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "let", "const", "variable"],
    correctAnswer: "var",
  },
  {
    question: "What is the result of `3 == '3'` in JavaScript?",
    options: ["true", "false", "Error", "undefined"],
    correctAnswer: "true",
  },
  {
    question:
      "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack",
  },
  {
    question: "What is the time complexity of a linear search algorithm?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: "O(n)",
  },
  {
    question: "In Python, how do you declare a function?",
    options: ["func", "function", "def", "define"],
    correctAnswer: "def",
  },
  {
    question: "What is the purpose of the `git clone` command?",
    options: [
      "Create a new Git repository",
      "Delete a Git repository",
      "Download a copy of a Git repository",
      "Rename a Git repository",
    ],
    correctAnswer: "Download a copy of a Git repository",
  },
  {
    question:
      "Which programming language is known for its use in data science and machine learning?",
    options: ["Java", "C++", "Python", "Ruby"],
    correctAnswer: "Python",
  },
  {
    question: "What is the result of `5 % 2` in JavaScript?",
    options: ["2.5", "2", "1.5", "1"],
    correctAnswer: "1",
  },
  {
    question:
      "Which symbol is used to represent a single-line comment in Python?",
    options: ["//", "/*", "#", "--"],
    correctAnswer: "#",
  },
  {
    question: "What does HTML stand for in web development?",
    options: [
      "Hyper Text Markup Language",
      "Highly Technical Markup Language",
      "Hyperlink and Text Markup Language",
      "Hyper Transfer Markup Language",
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    question: "In JavaScript, how do you define an array?",
    options: ["array[]", "array{}", "array()", "array = []"],
    correctAnswer: "array = []",
  },
  {
    question: "What is the purpose of the `SQL SELECT` statement?",
    options: [
      "Insert data into a database",
      "Delete data from a database",
      "Update data in a database",
      "Retrieve data from a database",
    ],
    correctAnswer: "Retrieve data from a database",
  },
  {
    question: "Which data structure uses a combination of key and value pairs?",
    options: ["Array", "Stack", "Queue", "Dictionary"],
    correctAnswer: "Dictionary",
  },
];

// start Quiz button
startButton.addEventListener("click", startQuiz);

// start Quiz function
function startQuiz() {
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  startTimer();
  displayQuestion();
  endButton.style.display = "block";
}

function displayQuestion() {
  if (currentQuestionIndex < interviewQuestions.length) {
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    questionText.textContent = `Question ${currentQuestionIndex + 1} / ${
      interviewQuestions.length
    }: ${currentQuestion.question}`;
    optionsList.innerHTML = "";

    currentQuestion.options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.classList.add("option", "list-group-item");
      optionButton.textContent = option;
      optionButton.addEventListener("click", checkAnswer);
      optionsList.appendChild(optionButton);
    });
  } else {
    endQuiz();
  }
}

// timer function
function startTimer() {
  clearInterval(timer);
  timerElement.textContent = timeLeft;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = timeLeft;
    } else {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// check answer function
function checkAnswer(event) {
  if (
    event &&
    event.target.textContent ===
      interviewQuestions[currentQuestionIndex].correctAnswer
  ) {
    score++;
  }

  scoreElement.textContent = score;
  currentQuestionIndex++;
  displayQuestion();

  // Update total score display.
  document.getElementById("total-score").textContent = score;
}

// end Quiz button
endButton.addEventListener("click", endQuiz);

// end Quiz function
function endQuiz() {
  clearInterval(timer);
  questionText.textContent = "Quiz Completed!";
  optionsList.innerHTML = "";
  gameOverScreen.style.display = "block";
  finalScoreElement.textContent = score;
  endButton.style.display = "none";
  timeleftElement.style.display = "none";
}

// save score button
saveScoreButton.addEventListener("click", saveScore);

// save score function
function saveScore() {
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    // Create a new scores array with the current score and initials
    const scores = [{ initials, score }];
    // Save the new scores array to local storage
    localStorage.setItem("scores", JSON.stringify(scores));
    // Reload the page to restart the quiz
    window.location.reload();
  } else {
    alert("Please enter your initials before saving the score.");
  }
}
