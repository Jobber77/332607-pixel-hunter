import {backButtonHtml} from './game-navigation';

const generateHeaderStatsHtml = (currentStats) => `<header class="header">
${backButtonHtml}
<div class="game__timer">NN</div>
<div class="game__lives">
${new Array(3 - currentStats.hp)
  .fill(`<img src="img/heart__empty.svg" class="game__heart" alt=" Missed Life" width="31" height="27">`)
  .join(``)}
${new Array(currentStats.hp)
    .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
    .join(``)}
</div>
</header>`;

const generateFooterStatsHtml = (levelResultHistory) => {
  const tempAnswers = levelResultHistory ? levelResultHistory.map((item) => Object.assign({}, item)) : [];
  return `<ul class="stats">
  ${tempAnswers.map((item) => `<li class="stats__result ${getHtmlClass(item)}"></li>`).join(``)}
  ${new Array(10 - tempAnswers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
</ul>`;
};

const getHtmlClass = (answer) => {
  let string = ``;
  if (answer.isCorreсt && answer.timeLeft <= 10) {
    string = `stats__result--slow`;
  } else if (answer.isCorrect && answer.timeLeft >= 20) {
    string = `stats__result--fast`;
  } else if (answer.isCorrect) {
    string = `stats__result--correct`;
  } else {
    string = `stats__result--wrong`;
  }
  return string;
};

export {generateHeaderStatsHtml, generateFooterStatsHtml};
