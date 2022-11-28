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
});

