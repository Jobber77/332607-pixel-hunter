import AbstractView from './abstract-view';
import {assignBackButtonListener, killBackButtonListener, backButtonHtml} from '../game-navigation';
import {generateFooterStatsHtml} from '../game-common-elements';
import {calculateDetailedStats, calculateTotalGameScore} from '../game-statistics-service';

export default class StatsView extends AbstractView {
  constructor(currentGame) {
    super();
    this.gameState = currentGame;
  }

  get template() {
    const {correctAnswers, speedAnswers, slowAnswers, hp} = calculateDetailedStats(this.gameState);
    return `<header class="header">
${backButtonHtml}
</header>
<section class="result">
<h2 class="result__title">${this.gameState.isWin ? `Победа!` : `FAIL`}</h2>
<table class="result__table">
  <tr>
    <td class="result__number">1.</td>
    <td colspan="2">
      ${generateFooterStatsHtml(this.gameState.levelResultHistory)}
    </td>
    ${this.gameState.isWin ? `<td class="result__points">× 100</td>
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
    ${calculateTotalGameScore(this.gameState.levelResultHistory, this.gameState.currentStats.hp)}</td>
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
  }

  assignListeners() {
    assignBackButtonListener(this.element);
  }

  removeListeners() {
    killBackButtonListener();
  }

  onNextScreenCall() {
  }
}
