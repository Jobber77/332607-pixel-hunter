import AbstractView from './abstract-view';

export default class IntroView extends AbstractView {
  constructor() {
    super(`section`, [`intro`]);
  }

  get template() {
    return `<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;
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
