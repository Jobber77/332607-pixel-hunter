import {assert} from 'chai';
import {calculateGameScore} from '../game-statistics';

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
    const tempArray = defaultAnswers.map((item) => Object.assign({}, item));
    for (let i = 0; i < 3; i++) {
      tempArray[i].isSuccess = false;
    }
    assert.throw(() => calculateGameScore(tempArray, 2), `Inconsistent arguments`);
  });
  it(`returns -1 if game is failed (array of anwers contains less then 10 objects)`, () => {
    let tempArray = defaultAnswers.map((item) => Object.assign({}, item));
    for (let i = 0; i < 3; i++) {
      tempArray[i].isSuccess = false;
    }
    tempArray.length = tempArray.length - 1;

    assert.strictEqual(calculateGameScore(tempArray, 0), -1);
  });
  it(`returns correct amount of points`, () => {
    let tempArray = defaultAnswers.map((item) => Object.assign({}, item));
    assert.strictEqual(calculateGameScore(tempArray, 3), 1150);

    tempArray = defaultAnswers.map((item) => Object.assign({}, item, {timeSpent: 0}));
    assert.strictEqual(calculateGameScore(tempArray, 3), 1650);

    tempArray = defaultAnswers.map((item) => Object.assign({}, item, {timeSpent: 30}));
    assert.strictEqual(calculateGameScore(tempArray, 3), 650);

    tempArray = defaultAnswers.map((item) => Object.assign({}, item));
    tempArray[0].isSuccess = false;
    tempArray[1].timeSpent = 21;
    assert.strictEqual(calculateGameScore(tempArray, 2), 950);
  });
});
