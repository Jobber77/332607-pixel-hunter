import {showScreen} from './util.js';
import {screen as introScreen, assignListeners as assignIntroListener} from './intro.js';

let backButton = document.querySelector(`.back`);

const onBackButtonClick = () => {
  showScreen(introScreen);
  assignIntroListener();
};
const assignBackButtonListener = (isGameEnd) => {
  backButton = document.querySelector(`.back`);
  backButton.addEventListener(`click`, onBackButtonClick);
  //  let GK kill listener later after screen change
  if (isGameEnd) {
    backButton = null;
  }
};
const killBackButtonListener = () => {
  backButton.removeEventListener(`click`, onBackButtonClick);
};

export {assignBackButtonListener, killBackButtonListener};
