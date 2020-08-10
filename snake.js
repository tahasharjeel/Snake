const canvas=document.getElementById("snake");
const ctx=canvas.getContext("2d");

let eat = new Audio();
let die = new Audio();

eat.src = "eat.mp3";
die.src = "die.mp3";

let prevecode;
let ecode;
let l,r,u,d;
let snakePosX=[100];
let snakePosY=[100];
const snake = {
  x:canvas.width/2,
  y:canvas.height/2,
  width:20,
  height:20,
  color:"#eeeeee",
  score:0,
  size:1,
  speed:100,
  prevX:canvas.width/2,
  prevY:canvas.height/2
}

const fruit = {
  x:Math.floor(Math.random() * 780),
  y:Math.floor(Math.random() * 480),
  width:20,
  height:20,
  color:"#d54062"
}

function drawRect(x,y,w,h,color){
  ctx.fillStyle=color;
  ctx.fillRect(x,y,w,h);
}

drawRect(0,0,canvas.width,canvas.height,"#4ecca3");

function track(){
snakePosX[snake.size]=snake.prevX;
snakePosY[snake.size]=snake.prevY;
for(let k=1;k<snake.size;k++){
  if(snakePosX[0] == snakePosX[k] && snakePosY[0] == snakePosY[k]){
    reset();
  }
}
}




function moveLeft(){
  track();
  snake.prevX=snake.x;
  snake.prevY=snake.y;
  snake.x=snake.x-snake.width;
  prevecode=ecode;
}

function moveUp(){
  track();
  snake.prevX=snake.x;
  snake.prevY=snake.y;
  snake.y=snake.y-snake.height;
  prevecode=ecode;
}

function moveRight(){
  track();
  snake.prevX=snake.x;
  snake.prevY=snake.y;
  snake.x=snake.x+snake.width;
  prevecode=ecode;
}

function moveDown(){
  track();
  snake.prevX=snake.x;
  snake.prevY=snake.y;
  snake.y=snake.y+snake.height;
  prevecode=ecode;
}

function genRandom(){
  fruit.x=Math.floor(Math.random() * 780);
  fruit.y=Math.floor(Math.random() * 480);
}

function drawText(text){
  document.getElementById("score").innerHTML="SCORE "+text;
}

function checkCollision(){
snake.top=snake.y;
snake.right=snake.x+snake.width;
snake.bottom=snake.y+snake.height;
snake.left=snake.x;

fruit.top=fruit.y;
fruit.right=fruit.x+fruit.width;
fruit.bottom=fruit.y+fruit.height;
fruit.left=fruit.x;

return snake.left < fruit.right && snake.top < fruit.bottom && snake.right > fruit.left && snake.bottom > fruit.top;
}



function reset(){
  die.play();
  for(let i=0;i<=snake.size;i++){
    snakePosX[i]=850;
    snakePosY[i]=550;
  }
  snake.x=canvas.width/2;
  snake.y=canvas.height/2;
  snake.score=0;
  snake.size=1;
  ecode=0;
  snake.prevX=canvas.width/2;
  snake.prevY=canvas.height/2;
  snake.speed=100;
}

function update(){



  if(snake.y<0 || snake.x<0 || snake.x+snake.width>canvas.width || snake.y+snake.height>canvas.height){
    reset();
  }

  if(checkCollision()){
    eat.play();
    genRandom();
    snake.score++;
    snake.size++;
    snake.speed--;
  }

  snakePosX[0]=snake.x;
  snakePosY[0]=snake.y;

  document.onkeydown = function(event){
    ecode=event.keyCode;
    switch(event.keyCode){
    case 37:
      if(prevecode!=ecode){
        l = setInterval(moveLeft,snake.speed);
      }
      break;
    case 38:
      if(prevecode!=ecode){
        u = setInterval(moveUp,snake.speed);
      }
      break;
    case 39:
      if(prevecode!=ecode){
        r = setInterval(moveRight,snake.speed);
      }
      break;
    case 40:
      if(prevecode!=ecode){
        d = setInterval(moveDown,snake.speed);
      }  
      break;
    }
  };
  if(ecode==37){
    clearInterval(r);
    clearInterval(u);
    clearInterval(d);
  }
  else if(ecode==38){
    clearInterval(r);
    clearInterval(l);
    clearInterval(d);
  }
  else if(ecode==39){
    clearInterval(u);
    clearInterval(l);
    clearInterval(d);
  }
  else if(ecode==40){
    clearInterval(r);
    clearInterval(l);
    clearInterval(u);
  }
}


function drawSnake(){
  for(let i=0;i<snake.size;i++){
    drawRect(snakePosX[i],snakePosY[i],snake.width,snake.height,"#eeeeee");
  }
  for(let j=0;j<snake.size;j++){
    snakePosX[j]=snakePosX[j+1];
    snakePosY[j]=snakePosY[j+1];
  }
}


function render(){
  drawRect(0,0,canvas.width,canvas.height,"#4ecca3");
  drawText(snake.score);
  drawRect(fruit.x,fruit.y,fruit.width,fruit.height,fruit.color);
  drawSnake();
}

function game(){

  render();
  update();

}

let framePerSec=50;
let loop = setInterval(game,1000/framePerSec);
