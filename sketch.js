var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies,
  Body = Matter.Body;
 
var particle;var turn=0;var c=0;var gameState="play";
var plinkos = [];
var divisions=[];

var divisionHeight=300;
var score=0;var ground;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
   divisions.push(new Divisions(-2,height/3,6,600));
   divisions.push(new Divisions(width+2,height/3,6,600));
    for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j-40,75));
    }
    for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,175));
    }
     for (var j = 75; j <=width; j=j+50) 
    {
       plinkos.push(new Plinko(j,275));
    }
     for (var j = 50; j <=width-10; j=j+50) 
    {
       plinkos.push(new Plinko(j,375));
    }
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score :"+score,20,30);
  Engine.update(engine);
  ground.display();

   for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     var z;
     divisions[k].display();
     if(k==0||k==3){z=0;}
     else if(k==7||k==8){z=200;}
     else if(k==1||k==4||k==9){z=100;}
     else if(k==5){z=1000;}
     else{z=-50;}
     text(z,k*80+20,600);

   if(particle!=null){
     particle.display();
     if(particle.body.position.y>500&&c==0){
      (particle.body.position.x>0&&particle.body.position.x<80)? score+=0:(particle.body.position.x>80&&particle.body.position.x<160)? score+=100:(particle.body.position.x>160&&particle.body.position.x<240)? score+=-50:(particle.body.position.x>240&&particle.body.position.x<320)? score+=0:(particle.body.position.x>320&&particle.body.position.x<400)? score+=100:(particle.body.position.x>400&&particle.body.position.x<480)? score+=1000:(particle.body.position.x>480&&particle.body.position.x<560)? score+=-50:(particle.body.position.x>560&&particle.body.position.x<640)? score+=200:(particle.body.position.x>640&&particle.body.position.x<720)? score+=200:(particle.body.position.x>720&&particle.body.position.x<800)? score+=100:score+=0
       c=1;
     }
     if(turn==6){particle=null;gameState="noplay";console.log("ok");}
   }
  }
  if(gameState=="noplay"){
    console.log("nopay");
    textSize(25);
    text("Game over",width/2-75,250);
  }
}

function mousePressed(){
  if(mouseX>0&&mouseX<width){
  if(gameState=="play"){
    if(turn<=5){
      particle=new Particle(mouseX,10,10);
      turn+=1;c=0;
    }
  }
}
}