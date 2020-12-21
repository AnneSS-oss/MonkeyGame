var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana,bananaImage, obstacle, obstacleImage;
var ground;
var score = 0;
var survivalTime = 0;

function preload(){
  

  monkey_running =             loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600,400);
  
  ground = createSprite(400,350,1200,10);
  ground.velocityX = -5;
  
  monkey = createSprite(80,302,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.15;
 
  obstacleGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background("white");
  
  stroke("red");
  textSize(10);
  fill("red");
  text("SCORE: "+ score, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate());
  text("SURVIVAL TIME: "+survivalTime,200,50);
  
  if (gameState === PLAY) {
    if (keyDown("space")&& monkey.y>=100) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if (bananaGroup.isTouching(monkey)) {
      score = score+1;
      bananaGroup.destroyEach();
      
    }
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  }
  
  if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityYEach(0);
    bananaGroup.setVelocityYEach(0);
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.x = 80;
    monkey.y = 302;

  }
   monkey.collide(ground);
 
  
  
  createobstacle();
  createbanana();
 
  drawSprites();
  
}

function createobstacle() {
  if (frameCount%120===0) {
    obstacle = createSprite(600,310,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.2;
    obstacle.lifetime = 130;
    obstacleGroup.add(obstacle);
  }
}
function createbanana() {
  if (frameCount%80===0) {
    banana = createSprite(Math.round(random(600,400)),100,20,20);
    banana.addImage(bananaImage);
    banana.velocityX = -5;
    banana.scale = 0.1;
    banana.lifetime = 130;
    bananaGroup.add(banana);
  }
}