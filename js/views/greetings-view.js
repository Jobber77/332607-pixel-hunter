import AbstractView from './abstract-view';

export default class GreetingsView extends AbstractView {
  constructor() {
    super(`section`, [`greeting`, `central--blur`]);
  }

  get template() {
    return `<img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
    <div class="greeting__asterisk asterisk"><span class="visually-hidden">I'm just an asterisk</span>*</div>
    <div class="greeting__challenge">
      <h3 class="greeting__challenge-title">Top photorealist artists challenge you!</h3>
      <p class="greeting__challenge-text">Rules are simple:</p>
      <ul class="greeting__challenge-list">
        <li>You should distinguish the drawing from the photo and make a choice.</li>
        <li>Task looks easy, but do not expect that everything is so simple.</li>
        <li>Photorealism is deceptive and cunning.</li>
        <li>Remember: the main thing is to look very carefully.</li>
      </ul>
    </div>
    <button class="greeting__continue" type="button">
      <span class="visually-hidden">Continue</span>
      <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-right"></use>
      </svg>
    </button>`;
  }

  assignListeners() {
    this._nextScreenButton = this.element.querySelector(`.greeting__continue`);
    this._nextScreenButton.addEventListener(`click`, this.onNextScreenCall);
  }

  removeListeners() {
    this._nextScreenButton.removeEventListener(`click`, this.onNextScreenCall);
  }

  onNextScreenCall() {
  }
}
