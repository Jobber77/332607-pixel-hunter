import HeaderStatsPartialView from './views/header-stats-partial-view';
import BackButtonPartialView from './views/back-button-partial-view';
import FooterPartialView from './views/footer-partial-view';
import {createDOMElement} from './util';
import Application from './application';

const TIME_IS_UP_SOON_SECONDS = 5;
const TIME_PER_LEVEL = 30;
const ONE_SECOND = 1000;
const GAME_END = -1;

export default class GamePresenter {
  constructor(gameData) {
    this._gameData = gameData;
    this._viewBackButton = new BackButtonPartialView(this.stop.bind(this));
    this._viewHeaderStats = new HeaderStatsPartialView(this._gameData.currentStats);
    this._viewFooterStats = new FooterPartialView(this._gameData.levelResultHistory);
    this._header = createDOMElement(`header`, [`header`], ``);
    this._header.appendChild(this._viewBackButton.element);
    this._header.appendChild(this._viewHeaderStats.element);
    this._root = document.createElement(`div`);
    this._root.appendChild(this._header);
  }

  get element() {
    return this._root;
  }

  callNextScreen() {
    this.validateAnswer();
    this.updateAttempts(this.levelResult);
    this.updateGameHistory(this.levelResult);
    this.stop();
    if (this._gameData.currentStats.hp <= GAME_END) {
      Application.showStats(this._gameData);
    } else {
      this._gameData.currentQuestionId = this._gameData.nextQuestionId;
      if (this._gameData.currentQuestionId === GAME_END) {
        Application.showStats(this._gameData);
      } else {
        this._gameData.currentStats.timeLeft = TIME_PER_LEVEL;
        Application.showGame(this._gameData);
      }
    }
  }

  updateAttempts(levelResult) {
    if (!levelResult.isCorrect) {
      this._gameData.currentStats.hp--;
    }
  }

  updateGameHistory(levelResult) {
    this._gameData.levelResultHistory.push(levelResult);
  }

  start() {
    this.levelResult = {isCorrect: false, timeLeft: TIME_PER_LEVEL};
    this._interval = setInterval(() => {
      this.tick();
      this.updateHeader();
    }, ONE_SECOND);
  }

  stop() {
    clearInterval(this._interval);
    this._viewBody.removeListeners();
    this._viewBackButton.removeListeners();
  }

  updateHeader() {
    this._viewHeaderStats.element.childNodes[0].textContent = this.levelResult.timeLeft;
  }

  tick() {
    this.levelResult.timeLeft--;
    this._gameData.currentStats.timeLeft = this.levelResult.timeLeft;
    if (this.levelResult.timeLeft === TIME_IS_UP_SOON_SECONDS) {
      this._viewHeaderStats.element.childNodes[0].classList.add(`blink_me`);
    }
    if (this.levelResult.timeLeft < 0) {
      this.callNextScreen();
    }
  }
  validateAnswer() {
  }

  onNextScreenCall() {
  }
}
