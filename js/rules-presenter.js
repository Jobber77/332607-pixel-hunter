import RulesView from './views/rules-view';
import Application from './application';
import GameModel from './models/game-model';
import BackButtonPartialView from './views/back-button-partial-view';
import {createDOMElement} from './util';

export default class RulesPresenter {
  constructor(gameQuestionsData) {
    this._gameQuestionsData = gameQuestionsData;
    this._viewBody = new RulesView();
    this._viewBody.onNextScreenCall = this.onNextScreenCall.bind(this);
    this._viewBody.onRulesInputClick = this.onRulesInputClick.bind(this);
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

  onRulesInputClick(evt) {
    const enable = evt.target.value.length > 0;
    this._viewBody.nextScreenButton.disabled = !enable;
    if (enable) {
      this._playerName = evt.target.value;
    }
  }

  onNextScreenCall() {
    this._viewBody.removeListeners();
    const newGameStats = GameModel.generateNewGameStateObject();
    newGameStats.playerName = this._playerName;
    newGameStats.questions = this._gameQuestionsData;
    const gameData = new GameModel(newGameStats);
    Application.showGame(gameData);
  }
}
