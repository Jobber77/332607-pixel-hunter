import {showScreen} from './util';
import {saveGameData} from './game-statistics-service';
import StatsView from './views/stats-view';

let currentGame;
let view;

export default (gameObject) => {
  currentGame = Object.assign({}, gameObject);
  currentGame.isWin = currentGame.levelResultHistory.length >= 10;
  saveGameData(currentGame);
  view = new StatsView(currentGame);
  showScreen(view.element);
  return view.element;
};
