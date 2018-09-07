import AbstractView from './abstract-view';
import {assignBackButtonListener, killBackButtonListener} from '../game-navigation';
import {generateHeaderStatsHtml, generateFooterStatsHtml} from '../game-common-elements';

export default class Game2View extends AbstractView {
  constructor(currentGame) {
    super();
    this.gameState = currentGame;
  }

  get template() {
    return `
    ${generateHeaderStatsHtml(this.gameState.currentStats)}
    <section class="game">
    <p class="game__task">${this.gameState.questions[this.gameState.currentQuestion].text}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${this.gameState.questions[this.gameState.currentQuestion].answers[0].imgLink}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    ${generateFooterStatsHtml(this.gameState.levelResultHistory)}
    </section>`;
  }

  assignListeners() {
    this.radioButtons = Array.from(this.element.querySelectorAll(`input[type=radio]`));
    this.radioButtons.forEach((item) => item.addEventListener(`click`, this.onNextScreenCall));
    assignBackButtonListener(this.element);
  }

  removeListeners() {
    this.radioButtons.forEach((item) => item.removeEventListener(`click`, this.onNextScreenCall));
    killBackButtonListener();
  }

  onNextScreenCall() {
  }
}
