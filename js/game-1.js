import {createDOMElement, showScreen} from './util.js';
import {assignBackButtonListener, killBackButtonListener} from './game-navigation';
import {updateGameData} from './game-statistics-service';
import {generateHeaderStatsHtml, generateFooterStatsHtml} from './game-common-elements';
import buildNextScreen from './game-2.js';

const generateHtml = (currentGame) => `
<section class="game">
${generateHeaderStatsHtml(currentGame.currentStats)}
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
${generateFooterStatsHtml(currentGame.answersHistory)}
</section>`;
let radioButtons;
let currentGame;
let answer = {isCorrect: false, timeLeft: 15};

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
  const firstOptionRadio = radioButtons.filter((item) => item.name === `question1`);
  const secondOptionRadio = radioButtons.filter((item) => item.name === `question2`);
  if ((firstOptionRadio.some((element) => element.checked === true))
        && secondOptionRadio.some((element) => element.checked === true)) {
    killListeners();
    buildNextScreen(updateGameData(answer, currentGame));
  }
};

export default (gameObject) => {
  currentGame = Object.assign({}, gameObject);
  const element = createDOMElement(`div`, ``, generateHtml(currentGame));
  showScreen(element);
  assignListeners();
  return document.querySelector(`#main > div`);
};
