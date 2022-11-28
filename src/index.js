import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


let squirrelElement = document.createElement("img");
squirrelElement.setAttribute("src", "https://www.veryicon.com/download/png/animal/lovely-animal/squirrel-7?s=256");
document.querySelector("div#squirrel").append(squirrelElement);



// function makeNut() {
const nutElement = document.createElement("img");
nutElement.setAttribute("class", "nut");
nutElement.setAttribute("src", "https://img.icons8.com/arcade/2x/nut.png");
console.log(nutElement);


document.querySelector("div#nut").append(nutElement);

// const xPos = getRandomNum(0, 600);

// 	nutElement.keyfram("left", xPos + "px");

// 	nutElement.css("top", "-100px");
// 	const nutSpeed = getRandomNum(2000, 6000);

// 	nutElement.animate({ "top": "430px" },
// 		nutSpeed, "swing", makeNut);
// }

// function getRandomNum(min, max) {
// 	return Math.floor(Math.random() * (max - min + 1)) + min;
// }

function startGame() {
	let num = 10;
	while (num > 0) {
		// makeNut();
		num--;
	}
}
window.addEventListener("load", function () {
	document.getElementById("start").addEventListener("click", startGame);
	let squirrel = document.getElementById("squirrel");
	// let nut = document.getElementById("nut");
	let both = 0;  //if users clicks both keys at the same time
	let interval;

	function moveLeft() {
		let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
		if (left > -60) {
			squirrel.style.left = left - 2 + "px";
		}
	}

	function moveRight() {
		let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
		if (left < 490) {
			squirrel.style.left = left + 2 + "px";
		}
	}

	document.addEventListener("keydown", event => {
		if (both === 0) {
			both++;
			if (event.key === "ArrowLeft") {
				interval = setInterval(moveLeft, 1);
			}
			if (event.key === "ArrowRight") {
				interval = setInterval(moveRight, 1);
			}
		}
	});

	document.addEventListener("keyup", event => {
		event.preventDefault();
		clearInterval(interval);
		both = 0;
	});
});
