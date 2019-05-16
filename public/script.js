//on click of 'demo' button run function result()
document.getElementById("demo").onclick = function() {result()};

let result = function() {

    //clear the element to start fresh page
    if (document.contains(document.getElementById("whichWin"))) {
        document.getElementById("whichWin").remove();
    }
    if (document.contains(document.getElementById("whichBonus"))) {
        document.getElementById("whichBonus").remove();
    }

    document.getElementById('typeOfWin').innerHTML = " ";
    document.getElementById('typeOfBonus').innerHTML = " ";

    // change URL depending on where the server is. This had to be changed when testing on mobile devices.
    let urlToFetch = 'http://127.0.0.1:3000/api2'

    //moved fetch url to variable
    fetch(urlToFetch)
        
        //process the response promise
        .then(function(response) {
            return response.json();
        })
        .then(function (myJson) {
            //console.log(myJson); testing response
            
            // if winBig is true build the following element to show the win
            if (myJson.winBig === true) {
                let element = document.createElement("img");
                element.setAttribute("id", "whichWin");
                document.getElementById('howWin').appendChild(element);
                document.getElementById('typeOfWin').innerHTML = "BIG WIN!!!";
                document.getElementById('whichWin').width = "150";
                document.getElementById("whichWin").height = "150";
                document.getElementById('whichWin').src = `/images/bigwin.png`;
            // if winBig is false, smallWin element can be built
            } else if (myJson.winSmall === true) {
                let element = document.createElement("img");
                element.setAttribute("id", "whichWin");
                document.getElementById('howWin').appendChild(element);
                document.getElementById('whichWin').width = "150";
                document.getElementById("whichWin").height = "150";
                document.getElementById('typeOfWin').innerHTML = "Small WIN!!!";
                document.getElementById('whichWin').src = `/images/smallwin.png`;
            }
            
            // same element build but this time for the bonus. 
            // Also sets 2.5 second pause on the demo button if true to avoid the user clicking again
            if (myJson.winBonus === true) {
                let element2 = document.createElement("img");
                element2.setAttribute("id", "whichBonus");
                document.getElementById('bonusWin').appendChild(element2);
                document.getElementById('typeOfBonus').innerHTML = "Bonus - Free spin!";
                document.getElementById('whichBonus').width = "150";
                document.getElementById("whichBonus").height = "150";
                document.getElementById('whichBonus').src = `/images/bonus.png`;
                document.getElementById("demo").disabled = true;
                setTimeout(function(){document.getElementById("demo").disabled = false;},2500);
                setTimeout(function() {
                    result();
                },2000);

            }

            /*
            I had a bit of help with this piece of code,I started off first with a lots of If, Else if statements.
            Then moved onto a switch statement. then finally onto the below
            A friend of mine explained how its best to try and slim down the code and not repeat code where unnecessary.
            First this code runs the forEach on the returned array of 3. Then there are a possible 6 images to choose from,
            so there is a for loop upto 6 (or 5) to go through the 6 options. Based on what the element in the array is
            it will choose the corresponding image.
            */
            myJson.ranNum.forEach((element, index) => {
                for (let x = 0; x < 6; x++) {
                    if (element === x) {
                        document.getElementById( "pic" + index ).src = `/images/Symbol_${element}.png`;
                    }
                }
            });


        });



};