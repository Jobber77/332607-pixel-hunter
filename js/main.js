'use strict';
{
  // #region  variables
  const ScreenOrderById = {
    0: `intro`,
    1: `greeting`,
    2: `rules`,
    3: `game-1`,
    4: `game-2`,
    5: `game-3`,
    6: `stats`,
    7: `modal-error`,
    8: `modal-confirm`
  };
  const KeyboardKeykodes = {
    LEFT: 37,
    RIGHT: 39
  };
  const Styles = {
    RULE_FOR_WRAP: `.arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }`,
    RULE_FOR_BUTTONS: `.arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }`
  };
  const screens = Array.from(document.querySelectorAll(`template`));
  const mainScreen = document.querySelector(`#main`);
  let currentScreenId = 0;
  // #endregion
  const initializeGame = () => {
    orderScreens();
    showScreen(currentScreenId);
    drawArrowButtons();
    setArrowListeners();
    document.addEventListener(`keydown`, onArrowKeyPress);
  };

  const createDOMElement = (type, classes, textContent) => {
    const newElement = document.createElement(type);
    if (Array.isArray(classes)) {
      classes.forEach((element) => newElement.classList.add(element));
    } else {
      newElement.classList.add(classes);
    }
    if (textContent) {
      newElement.textContent = textContent;
    }
    return newElement;
  };

  const orderScreens = () => {
    for (const key of Object.keys(ScreenOrderById)) {
      screens.find((item) => item.id === ScreenOrderById[key]).order = key;
    }
    screens.sort((item1, item2) => item1.order > item2.order ? 1 : -1);
    // temp fix to hide service screens
    screens.pop();
    screens.pop();
  };
  const showScreen = (screenOrder) => {
    const fragment = document.createDocumentFragment();
    const screenTemplate = screens[screenOrder].content;
    const clonnedScreen = screenTemplate.cloneNode(true);
    fragment.appendChild(clonnedScreen);
    mainScreen.innerHTML = ``;
    mainScreen.appendChild(fragment);
  }
  const nextScreen = () => {
    currentScreenId = currentScreenId < (screens.length - 1) ? ++currentScreenId : 0;
    showScreen(currentScreenId);
  };
  const previousScreen = () => {
    currentScreenId = currentScreenId > 0 ? --currentScreenId : screens.length - 1;
    showScreen(currentScreenId);
  };
  const drawArrowButtons = () => {
    const wrap = createDOMElement(`div`, `arrows__wrap`);
    const leftArrow = createDOMElement(`button`, `arrows__btn`, `<-`);
    const rightArrow = createDOMElement(`button`, `arrows__btn`, `->`);
    const style = document.createElement(`style`);
    style.innerHTML = Styles.RULE_FOR_WRAP + Styles.RULE_FOR_BUTTONS;
    wrap.appendChild(style);
    wrap.appendChild(leftArrow);
    wrap.appendChild(rightArrow);
    document.querySelector(`body`).appendChild(wrap);
  };
  const setArrowListeners = () => {
    const buttons = Array.from(document.querySelectorAll(`.arrows__btn`));
    buttons.forEach((button) => button.addEventListener(`click`, onArrowButtonClick));
  };
  const onArrowKeyPress = (evt) => {
    if (evt.keyCode === KeyboardKeykodes.LEFT) {
      previousScreen();
    } else if (evt.keyCode === KeyboardKeykodes.RIGHT) {
      nextScreen();
    }
  };
  const onArrowButtonClick = (evt) => {
    if (evt.target.innerText === `<-`) {
      previousScreen();
    } else if (evt.target.innerText === `->`) {
      nextScreen();
    }
  };
  initializeGame();
}
