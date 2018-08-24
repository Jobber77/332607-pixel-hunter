import {createDOMElement, showScreen} from './util.js';
import {screen as game2Screen, assignListeners as assignGame2Listeners} from './game-2.js';
import {assignBackButtonListener, killBackButtonListener} from './game-navigation';


const GAME1_SCREEN_HTML = `
<section class="game">
<p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
<form class="game__content">
  <div class="game__option">
    <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question1" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question1" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
  <div class="game__option">
    <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
    <label class="game__answer  game__answer--photo">
      <input class="visually-hidden" name="question2" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer  game__answer--paint">
      <input class="visually-hidden" name="question2" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>
</form>
</section>`;
let radioButtons;

const assignListeners = () => {
  radioButtons = Array.from(document.querySelectorAll(`input[type=radio]`));
  radioButtons.forEach((item) => item.addEventListener(`click`, onNextScreenCall));
  assignBackButtonListener();
};

const killListeners = () => {
  radioButtons.forEach((item) => item.removeEventListener(`click`, onNextScreenCall));
  killBackButtonListener();
};

const onNextScreenCall = () => {
  const firstOptionRadio = radioButtons.filter((item) => item.name === `question1`);
  const secondOptionRadio = radioButtons.filter((item) => item.name === `question2`);
  if ((firstOptionRadio.some((element) => element.checked === true))
        && secondOptionRadio.some((element) => element.checked === true)) {
    killListeners();
    showScreen(game2Screen);
    assignGame2Listeners();
  }
};

const screen = createDOMElement(`div`, ``, GAME1_SCREEN_HTML);

export {screen, assignListeners};
