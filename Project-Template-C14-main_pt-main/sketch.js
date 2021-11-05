var bow , arrow,  background, redB, pinkB, greenB ,blueB ,arrowGroup;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var estadoJogo = "iniciar";
var score =0;
function preload(){  
  backgroundImage = loadImage("background0.png");
  
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
}

function setup() {
  createCanvas(400, 400);
  
  // criar o fundo
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // criando arco para atirar a flecha
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  score = 0  
  redB= new Group();
  greenB= new Group();
  blueB= new Group();
  pinkB= new Group();
  arrowGroup= new Group();  
}

function draw() {
 background(0);
  
  if (scene.x < 0){
    scene.x = scene.width/2;
  }
  
  //criando inimigos contínuos
  var select_balloon = Math.round(random(1,4));
  
  if (World.frameCount % 100 == 0 && estadoJogo === "jogando") {
    if (select_balloon == 1) {
      redBalloon();
    } else if (select_balloon == 2) {
      greenBalloon();
    } else if (select_balloon == 3) {
      blueBalloon();
    } else {
      pinkBalloon();
    }
  }
  
  if (arrowGroup.isTouching(redB)) {
    
    redB.destroyEach();
    //redB.destroy();
    //redB.Each();
    //ballon.destroyEach();
    
    arrowGroup.destroyEach();
    score=score+4;
  }

  if (arrowGroup.isTouching(greenB)) {
    greenB.destroyEach();
    arrowGroup.destroyEach();
    score=score+3;
  }

  if (arrowGroup.isTouching(blueB)) {
    blueB.destroyEach();
    arrowGroup.destroyEach();
    score=score+2;
  }

  if (arrowGroup.isTouching(pinkB)) {
    pinkB.destroyEach();
    arrowGroup.destroyEach();
    score=score+1;
  }

  if(estadoJogo === "iniciar"){
    text.depth = text.depth-1
    scene.velocityX = 0
  }

  if(estadoJogo === "iniciar" && keyDown("f")){
    estadoJogo = "jogando";
  }

  if(estadoJogo === "jogando"){
    scene.velocityX = -3 
    bow.y = World.mouseY

    if (keyWentDown("space")) {
      createArrow();  
    }
  }

  if(estadoJogo === "jogando" && score > 20){
    estadoJogo = "reiniciar";
  }

  if(estadoJogo === "reiniciar"){
    scene.velocityX = -3 
  }

  if(estadoJogo === "reiniciar" && keyDown("r")){
    score = 0;
    estadoJogo = "jogando";
  }

  console.log(estadoJogo);

  drawSprites();

  text("Pontuação: "+ score, 300,50);

  if(estadoJogo === "iniciar"){
    text("Pressione (F) para jogar!",130,200);
  }

  if(estadoJogo === "reiniciar"){
    text("Você venceu! Pressione (R) para reiniciar",90,200);
  }
  
}

function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX = 3;
  blue.lifetime = 150;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX = 3;
  green.lifetime = 150;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 3;
  pink.lifetime = 150;
  pink.scale = 1
  pinkB.add(pink);
}


// Criando flechas para o arco
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  
  //arrowGroup.addGroup(arrow);
  //arrow.add(arrowGroup);
  //arrowGroup.add();
  arrowGroup.add(arrow);
   
}
