const SLOW_TIMELIMIT = 20;
const FAST_TIMELIMIT = 10;
const MAX_ATTEMPTS = 3;
const MIN_ATTEMPTS = 0;
const TIME_IS_UP_SOON_SECONDS = 5;

const calculateGameScore = (answersArray, unusedAttempts) => {
  if (!Array.isArray(answersArray) || typeof unusedAttempts !== `number`) {
    throw new Error(`Incorrect arguments types`);
  }
  const clonnedArray = answersArray.map((item) => Object.assign({}, item));
  if (clonnedArray.length > 10 || unusedAttempts < 0 || unusedAttempts > 3) {
    throw new Error(`Incorrect arguments values`);
  }
  if (clonnedArray.filter((item) => item.isSuccess === false).length !== (MAX_ATTEMPTS - unusedAttempts)) {
    throw new Error(`Inconsistent arguments`);
  }
  let score = 0;
  if (clonnedArray.length < 10) {
    return -1;
  }

  clonnedArray.forEach((answer) => {
    score += answer.isSuccess ? 100 : 0;
    score += answer.timeSpent <= FAST_TIMELIMIT ? 50 : 0;
    score += answer.timeSpent >= SLOW_TIMELIMIT ? -50 : 0;
  });

  score += unusedAttempts * 50;

  return score;
};

const updateAttempts = (answer, currentAttempts) => {
  if (typeof answer.isSuccess !== `boolean` || typeof answer.timeSpent !== `number` || typeof currentAttempts !== `number`) {
    throw new Error(`Incorrect arguments type`);
  }
  const tempAnswer = Object.assign({}, answer);
  let tempCurrentAttempts = currentAttempts;

  if (tempCurrentAttempts < MIN_ATTEMPTS) {
    throw new Error(`Incorrect arguments values`);
  }

  if (!tempAnswer.isSuccess) {
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

export {calculateGameScore, updateAttempts, Timer};
