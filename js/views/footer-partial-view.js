import AbstractView from './abstract-view';

export default class FooterPartialView extends AbstractView {
  constructor(levelResultHistory) {
    super();
    this._levelResultHistory = levelResultHistory;
  }

  get template() {
    const answers = this._levelResultHistory ? this._levelResultHistory.map((item) => Object.assign({}, item)) : [];
    return `<ul class="stats">
    ${answers.map((item) => `<li class="stats__result ${FooterPartialView.getHtmlClass(item)}"></li>`).join(``)}
    ${new Array(10 - answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
  </ul>`;
  }

  static getHtmlClass(answer) {
    if (answer.isCorrect && answer.timeLeft <= 10) {
      return `stats__result--slow`;
    } else if (answer.isCorrect && answer.timeLeft >= 20) {
      return `stats__result--fast`;
    } else if (answer.isCorrect) {
      return `stats__result--correct`;
    } else {
      return `stats__result--wrong`;
    }
  }
}

