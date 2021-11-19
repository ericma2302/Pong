document.getElementById("pong").width = window.innerWidth - 10;
document.getElementById("pong").height = window.innerHeight - 330;

const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
const speedHTML = document.getElementById("speed").innerHTML;
var startingVel = 5;

if(speedHTML == " 1.5 ") {
  startingVel *= 1.5;
}
else if(speedHTML == " 2.0 ") {
  startingVel *= 2;
}

class Paddle {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.score = 0;
    this.draw();
  }

  moveUp() {
    if(this.y > 0) {
      this.clear();
      this.y -= 10;
      this.draw();
    }
  }

  moveDown() {
    if(this.y < canvas.height - this.height) {
      this.clear();
      this.y += 10;
      this.draw()
    }
  }

  clear() {
    context.fillStyle = "white";
    context.fillRect(this.x - 5, this.y - 5, this.width + 10, this.height + 10);
    context.fillStyle = "black";
  }

  draw() {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  constructor(x, y, radius, xVel, yVel) {
    this.x = x;
    this.y = y;
    this.origX = x;
    this.origY = y;
    this.radius = radius;
    this.xVel = xVel;
    this.yVel = yVel;
    this.startingSpeed = Math.sqrt(this.xVel * this.xVel +
                this.yVel * this.yVel);
    this.draw();
  }

  move() {
    this.clear();
    this.x += this.xVel;
    this.y += this.yVel;
    this.draw();

    if(this.checkCollision(user1) || this.checkCollision(user2)) {
      this.xVel *= -1.05;
    }

    if(this.x - this.radius <= 10) {
      user2.score++;
      document.getElementById("right").innerHTML = user2.score;
      this.reset();
      if(user2.score == 5) {
        endGame("user2");
      }
    }
    else if(this.x + this.radius >= canvas.width - 10) {
      user1.score++;
      document.getElementById("left").innerHTML = user1.score;
      this.reset();
      if(user1.score == 5) {
        endGame("user1");
      }
    }
  }

  reset() {
    this.clear();
    this.x = this.origX;
    this.y = this.origY;
    this.xVel = Math.random() * (startingVel/(12/7)) + (startingVel/(12/5));
    this.yVel = Math.sqrt(Math.pow(this.startingSpeed, 2) -
                          Math.pow(this.xVel, 2));
    let direction = Math.random() * 4;
    if(direction < 2 && direction >= 1) {
      this.xVel *= -1;
    }
    else if(direction < 3 && direction >= 2) {
      this.yVel *= -1;
    }
    else if(direction < 4 && direction >= 3){
      this.xVel *= -1;
      this.yVel *= -1;
    }
    this.draw();
  }

  checkCollision(paddle) {
    let top = this.y - this.radius;
    let bottom = this.y + this.radius;
    let left = this.x - this.radius;
    let right = this.x + this.radius;
    if(left >= paddle.x - 10 && right <= paddle.x + paddle.width + 10 &&
        top >= paddle.y - 20 && bottom <= paddle.y + paddle.height + 20) {
          return true;
        }
    else {
      return false;
    }
  }

  clear() {
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.beginPath();
    context.arc(this.x, this.y, this.radius + 2, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
    context.strokeStyle = "black";
    context.fillStyle = "black";
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }
}

const user1 = new Paddle(100, 100, 10, 100);
const user2 = new Paddle(canvas.width - 100, 100, 10, 100);
const ball = new Ball(canvas.width/2, canvas.height/2, 10, startingVel, startingVel);

document.addEventListener("keydown", setKeyDown);

const keysPressed = [];

function setKeyDown(evt) {
  if(evt.keyCode == 87) {
    keysPressed["w"] = true;
  }
  else if (evt.keyCode == 83){
    keysPressed["s"] = true;
  }
  else if (evt.keyCode == 38){
    keysPressed["up"] = true;
  }
  else if(evt.keyCode == 40) {
    keysPressed["down"] = true;
  }
}

document.addEventListener("keyup", setKeyUp);

function setKeyUp(evt) {
  if(evt.keyCode == 87) {
    keysPressed["w"] = false;
  }
  else if (evt.keyCode == 83){
    keysPressed["s"] = false;
  }
  else if (evt.keyCode == 38){
    keysPressed["up"] = false;
  }
  else if(evt.keyCode == 40) {
    keysPressed["down"] = false;
  }
}

function movePaddle() {
  if(keysPressed["w"]) {
    user1.moveUp();
  }
  if (keysPressed["s"]){
    user1.moveDown();
  }
  if (keysPressed["up"]){
    user2.moveUp();
  }
  if(keysPressed["down"]) {
    user2.moveDown();
  }
}

function updateGame() {
  user1.draw();
  user2.draw();
  ball.move();
  movePaddle();
  if(ball.x >= canvas.width || ball.x <= 0) {
    ball.xVel *= -1;
  }
  if(ball.y >= canvas.height || ball.y <= 0) {
    ball.yVel *= -1;
  }
}

function endGame(user) {
  if(user == "user1") {
    window.location.href = "http://127.0.0.1:5000/".concat("user1");
  }
  else{
    window.location.href = "http://127.0.0.1:5000/".concat("user2");
  }
}

setInterval(updateGame, 20);
