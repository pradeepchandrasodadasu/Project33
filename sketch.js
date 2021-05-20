const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var engine,world;

var particle;
var plinkos = [];
var divisions = [];
var gameState = "play";

var divisionHeight = 300;
var score = 0;
var count = 0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;

  //creates Ground object
  ground = new Ground(width/2,height,width,20);
  
  //creates divisions 
  for(var k = 0; k < width+90; k = k + 80) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //creates plinkos to change the direction of particals
  for(var j = 75; j <=width; j=j+50){
      plinkos.push(new Plinko(j,75));
  }

  for(var j = 50; j <=width-10; j=j+50){
      plinkos.push(new Plinko(j,175));
  }

  for(var j = 75; j <=width; j=j+50) {
      plinkos.push(new Plinko(j,275));
  }

  for(var j = 50; j <=width-10; j=j+50){ 
      plinkos.push(new Plinko(j,375));
  }

    

    
}
 


function draw() {
  background("black");
  Engine.update(engine);

  text(mouseX+" , "+mouseY,100,mouseY);

  if(gameState === "play"){ 
      textSize(20)
      text("Score : "+score,20,30);
      
      for (var j = 0; j < plinkos.length; j++) {
        
        plinkos[j].display();
        
      }
      
      //if(frameCount%60===0){
        //particles.push(new particle(random(width/2-30, width/2+30), 10,10));
        //score++;
      //}
    
      //for (var j = 0; j < plinkos.length; j++) {
      
        //plinkos[j].display();
      //}
      for (var k = 0; k < divisions.length; k++) {
        
        divisions[k].display();
      }

      textSize(25);
      text("100",20,530);
      text("200",100,530);
      text("300",180,530);
      text("400",260,530);
      text("500",340,530);
      text("500",420,530);
      text("400",500,530);
      text("300",580,530);
      text("200",660,530);
      text("100",740,530);

      if(particle !== undefined && particle !== null){ 
        particle.display();

        if(particle.body.position.y>500){
          if(particle.body.position.x >10 && particle.body.position.x <85 ||
            particle.body.position.x >width-70 && particle.body.position.x <width){
            score = score+100;
            particle = null;
          }else
          if(particle.body.position.x >90 && particle.body.position.x <165 ||
            particle.body.position.x >width-150 && particle.body.position.x <75){
            score = score+200;
            particle = null;
          }else
          if(particle.body.position.x >170 && particle.body.position.x <245 ||
            particle.body.position.x >width/2+170 && particle.body.position.x <width-155){
            score = score+300;
            particle = null;
          }else
          if(particle.body.position.x >250 && particle.body.position.x <325 ||
            particle.body.position.x >width/2+90 && particle.body.position.x <width/2+165){
            score = score+400;
            particle = null;
          }else
          if(particle.body.position.x >330 && particle.body.position.x <width/2+85){
            score = score+500;
            particle = null;
          }
          if(count >= 5){
            gameState = "end"
          }
        }
        
      }

      //particle.display();
      

  }    
  
  if(gameState === "end"){
    fill("red");
    textSize(30);
    text("GAME OVER",200,height/2);
  }
}

function mouseReleased(){
  if(gameState !== "end"){ 
    //if(particle !== undefined){ 
      console.log("hi");
      particle = new Particle(random(10,790),0,10);
      count += 1;
    //}
  }
}
