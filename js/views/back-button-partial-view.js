import AbstractView from './abstract-view';
import Application from '../application';

export default class BackButtonPartialView extends AbstractView {
  constructor(currentPresenterStopper) {
    super(`button`, [`back`]);
    this._currentPresenterStopper = currentPresenterStopper;
  }

  get template() {
    return `<span class="visually-hidden">Go back</span>
    <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
      <use xlink:href="img/sprite.svg#arrow-left"></use>
    </svg>
    <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
      <use xlink:href="img/sprite.svg#logo-small"></use>
    </svg>`;
  }

  assignListeners() {
    this.element.addEventListener(`click`, this.onBackButtonClick.bind(this));
  }

  removeListeners() {
    this.element.removeEventListener(`click`, this.onBackButtonClick.bind(this));
  }

  onBackButtonClick() {
    if (this._currentPresenterStopper) {
      this._currentPresenterStopper();
    }
    Application.showGreeting();
  }
}
