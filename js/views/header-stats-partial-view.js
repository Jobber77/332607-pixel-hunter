import AbstractView from './abstract-view';

export default class HeaderStatsPartialView extends AbstractView {
  constructor(currentStats) {
    super();
    this._currentStats = currentStats;
  }

  get template() {
    return `<div class="game__timer">${this._currentStats.timeLeft}</div>
    <div class="game__lives">
    ${new Array(3 - this._currentStats.hp)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
      .join(``)}
    ${new Array(this._currentStats.hp)
        .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
        .join(``)}
    </div>`;
  }
}
