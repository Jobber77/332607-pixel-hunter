import GamePresenter from './game-presenter';
import Game1View from './views/game-1-view.js';

export default class GameType1Presenter extends GamePresenter {
  constructor(gameData) {
    super(gameData);
    this._viewBody = new Game1View(this._gameData.currentQuestion);
    this._viewBody.onNextScreenCall = this.onNextScreenCall.bind(this);
    this._viewBody.element.childNodes[1].appendChild(this._viewFooterStats.element);
    this._root.appendChild(this._viewBody.element);
  }

  get element() {
    return this._root;
  }

  validateAnswer() {
    const chosenAnswer1 = this.firstOptionRadio ? this.firstOptionRadio.filter((item) => item.checked === true)[0] : ``;
    const chosenAnswer2 = this.secondOptionRadio ? this.secondOptionRadio.filter((item) => item.checked === true)[0] : ``;
    const correctAnswer1 = this._gameData.currentQuestionAnswers[0].isPainting ? `paint` : `photo`;
    const correctAnswer2 = this._gameData.currentQuestionAnswers[1].isPainting ? `paint` : `photo`;
    const validationResult = (chosenAnswer1.value === correctAnswer1) && (chosenAnswer2.value === correctAnswer2);
    this.levelResult.isCorrect = validationResult;
  }

  onNextScreenCall() {
    this.firstOptionRadio = this._viewBody.radioButtons.filter((item) => item.name === `question1`);
    this.secondOptionRadio = this._viewBody.radioButtons.filter((item) => item.name === `question2`);
    if ((this.firstOptionRadio.some((element) => element.checked === true))
          && this.secondOptionRadio.some((element) => element.checked === true)) {
      this.callNextScreen();
    }
  }
}
