import {createDOMElement, showScreen} from './util';
import {assignBackButtonListener, backButtonHtml} from './game-navigation';
import {saveGameData, calculateDetailedStats, calculateTotalGameScore} from './game-statistics-service';
import {generateFooterStatsHtml} from './game-common-elements';

const generateHtml = (currentGame) => {
  const {correctAnswers, speedAnswers, slowAnswers, hp} = calculateDetailedStats(currentGame);
  return `<header class="header">
${backButtonHtml}
</header>
<section class="result">
<h2 class="result__title">${currentGame.isWin ? `Победа!` : `FAIL`}</h2>
<table class="result__table">
  <tr>
    <td class="result__number">1.</td>
    <td colspan="2">
      ${generateFooterStatsHtml(currentGame.levelResultHistory)}
    </td>
    ${currentGame.isWin ? `<td class="result__points">× 100</td>
    <td class="result__total">${correctAnswers * 100}</td>` : `<td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>`}
  </tr>
  ${speedAnswers > 0 ?
    `<tr>
    <td></td>
    <td class="result__extra">Бонус за скорость:</td>
    <td class="result__extra">${speedAnswers}} <span class="stats__result stats__result--fast"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${speedAnswers * 50}}</td>
  </tr>` : ``}
  ${hp > 0 ?
    `<tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">${hp}} <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">${hp * 50}</td>
  </tr>` : ``}
  ${slowAnswers > 0 ?
    `<tr>
    <td></td>
    <td class="result__extra">Штраф за медлительность:</td>
    <td class="result__extra">2 <span class="stats__result stats__result--slow"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">-100</td>
  </tr>` : ``}
  <tr>
    <td colspan="5" class="result__total  result__total--final">
    ${calculateTotalGameScore(currentGame.levelResultHistory, currentGame.currentStats.hp)}</td>
  </tr>
</table>
<table class="result__table">
  <tr>
    <td class="result__number">2.</td>
    <td>
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--wrong"></li>
      </ul>
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>
</table>
<table class="result__table">
  <tr>
    <td class="result__number">3.</td>
    <td colspan="2">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </td>
    <td class="result__points">× 100</td>
    <td class="result__total">900</td>
  </tr>
  <tr>
    <td></td>
    <td class="result__extra">Бонус за жизни:</td>
    <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
    <td class="result__points">× 50</td>
    <td class="result__total">100</td>
  </tr>
  <tr>
    <td colspan="5" class="result__total  result__total--final">950</td>
  </tr>
</table>
</section>`;
};
let currentGame;

const assignListeners = () => {
  assignBackButtonListener(true);
};

export default (gameObject) => {
  currentGame = Object.assign({}, gameObject);
  currentGame.isWin = currentGame.levelResultHistory.length >= 10;
  saveGameData(currentGame);
  const element = createDOMElement(`div`, ``, generateHtml(currentGame));
  showScreen(element);
  assignListeners();
  return document.querySelector(`#main > div`);
};
