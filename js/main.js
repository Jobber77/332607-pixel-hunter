'use strict';
(function () {
  // #region  variables
  const SCREENS_ORDER_BY_ID = {
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
  const KEYBOARD_KEYKODES = {
    left: 37,
    right: 39
  };
  const STYLES = {
    styleRuleForWrap: `.arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }`,
    styleRuleForButtons: `.arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }`
  };
  const screens = Array.from(document.querySelectorAll(`template`));
  const mainScreen = document.querySelector(`#main`);
  let currentScreenId = 0;
  // #endregion
  (function initializeGame() {
    orderScreens();
    showScreen(currentScreenId);
    drawArrowButtons();
    setArrowListeners();
    document.addEventListener(`keydown`, onArrowKeyPress);
  })();

  function orderScreens() {
    for (const key of Object.keys(SCREENS_ORDER_BY_ID)) {
      screens.find((item) => item.id === SCREENS_ORDER_BY_ID[key]).order = key;
    }
    screens.sort((item1, item2) => item1.order > item2.order ? 1 : -1);
    // temp fix to hide service screens
    screens.pop();
    screens.pop();
  }
  function showScreen(screenOrder) {
    const fragment = document.createDocumentFragment();
    const screenTemplate = screens[screenOrder].content;
    const clonnedScreen = screenTemplate.cloneNode(true);
    fragment.appendChild(clonnedScreen);
    mainScreen.innerHTML = ``;
    mainScreen.appendChild(fragment);
  }
  function nextScreen() {
    currentScreenId = currentScreenId < (screens.length - 1) ? ++currentScreenId : 0;
    showScreen(currentScreenId);
  }
  function previousScreen() {
    currentScreenId = currentScreenId > 0 ? --currentScreenId : screens.length - 1;
    showScreen(currentScreenId);
  }
  function drawArrowButtons() {
    const wrap = window.util.createDOMElement(`div`, `arrows__wrap`);
    const leftArrow = window.util.createDOMElement(`button`, `arrows__btn`, `<-`);
    const rightArrow = window.util.createDOMElement(`button`, `arrows__btn`, `->`);
    const style = document.createElement(`style`);
    style.innerHTML = STYLES.styleRuleForWrap + STYLES.styleRuleForButtons;
    wrap.appendChild(style);
    wrap.appendChild(leftArrow);
    wrap.appendChild(rightArrow);
    document.querySelector(`body`).appendChild(wrap);
  }
  function setArrowListeners() {
    const buttons = Array.from(document.querySelectorAll(`.arrows__btn`));
    buttons.forEach((button) => button.addEventListener(`click`, onArrowButtonClick));
  }
  function onArrowKeyPress(evt) {
    if (evt.keyCode === KEYBOARD_KEYKODES.left) {
      previousScreen();
    } else if (evt.keyCode === KEYBOARD_KEYKODES.right) {
      nextScreen();
    }
  }
  function onArrowButtonClick(evt) {
    if (evt.target.innerText === `<-`) {
      previousScreen();
    } else if (evt.target.innerText === `->`) {
      nextScreen();
    }
  }
})();
