import {assert} from 'chai';
import {getNextScreen} from './screen-switcher';

const screens = [{}, {}];

describe(`getNextScreen tests`, () => {
  it(`throw if incorrect argument type passed`, () => {
    assert.throw(() => getNextScreen({}), `incorrect arguments types`);
    assert.throw(() => getNextScreen(`asd`, {}), `incorrect arguments types`);
    assert.throw(() => getNextScreen(1, ``), `incorrect arguments types`);
  });
  it(`throw if incorrect arguments values passed`, () => {
    assert.throw(() => getNextScreen(10500, `argument value out of range`));
    assert.throw(() => getNextScreen(-1, `argument value out of range`));
  });
  it(`Swithc to next screen in array`, () => {
    const tempScreenArray = screens.map((item) => item);
    assert.strictEqual(getNextScreen(tempScreenArray[0], tempScreenArray), (tempScreenArray[1]));
  });
});
