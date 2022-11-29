import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Score from './js/score.js';

let game = document.getElementById("game");
let squirrel = document.getElementById("squirrel");
let nut = document.getElementById("nut");
let both = 0;  //if users clicks both keys at the same time
let interval;
let score = new Score();

const checkHit = setInterval(function () {
  const squirrelLeft = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
  const squirrelRight = squirrelLeft + 50;
  const nutLeft = parseInt(window.getComputedStyle(nut).getPropertyValue("left"));
  const nutRight = nutLeft + 20;
  const nutBot = parseInt(window.getComputedStyle(nut).getPropertyValue("top"));
  if (nutRight >= squirrelLeft && nutLeft <= squirrelRight && nutBot >= 560) {
    nut.remove();
    score.currScore++;
    document.getElementById("scoreSpan").innerHTML = score.currScore;
    nut.style.left = score.random() + "px";
    game.append(nut);
    score.checkLevel();
  } else if (nutBot >= 620) {
    // code for game over ----------
    alert("ur dead");
    score.checkHigh(); // insert highscore to DOM
    score.currScore = 0;
    console.log(score.highScore);
  }
}, 10);
console.log(checkHit);

function moveLeft() {
  let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
  if (left > 0) {
    squirrel.style.left = left - 1 + "px";
  }
}

function moveRight() {
  let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
  if (left < 550) {
    squirrel.style.left = left + 1 + "px";
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