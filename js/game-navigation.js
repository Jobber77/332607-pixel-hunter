import buildIntroScreen from './intro.js';
import {updateGameHistory, updateAttempts, getNextScreen} from './game-statistics-service';

let backButton = document.querySelector(`.back`);

const BACK_BUTTON_HTML = `<button class="back">
<span class="visually-hidden">Вернуться к началу</span>
<svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
  <use xlink:href="img/sprite.svg#arrow-left"></use>
</svg>
<svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
  <use xlink:href="img/sprite.svg#logo-small"></use>
</svg>
</button>`;

const onBackButtonClick = () => {
  buildIntroScreen();
};
const assignBackButtonListener = (isGameEnd) => {
  backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, onBackButtonClick);
  //  let GK kill listener later after screen change
  if (isGameEnd) {
    backButton = null;
  }
};
const killBackButtonListener = () => {
  backButton.removeEventListener(`click`, onBackButtonClick);
};

const nextScreenCallHandler = (currentGame, levelResult, validateAnswerFunc, killListenersFunc) => {
  levelResult = validateAnswerFunc(currentGame.questions[currentGame.currentQuestion].answers, levelResult);
  currentGame.currentStats.hp = updateAttempts(levelResult, currentGame.currentStats.hp);
  currentGame = updateGameHistory(levelResult, currentGame);
  killListenersFunc();
  if (currentGame.currentStats.hp <= -1) {
    currentGame.gameScreensRenderers[`result`](currentGame);
  } else {
    currentGame.currentQuestion = getNextScreen(currentGame.questions[currentGame.currentQuestion], currentGame.questions);
    if (currentGame.currentQuestion === -1) {
      currentGame.gameScreensRenderers[`result`](currentGame);
    } else {
      currentGame.gameScreensRenderers[currentGame.questions[currentGame.currentQuestion].type](currentGame);
    }
  }
};

export {assignBackButtonListener, killBackButtonListener, BACK_BUTTON_HTML as backButtonHtml, nextScreenCallHandler};
