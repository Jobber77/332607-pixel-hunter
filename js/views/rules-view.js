import AbstractView from './abstract-view';

export default class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
    <section class="rules">
    <h2 class="rules__title">Rules</h2>
    <ul class="rules__description">
      <li>Guess 10 times for each photo image
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Photo"> or painting
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Painting"></li>
      <li>All images can be photos or paintings</li>
      <li>You have 30 seconds for each attempt</li>
      <li>You can do mistake not more than 3 times</li>
    </ul>
    <p class="rules__ready">Ready?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Your name">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
    </section>`;
  }

  assignListeners() {
    this.nextScreenButton = this.element.querySelector(`.rules__button`);
    this.nextScreenButton.addEventListener(`click`, this.onNextScreenCall);
    this._rulesInput = this.element.querySelector(`.rules__input`);
    this._rulesInput.addEventListener(`input`, this.onRulesInputClick);
  }

  removeListeners() {
    this.nextScreenButton.removeEventListener(`click`, this.onNextScreenCall);
  }

  onNextScreenCall() {
  }

  onRulesInputClick() {
  }
}
