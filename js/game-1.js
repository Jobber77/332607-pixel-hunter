import {createDOMElement, showScreen} from './util.js';
import {assignBackButtonListener, killBackButtonListener, nextScreenCallHandler} from './game-navigation';
import {generateHeaderStatsHtml, generateFooterStatsHtml} from './game-common-elements';

const generateHtml = (currentGame) => `
${generateHeaderStatsHtml(currentGame.currentStats)}
<section class="game">
<p class="game__task">${currentGame.questions[currentGame.currentQuestion].text}</p>
<form class="game__content">
  <div class="game__option">
    <img src="${currentGame.questions[currentGame.currentQuestion].answers[0].imgLink}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
  <div class="game__option">
    <img src="${currentGame.questions[currentGame.currentQuestion].answers[1].imgLink}" alt="Option 2" width="468" height="458">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question2" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question2" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
</form>
${generateFooterStatsHtml(currentGame.levelResultHistory)}
</section>`;
let radioButtons;
let firstOptionRadio;
let secondOptionRadio;
let currentGame;
let levelResult = {isCorrect: false, timeLeft: 15};

const assignListeners = () => {
  radioButtons = Array.from(document.querySelectorAll(`input[type=radio]`));
  radioButtons.forEach((item) => item.addEventListener(`click`, onNextScreenCall));
  assignBackButtonListener();
};

const killListeners = () => {
  radioButtons.forEach((item) => item.removeEventListener(`click`, onNextScreenCall));
  killBackButtonListener();
};

const onNextScreenCall = () => {
  firstOptionRadio = radioButtons.filter((item) => item.name === `question1`);
  secondOptionRadio = radioButtons.filter((item) => item.name === `question2`);
  if ((firstOptionRadio.some((element) => element.checked === true))
        && secondOptionRadio.some((element) => element.checked === true)) {
    nextScreenCallHandler(currentGame, levelResult, validateAnswer, killListeners);
  }
};

const validateAnswer = (answers, result) => {
  const chosenAnswer1 = firstOptionRadio.filter((item) => item.checked === true)[0];
  const chosenAnswer2 = secondOptionRadio.filter((item) => item.checked === true)[0];
  const correctAnswer1 = answers[0].isPainting ? `paint` : `photo`;
  const correctAnswer2 = answers[1].isPainting ? `paint` : `photo`;
  const validationResult = (chosenAnswer1.value === correctAnswer1) && (chosenAnswer2.value === correctAnswer2);
  return Object.assign({}, result, {isCorrect: validationResult});
};

const renderScreen = (gameObject) => {
  currentGame = Object.assign({}, gameObject);
  const element = createDOMElement(`div`, ``, generateHtml(currentGame));
  showScreen(element);
  assignListeners();
  return document.querySelector(`#main > div`);
};

export default renderScreen;
