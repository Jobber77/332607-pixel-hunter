import AbstractView from './abstract-view';

export default class Game1View extends AbstractView {
  constructor(currentQuestion) {
    super();
    this._currentQuestion = currentQuestion;
  }

  get template() {
    return `
    <section class="game">
    <p class="game__task">${this._currentQuestion.text}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this._currentQuestion.answers[0].imgLink}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${this._currentQuestion.answers[1].imgLink}" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    </section>`;
  }

  assignListeners() {
    this.radioButtons = Array.from(this.element.querySelectorAll(`input[type=radio]`));
    this.radioButtons.forEach((item) => item.addEventListener(`click`, this.onNextScreenCall));
  }

  removeListeners() {
    this.radioButtons.forEach((item) => item.removeEventListener(`click`, this.onNextScreenCall));
  }

  onNextScreenCall() {
  }
}
