import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import backgroundMusic from './assets/audio/Powerful-Trap-.mp3';                 
import cartoonBite from './assets/audio/cartoonBite.mp3';                        
import endSound from './assets/audio/endGameSound.mp3';                           
import Score from './js/score.js';
import Swal from 'sweetalert2';

let game = document.getElementById("game");
let squirrel = document.getElementById("squirrel");
let nut = document.getElementById("acorn");
let nut2 = document.getElementById("nut2");
let nut3 = document.getElementById("nut3");
let anvil = document.getElementById("nut4");
let both = 0;  //if users clicks both keys at the same time
let interval;
let score = new Score();
let backgroundSound = new Audio(backgroundMusic);

function gameOverAlert() {
  backgroundSound.pause();
  Swal.fire({
    title: 'Aww Nutz, You Lost!',
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
  });
  let endGameSound = new Audio(endSound);                     
  endGameSound.play();       
}

const createNut = () => {
  if (score.currScore === 5) {
    setTimeout(() => {
      if (!score.gameOver) {
        nut2.removeAttribute("id", "acorn");
        nut2.setAttribute("id", "acorn2");
        nut2.removeAttribute("class", "hidden");
        nut2.style.left = score.random() + "px";
        game.append(nut2);
      }
    }, "1000");
  } else if (score.currScore === 10) {
    setTimeout(() => {
      if (!score.gameOver) {
        nut3.removeAttribute("id", "acorn");
        nut3.setAttribute("id", "acorn3");
        nut3.removeAttribute("class", "hidden");
        nut3.style.left = score.random() + "px";
        game.append(nut3);
      }
    }, "2000");

  } else if (score.currScore === 15) {
    setTimeout(() => {
      if (!score.gameOver) {
        anvil.removeAttribute("id", "acorn");
        anvil.setAttribute("id", "acorn4");
        anvil.removeAttribute("class", "hidden");
        anvil.style.left = score.random() + "px";
        game.append(anvil);
      }
    }, "3000");
  }
};


function startGame(event) {
  event.preventDefault();
  score.gameOver = false;

  let cartoonSound = new Audio(cartoonBite);                         
  backgroundSound.play();                                            

  document.getElementById("scoreSpan").innerHTML = score.currScore;
  const startBtn = document.getElementById("startBtn");
  const nutFallingAnimation = document.getElementById("acorn");
  startBtn.setAttribute("class", "hidden");
  nutFallingAnimation.removeAttribute("class", "hidden");
  const checkHit = setInterval(function () {
    const squirrelLeft = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
    const squirrelRight = squirrelLeft + 50;
    const nutLeft = parseInt(window.getComputedStyle(nut).getPropertyValue("left"));
    const nutRight = nutLeft + 20;
    const nutBot = parseInt(window.getComputedStyle(nut).getPropertyValue("top"));
    let nut2Left;
    let nut2Right;
    let nut2Bot;
    let nut3Left;
    let nut3Right;
    let nut3Bot;
    let anvilLeft;
    let anvilRight;
    let anvilBot;

    if (score.currScore > 5) {
      nut2Left = parseInt(window.getComputedStyle(nut2).getPropertyValue("left"));
      nut2Right = nut2Left + 20;
      nut2Bot = parseInt(window.getComputedStyle(nut2).getPropertyValue("top"));
    }
    if (score.currScore > 10) {
      nut3Left = parseInt(window.getComputedStyle(nut3).getPropertyValue("left"));
      nut3Right = nut3Left + 20;
      nut3Bot = parseInt(window.getComputedStyle(nut3).getPropertyValue("top"));
    }
    if (score.currScore > 15) {
      anvilLeft = parseInt(window.getComputedStyle(anvil).getPropertyValue("left"));
      anvilRight = anvilLeft + 20;
      anvilBot = parseInt(window.getComputedStyle(anvil).getPropertyValue("top"));

    }

    if (nutRight >= squirrelLeft && nutLeft <= squirrelRight && nutBot >=560) {
      nut.remove();
      score.currScore++;
      cartoonSound.play();                                                        
      document.getElementById("scoreSpan").innerHTML = score.currScore;
      nut.style.left = score.random() + "px";
      game.append(nut);
      
      createNut();
    } else if (nutBot >= 620) {     
      backgroundSound.pause();                                                                  
      endGame();
    }
    if (nut2Right >= squirrelLeft && nut2Left <= squirrelRight && nut2Bot >=560) {
      nut2.remove();
      score.currScore++;
      cartoonSound.play();                                                       
      document.getElementById("scoreSpan").innerHTML = score.currScore;
      nut2.style.left = score.random() + "px";
      game.append(nut2);
      createNut();
    } else if (nut2Bot >= 620) {
      backgroundSound.pause(); 
      endGame();                                                                    
    }

    if (nut3Right >= squirrelLeft && nut3Left <= squirrelRight && nut3Bot >=560) {
      nut3.remove();
      score.currScore++;
      cartoonSound.play();                                                        
      document.getElementById("scoreSpan").innerHTML = score.currScore;
      nut3.style.left = score.random() + "px";
      game.append(nut3);
      score.checkLevel();
    } else if (nut3Bot >= 620) {
      backgroundSound.pause(); 
      endGame();
    }

    if (anvilRight >= squirrelLeft && anvilLeft <= squirrelRight && anvilBot >= 520) {
      backgroundSound.pause(); 
      endGame();
    } else if (anvilBot >= 580) {
      anvil.remove();
      anvil.style.left = score.random() + "px";
      game.append(anvil);
    }
  }, 10);
  console.log(`Check hit: ${checkHit}`);

  function endGame() {
    score.gameOver = true;
    const aboveButton = document.getElementById("aboveButton");
    startBtn.removeAttribute("class", "hidden");
    aboveButton.append(startBtn);
    startBtn.setAttribute("class", "btn btn-warning");
    backgroundSound.pause(); 
    nutFallingAnimation.setAttribute("class", "hidden");
    nut2.setAttribute("class", "hidden");
    nut3.setAttribute("class", "hidden");
    anvil.setAttribute("class", "hidden");

    gameOverAlert();
    score.checkHigh();
    score.currScore = 0;
    backgroundSound.pause(); 
    document.getElementById("highSpan").innerHTML = score.highScore;
  }
}

function moveLeft() {
  let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
  if (left > 0) {
    squirrel.style.left = left - 3 + "px"; 
  }
}

function moveRight() {
  let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
  if (left < 550) {
    squirrel.style.left = left + 3 + "px"; 
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

window.addEventListener("load", function () {
  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", startGame);
});                                                          