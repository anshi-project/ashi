
const temperatureDataUrl = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json'
const expect = chai.expect;
require('babel-polyfill');

import {cow} from './my-app';

describe('Cows', () => {
  let koe;

  beforeEach(() => {
    koe = Object.create(cow);
  });

  it('should sound like a cow', () => {
    expect(koe.sound()).to.equal('MOOOOOO');
  });

  it('should have 4 legs', () => {
    expect(koe.legs).to.equal(4);
  });
});


describe('Async tests', () => {
  it('should retrieve base temperature asynchronously', async () => {
    const prom = Promise.resolve($.get(temperatureDataUrl));
    const result = JSON.parse(await prom);
    expect(result.baseTemperature).to.equal(8.66);
  });
});
