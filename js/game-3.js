import {createDOMElement, showScreen} from './util.js';
import {screen as statsScreen, assignListeners as assignStatsListeners} from './stats.js';
import {assignBackButtonListener, killBackButtonListener} from './game-navigation';

const GAME3_SCREEN_HTML = `
<section class="game">
<p class="game__task">Найдите рисунок среди изображений</p>
<form class="game__content  game__content--triple">
  <div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
  </div>
  <div class="game__option  game__option--selected">
    <img src="http://placehold.it/304x455" alt="Option 2" width="304" height="455">
  </div>
  <div class="game__option">
    <img src="http://placehold.it/304x455" alt="Option 3" width="304" height="455">
  </div>
</form>
</section>`;
let nextScreenButtons;

const assignListeners = () => {
  nextScreenButtons = document.querySelectorAll(`.game__option`);
  Array.from(nextScreenButtons).forEach((item) => item.addEventListener(`click`, onNextScreenCall));
  assignBackButtonListener();
};

const killListeners = () => {
  nextScreenButtons.forEach((item) => item.removeEventListener(`click`, onNextScreenCall));
  killBackButtonListener();
};

const onNextScreenCall = () => {
  killListeners();
  showScreen(statsScreen);
  assignStatsListeners();
};

const screen = createDOMElement(`div`, ``, GAME3_SCREEN_HTML);

export {assignListeners, screen};
