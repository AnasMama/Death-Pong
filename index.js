// import Swal from "sweetalert2"

const form = document.querySelector(".firstname-form");
const submitFirstname = document.querySelector(".firstname-input");
const deathPerson = document.querySelector(".death-person");

const promo = [
  "antoine",
  "antoine",
  "bréogan",
  "christel",
  "françois",
  "henri",
  "jimmy",
  "joeri",
  "lucas",
  "pierre",
  "pierre-jean",
  "richard",
  "romain",
  "saïf-eddine",
  "xavier",
  "yves-marie"
];

let score = 0;
let temps = 90;
const timerElement = document.querySelector(".timer");
const scoreElement = document.querySelector(".score");

// Fonction permetant de ne pas prendre en compte les accents
String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
     
    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }
    return str;
}

// Pseudo du joueur

const firstname = prompt("Quel est ton prénom ?");
for (let i = 0; i < promo.length; i++) {
  if (firstname.sansAccent() == promo[i]) {
    promo.splice(i, 1);
  }
}


// Fonction pour jouer le son pour l'écriture du nom de la personne
const song = new Audio("./src/Audio.mp3");

form.onsubmit = function (event) {
  event.preventDefault();

  if (submitFirstname.value.toLowerCase() == "anas" || submitFirstname.value.toLowerCase() == "bastien") {
    alert("IMPOSSIBLE !!! Cet homme est immortel ! Tu perds 10s...");
    temps -= 10;
  }
  if (submitFirstname.value.toLowerCase() == firstname) {
    alert("Tu t'es suicidé... imbécile...");
    location.reload();
  }
  if (submitFirstname.value == "antoine" && promo.filter(e => e === "antoine").length === 1) {
    alert(
      "COMBO x2 ! C'est bon tu as eu les 2 !"
    );
  }

  for (let i = 0; i < promo.length; i++) {
    if (submitFirstname.value.toLowerCase().sansAccent() == promo[i].toLowerCase().sansAccent()) {
      const dead = document.createElement("li");
      // playAudio(deathPerson);
      song.play();

      dead.innerHTML = submitFirstname.value;
      dead.classList.add("dead");
      deathPerson.appendChild(dead);
      promo.splice(i, 1);
      score += 1;
      scoreElement.innerHTML =
        "Tu as tué " +
        score +
        " personnes. Il te reste " +
        promo.length +
        " victimes.";
    }
  }
  submitFirstname.value = "";
};

const reduceTimer = () => {
  temps--;
  timerElement.innerHTML = "Il te reste " + temps + " secondes.";
  if (promo.length == 0 || score == 16) {
    alert(
      "Bon ba t'as tué tous le monde... POULOULOU comment c'est trop la classe ! Je te laisse découvrir mon secret..."
    );
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    location.reload();
  }
  if (temps == 0 || temps < 0) {
    if (score < 6) {
      alert(
        "C'est FINI bro' !!! Ton score est de " +
          score +
          ". Franchement c'est pas ouf..."
      );
    } else if (score < 12) {
      alert(
        "C'est FINI bro' !!! Ton score est de " +
          score +
          ". Pas mal mais bon tu peux faire mieux non ?"
      );
    } else if (score >= 12) {
      alert("C'est FINI bro' !!! Ton score est de " + score + ". P'sartek !");
    }
    location.reload();
  }
};
setInterval(reduceTimer, 1000);

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var x = canvas.width / 2;
var y = canvas.height - 30;
// Variable ball
var dx = 2;
var dy = -2;
var ballRadius = 15;
// Variable paddle
var paddleHeight = 10;
var paddleWidth = 120;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

let lineaire2 = ctx.createLinearGradient(150, 25, 275, 125);
lineaire2.addColorStop(0, "#DD4"); //Jaune
lineaire2.addColorStop(1, "#D44"); //Rouge

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = lineaire2;
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(element) {
  if (element.key == "Right" || element.key == "ArrowRight") {
    rightPressed = true;
  } else if (element.key == "Left" || element.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(element) {
  if (element.key == "Right" || element.key == "ArrowRight") {
    rightPressed = false;
  } else if (element.key == "Left" || element.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  x += dx;
  y += dy;
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  // Balle qui touche le sol = game over
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x >= paddleX && x <= paddleX + paddleWidth) {
      dy = -dy;
    } else {
      alert(
        "MA POMME !!! C'est ennuyant... Je vais devoir écrire ton nom... " +
          firstname +
          "..."
      );
      document.location.reload();
      clearInterval(interval);
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

var interval = setInterval(draw, 10);
