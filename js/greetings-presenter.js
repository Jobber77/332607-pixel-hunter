import GreetingsView from './views/greetings-view';
import Application from './application';

export default class GreetingsPresenter {
  constructor() {
    this._view = new GreetingsView();
    this._view.onNextScreenCall = this.onNextScreenCall.bind(this);
    this._root = document.createElement(`div`);
    this._root.appendChild(this._view.element);
  }

  get element() {
    return this._root;
  }

  onNextScreenCall() {
    this._view.removeListeners();
    Application.showRules();
  }
}
