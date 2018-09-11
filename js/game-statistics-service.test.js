import {assert} from 'chai';
import {calculateTotalGameScore} from './game-statistics-service';

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
