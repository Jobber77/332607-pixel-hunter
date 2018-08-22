const SLOW_TIMELIMIT = 20;
const FAST_TIMELIMIT = 10;
const MAX_ATTEMPTS = 3;

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

export {calculateGameScore};
