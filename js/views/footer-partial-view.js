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
    let string = ``;
    if (answer.isCorrect && answer.timeLeft <= 10) {
      string = `stats__result--slow`;
    } else if (answer.isCorrect && answer.timeLeft >= 20) {
      string = `stats__result--fast`;
    } else if (answer.isCorrect) {
      string = `stats__result--correct`;
    } else {
      string = `stats__result--wrong`;
    }
    return string;
  }
}

