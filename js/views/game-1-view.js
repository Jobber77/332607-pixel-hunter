import AbstractView from './abstract-view';
import { resize } from '../util';

const FrameSizes = {
  HEIGHT: 468,
  WIDTH: 458
}

export default class Game1View extends AbstractView {
  constructor(currentQuestion) {
    super();
    this._currentQuestion = currentQuestion;
  }

  get template() {
    const {newHeight1, newHeight2, newWidth1, newWidth2} = this.getImageSizes();
    return `
    <section class="game">
    <p class="game__task">${this._currentQuestion.text}</p>
    <form class="game__content">
      <div class="game__option">
        <img src="${this._currentQuestion.answers[0].imgLink}" width="${newWidth1} height="${newHeight1}">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question1" type="radio" value="photo">
          <span>Foto</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question1" type="radio" value="paint">
          <span>Paint</span>
        </label>
      </div>
      <div class="game__option">
        <img src="${this._currentQuestion.answers[1].imgLink}" alt="Option 2" width="${newWidth2}" height="${newHeight2}">
        <label class="game__answer  game__answer--photo">
          <input class="visually-hidden" name="question2" type="radio" value="photo">
          <span>Foto</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input class="visually-hidden" name="question2" type="radio" value="paint">
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
    const image1 = {
      height: this._currentQuestion.answers[0].height,
      width: this._currentQuestion.answers[0].width
    };
    const image2 = {
      height: this._currentQuestion.answers[1].height,
      width: this._currentQuestion.answers[1].width
    };
    const newImage1 = resize({width: FrameSizes.WIDTH, height: FrameSizes.HEIGHT}, image1);
    const newImage2 = resize({width: FrameSizes.WIDTH, height: FrameSizes.HEIGHT}, image2);
    return {
      newHeight1: newImage1.height, 
      newHeight2: newImage2.height,
      newWidth1: newImage1.width,
      newWidth2: newImage2.width
    }
  }
}
