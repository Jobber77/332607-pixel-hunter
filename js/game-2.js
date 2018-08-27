import {createDOMElement, showScreen} from './util.js';
import {assignBackButtonListener, killBackButtonListener, nextScreenCallHandler} from './game-navigation';
import {generateHeaderStatsHtml, generateFooterStatsHtml} from './game-common-elements';

const generateHtml = (currentGame) => `
${generateHeaderStatsHtml(currentGame.currentStats)}
<section class="game">
<p class="game__task">${currentGame.questions[currentGame.currentQuestion].text}</p>
<form class="game__content  game__content--wide">
  <div class="game__option">
    <img src="${currentGame.questions[currentGame.currentQuestion].answers[0].imgLink}" alt="Option 1" width="705" height="455">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
</form>
${generateFooterStatsHtml(currentGame.levelResultHistory)}
</section>`;
let currentGame = {};
let nextScreenButtons;
let levelResult = {isCorrect: false, timeLeft: 15};

const assignListeners = () => {
  nextScreenButtons = Array.from(document.querySelectorAll(`input[type=radio]`));
  nextScreenButtons.forEach((item) => item.addEventListener(`click`, onNextScreenCall));
  assignBackButtonListener();
};

const killListeners = () => {
  nextScreenButtons.forEach((item) => item.removeEventListener(`click`, onNextScreenCall));
  killBackButtonListener();
};

const onNextScreenCall = () => {
  nextScreenCallHandler(currentGame, levelResult, validateAnswer, killListeners);
};

const validateAnswer = (answers, result) => {
  const chosenAnswer1 = nextScreenButtons.filter((item) => item.checked === true)[0];
  const correctAnswer1 = answers[0].isPainting ? `paint` : `photo`;
  const validationResult = chosenAnswer1.value === correctAnswer1;
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
