const goButton = document.getElementById('start');

function clearElements() {
  if (document.contains(document.getElementById('win-img'))) {
    document.getElementById('win-img').remove();
  }
  if (document.contains(document.getElementById('bonus-img'))) {
    document.getElementById('bonus-img').remove();
  }

  document.getElementById('win-type').textContent = ' ';
  document.getElementById('bonus-type').textContent = ' ';
}

function createWinElement(typeOfWin) {
  const element = document.createElement('img');
  element.setAttribute('id', 'win-img');
  element.classList.add('win-img');
  document.getElementById('win-container').appendChild(element);
  document.getElementById('win-type').textContent = `${typeOfWin.toUpperCase()} Win!!`;
  document.getElementById('win-img').src = `/images/${typeOfWin}win.png`;
}

function createBonusElement() {
  const element = document.createElement('img');
  element.setAttribute('id', 'bonus-img');
  element.classList.add('bonus-img');
  document.getElementById('bonus-container').appendChild(element);
  document.getElementById('bonus-type').textContent = 'Bonus - Free spin!';
  document.getElementById('bonus-img').src = '/images/bonus.png';
}

function fetchResult() {
  return fetch('/api').then((response) => response.json());
}

async function generateResult() {
  clearElements();

  const gameResult = await fetchResult();

  if (gameResult.winBig) createWinElement('big');
  if (gameResult.winSmall) createWinElement('small');

  if (gameResult.winBonus) {
    createBonusElement();
    goButton.style.filter = 'grayscale(1)';
    goButton.disabled = true;
    setTimeout(() => {
      goButton.style.filter = 'grayscale(0)';
      goButton.disabled = false;
    }, 2500);
    setTimeout(() => {
      generateResult();
    }, 2000);
  }

  gameResult.ranNum.forEach((element, index) => {
    for (let x = 1; x < 6; x += 1) {
      if (element === x) {
        document.getElementById(`pic${index}`).src = `/images/Symbol_${element}.png`;
      }
    }
  });
}

goButton.onclick = () => generateResult();
