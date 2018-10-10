import AbstractView from './abstract-view';

export default class ErrorView extends AbstractView {
  constructor(error) {
    super(`section`, [`modal`], ``);
    this._error = error;
  }

  get template() {
    return `
    <div class="modal__inner">
      <h2 class="modal__title">An Error Occured! Please, reload page</h2>
      <p class="modal__text modal__text--error">${this._error.message}</p>
    </div>`;
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


