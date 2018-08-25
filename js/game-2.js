import {createDOMElement, showScreen} from './util.js';
import {assignBackButtonListener, killBackButtonListener} from './game-navigation';
import {updateGameData} from './game-statistics-service';
import {generateHeaderStatsHtml, generateFooterStatsHtml} from './game-common-elements';
import buildNextScreen from './game-3.js';

const generateHtml = (currentGame) => `
<section class="game">
${generateHeaderStatsHtml(currentGame.currentStats)}
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
${generateFooterStatsHtml(currentGame.answersHistory)}
</section>`;
let currentGame = {};
let nextScreenButtons;
let answer = {isCorrect: false, timeLeft: 15};

const assignListeners = () => {
  nextScreenButtons = Array.from(document.querySelectorAll(`.game__answer`));
  nextScreenButtons.forEach((item) => item.addEventListener(`click`, onNextScreenCall));
  assignBackButtonListener();
};

const killListeners = () => {
  nextScreenButtons.forEach((item) => item.removeEventListener(`click`, onNextScreenCall));
  killBackButtonListener();
};

const onNextScreenCall = () => {
  killListeners();
  buildNextScreen(updateGameData(answer, currentGame));
};

export default (gameObject) => {
  currentGame = Object.assign({}, gameObject);
  const element = createDOMElement(`div`, ``, generateHtml(currentGame));
  showScreen(element);
  assignListeners();
  return document.querySelector(`#main > div`);
};
