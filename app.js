'use strict';
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable strict */

/**
 * Example store structure
 */
const database = {
  title: 'Neuropsychology Quiz',
  welcomeText: 'How much do you know about Neuropsychology?',
  questions: [
    {
      question:
       'Which part of the brain houses our ability to organize tasks and carry them out?',
      answers: ['Orbital lobe',
      'Frontal lobe',
       'Partietal lobe',
        'Temporal lobe'],
      correctAnswer: 'Frontal lobe',
    },
    {
      question: 
      'What activity has shown to help regrow grey matter in the brain?',
      answers: ['Running', 'Swimming', 'Meditating', 'Puzzles'],
      correctAnswer:'Meditating',
    },
    {
      question:
       'Does the brain influence the body and vice versa?',
      answers: ['Yes, but not very much', 'No, not at all', 'Yes and its a lot', 'None is sure'],
      correctAnswer: 'Yes and its a lot',
    },
    {
      question:
        'How many layers exist in the visual cortex?',
      answers: ['2', '0', '5', '10'],
      correctAnswer: '5',
    },
    {
      question:
       'What can happen to a person as a consequence when they experience chronic gran mal seizures?',
      answers: ['The person can become more religious', 'The person loses the ability to walk', 'The person develops another personality', 'The person cannot use their left hand'],
      correctAnswer: 'The person can become more religious',
    },
  ],
  state: {
    score: 0,
    currentIndex: 0,
    answer: '',
    message: ''
  },
};
/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material and access support for more details.
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
function generateWelcomeViewTemplate() {
  return `
  <p>${database.welcomeText}</p>
  <button id="start-quiz">Start</button>`;
}

function generateQuestionTemplate(index) {
  let question = database.questions[index];
  // in line 94, database.questions is referencing the property questions in the object database
  let answers = question.answers.map(generateAnswerElement).join('');

  let submitButton =
    '<input type="submit" id="select-answer" value="Select Answer" class="submit-button">';
    //this variable contains the template for generating a submit button

  return `${generateHeaderTemplate()}
  <form>
    <div class="choices">
      ${answers}
    </div>
    ${submitButton}
  </form>
  ${generateFooterTemplate()}
  `;
}

function generateAnswerElement(answer) {
  return `
    <p class="answer-item">
      <input type="radio" id="${answer}" name="answer" value="${answer}"> 
      <label for="${answer}">${answer}</label>
    </p>
  `;
}

function generateFeedbackTemplate(feedback) {
  let button = '<button id="next-question">Next Question</button>';
  if (database.state.currentIndex + 1 === database.questions.length) {
    button = '<button id="results">Results</button>';
    //if all questions have been answers, change next button to result button
  }
  return `
  ${generateHeaderTemplate()}
    <p>${feedback}</p>
    <p>${button}</p>
    ${generateFooterTemplate()}
  `;
}

function generateResultTemplate() {
  let finalScore = database.state.score;
  let totalQuestions = database.questions.length;
  return `
  <header><h2>Final Score</h2></header>
  <p>${finalScore / totalQuestions > .5 ? 'Great Work!! ' : '' }You answered ${finalScore} questions out of ${totalQuestions} correctly!</p>
  <button id="start-over">Start Over</button>
  `;
}

function generateHeaderTemplate() {
  return `<header><h2>${database.questions[database.state.currentIndex].question}</h2></header>`;
}

function generateFooterTemplate() {
  let attempts = database.state.currentIndex;

  let currentQuestion = attempts + 1;

  let message = database.state.message;

  if (database.state.answer) {
    attempts++;
  }
  return `
  <footer>
    ${message ? `<p class="message">${message}</p>` : ''}
    <p>Current score: ${database.state.score} current answers out of ${attempts} attempted</p>
    <p>Current question: ${currentQuestion} out of ${database.questions.length}</p>
  </footer>`;
}

/********** VIEW FUNCTION **********/

// These functions will return the views to render

function welcomeView() {
  let welcomeViewTemplate = generateWelcomeViewTemplate();
  return welcomeViewTemplate;
}

function questionView() {
  let questionTemplate = generateQuestionTemplate(database.state.currentIndex);
  return questionTemplate;
}

function feedbackView() {
  let correctAnswer = database.questions[database.state.currentIndex].correctAnswer;
  let feedbackTemplate = '';
  if (database.state.answer === correctAnswer) {
    database.state.score++;
    feedbackTemplate = generateFeedbackTemplate(`${correctAnswer} is correct!`);
  } else {
    feedbackTemplate = generateFeedbackTemplate(`Wrong Answer. The correct answer is 
      ${correctAnswer}`);
  }
  database.state.currentIndex++;
  return feedbackTemplate;
}

function resultView() {
  let resultTemplate = generateResultTemplate();
  return resultTemplate;
}
/********** RENDER FUNCTION(S) **********/

function render(currentView) {
  $('h1, title').html(database.title);
  let html = currentView();
  $('main').html(html);
  database.state.message = '';
}

// This function conditionally replaces the contents of the <main> tag based on the state of the store object

/********** EVENT HANDLER FUNCTIONS **********/

function startQuizEvent() {
  $('main').on('click', '#start-quiz', (event) => {
    event.preventDefault();
    render(questionView);
  });
}

function nextQuestionEvent() {
  $('main').on('click', '#next-question', (event) => {
    event.preventDefault();
    database.state.answer = null;
    render(questionView);
  });
}

function selectAnswerEvent() {
  $('main').on('click', '#select-answer', (event) => {
    event.preventDefault();
    let answer = $('input[name="answer"]:checked').val();
    if (answer) {
      database.state.answer = answer;
      render(feedbackView);
    } else {
      database.state.message = 'Please select an answer';
      render(questionView);
    }
  });
}

function resultButtonEvent() {
  $('main').on('click', '#results', (event) => {
    event.preventDefault();
    render(resultView);
  });
}

function startOverButtonEvent() {
  $('main').on('click', '#start-over', (event) => {
    event.preventDefault();
    database.state = {
      score: 0,
      currentIndex: 0,
      answer: '',
      message: ''
    };
    render(welcomeView);
  });
}

function main() {
  selectAnswerEvent();
  startQuizEvent();
  nextQuestionEvent();
  resultButtonEvent();
  startOverButtonEvent();
  render(welcomeView);
}

$(main);