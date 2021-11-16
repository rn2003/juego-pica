// Hecho por candygz@gmail.com

var PLAY = 1; // cuando el valor de una variable será constante usamos mayúsculas
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("pika1.png","pika3.png","pika2.png");
  trex_collided = loadAnimation("pikadead.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("ptero.png");
  
  obstacle1 = loadImage("snorlax.png");
  obstacle2 = loadImage("snorlax.png");
  obstacle3 = loadImage("snorlax.png");
  obstacle4 = loadImage("snorlax.png");
  obstacle5 = loadImage("snorlax.png");
  obstacle6 = loadImage("snorlax.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(40,80,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.15;
  
  fill(color(0, 0, 255));
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,900,20);
  invisibleGround.visible = false;
 
  
  let obstacle = color ("darkorange");
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  //console.log("Hello" + 5);   
  
  score = 0;
  
  trex.setCollider("circle", 60,50,120);
  trex.debug = false  ;
}

function draw() {
  background ("#AFEEEE");
  text("Score: "+ score, 500,50);
  
  console.log("This is " + gameState);
  
  if (gameState === PLAY){
     ground.velocityX = -4;
     score = score + Math.round(frameCount/60);
    
      if (ground.x < 0){
      ground.x = ground.width/2;
      }
    
      if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -13;
      }
     
      trex.velocityY = trex.velocityY + 0.8;

      //aparece las nubes
      spawnClouds();

      //aparece obstáculos en el suelo
      
    spawnObstacles();
    
      if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      }
   }  
  else if (gameState === END){
      ground.velocityX = 0;
      trex.velocityY = 0;
      // cambia la animación del trex al chocar
      trex.changeAnimation("collided", trex_collided);
      trex.scale = 0.3;
      
      obstaclesGroup.setLifetimeEach(-1);
      cloudsGroup.setLifetimeEach(-1);
    
      obstaclesGroup.setVelocityXEach(0);
      cloudsGroup.setVelocityXEach(0);
     }
  
 // evita que trex se caiga
 trex.collide(invisibleGround);
 
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
  
   
    //genera obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //asigna escala y ciclo de vida a los obstáculos           
    obstacle.scale = 1.2;
    obstacle.lifetime = 300;
   
   // añadimos cada obstáculo al grupo
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //escribe aquí el código para aparecer las nubes
    if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.9;
    cloud.velocityX = -5;
    
     //asigna un ciclo de vida a la variable
    cloud.lifetime = 200;
    
    //ajusta la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    // añadimos cada nube al grupo
   cloudsGroup.add(cloud);
  }
  
}