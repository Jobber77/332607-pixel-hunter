import IntroView from './views/intro-view';
import Application from './application';

export default class IntroPresenter {
  constructor() {
    this._view = new IntroView();
    this._view.onNextScreenCall = this.onNextScreenCall.bind(this);
    this._root = document.createElement(`div`);
    this._root.appendChild(this._view.element);
  }

  get element() {
    return this._root;
  }

  onNextScreenCall() {
    this._view.removeListeners();
    Application.showGreeting();
  }
}
