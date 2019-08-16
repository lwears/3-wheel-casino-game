document.getElementById('demo').onclick = function() {
	result();
};

let result = function() {
	//clear the element to start fresh page
	if (document.contains(document.getElementById('whichWin'))) {
		document.getElementById('whichWin').remove();
	}
	if (document.contains(document.getElementById('whichBonus'))) {
		document.getElementById('whichBonus').remove();
	}

	// switch to textContent
	document.getElementById('typeOfWin').innerHTML = ' ';
	document.getElementById('typeOfBonus').innerHTML = ' ';

	// change URL depending on where the server is. This had to be changed when testing on mobile devices.
	let urlToFetch = 'http://127.0.0.1:3000/api2';

	//move fetch url to variable
	fetch(urlToFetch)
		.then(function(response) {
			return response.json();
		})
		.then(function(myJson) {
			//console.log(myJson);

			if (myJson.winBig === true) {
				let element = document.createElement('img');
				element.setAttribute('id', 'whichWin');
				document.getElementById('howWin').appendChild(element);
				document.getElementById('typeOfWin').textContent = 'BIG WIN!!!';
				//document.getElementById('whichWin').width = '150';
				//document.getElementById('whichWin').height = '150';
				document.getElementById('whichWin').src = `/images/bigwin.png`;
			} else if (myJson.winSmall === true) {
				let element = document.createElement('img');
				element.setAttribute('id', 'whichWin');
				document.getElementById('howWin').appendChild(element);
				//document.getElementById('whichWin').width = "150";
				//document.getElementById("whichWin").height = "150";
				document.getElementById('typeOfWin').textContent = 'Small WIN!!!';
				document.getElementById('whichWin').src = `/images/smallwin.png`;
			}

			if (myJson.winBonus === true) {
				let element2 = document.createElement('img');
				element2.setAttribute('id', 'whichBonus');
				document.getElementById('bonusWin').appendChild(element2);
				document.getElementById('typeOfBonus').textContent = 'Bonus - Free spin!';
				//document.getElementById('whichBonus').width = "150";
				//document.getElementById("whichBonus").height = "150";
				document.getElementById('whichBonus').src = `/images/bonus.png`;
				document.getElementById('demo').disabled = true;
				setTimeout(function() {
					document.getElementById('demo').disabled = false;
				}, 2500);
				setTimeout(function() {
					result();
				}, 2000);
			}

			myJson.ranNum.forEach((element, index) => {
				for (let x = 0; x < 6; x++) {
					if (element === x) {
						document.getElementById('pic' + index).src = `/images/Symbol_${element}.png`;
					}
				}
			});
		});

	function isEven(num) {
		if (num % 2 === 0) {
			return true;
		} else {
			return false;
		}
	}
};
