/* eslint-disable no-unused-expressions */
const { assert } = require('chai');
const { expect } = require('chai');
const myFunctions = require('../app.js');

describe('randomNumbers() function', () => {
  it('The result should be an array', (done) => {
    assert.isArray(myFunctions.randomNumbers());
    done();
  });
  it('The array contains 3 numbers', (done) => {
    assert.lengthOf(myFunctions.randomNumbers(), 3, 'is array of numbers');
    done();
  });
  it('array[0] value cannot be higher than 5', (done) => {
    expect(myFunctions.randomNumbers()[0]).to.be.below(6);
    done();
  });
  it('array[1] value cannot be higher than 5', (done) => {
    expect(myFunctions.randomNumbers()[2]).to.be.below(6);
    done();
  });
  it('array[2] value cannot be higher than 5', (done) => {
    expect(myFunctions.randomNumbers()[1]).to.be.below(6);
    done();
  });
});

describe('bonus() function', () => {
  it('The result should be a value between 0-5', (done) => {
    assert.ok(myFunctions.bonus() < 5 && myFunctions.bonus() >= 0);
    done();
  });
  it('should be boolean', (done) => {
    expect(myFunctions.bonus()).to.be.a('boolean');
    done();
  });
});

describe('getResult() function', () => {
  it('The result should be an object', (done) => {
    assert.isObject(myFunctions.getResult());
    done();
  });
  it('should check object properties', (done) => {
    const object = myFunctions.getResult();
    expect(object).to.have.property('ranNum');
    expect(object).to.have.property('winBig');
    expect(object).to.have.property('winBonus');
    done();
  });
});
