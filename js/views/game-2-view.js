import AbstractView from './abstract-view';
import { resize } from '../util';

const FrameSizes = {
  HEIGHT: 455,
  WIDTH: 705
}

export default class Game2View extends AbstractView {
  constructor(currentQuestion) {
    super();
    this._currentQuestion = currentQuestion;
  }

  get template() {
    const {newHeight, newWidth} = this.getImageSizes();
    return `
    <section class="game">
    <p class="game__task">${this._currentQuestion.text}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${this._currentQuestion.answers[0].imgLink}" alt="Option 1" width="${newWidth}" height="${newHeight}">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Foto</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Paint</span>
        </label>
      </div>
    </form>
    </section>`;
  }

  assignListeners() {
    this.radioButtons = Array.from(this.element.querySelectorAll(`input[type=radio]`));
    this.radioButtons.forEach((item) => item.addEventListener(`click`, this.onNextScreenCall));
  }

  removeListeners() {
    this.radioButtons.forEach((item) => item.removeEventListener(`click`, this.onNextScreenCall));
  }

  onNextScreenCall() {
  }
  getImageSizes() {
    const image = {
      height: this._currentQuestion.answers[0].height,
      width: this._currentQuestion.answers[0].width
    };
    const newImage = resize({width: FrameSizes.WIDTH, height: FrameSizes.HEIGHT}, image);
    return {
      newHeight: newImage.height, 
      newWidth: newImage.width
    }
  }
}
