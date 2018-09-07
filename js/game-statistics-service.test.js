import {assert} from 'chai';
import {calculateTotalGameScore, updateAttempts, Timer} from './game-statistics-service';

const defaultAnswers = [{isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15},
  {isCorrect: true, timeLeft: 15}];
const MAX_TIME_FOR_ANSWER = 30;

describe(`startTimer tests`, () => {
  it(`throw if incorrect arguments type passed`, () => {
    assert.throw(() => new Timer({}), `time parameter should be a number`);
    assert.throw(() => new Timer(`asd`), `time parameter should be a number`);
  });
  it(`throw if incorrect arguments values passed`, () => {
    assert.throw(() => new Timer(-1), `time parameter has incorrect value`);
  });
  it(`constructed object return "Time is up" and "Time is up soon" on "tick" function call`, () => {
    let obj = new Timer(6);
    assert.deepEqual(obj.tick(), {currentTime: 5, message: `Time is up soon`});
    obj = new Timer(1);
    assert.deepEqual(obj.tick(), {currentTime: 0, message: `Time is up`});
  });
});

describe(`updateAttempts tests`, () => {
  it(`throw if incorrect arguments types passed`, () => {
    assert.throw(() => updateAttempts({}), `Incorrect arguments type`);
    assert.throw(() => updateAttempts({isCorrect: true, timeLeft: `a`}), `Incorrect arguments type`);
    assert.throw(() => updateAttempts({isCorrect: 1, timeLeft: 1}), `Incorrect arguments type`);
    assert.throw(() => updateAttempts(123, `123`), `Incorrect arguments type`);
  });
  it(`throw if incorrect arguments values passed`, () => {
    assert.throw(() => updateAttempts({isCorrect: true, timeLeft: MAX_TIME_FOR_ANSWER}, -1), `Incorrect arguments values`);
    assert.throw(() => updateAttempts({isCorrect: 1, timeLeft: 1}), `Incorrect arguments type`);
    assert.throw(() => updateAttempts(123, `123`), `Incorrect arguments type`);
  });
  it(`return decreased attempts number if answer is incorrect`, () => {
    assert.strictEqual(updateAttempts({isCorrect: false, timeLeft: 2}, 3), 2);
    assert.strictEqual(updateAttempts({isCorrect: false, timeLeft: 1}, 1), 0);
    assert.strictEqual(updateAttempts({isCorrect: false, timeLeft: 0}, 0), -1);
  });
  it(`return back passed amount of attemptsif answer is correct`, () => {
    assert.strictEqual(updateAttempts({isCorrect: true, timeLeft: 2}, 3), 3);
    assert.strictEqual(updateAttempts({isCorrect: true, timeLeft: 10500}, 1), 1);
  });
});

describe(`calculateTotalGameScore tests`, () => {
  it(`throw if incorrect arguments types passed`, () => {
    assert.throw(() => calculateTotalGameScore(``, 1234), `Incorrect arguments types`);
    assert.throw(() => calculateTotalGameScore([], {}), `Incorrect arguments types`);
    assert.throw(() => calculateTotalGameScore(``, ``), `Incorrect arguments types`);
  });
  it(`throw if incorrect arguments values passed`, () => {
    assert.throw(() => calculateTotalGameScore([], 1234), `Incorrect arguments values`);
    assert.throw(() => calculateTotalGameScore([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], 3), `Incorrect arguments values`);
    assert.throw(() => calculateTotalGameScore([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], 10500), `Incorrect arguments values`);
  });
  it(`throw if incosistent arguments values passed`, () => {
    const tempArray = defaultAnswers.map((item) => Object.assign({}, item));
    for (let i = 0; i < 3; i++) {
      tempArray[i].isCorrect = false;
    }
    assert.throw(() => calculateTotalGameScore(tempArray, 2), `Inconsistent arguments`);
  });
  it(`returns 0 if game is failed (array of anwers contains less then 10 objects)`, () => {
    let tempArray = defaultAnswers.map((item) => Object.assign({}, item));
    for (let i = 0; i < 3; i++) {
      tempArray[i].isCorrect = false;
    }
    tempArray.length = tempArray.length - 1;

    assert.strictEqual(calculateTotalGameScore(tempArray, 0), 0);
  });
  it(`returns correct amount of points`, () => {
    let tempArray = defaultAnswers.map((item) => Object.assign({}, item));
    assert.strictEqual(calculateTotalGameScore(tempArray, 3), 1150);

    tempArray = defaultAnswers.map((item) => Object.assign({}, item, {timeLeft: 30}));
    assert.strictEqual(calculateTotalGameScore(tempArray, 3), 1650);

    tempArray = defaultAnswers.map((item) => Object.assign({}, item, {timeLeft: 0}));
    assert.strictEqual(calculateTotalGameScore(tempArray, 3), 650);

    tempArray = defaultAnswers.map((item) => Object.assign({}, item));
    tempArray[0].isCorrect = false;
    tempArray[1].timeLeft = 21;
    assert.strictEqual(calculateTotalGameScore(tempArray, 2), 1050);
  });
});
