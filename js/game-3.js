import {showScreen} from './util';
import {nextScreenCallHandler} from './game-navigation';
import Game3View from './views/game-3-view';

let view;
let currentGame;
let levelResult = {isCorrect: false, timeLeft: 15};

const onNextScreenCall = (evt) => {
  view.answerButtons.forEach((item) => item.classList.remove(`game__option--selected`));
  evt.target.closest(`div`).classList.add(`game__option--selected`);
  nextScreenCallHandler(currentGame, levelResult, validateAnswer, view.removeListeners.bind(view));
};

const validateAnswer = (answers, result) => {
  const chosenAnswer = view.answerButtons.filter((item) => Array.from(item.classList)
                                                                .some((entry) => entry === `game__option--selected`))[0];
  const chosenAnswerId = view.answerButtons.indexOf(chosenAnswer);
  const correctAnswer = answers.filter((item)=>item.isPainting === true)[0];
  const correctAnswerId = answers.indexOf(correctAnswer);
  const validationResult = chosenAnswerId === correctAnswerId;
  return Object.assign({}, result, {isCorrect: validationResult});
};

const renderScreen = (gameObject) => {
  currentGame = Object.assign({}, gameObject);
  view = new Game3View(currentGame);
  view.onNextScreenCall = onNextScreenCall;
  showScreen(view.element);
  return view.element;
};

export default renderScreen;
