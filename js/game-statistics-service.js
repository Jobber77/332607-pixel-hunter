const SLOW_TIMELIMIT = 10;
const FAST_TIMELIMIT = 20;
const MAX_ATTEMPTS = 3;

const calculateTotalGameScore = (answersArray, unusedAttempts) => {
  if (!Array.isArray(answersArray) || typeof unusedAttempts !== `number`) {
    throw new Error(`Incorrect arguments types`);
  }
  const attempts = unusedAttempts;
  const clonnedArray = answersArray.map((item) => Object.assign({}, item));
  if (clonnedArray.length > 10 || attempts < -1 || attempts > 3) {
    throw new Error(`Incorrect arguments values`);
  }
  if (clonnedArray.filter((item) => item.isCorrect === false).length !== (MAX_ATTEMPTS - attempts)) {
    throw new Error(`Inconsistent arguments`);
  }
  let score = 0;
  if (clonnedArray.length < 10) {
    return 0;
  }

  clonnedArray.forEach((answer) => {
    score += answer.isCorrect ? 100 : 0;
    score += answer.timeLeft >= FAST_TIMELIMIT ? 50 : 0;
    score += answer.timeLeft <= SLOW_TIMELIMIT ? -50 : 0;
  });

  score += unusedAttempts * 50;

  return score;
};

const calculateDetailedStats = (game) => {
  const correctAnswers = game.levelResultHistory.length - (3 - game.currentStats.hp);
  const speedAnswers = game.levelResultHistory.filter((item) => item.timeLeft >= 20 && item.isCorrect).length;
  const slowAnswers = game.levelResultHistory.filter((item) => item.timeLeft <= 10 && item.isCorrect).length;
  const hp = game.currentStats.hp;
  return {
    correctAnswers,
    speedAnswers,
    slowAnswers,
    hp
  };
};

const saveGameData = () => {
  return `awsome server HTTP post method`;
};

export {calculateTotalGameScore, saveGameData, calculateDetailedStats};
