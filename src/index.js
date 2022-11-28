import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

let squirrel = document.getElementById("squirrel");
// let nut = document.getElementById("nut");
let both = 0;  //if users clicks both keys at the same time
let interval;

function moveLeft(){
  let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
  if(left > 0){
    squirrel.style.left = left - 2 + "px";
  }
}

function moveRight(){
  let left = parseInt(window.getComputedStyle(squirrel).getPropertyValue("left"));
  if(left < 550){
    squirrel.style.left = left + 2 + "px";
  }
}

document.addEventListener("keydown", event => {
  if(both === 0){
    both++;
    if(event.key === "ArrowLeft"){
      interval = setInterval(moveLeft, 1);
    }
    if(event.key === "ArrowRight"){
      interval = setInterval(moveRight, 1);
    }
  }
});

document.addEventListener("keyup", event => {
  event.preventDefault();
  clearInterval(interval);
  both = 0;
});

