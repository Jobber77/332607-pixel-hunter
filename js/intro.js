import {createDOMElement, showScreen} from './util.js';
import {screen as greetingScreen, assignListeners as assignGreetingListeners} from './greeting.js';

const INTRO_SCREEN_HTML = `<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;
let nextScreenButton;
const screen = createDOMElement(`section`, `intro`, INTRO_SCREEN_HTML);

const onNextScreenCall = () => {
  killListeners();
  showScreen(greetingScreen);
  assignGreetingListeners();
};

const assignListeners = () => {
  nextScreenButton = document.querySelector(`.intro__asterisk`);
  nextScreenButton.addEventListener(`click`, onNextScreenCall);
};

const killListeners = () => {
  nextScreenButton.removeEventListener(`click`, onNextScreenCall);
};

export {screen, assignListeners};
