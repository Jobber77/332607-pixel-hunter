import {createDOMElement, showScreen, converClassListToString} from './util.js';
import buildnextScreen from './greeting.js';

const SCREEN_HTML = `<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;
const WRAPPER_CLASSLIST = [`intro`];

let nextScreenButton;

const onNextScreenCall = () => {
  killListeners();
  buildnextScreen();
};

const assignListeners = () => {
  nextScreenButton = document.querySelector(`.intro__asterisk`);
  nextScreenButton.addEventListener(`click`, onNextScreenCall);
};

const killListeners = () => {
  nextScreenButton.removeEventListener(`click`, onNextScreenCall);
};

export default () => {
  const element = createDOMElement(`section`, WRAPPER_CLASSLIST, SCREEN_HTML);
  showScreen(element);
  assignListeners();
  return document.querySelector(converClassListToString(WRAPPER_CLASSLIST));
};

