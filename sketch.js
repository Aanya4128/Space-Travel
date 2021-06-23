var bg,bgImg;
var star,starImg 
var alienplanet,alienplanetImg 
var rocket,rocketImg 
var asteroid, asteroidImg
var alien, alienImg
var planet

var aliensGroup, asteroidsGroup, starsGroup

var fuel= 12000;

var gameState= "flight"
var speed=3;

 
function preload(){
  
  starImg = loadImage("assets/star.png")
  alienImg = loadImage("assets/alien.png")
  alienplanetImg = loadImage("assets/alienplanet.png")
  asteroidImg = loadImage("assets/asteroid.png")
  rocketImg = loadImage("assets/Rocket.png");
  bgImg = loadImage("assets/Space.jpeg");
  
   
}

function setup() {
  
  createCanvas(windowWidth,windowHeight);
  player = createSprite (10, displayHeight-300, 50, 50);
  player.addImage(rocketImg)
  player.scale= 0.3;
  planet=createSprite(8000,300);
  planet.addImage(alienplanetImg)
  planet.visible=false
  asteroidsGroup=new Group();
starsGroup=new Group();
aliensGroup=new Group();
}

function draw() {
  background(0); 
  image(bgImg,-800,0,displayWidth*10,displayHeight);
  if(gameState=="flight"){
  if (keyDown(RIGHT_ARROW)){
    player.x=player.x+5;
  }
  if (keyDown(LEFT_ARROW)){
    player.x=player.x-5;

  }
  if (keyDown(UP_ARROW)){
    player.y=player.y-5;
  }

  if (keyDown(DOWN_ARROW)){
    player.y=player.y+5;
  }

  fuel=fuel-speed-1;

 camera.position.x=player.x;
 camera.position.y=player.y;
 showPlanet ();
  drawSprites();
  textSize(20);
  fill("white")
  text(fuel,player.x,player.y-35)

 spawnasteroid();
 spawnalien();
 spawnstar();
 if (asteroidsGroup.isTouching(player)){
   fuel=fuel-200;
 }
 if (aliensGroup.isTouching(player)){
  fuel=fuel-100;
}
if (starsGroup.isTouching(player)){
  fuel=fuel+300;
}
 if(fuel<=0){
   gameState="end";
 }
 if (player.isTouching(planet)){
  
  gameState="won"

 }
}

if(gameState=="end"){
  player.lifetime=0;
  textSize(20);
  fill("white")
  text("Game Over",player.x,player.y-35)
}
if(gameState=="won"){
  asteroidsGroup.destroyEach()
  textSize(20)
  fill("white")
  text("Mission Accomplished!",player.x,player.y-50)
}
}
function spawnasteroid(){
  if(frameCount%100==0){
    asteroid=createSprite(player.x+300,player.y-20);
    asteroid.addImage(asteroidImg);
    asteroid.scale=0.1
    asteroid.velocityX=-8;
    asteroid.lifetime=displayWidth/8;
    asteroidsGroup.add(asteroid);
  }
}
function showPlanet(){
    if (player.x>7500){
  planet.visible=true
    }
  }
  function spawnalien(){
    if(frameCount%180==0){
      alien=createSprite(player.x+300,player.y-20);
      alien.addImage(alienImg);
      alien.scale=0.1
      alien.velocityX=-8;
      alien.lifetime=displayWidth/8;
      aliensGroup.add(alien);
    }
  }
  function spawnstar(){
    if(frameCount%180==0){
      star=createSprite(player.x+300,player.y-20);
      star.addImage(starImg);
      star.scale=0.1
      star.velocityX=-8;
      star.lifetime=displayWidth/8;
      starsGroup.add(star);
    }
  }