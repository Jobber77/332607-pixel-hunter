import {assert} from 'chai';
import {nextScreen} from './screen-switcher';

const screens = [1, 2, 3, 4, 5, 6, 7, 8];

describe(`nextScreen tests`, () => {
  it(`throw if incorrect argument type passed`, () => {
    assert.throw(() => nextScreen({}), `incorrect arguments types`);
    assert.throw(() => nextScreen(`asd`, {}), `incorrect arguments types`);
    assert.throw(() => nextScreen(1, ``), `incorrect arguments types`);
  });
  it(`throw if incorrect arguments values passed`, () => {
    assert.throw(() => nextScreen(10500, `argument value out of range`));
    assert.throw(() => nextScreen(-1, `argument value out of range`));
  });
  it(`Swithc to next screen in array`, () => {
    const tempScreenArray = screens.map((item) => item);
    //  assert.strictEqual(nextScreen(tempScreenArray[1], tempScreenArray), tempScreenArray[2]);
    assert.strictEqual(nextScreen(tempScreenArray[0], tempScreenArray), tempScreenArray[1]);
  });
  it(`Swithc to first screen if current screen is last one`, () => {
    const tempScreenArray = screens.map((item) => item);
    assert.strictEqual(nextScreen(tempScreenArray[tempScreenArray.length - 1], tempScreenArray), tempScreenArray[0]);
  });
});
