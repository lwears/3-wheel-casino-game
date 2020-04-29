const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

const randomNumbers = () => {
  const arr = [];
  while (arr.length < 3) {
    const r = Math.floor(Math.random() * 6);
    arr.push(r);
  }
  return arr;
};

const bonus = () => {
  const chance = 6;
  const bonusTrue = Math.floor(Math.random() * chance);
  return bonusTrue === chance - 1;
};

const getResult = () => {
  const ranNum = randomNumbers();
  const winArr = ranNum.filter((num) => ranNum.indexOf(num) !== ranNum.lastIndexOf(num));
  const winBig = winArr.length === 3;
  const winBonus = bonus();
  let winSmall;
  if (!winBig) winSmall = winArr.length === 2;

  return {
    ranNum,
    winSmall,
    winBig,
    winBonus,
  };
};

app.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.get('/api', (req, res) => {
  res.send(getResult());
});

app.listen(3000, () => {
  console.log('Express server started at port 3000');
});

module.exports = {
  getResult,
  bonus,
  randomNumbers,
};
