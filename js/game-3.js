import {createDOMElement, showScreen} from './util';
import {assignBackButtonListener, killBackButtonListener, nextScreenCallHandler} from './game-navigation';
import {generateHeaderStatsHtml, generateFooterStatsHtml} from './game-common-elements';


const generateHtml = (currentGame) => `
${generateHeaderStatsHtml(currentGame.currentStats)}
<section class="game">
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
${generateFooterStatsHtml(currentGame.levelResultHistory)}
</section>`;
let currentGame;
let nextScreenButtons;
let levelResult = {isCorrect: false, timeLeft: 15};

const assignListeners = () => {
  nextScreenButtons = Array.from(document.querySelectorAll(`.game__option`));
  nextScreenButtons.forEach((item) => item.addEventListener(`click`, onNextScreenCall));
  assignBackButtonListener();
};

const killListeners = () => {
  nextScreenButtons.forEach((item) => item.removeEventListener(`click`, onNextScreenCall));
  killBackButtonListener();
};

const onNextScreenCall = (evt) => {
  nextScreenButtons.forEach((item) => item.classList.remove(`game__option--selected`));
  evt.target.closest(`div`).classList.add(`game__option--selected`);
  nextScreenCallHandler(currentGame, levelResult, validateAnswer, killListeners);
};

const validateAnswer = (answers, result) => {
  const chosenAnswer = nextScreenButtons.filter((item) => Array.from(item.classList)
                                                                .some((entry) => entry === `game__option--selected`))[0];
  const chosenAnswerId = nextScreenButtons.indexOf(chosenAnswer);
  const correctAnswer = answers.filter((item)=>item.isPainting === true)[0];
  const correctAnswerId = answers.indexOf(correctAnswer);
  const validationResult = chosenAnswerId === correctAnswerId;
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
