/*
Used these for help with the unit testing
https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d
https://stackabuse.com/testing-node-js-code-with-mocha-and-chai/
http://www.zsoltnagy.eu/writing-automated-tests-with-mocha-and-chai/
 */

const assert = require('chai').assert;
const expect = require('chai').expect;
const myFunctions = require('../app.js');

describe('#randomNumbers()', () => {
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

describe('#bonus()', () => {
    it('The result should be a value between 0-5', (done) => {
        assert.ok(myFunctions.bonus() < 5 && myFunctions.bonus() >= 0);
        done();
    });
    it('should be boolean', (done) => {
        expect(myFunctions.bonus()).to.be.a( 'boolean' );
        done();
    });
});

describe('#getResult()', () => {
    it('The result should be an object', (done) => {
        assert.isObject(myFunctions.getResult());
        done();
    });
    it('should check object properties', (done) => {
        let object = myFunctions.getResult();
        expect(object).to.have.property('ranNum')
        expect(object).to.have.property('winBig')
        expect(object).to.have.property('winBonus')
        done();
    });
});

describe('#smallWin()', () => {
    it('[1,1,0] should return true', (done) => {
        expect(myFunctions.smallWin([1,1,0])).to.be.true;
        done();
    });
    it('[1,2,0] should return false', (done) => {
        expect(myFunctions.smallWin([1,2,0])).to.be.false;
        done();
    });
});

describe('#bigWin()', () => {
    it('[1,1,1] should return true', (done) => {
        expect(myFunctions.bigWin([1,1,1])).to.be.true;
        done();
    });
    it('[1,2,0] should return false', (done) => {
        expect(myFunctions.bigWin([1,2,0])).to.be.false;
        done();
    });
    it('[1,1,0] should return false', (done) => {
        expect(myFunctions.bigWin([1,1,0])).to.be.false;
        done();
    });
});

