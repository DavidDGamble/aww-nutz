import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Score from './js/score.js';
import Swal from 'sweetalert2';



let game = document.getElementById("game");
let squirrel = document.getElementById("squirrel");
let nut = document.getElementById("acorn");
let both = 0;  //if users clicks both keys at the same time
let interval;
let score = new Score();

function startGame(event) {                                         // NEW CODE

  event.preventDefault();
  const startBtn = document.getElementById("startBtn");             // NEW CODE
  const nutFallingAnimation = document.getElementById("nut");       // NEW CODE
  startBtn.setAttribute("class", "hidden");                         // NEW CODE
  nutFallingAnimation.removeAttribute("class", "hidden");           // NEW CODE

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
      const aboveButton = document.getElementById("aboveButton");      // NEW CODE
      startBtn.removeAttribute("class", "hidden");                     // NEW CODE

      aboveButton.append(startBtn);                                    // NEW CODE
      startBtn.setAttribute("class", "btn btn-warning");               // NEW CODE
      nutFallingAnimation.setAttribute("class", "hidden");             // NEW CODE

      Swal.fire({                                                        // ----------START ALERT--------------
        title: 'Aww, Nutz, You Lost!',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(https://sweetalert2.github.io/images/trees.png)',
        backdrop: `
        rgba(0,0,123,0.4)
        url("https://sweetalert2.github.io/images/nyan-cat.gif")
        left top
        no-repeat
      `
      });                                                                // --------END ALERT---------------
    
      score.checkHigh();
      score.currScore = 0;
      document.getElementById("highSpan").innerHTML = score.highScore;
    }
  }, 10);
  console.log(checkHit);


}                                                                      // ENDING BRACKET FOR START GAME FUNCTION

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

window.addEventListener("load", function () {                 // NEW CODE
  const startBtn = document.getElementById("startBtn");       // NEW CODE
  startBtn.addEventListener("click", startGame);              // NEW CODE
});                                                           // NEW CODE