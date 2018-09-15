import AbstractView from './abstract-view';
import {calculateDetailedStats, calculateTotalGameScore, checkWinStatus, Points} from '../game-statistics-service';
import FooterPartialView from './footer-partial-view';

const generateLineHtml = (levelResultHistory, unusedAttempts, counter) => {
  const {isWin, correctAnswers, speedAnswers, slowAnswers, hp} = calculateDetailedStats(levelResultHistory, unusedAttempts);
  return !isWin ? `<table class="result__table">
  <tr>
    <td class="result__number">${counter}.</td>
    <td>
      ${new FooterPartialView(levelResultHistory).template}
    </td>
    <td class="result__total"></td>
    <td class="result__total  result__total--final">fail</td>
  </tr>
</table>` : `<table class="result__table">
<tr>
  <td class="result__number">${counter}.</td>
  <td colspan="2">
    ${new FooterPartialView(levelResultHistory).template}
  </td>
  ${isWin ? `<td class="result__points">× 100</td>
  <td class="result__total">${correctAnswers * Points.BASE_POINTS}</td>` : `<td class="result__total"></td>
  <td class="result__total  result__total--final">fail</td>`}
</tr>
${speedAnswers > 0 ? `<tr>
  <td></td>
  <td class="result__extra">Бонус за скорость:</td>
  <td class="result__extra">${speedAnswers} <span class="stats__result stats__result--fast"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${speedAnswers * Points.BONUS_POINTS}</td>
</tr>` : ``}
${hp > 0 ? `<tr>
  <td></td>
  <td class="result__extra">Бонус за жизни:</td>
  <td class="result__extra">${hp} <span class="stats__result stats__result--alive"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">${hp * Points.BONUS_POINTS}</td>
</tr>` : ``}
${slowAnswers > 0 ? `<tr>
  <td></td>
  <td class="result__extra">Штраф за медлительность:</td>
  <td class="result__extra">${slowAnswers} <span class="stats__result stats__result--slow"></span></td>
  <td class="result__points">× 50</td>
  <td class="result__total">-${slowAnswers * Points.BONUS_POINTS}</td>
</tr>` : ``}
<tr>
  <td colspan="5" class="result__total  result__total--final">
  ${calculateTotalGameScore(levelResultHistory, hp)}</td>
</tr>
</table>`;
};

export default class StatsView extends AbstractView {
  constructor(currentGameData, historicalData) {
    super();
    this._currentGameData = currentGameData;
    this._historicalData = historicalData.sort((item1, item2) => item2.date - item1.date);
  }

  get template() {
    const currentIsWin = checkWinStatus(this._currentGameData.levelResultHistory);
    let counter = 1;
    return `<section class="result">
    <h2 class="result__title">${currentIsWin ? `Победа!` : `FAIL`}</h2>
    ${this._historicalData.map((item) => generateLineHtml(item.levelResultHistory, item.hp, counter++)).join(``)}
    </section>`;
  }
}
