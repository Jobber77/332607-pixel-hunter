import {createDOMElement} from '../util';

export default class AbstractView {
  constructor(wrapperType = `div`, wrapperClasses = ``, textContent = ``) {
    this.type = wrapperType;
    this.classes = wrapperClasses;
    this.textContent = textContent;
  }
  get template() {
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render(this.type, this.classes, this.textContent);
    this.assignListeners();
    return this._element;
  }

  render(type, classes, textContent) {
    return createDOMElement(type, classes, this.template, textContent);
  }

  assignListeners() {
  }

  removeListeners() {
  }

}
