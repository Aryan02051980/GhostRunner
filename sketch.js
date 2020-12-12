var tower,towerImage;
var door, doorGroup,doorImage;
var climber,climberImage,climberGroup;
var ghost,ghostImage;
var invisibleblock,invisibleblockGroup;
var gameState="PLAY";

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600)
  tower=createSprite(300,300);
  tower.addImage(towerImage);
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleblockGroup=new Group();
}

function draw(){
  background(0);
  
      
  if(gameState==="PLAY"){
    tower.velocityY=1;
    if(tower.y>400){
      tower.y=300;
    }
  if(keyDown("left_Arrow")){
      ghost.x=ghost.x-3; 
  }
    
   if(keyDown("right_Arrow")){
      ghost.x=ghost.x+3; 
  }
    
    if(keyDown("up_Arrow")){
      ghost.velocityY=-10; 
      
  } 
    
    ghost.velocityY=ghost.velocityY+1;
    
    spawndoor();
    
    if(climberGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    
    if(ghost.isTouching(invisibleblockGroup)||ghost.y>600){
      gameState="END";
    }
    
      drawSprites();
  }
  
  if(gameState==="END"){
     textSize(30);
     stroke("yellow");
     text("gameover",230,250);
     
  }
    
  

}

function spawndoor(){
  if(frameCount%240===0){
     door=createSprite(200,0);
     door.addImage(doorImage);
     door.velocityY=1;
     door.x=Math.round(random(120,400));
     ghost.depth=door.depth;
     ghost.depth=door.depth+1;
     doorGroup.add(door);
    
     climber=createSprite(200,60);
     climber.addImage(climberImage);
     climber.velocityY=1;
     climber.x=door.x;
     climberGroup.add(climber);
    
    invisibleblock=createSprite(200,65);
    invisibleblock.visible=false;
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    invisibleblock.velocityY=climber.velocityY;
    invisibleblock.x=climber.x;
    invisibleblockGroup.add(invisibleblock);
    
    door.lifetime=800;
    climber.lifetime=800;
    invisibleblock.lifetime=800;
  }
}