import {assert} from 'chai';
import {calculateGameScore, updateAttempts, startTimer} from '../game-statistics';

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
const MAX_TIME_FOR_ANSWER = 30;
const TIME_IS_UP_SOON_SECONDS = 5;

describe(`startTimer tests`, () => {
  it(`throw if incorrect arguments type passed`, () => {
    assert.throw(() => startTimer({}), `time parameter should be a number`);
    assert.throw(() => startTimer(`asd`), `time parameter should be a number`);
  });
  it(`throw if incorrect arguments values passed`, () => {
    assert.throw(() => startTimer(-1, `time parameter has incorrect value`));
    assert.throw(() => startTimer(TIME_IS_UP_SOON_SECONDS - 1, `time parameter has incorrect value`));
  });
  it(`calls callback on timer end`, () => {
    //  как это протестировать?
  });
});

describe(`updateAttempts tests`, () => {
  it(`throw if incorrect arguments types passed`, () => {
    assert.throw(() => updateAttempts({}), `Incorrect arguments type`);
    assert.throw(() => updateAttempts({isSuccess: true, timeSpent: `a`}), `Incorrect arguments type`);
    assert.throw(() => updateAttempts({isSuccess: 1, timeSpent: 1}), `Incorrect arguments type`);
    assert.throw(() => updateAttempts(123, `123`), `Incorrect arguments type`);
  });
  it(`throw if incorrect arguments values passed`, () => {
    assert.throw(() => updateAttempts({isSuccess: true, timeSpent: MAX_TIME_FOR_ANSWER}, -1), `Incorrect arguments values`);
    assert.throw(() => updateAttempts({isSuccess: 1, timeSpent: 1}), `Incorrect arguments type`);
    assert.throw(() => updateAttempts(123, `123`), `Incorrect arguments type`);
  });
  it(`return decreased attempts number if answer is incorrect`, () => {
    assert.strictEqual(updateAttempts({isSuccess: false, timeSpent: 2}, 3), 2);
    assert.strictEqual(updateAttempts({isSuccess: false, timeSpent: 1}, 1), 0);
    assert.strictEqual(updateAttempts({isSuccess: false, timeSpent: 0}, 0), -1);
  });
  it(`return back passed amount of attemptsif answer is correct`, () => {
    assert.strictEqual(updateAttempts({isSuccess: true, timeSpent: 2}, 3), 3);
    assert.strictEqual(updateAttempts({isSuccess: true, timeSpent: 10500}, 1), 1);
  });
});

describe(`calculateGameScore tests`, () => {
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
