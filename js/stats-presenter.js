import {saveGameData} from './game-statistics-service';
import {createDOMElement} from './util';
import StatsView from './views/stats-view';
import BackButtonPartialView from './views/back-button-partial-view';

export default class StatsPresenter {
  constructor(gameObject) {
    gameObject.isWin = gameObject.levelResultHistory.filter((item) => item.isCorrect === true).length >= 7;
    saveGameData(gameObject);
    this._viewBody = new StatsView(gameObject);
    const header = createDOMElement(`header`, [`header`], ``);
    this._viewBackButton = new BackButtonPartialView();
    header.appendChild(this._viewBackButton.element);
    this._root = document.createElement(`div`);
    this._root.appendChild(header);
    this._root.appendChild(this._viewBody.element);
  }

  get element() {
    return this._root;
  }
}
