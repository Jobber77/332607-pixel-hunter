import {createDOMElement, showScreen} from './util';
import buildNextScreen from './game-1';
import {assignBackButtonListener, killBackButtonListener, backButtonHtml} from './game-navigation';
import {generateNewGameObject} from './game-data';

const generateHtml = () => `<header class="header">
${backButtonHtml}
</header>
<section class="rules">
<h2 class="rules__title">Правила</h2>
<ul class="rules__description">
  <li>Угадай 10 раз для каждого изображения фото
    <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
    <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
  <li>Фотографиями или рисунками могут быть оба изображения.</li>
  <li>На каждую попытку отводится 30 секунд.</li>
  <li>Ошибиться можно не более 3 раз.</li>
</ul>
<p class="rules__ready">Готовы?</p>
<form class="rules__form">
  <input class="rules__input" type="text" placeholder="Ваше Имя">
  <button class="rules__button  continue" type="submit" disabled>Go!</button>
</form>
</section>`;
let nextScreenButton;
let rulesInput;
let playerName = ``;

const assignListeners = () => {
  nextScreenButton = document.querySelector(`.rules__button`);
  rulesInput = document.querySelector(`.rules__input`);
  rulesInput.addEventListener(`input`, onRulesInputClick);
  nextScreenButton.addEventListener(`click`, onNextScreenCall);
  assignBackButtonListener();
};

const killListeners = () => {
  nextScreenButton.removeEventListener(`click`, onNextScreenCall);
  killBackButtonListener();
};

const onRulesInputClick = (evt) => {
  const enable = evt.target.value.length > 0;
  nextScreenButton.disabled = !enable;
  if (enable) {
    playerName = evt.target.value;
  }
};

const onNextScreenCall = () => {
  killListeners();
  buildNextScreen(generateNewGameObject(playerName));
};

export default () => {
  const element = createDOMElement(`div`, ``, generateHtml());
  showScreen(element);
  assignListeners();
  return document.querySelector(`#main > div`);
};
