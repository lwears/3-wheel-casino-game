const goButton = document.getElementById('start');

goButton.onclick = function () {
  result();
};

function clearElements() {
    // clear the element to start fresh page
    if (document.contains(document.getElementById('whichWin'))) {
      document.getElementById('whichWin').remove();
    }
    if (document.contains(document.getElementById('whichBonus'))) {
      document.getElementById('whichBonus').remove();
    }
  
    document.getElementById('typeOfWin').textContent = ' ';
    document.getElementById('typeOfBonus').textContent = ' ';
}

async function result() {

  clearElements();
  // change URL depending on where the server is.
  // This had to be changed when testing on mobile devices.
  const urlToFetch = 'http://127.0.0.1:3000/api';

  function createWinElement(typeOfWin) {
    const element = document.createElement('img');
    element.setAttribute('id', 'whichWin');
    document.getElementById('howWin').appendChild(element);
    document.getElementById('typeOfWin').textContent = `${typeOfWin.toUpperCase()} Win!!`;
    document.getElementById('whichWin').src = `/images/${typeOfWin}win.png`;
  }

  function createBonusElement() {
    const element = document.createElement('img');
    element.setAttribute('id', 'whichBonus');
    document.getElementById('bonusWin').appendChild(element);
    document.getElementById('typeOfBonus').textContent = 'Bonus - Free spin!';
    document.getElementById('whichBonus').src = '/images/bonus.png';  
  }  

  const gameResult = await fetch(urlToFetch).then((response) => response.json());
  console.log(gameResult);

  if (gameResult.winBig) createWinElement('big');
  if (gameResult.winSmall) createWinElement('small');

  if (gameResult.winBonus) {
    createBonusElement();
    goButton.disabled = true;
    setTimeout(function () {
      goButton.disabled = false;
    }, 2500);
    setTimeout(function () {
      result();
    }, 2000);
  }

  gameResult.ranNum.forEach((element, index) => {
    for (let x = 0; x < 6; x += 1) {
      if (element === x) {
        document.getElementById(`pic${index}`).src = `/images/Symbol_${element}.png`;
      }
    }
  });
}
