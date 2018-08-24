import {createDOMElement, showScreen} from './util.js';
import {screen as game3Screen, assignListeners as assignGame3Listeners} from './game-3';
import {assignBackButtonListener, killBackButtonListener} from './game-navigation';

const GAME2_SCREEN_HTML = `
<section class="game">
<p class="game__task">Угадай, фото или рисунок?</p>
<form class="game__content  game__content--wide">
  <div class="game__option">
    <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
</form>
</section>`;
let nextScreenButtons;

const assignListeners = () => {
  nextScreenButtons = Array.from(document.querySelectorAll(`.game__answer`));
  nextScreenButtons.forEach((item) => item.addEventListener(`click`, onNextScreenCall));
  assignBackButtonListener();
};

const killListeners = () => {
  nextScreenButtons.forEach((item) => item.removeEventListener(`click`, onNextScreenCall));
  killBackButtonListener();
};

const onNextScreenCall = () => {
  killListeners();
  showScreen(game3Screen);
  assignGame3Listeners();
};

const screen = createDOMElement(`div`, ``, GAME2_SCREEN_HTML);

export {assignListeners, screen};
