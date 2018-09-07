import {showScreen} from './util.js';
import {nextScreenCallHandler} from './game-navigation';
import Game2View from './views/game-2-view';

let view;
let currentGame;
let levelResult = {isCorrect: false, timeLeft: 15};

const onNextScreenCall = () => {
  nextScreenCallHandler(currentGame, levelResult, validateAnswer, view.removeListeners.bind(view));
};

const validateAnswer = (answers, result) => {
  const chosenAnswer1 = view.radioButtons.filter((item) => item.checked === true)[0];
  const correctAnswer1 = answers[0].isPainting ? `paint` : `photo`;
  const validationResult = chosenAnswer1.value === correctAnswer1;
  return Object.assign({}, result, {isCorrect: validationResult});
};

const renderScreen = (gameObject) => {
  currentGame = Object.assign({}, gameObject);
  view = new Game2View(currentGame);
  view.onNextScreenCall = onNextScreenCall;
  showScreen(view.element);
  return view.element;
};

export default renderScreen;
