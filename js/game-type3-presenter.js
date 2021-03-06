import GamePresenter from './game-presenter';
import Game3View from './views/game-3-view.js';

export default class GameType3Presenter extends GamePresenter {
  constructor(gameData) {
    super(gameData);
    this._viewBody = new Game3View(this._gameData.currentQuestion);
    this._viewBody.onNextScreenCall = this.onNextScreenCall.bind(this);
    this._viewBody.element.childNodes[1].appendChild(this._viewFooterStats.element);
    this._root.appendChild(this._viewBody.element);
  }

  get element() {
    return this._root;
  }

  validateAnswer() {
    const chosenAnswer = this._viewBody.answerButtons.filter((item) => Array.from(item.classList)
                                                                .some((entry) => entry === `game__option--selected`))[0];
    const chosenAnswerId = this._viewBody.answerButtons.indexOf(chosenAnswer);
    //  define if question is about picture
    const isPictureSubtype = this._gameData.currentQuestion.text.indexOf(`рисунок`) !== -1;
    const correctAnswer = this._gameData.currentQuestionAnswers.filter((item)=>item.isPainting === isPictureSubtype)[0];
    const correctAnswerId = this._gameData.currentQuestionAnswers.indexOf(correctAnswer);
    const validationResult = chosenAnswerId === correctAnswerId;
    this.levelResult.isCorrect = validationResult;
  }

  onNextScreenCall(evt) {
    this._viewBody.answerButtons.forEach((item) => item.classList.remove(`game__option--selected`));
    evt.target.closest(`div`).classList.add(`game__option--selected`);
    this.callNextScreen();
  }
}
