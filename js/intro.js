import {createDOMElement, showScreen} from './util.js';
import {greetingPage, assignGreetingListeners} from './greeting.js';

const INTRO_PAGE_HTML = `<button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
  <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>`;

const introPage = createDOMElement(`section`, `intro`, INTRO_PAGE_HTML);

const assignIntroListeners = () => {
  const nextScreenButton = document.querySelector(`.intro__asterisk`);
  nextScreenButton.addEventListener(`click`, () => {
    showScreen(greetingPage);
    assignGreetingListeners();
  });
};

export {introPage, assignIntroListeners};
