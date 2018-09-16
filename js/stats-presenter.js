import {createDOMElement} from './util';
import StatsView from './views/stats-view';
import BackButtonPartialView from './views/back-button-partial-view';

export default class StatsPresenter {
  constructor(currentGameData, historyStats) {
    this._viewBody = new StatsView(currentGameData, historyStats);
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
