var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImg;
var score;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
const PLAY = 1;
const END = 0;
var gameState = PLAY;
var cloudGroup, cactoGroup;


function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloudImg=loadImage("cloud.png");

  cacto1=loadImage("obstacle1.png");
  cacto2=loadImage("obstacle2.png");
  cacto3=loadImage("obstacle3.png");
  cacto4=loadImage("obstacle4.png");
  cacto5=loadImage("obstacle5.png");
  cacto6=loadImage("obstacle6.png");
}

function setup() {

  createCanvas(600,200);
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  cactoGroup = new Group();
}

function draw() {
  //definir cor do plano de fundo
  background("black");
  
  if (gameState === PLAY) {
    // se o jogo estiver rolando
    
    // pulando o trex ao pressionar a tecla de espa�o
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
    }

    // efeito gravidade para o pulo
    trex.velocityY = trex.velocityY + 0.8;

    // faz o ch�o repetir
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    // criar as nuvens
    spawnClouds();

    // criar os cactos
    spawnCactos();
    if (cactoGroup.isTouching(trex)){
      gameState = END;
    }
    

  } else if (gameState === END) {
    // se o jogador morreu
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0);
    cactoGroup.setVelocityXEach(0)
    
  }
  
  
  //impedir que o trex caia
  trex.collide(invisibleGround);

  drawSprites();
}

  //funcao para gerar as nuvens
function spawnClouds(){
  //escreva seu codigo aqui
  if(frameCount % 60 === 0){
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImg);
    cloud.y = Math.round(random(10,80));
    cloud.scale = 0.55;
    cloud.velocityX = -3;
    cloudGroup.add(cloud);
  }
}

function spawnCactos() {
  if(frameCount % 60 === 0){
    
    var cacto=createSprite(600,165,10,40);
    cacto.velocityX= -6;
    cacto.scale= 0.5;
    var rand = Math.round(random(1,6));
  
    switch (rand) {
      case 1:
        cacto.addImage(cacto1);
        break;
      case 2:
        cacto.addImage(cacto2);
        break;
      case 3:
        cacto.addImage(cacto3);
        break;
      case 4:
        cacto.addImage(cacto4);
        break;
      case 5:
        cacto.addImage(cacto5);
        break;
      case 6:
        cacto.addImage(cacto6);
        break;
    }

    cactoGroup.add(cacto);
  }

}
