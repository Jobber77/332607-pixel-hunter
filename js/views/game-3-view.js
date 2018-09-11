import AbstractView from './abstract-view';

export default class Game3View extends AbstractView {
  constructor(currentQuestion) {
    super();
    this._currentQuestion = currentQuestion;
  }

  get template() {
    return `
    <section class="game">
    <p class="game__task">${this._currentQuestion.text}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${this._currentQuestion.answers[0].imgLink}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${this._currentQuestion.answers[1].imgLink}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${this._currentQuestion.answers[2].imgLink}" alt="Option 3" width="304" height="455">
      </div>
    </form>
    </section>`;
  }

  assignListeners() {
    this.answerButtons = Array.from(this.element.querySelectorAll(`.game__option`));
    this.answerButtons.forEach((item) => item.addEventListener(`click`, this.onNextScreenCall));
  }

  removeListeners() {
    this.answerButtons.forEach((item) => item.removeEventListener(`click`, this.onNextScreenCall));
  }

  onNextScreenCall() {
  }
}
