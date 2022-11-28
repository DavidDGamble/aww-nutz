import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function makeNut() {
	const nutElement = document.createElement("img");
	nutElement.setAttribute("class", "nut");
	nutElement.setAttribute("src", "https://img.icons8.com/arcade/2x/nut.png");
	console.log(nutElement);

	document.querySelector("div.game").append(nutElement);
	const xPos = getRandomNum(0, 600);
	nutElement.css("left", xPos + "px");

	nutElement.css("top", "-100px");
	const nutSpeed = getRandomNum(2000, 6000);

	nutElement.animate({ "top": "430px" },
		nutSpeed, "swing", makeNut);
}

function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
	let num = 10;
	while (num > 0) {
		makeNut();
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
		if (left > 0) {
			squirrel.style.left = left - 2 + "px";
		}
	}

	function moveRight() {
		let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
		if (left < 550) {
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