const assert = require('assert');
const myFunctions = require('../app.js');
//const describe = require("mocha");

describe('#randomNumbers()', () => {
    it('The result should be an array of 3', (done) => {
        assert.equal(myFunctions.randomNumbers().length , 3);
        done();
    })
});

describe('#bonus()', () => {
    it('The result should be a value between 0-5', (done) => {
        assert.ok(myFunctions.bonus() < 5 && myFunctions.bonus() >= 0);
        done();
    })
});

describe('#getResult()', () => {
    it('The result should be an array of 4', (done) => {
        assert.equal(myFunctions.getResult().length , 4);
        done();
    })
});

