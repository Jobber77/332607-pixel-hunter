const SLOW_TIMELIMIT = 10;
const FAST_TIMELIMIT = 20;
const MAX_ATTEMPTS = 3;
const CORRECT_QUESTIONS_TO_WIN = 7;
const QUESTIONS_PER_GAME = 10;

const calculateTotalGameScore = (answersArray, unusedAttempts) => {
  if (!Array.isArray(answersArray) || typeof unusedAttempts !== `number`) {
    throw new Error(`Incorrect arguments types`);
  }
  const attempts = unusedAttempts;
  const clonnedArray = answersArray.map((item) => Object.assign({}, item));
  if (clonnedArray.length > QUESTIONS_PER_GAME || attempts < -1 || attempts > MAX_ATTEMPTS) {
    throw new Error(`Incorrect arguments values`);
  }
  if (clonnedArray.filter((item) => item.isCorrect === false).length !== (MAX_ATTEMPTS - attempts)) {
    throw new Error(`Inconsistent arguments`);
  }
  let score = 0;
  if (clonnedArray.length < QUESTIONS_PER_GAME) {
    return 0;
  }

  clonnedArray.forEach((answer) => {
    score += answer.isCorrect ? 100 : 0;
    if (answer.isCorrect) {
      score += answer.timeLeft >= FAST_TIMELIMIT ? 50 : 0;
      score += answer.timeLeft <= SLOW_TIMELIMIT ? -50 : 0;
    }
  });

  score += unusedAttempts * 50;

  return score;
};

const calculateDetailedStats = (answersArray, unusedAttempts) => {
  const correctAnswers = answersArray.length - (MAX_ATTEMPTS - unusedAttempts);
  const speedAnswers = answersArray.filter((item) => item.timeLeft >= FAST_TIMELIMIT && item.isCorrect).length;
  const slowAnswers = answersArray.filter((item) => item.timeLeft <= SLOW_TIMELIMIT && item.isCorrect).length;
  const hp = unusedAttempts;
  const isWin = checkWinStatus(answersArray);
  return {
    isWin,
    correctAnswers,
    speedAnswers,
    slowAnswers,
    hp
  };
};

const checkWinStatus = (answersArray) => {
  return answersArray.filter((item) => item.isCorrect === true).length >= CORRECT_QUESTIONS_TO_WIN;
};

export {calculateTotalGameScore, calculateDetailedStats, checkWinStatus};
