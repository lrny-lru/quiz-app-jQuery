/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable strict */
'use strict';




/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)



/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates



const store = {
  // 5 or more questions are required
  questions: [
    {
      question:
        "Which part of the brain houses our abilities to organize tasks and carry them out?",
      answers: ["Orbital lobe",
       "frontal lobe",
        "partietal lobe",
         "temporal lobe"],
      correctAnswer: "frontal lobe",
      
    },
    {
      question:
        "What activity has shown to help regrow grey matter in the brain? ",
      answers: ["running",
       "swimming",
      "meditating",
       "doing puzzles"],
      correctAnswer: "meditating",
      
    },
    {
      question:
        "Does the brain influence the body and vice versa? ",
      answers: ["yes, but not very much",
       "no, not at all ",
        "yes and it's a lot ",
         "No one is sure"],
      correctAnswer:  "yes and it's a lot ",
      
    },
    {
      question:
        "How many layers exist in the visual cortex?",
      answers: [
        "2",
        "0",
        "5",
        "10",
      ],
      correctAnswer: "5",
     
    },
    {
      question:
        " What can happen to a person as a consequence when they experience chronic gran mal seizures?  ",
      answers: [
        "they can become more religious",
        "they lose the ability to walk",
        "they develop another personality",
        "they can't use their left hand",
      ],
      correctAnswer: "they can become more religious",
    
    },
    
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function labQuestionRetriever() {
  //haha dog joke

  let num = store.questionNumber;
  let nextQuestion = store.questions[num];
  console.log(nextQuestion);
  return nextQuestion;
}

function templateQGenerator() {
  let questionNum = store.questionNumber;

  console.log("`templateGenerator`  ran");
  let question = labQuestionRetriever();
  console.log("q# is: ", questionNum);
  const template = `<section class="box" id="question-screen">
      <form class="container">
      <h1 class="neuro"> Neuropsychology</H1>
        <ul >
          <div class='textbox'><p>${question.question}</p></div>
          <li>
            <input
              type="radio"
              name="quizquestion"
              id="correct"
              value="${question.answers[0]}" 
              required
            />
            <label for="correct">${question.answers[0]}</label>
          </li>
          <li>
            <input
              type="radio"
              name="quizquestion"
              id="quizquestion"
              value="${question.answers[1]}"
            />
            <label for="incorrect1">${question.answers[1]}</label>
          </li>
          <li>
            <input
              type="radio"
              name="quizquestion"
              id="quizquestion"
              value="${question.answers[2]}"
            />
            <label for="incorrect2">${question.answers[2]}</label>
          </li>
          <li>
            <input
              type="radio"
              name="quizquestion"
              id="quizquestion"
              value="${question.answers[3]}"
            />
            <label for="incorrect3">${question.answers[3]}</label>
          </li>
          <button type="submit" class="submit-question">Submit</button>
        </ul>
        <div class="innercontainer">
            <div><p> Question ${questionNum + 1} of ${store.questions.length
  }</p></div>
            <div><p> ${store.score} of ${questionNum}</p></div>
        </div>
      </form>
      
    </section>`;
  renderIt(template);
}

function answerFormGenerator() {
  console.log("answer generator ran");
  let score = store.score;
  let totalQuestions = store.questions.length;
  let num = store.questionNumber;
  let userAnswer = $('input[name="quizquestion"]:checked').val();
  let correctAnswer = labQuestionRetriever().correctAnswer;
  console.log("user chose: ", userAnswer);
  let template;
  if (correctAnswer === userAnswer) {
    store.score += 1;
    store.questionNumber += 1;
  
    template = `<section class="box" id="answer-screen">
        <h2>Correct!</h2>
        <p>You got ${score + 1} of ${totalQuestions} correct so far.</p>`;
  } else {
    store.questionNumber += 1;
    template = `<section class="box" id="answer-screen">
        <h2> Oops!</h2>
        <p>The Correct Answer Was: ${correctAnswer}</p>
        <p>You got ${score} of ${totalQuestions} correct so far.</p>`;
  }
  if (store.questionNumber === store.questions.length) {
    template +=
      "<button class='finish-quiz'>Finish</button></section>";
  } else {
    template +=
      "<button class='next-question'>Next</button></section>";
  }
  renderIt(template);
}


function welcomeScreen() {
  console.log("welcomescreen  ran");
 
  const template = `<section class="box" id="welcome-screen">
      <h1>Neuropsychology </h1>
      <button class='next-question' id="start">Start</button>
    </section>`;
  renderIt(template);
}

function conclusionGenerator() {
  console.log("conclusion generator fn ran");
  //take in questions object
  //output window with final score, button to retake quiz
  let score = store.score;
  let totalQuestions = store.questions.length;
  const template = `<section class="box" id="answer-screen">
        <h2>Great Work!</h2>
        <p>You got ${score} of ${totalQuestions} correct</p>
        <p> Click the button below to try again.</p>
        <button class="again-button">Let's go!</button>
    </section>`;
  renderIt(template);
}

function main() {
  renderIt();
  welcomeScreen();
  startQuiz();
  checkAnswer();
  nextQuestion();
  finishQuiz();
  onceMore();
}

$(main);

// /********** RENDER FUNCTION(S) **********/


function renderIt(state) {
  console.log("renderIt ran");
  $("body").html(`${state}`);
}
// /********** EVENT HANDLER FUNCTIONS **********/



function checkAnswer() {
  console.log("check answer ran ");
  $("body").on("click", `.submit-question`, function (event) {
    event.preventDefault();
    answerFormGenerator();
  });
}

function nextQuestion() {
  console.log("next q ran");
  $("body").on("click", ".next-question", function (evt) {
    evt.preventDefault();
    templateQGenerator();
  });
}
function startQuiz() {
  console.log("start quiz ran 2");
  $("body").on("click", "#start", function (evt) {
    nextQuestion();
  });
}
function finishQuiz() {
  console.log("finish quiz ran");
  $("body").on("click", ".finish-quiz", function (evt) {
    evt.preventDefault();
    conclusionGenerator();
  });
}
function onceMore() {
  console.log("once more ran");
  $("body").on("click", ".again-button", function (evt) {
    store.questions.score = 0;
    store.questions.questionNumber = 0;
    location.reload();
    welcomeScreen();
  });
}


