import {showScreen} from './util.js';
import {nextScreenCallHandler} from './game-navigation';
import Game1View from './views/game-1-view';

let view;
let firstOptionRadio;
let secondOptionRadio;
let currentGame;
let levelResult = {isCorrect: false, timeLeft: 15};


const onNextScreenCall = () => {
  firstOptionRadio = view.radioButtons.filter((item) => item.name === `question1`);
  secondOptionRadio = view.radioButtons.filter((item) => item.name === `question2`);
  if ((firstOptionRadio.some((element) => element.checked === true))
        && secondOptionRadio.some((element) => element.checked === true)) {
    nextScreenCallHandler(view.gameState, levelResult, validateAnswer, view.removeListeners.bind(view));
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
  view = new Game1View(currentGame);
  view.onNextScreenCall = onNextScreenCall;
  showScreen(view.element);
  return view.element;
};

export default renderScreen;
