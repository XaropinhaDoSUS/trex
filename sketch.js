var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImg;
var score = 0;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
const PLAY = 1;
const END = 0;
var gameState = PLAY;
var cloudGroup, cactoGroup;
var restart, restartImg, gameOver, gameOverImg;
var jumpSound, checkpointSound, dieSound;


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

  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("collided.wav");
  checkpointSound=loadSound("checkpoint.wav")
}

function setup() {

  createCanvas(600,200);
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  //crie sprite ground (solo)
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  //crie um solo invisível
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();
  cactoGroup = new Group();

  // imagens para reiniciar o jogo
  restart = createSprite(300, 140);
  restart.addImage("restart",restartImg);
  restart.scale=0.5;
  restart.visible= false; 
  gameOver = createSprite(300, 100);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible= false;

}

function draw() {
  //definir cor do plano de fundo
  background("black");
  text('Score: ' + score, 500, 20);
  
  if (gameState === PLAY) {
    // se o jogo estiver rolando

    score = score + Math.round(frameCount/60);

    if(score>0 && score%100===0){
      checkpointSound.play();
    }
    
    ground.velocityX = -4;
    // pulando o trex ao pressionar a tecla de espa�o
    if(keyDown("space") && trex.y >= 100) {
      trex.velocityY = -10;
      jumpSound.play();
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
      dieSound.play();
    }
    
  } else if (gameState === END) {
    // se o jogador morreu
    ground.velocityX = 0;
    trex.changeAnimation("collided");
    restart.visible=true;
    gameOver.visible=true;

    cloudGroup.setVelocityXEach(0);
    cactoGroup.setVelocityXEach(0)
    
    cloudGroup.setLifetimeEach(-1);
    cactoGroup.setLifetimeEach(-1);

    // condicao se o mouse clicar na imagem
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  //impedir que o trex caia
  trex.collide(invisibleGround);

  drawSprites();
}

function reset() {
  score=0
  gameState= PLAY;
  restart.visible=false;
  gameOver.visible=false;
  cloudGroup.destroyEach();
  cactoGroup.destroyEach();
  trex.changeAnimation("running");
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
    cloud.lifetime = 200;
    cloudGroup.add(cloud);
  }
}

function spawnCactos() {
  if(frameCount % 60 === 0){
    
    var cacto=createSprite(600,165,10,40);
    cacto.velocityX= -6;
    cacto.scale= 0.5;
    // numero aleatorio dos cactos
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
    cacto.lifetime = 150;
    cactoGroup.add(cacto);
  }
}