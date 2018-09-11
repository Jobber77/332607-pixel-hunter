import GamePresenter from './game-presenter';
import Game2View from './views/game-2-view';

export default class GameType2Presenter extends GamePresenter {
  constructor(gameData) {
    super(gameData);
    this._viewBody = new Game2View(this._gameData.currentQuestion);
    this._viewBody.onNextScreenCall = this.onNextScreenCall.bind(this);
    this._viewBody.element.childNodes[1].appendChild(this._viewFooterStats.element);
    this._root.appendChild(this._viewBody.element);
  }

  get element() {
    return this._root;
  }

  onNextScreenCall() {
    this.callNextScreen();
  }

  validateAnswer() {
    const chosenAnswer1 = this._viewBody.radioButtons.filter((item) => item.checked === true)[0];
    const correctAnswer1 = this._gameData.currentQuestionAnswers[0].isPainting ? `paint` : `photo`;
    const validationResult = chosenAnswer1 ? chosenAnswer1.value === correctAnswer1 : false;
    this.levelResult.isCorrect = validationResult;
  }
}
