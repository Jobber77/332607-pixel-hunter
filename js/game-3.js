import {createDOMElement, showScreen} from './util';
import {assignBackButtonListener, killBackButtonListener} from './game-navigation';
import {updateGameData} from './game-statistics-service';
import {generateHeaderStatsHtml, generateFooterStatsHtml} from './game-common-elements';
import buildNextScreen from './stats';


const generateHtml = (currentGame) => `
<section class="game">
${generateHeaderStatsHtml(currentGame.currentStats)}
<p class="game__task">${currentGame.questions[currentGame.currentQuestion].text}</p>
<form class="game__content  game__content--triple">
  <div class="game__option">
    <img src="${currentGame.questions[currentGame.currentQuestion].answers[0].imgLink}" alt="Option 1" width="304" height="455">
  </div>
  <div class="game__option  game__option--selected">
    <img src="${currentGame.questions[currentGame.currentQuestion].answers[1].imgLink}" alt="Option 2" width="304" height="455">
  </div>
  <div class="game__option">
    <img src="${currentGame.questions[currentGame.currentQuestion].answers[2].imgLink}" alt="Option 3" width="304" height="455">
  </div>
</form>
${generateFooterStatsHtml(currentGame.answersHistory)}
</section>`;
let currentGame;
let nextScreenButtons;
let answer = {isCorrect: false, timeLeft: 15};

const assignListeners = () => {
  nextScreenButtons = document.querySelectorAll(`.game__option`);
  Array.from(nextScreenButtons).forEach((item) => item.addEventListener(`click`, onNextScreenCall));
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
