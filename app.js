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

//https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
// const bigWin = arr => arr.every(v => v === arr[0]);

/*
    //https://www.thepolyglotdeveloper.com/2015/02/calculate-duplicates-exist-array-using-javascript/
    This function checks if 2 numbers in the array are the same
 */
// const smallWin = (a) => {
//     let counts = [];
//     for(let i = 0; i <= a.length; i++) {
//         if(counts[a[i]] === undefined) {
//             counts[a[i]] = 1;
//         } else {
//             return true;
//         }
//     }
//     return false;
// };

//Bonus round, randomly calculate number, if number = 6 bonus triggered
const bonus = () => {
    let chance = 6;
    let bonusTrue = Math.floor(Math.random() * chance);
    return bonusTrue === chance - 1;
};

//Final function, calling all 4 previous functions and returning as one JS object - to be passed to frontend
const getResult = () => {
    const ranNum = randomNumbers();
    const winArr = ranNum.filter((number) => ranNum.indexOf(number) !== ranNum.lastIndexOf(number));
    const winBig = winArr.length === 3;
    const winBonus = bonus();
    let winSmall;
    if (!winBig) {
        winSmall = winArr.length === 2;
    }

    return { ranNum, winSmall, winBig, winBonus };
};

app.get("/index",  (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.get("/api", (req, res) => {
    res.send(getResult());
});

app.get('/bonus', (req, res) => {
    res.json(bonus());
});
app.listen(3000, () =>{
    console.log('Express server started at port 3000');
});

module.exports.getResult = getResult;
module.exports.bonus = bonus;
module.exports.randomNumbers = randomNumbers;






