import AbstractView from './abstract-view';
import { resize } from '../util';

const FrameSizes = {
  HEIGHT: 455,
  WIDTH: 304
}

export default class Game3View extends AbstractView {
  constructor(currentQuestion) {
    super();
    this._currentQuestion = currentQuestion;
  }

  get template() {
    const {newHeight1, newHeight2, newHeight3, newWidth1, newWidth2, newWidth3 } = this.getImageSizes();
    return `
    <section class="game">
    <p class="game__task">${this._currentQuestion.text}</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="${this._currentQuestion.answers[0].imgLink}" alt="Option 1" width="${newWidth1}" height="${newHeight1}">
      </div>
      <div class="game__option  game__option--selected">
        <img src="${this._currentQuestion.answers[1].imgLink}" alt="Option 2" width="${newWidth2}" height="${newHeight2}">
      </div>
      <div class="game__option">
        <img src="${this._currentQuestion.answers[2].imgLink}" alt="Option 3" width="${newWidth3}" height="${newHeight3}">
      </div>
    </form>
    </section>`;
  }

  assignListeners() {
    this.answerButtons = Array.from(this.element.querySelectorAll(`.game__option`));
    this.answerButtons.forEach((item) => item.addEventListener(`click`, this.onNextScreenCall));
  }

  removeListeners() {
    this.answerButtons.forEach((item) => item.removeEventListener(`click`, this.onNextScreenCall));
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
    const image3 = {
      height: this._currentQuestion.answers[2].height,
      width: this._currentQuestion.answers[2].width
    };
    const newImage1 = resize({width: FrameSizes.WIDTH, height: FrameSizes.HEIGHT}, image1);
    const newImage2 = resize({width: FrameSizes.WIDTH, height: FrameSizes.HEIGHT}, image2);
    const newImage3 = resize({width: FrameSizes.WIDTH, height: FrameSizes.HEIGHT}, image3);
    return {
      newHeight1: newImage1.height, 
      newHeight2: newImage2.height,
      newHeight3: newImage3.height,
      newWidth1: newImage1.width,
      newWidth2: newImage2.width,
      newWidth3: newImage3.width,
    }
  }
}
