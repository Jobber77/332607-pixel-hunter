import {createDOMElement, showScreen} from './util.js';
import {screen as rulesScreen, assignListeners as assignRulesListeners} from './rules.js';

const GREETING_SCREEN_HTML = `<img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
<div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
<div class="greeting__challenge">
  <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
  <p class="greeting__challenge-text">Правила игры просты:</p>
  <ul class="greeting__challenge-list">
    <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
    <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
    <li>Фотореализм обманчив и коварен.</li>
    <li>Помни, главное — смотреть очень внимательно.</li>
  </ul>
</div>
<button class="greeting__continue" type="button">
  <span class="visually-hidden">Продолжить</span>
  <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
    <use xlink:href="img/sprite.svg#arrow-right"></use>
  </svg>
</button>`;
let nextScreenButton;


const assignListeners = () => {
  nextScreenButton = document.querySelector(`.greeting__continue`);
  nextScreenButton.addEventListener(`click`, onNextScreenCall);
};

const killListeners = () => {
  nextScreenButton.removeEventListener(`click`, onNextScreenCall);
};

const onNextScreenCall = () => {
  killListeners();
  showScreen(rulesScreen);
  assignRulesListeners();
};

const screen = createDOMElement(`section`, [`greeting`, `central--blur`], GREETING_SCREEN_HTML);

export {screen, assignListeners};
