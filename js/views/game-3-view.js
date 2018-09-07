import AbstractView from './abstract-view';
import {assignBackButtonListener, killBackButtonListener} from '../game-navigation';
import {generateHeaderStatsHtml, generateFooterStatsHtml} from '../game-common-elements';

export default class Game3View extends AbstractView {
  constructor(currentGame) {
    super();
    this.gameState = currentGame;
  }

  get template() {
    return `
    ${generateHeaderStatsHtml(this.gameState.currentStats)}
    <section class="game">
    <p class="game__task">${this.gameState.questions[this.gameState.currentQuestion].text}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${this.gameState.questions[this.gameState.currentQuestion].answers[0].imgLink}" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${this.gameState.questions[this.gameState.currentQuestion].answers[1].imgLink}" alt="Option 2" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="${this.gameState.questions[this.gameState.currentQuestion].answers[2].imgLink}" alt="Option 3" width="304" height="455">
      </div>
    </form>
    ${generateFooterStatsHtml(this.gameState.levelResultHistory)}
    </section>`;
  }

  assignListeners() {
    this.answerButtons = Array.from(this.element.querySelectorAll(`.game__option`));
    this.answerButtons.forEach((item) => item.addEventListener(`click`, this.onNextScreenCall));
    assignBackButtonListener(this.element);
  }

  removeListeners() {
    this.answerButtons.forEach((item) => item.removeEventListener(`click`, this.onNextScreenCall));
    killBackButtonListener();
  }

  onNextScreenCall() {
  }
}
