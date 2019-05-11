const express = require('express');
const app = express();
const path = require('path');
app.use(express.static('public'));

//Create array of 3 numbers no higher than 5
//https://stackoverflow.com/questions/44164997/can-you-implement-a-while-loop-inside-a-curried-arrow-function-expression
const randomNumbers = () => {
    let arr = [];
    while (arr.length < 3) {
        let r = Math.floor(Math.random() * 6);
        arr.push(r);
    }
    return arr;
};
module.exports.randomNumbers = randomNumbers;

//https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
const bigWin = arr => arr.every(v => v === arr[0]);
module.exports.bigWin = bigWin;

/*
    //https://www.thepolyglotdeveloper.com/2015/02/calculate-duplicates-exist-array-using-javascript/
    This function checks if 2 numbers in the array are the same
 */
const smallWin = (a) => {
    let counts = [];
    for(let i = 0; i <= a.length; i++) {
        if(counts[a[i]] === undefined) {
            counts[a[i]] = 1;
        } else {
            return true;
        }
    }
    return false;
};
module.exports.smallWin = smallWin;

//Bonus round, randomly calculate number, if number = 6 bonus triggered
const bonus = () => {
    let chance = 6;
    let bonusTrue = Math.floor(Math.random() * chance);
    return bonusTrue === chance - 1;
};
module.exports.bonus = bonus;

/*
Original Bonus Function (changed by WebStorm)
bonus = function() {
	var chance = 6;
	var bonusTrue = Math.floor(Math.random() * chance);
	if (bonusTrue === chance -1) {
		return true;
	} else {
		return false;
	}
}
 */

//Final function, calling all 4 previous functions and returning as one JS object - to be passed to frontend
const getResult = () => {
    const ranNum = randomNumbers();
    const winBig = bigWin(ranNum);
    const winBonus = bonus();
    let winSmall = "";
    if (!winBig) {
        winSmall = smallWin(ranNum);
    }

    return { ranNum, winSmall, winBig, winBonus };
};
module.exports.getResult = getResult;

//testing = getResult();
//console.log(testing.winSmall;)

app.get("/index",  (req, res) => {
    // res.send('Hello World');
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.get("/api2", (req, res) => {
    res.send(getResult());
    //randomNumber();
});

app.get('/bonus', (req, res) => {
    res.json(bonus());
});
app.listen(3000, () =>{
    console.log('Express server started at port 3000');
});

/*
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/test", (req, res) => {
    res.render("test");
});

app.get("/test2", (req, res) => {
    res.render("test2");
});

app.get("/netent", (req, res) => {
    var myVar = randomNumber();
    res.render("netent", {myVar: myVar});
    //console.log(myVar);
    //console.log(counts);
});

app.get("/api", (req, res) => {
    res.json(randomNumber());
   //randomNumber();
});
*/



