const SLOW_TIMELIMIT = 10;
const FAST_TIMELIMIT = 20;
const MAX_ATTEMPTS = 3;
const MIN_ATTEMPTS = 0;
const TIME_IS_UP_SOON_SECONDS = 5;

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
    score += answer.isSuccess ? 100 : 0;
    score += answer.timeLeft >= FAST_TIMELIMIT ? 50 : 0;
    score += answer.timeLeft <= SLOW_TIMELIMIT ? -50 : 0;
  });

  score += unusedAttempts * 50;

  return score;
};

const calculateDetailedStats = (game) => {
  const correctAnswers = game.levelResultHistory.length - (3 - game.currentStats.hp);
  const speedAnswers = game.levelResultHistory.filter((item) => item.timeLeft >= 20).length;
  const slowAnswers = game.levelResultHistory.filter((item) => item.timeLeft <= 10).length;
  const hp = game.currentStats.hp;
  return {
    correctAnswers,
    speedAnswers,
    slowAnswers,
    hp
  };
};

const updateAttempts = (answer, currentAttempts) => {
  if (typeof answer.isCorrect !== `boolean` || typeof answer.timeLeft !== `number` || typeof currentAttempts !== `number`) {
    throw new Error(`Incorrect arguments type`);
  }
  const tempAnswer = Object.assign({}, answer);
  let tempCurrentAttempts = currentAttempts;

  if (tempCurrentAttempts < MIN_ATTEMPTS) {
    throw new Error(`Incorrect arguments values`);
  }

  if (!tempAnswer.isCorrect) {
    tempCurrentAttempts--;
  }
  return tempCurrentAttempts;

};

function Timer(maxTimeInSeconds) {
  if (typeof maxTimeInSeconds !== `number`) {
    throw new Error(`time parameter should be a number`);
  }
  if (maxTimeInSeconds < 0) {
    throw new Error(`time parameter has incorrect value`);
  }
  let currentTime = maxTimeInSeconds;
  let message = ``;
  this.tick = () => {
    currentTime--;
    if (currentTime === TIME_IS_UP_SOON_SECONDS) {
      message = `Time is up soon`;
    }
    if (currentTime <= 0) {
      message = `Time is up`;
    }
    return {currentTime, message};
  };
}

const updateGameHistory = (levelResult, gameObject) => {
  const updatedGame = Object.assign({}, gameObject);
  updatedGame.levelResultHistory.push(levelResult);
  return updatedGame;
};

const saveGameData = () => {
  return `awsome server HTTP post method`;
};

const getNextScreen = (currentScreen, screensArray) => {
  if (typeof currentScreen !== `object` || !Array.isArray(screensArray)) {
    throw new Error(`incorrect arguments types`);
  }
  const tempCurrentScreen = currentScreen;
  const tempScreenArray = screensArray.map((item) => item);
  if (!tempScreenArray.some((item) => item === tempCurrentScreen)) {
    throw new Error(`argument value out of range`);
  }
  let nextScreenId = tempScreenArray.indexOf(tempCurrentScreen) + 1;
  nextScreenId = (nextScreenId > tempScreenArray.length - 1) ? -1 : nextScreenId;

  return nextScreenId;
};

export {calculateTotalGameScore, updateAttempts, Timer, updateGameHistory, saveGameData, getNextScreen, calculateDetailedStats};
