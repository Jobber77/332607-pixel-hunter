import {assert} from 'chai';


const SLOW_TIMELIMIT = 20;
const FAST_TIMELIMIT = 10;
const MAX_ATTEMPTS = 3;

const calculateGameScore = (answersArray, unusedAttempts) => {
  const clonnedArray = answersArray.slice();
  if (!Array.isArray(clonnedArray) || typeof unusedAttempts !== `number`) {
    throw new Error(`Incorrect arguments types`);
  }
  if (clonnedArray.length > 10 || unusedAttempts < 0 || unusedAttempts > 3) {
    throw new Error(`Incorrect arguments values`);
  }
  if (clonnedArray.filter((item) => item.isSuccess === false).length === (MAX_ATTEMPTS - unusedAttempts)) {
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
const defaultAnswers = [{isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15},
  {isSuccess: true, timeSpent: 15}];

describe(`stats calculation tests`, () => {
  it(`throw if incorrect arguments types passed`, () => {
    assert.throw(() => calculateGameScore(``, 1234), `Incorrect arguments types`);
    assert.throw(() => calculateGameScore([], {}), `Incorrect arguments types`);
    assert.throw(() => calculateGameScore(``, ``), `Incorrect arguments types`);
  });
  it(`throw if incorrect arguments values passed`, () => {
    assert.throw(() => calculateGameScore([], 1234), `Incorrect arguments values`);
    assert.throw(() => calculateGameScore([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], 3), `Incorrect arguments values`);
    assert.throw(() => calculateGameScore([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], 10500), `Incorrect arguments values`);
  });
  it(`throw if incosistent arguments values passed`, () => {
    const tempArray = defaultAnswers.slice();
    for (let i = 0; i < 3; i++) {
      tempArray[i].isSuccess = false;
    }
    assert.throw(() => calculateGameScore(tempArray, 2), `Inconsistent arguments`);
  });
  it(`returns -1 if game is failed (array of anwers contains less then 10 objects)`, () => {
    assert.strictEqual(calculateGameScore([], 0), -1);
  });
  it(`returns correct amount of points`, () => {
    assert.strictEqual(calculateGameScore(defaultAnswers.slice(), 3), 1150);
    let tempArray = defaultAnswers.map((item) => ({isSuccess: item.isSuccess, timeSpent: 0}));
    assert.strictEqual(calculateGameScore(tempArray, 3), 1650);
    tempArray = defaultAnswers.map((item) => ({isSuccess: item.isSuccess, timeSpent: 30}));
    assert.strictEqual(calculateGameScore(tempArray, 3), 650);
    tempArray = defaultAnswers.map((item) => ({isSuccess: item.isSuccess, timeSpent: item.timeSpent}));
    tempArray[0].isSuccess = false;
    tempArray[1].timeSpent = 21;
    assert.strictEqual(calculateGameScore(tempArray, 2), 650);
  });
});
