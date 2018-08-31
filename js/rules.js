import {showScreen} from './util';
import RulesView from './views/rules-view';
import {generateNewGameObject} from './game-data';

let view;
let playerName = ``;

const onRulesInputClick = (evt) => {
  const enable = evt.target.value.length > 0;
  view._nextScreenButton.disabled = !enable;
  if (enable) {
    playerName = evt.target.value;
  }
};

const onNextScreenCall = () => {
  view.removeListeners();
  const newGame = generateNewGameObject(playerName);
  const nextScreenType = newGame.questions[newGame.currentQuestion].type;
  newGame.gameScreensRenderers[nextScreenType](newGame);
};

export default () => {
  view = new RulesView();
  view.onNextScreenCall = onNextScreenCall;
  view.onRulesInputClick = onRulesInputClick;
  showScreen(view.element);
  return view.element;
};
