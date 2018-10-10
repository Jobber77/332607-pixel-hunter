import AbstractView from './abstract-view';

export default class IntroView extends AbstractView {
  constructor() {
    super(`section`, [`intro`]);
  }

  get template() {
    return `<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> This is not a photo. This is an oil painting by a Dutch photorealist Tjalf Sparnaay.</p>`;
  }

  assignListeners() {
    this._nextScreenButton = this.element.querySelector(`.intro__asterisk`);
    this._nextScreenButton.addEventListener(`click`, this.onNextScreenCall);
  }

  removeListeners() {
    this._nextScreenButton.removeEventListener(`click`, this.onNextScreenCall);
  }

  onNextScreenCall() {
  }
}
