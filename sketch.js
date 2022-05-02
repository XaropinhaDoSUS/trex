var trex, trex_running;
var edges;
var ground, groundImg;

function preload()
{  
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImg = loadImage("ground2.png");
}

function setup()
{
  createCanvas(600, 200);

  //crie um sprite de trex
  trex = createSprite(50, 160, 20, 50);  
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;

  ground = createSprite(200, 180, 400, 10);
  ground.addImage("ground", groundImg);
  ground.velocityX = -4;
  
  edges = createEdgeSprites();
}

function draw()
{  
  background("black");
  if (keyDown("space")) {    
    trex.velocityY = -10;  
  }

  console.log(ground.x);

  trex.velocityY = trex.velocityY + 0.5;trex.collide(edges[3]);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  drawSprites();
}