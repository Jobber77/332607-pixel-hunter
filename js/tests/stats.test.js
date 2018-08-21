import {assert} from 'chai';

const calculateGameScore = (answersArray, unusedAttempts) => {
  if (!Array.isArray(answersArray) || typeof unusedAttempts !== `number`) {
    throw new Error(`Incorrect arguments types`);
  }
  if (answersArray.length > 10 || unusedAttempts < 0 || unusedAttempts > 3) {
    throw new Error(`Incorrect arguments values`);
  }
  const clonnedArray = answersArray.slice();
  let score;
  if (clonnedArray.length < 10) {
    return -1;
  }

  return score;
};

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
  it(`returns -1 if game is failed (array of anwers contains less then 10 objects)`, () => {
    assert.strictEqual(calculateGameScore([{}], 0), -1);
  });
});
