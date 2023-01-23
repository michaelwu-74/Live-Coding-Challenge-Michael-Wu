
let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;
let bob = 1;

const sceneW = 400;
const sceneH = 400;
let sliderFOV;

function setup() {
  createCanvas(800, 400);
  for (let i = 0; i < 4; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));
  particle = new Particle();
  sliderFOV = createSlider(0, 360, 60);
  sliderFOV.input(changeFOV);
}

function changeFOV() {
  const fov = sliderFOV.value();
  particle.updateFOV(fov);
}

function setFloor(c1,c2) {
  noFill();
  for(var y=0; y<height/2; y++) {
    var inter = map(y, 0, height/2, 0, 1);
    var c = lerpColor(c1,c2,inter);
    stroke(c)
    line(sceneW, height/2+y, width, height/2+y)
  }
}
function setCiel(c1, c2) {
  noFill();
  for(var y=0; y<height/2; y++) {
    var inter = map(y, 0, height/2, 0, 1);
    var c = lerpColor(c1,c2,inter);
    stroke(c)
    line(sceneW, y, width, y)
  }
}

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.05);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.05);
  } 
  
  if (keyIsDown(UP_ARROW)) {
    
    if(keyIsDown(16)){
      particle.move(2);   
        bob += 0.3;
    }
    
    particle.move(1);
    bob += 0.1;
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.move(-1);
    bob += 0.1;
  }
  
  //x
  if(keyIsDown(86))
    {
      particle.moveS(1);
          bob += 0.1;
    }
  else if (keyIsDown(88)){
    particle.moveS(-1);
        bob += 0.1;
  }

  background(0);
  setFloor(color(0, 0, 0), color(115, 96, 36))
    setCiel(color(87, 71, 28), color(0, 0, 0))

  for (let wall of walls) {
    wall.show();
  }
  particle.show();

  const scene = particle.look(walls);
  const w = sceneW / scene.length;
  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++) {
    noStroke();
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const baseC = createVector(175, 156, 61)
    const normalC = (255, 255, 255)
    const newC = color(map(sq, 0, wSq, baseC.x, 0), map(sq, 0, wSq, baseC.y, 0), map(sq, 0, wSq, baseC.z, 0))
    const b = map(sq, 0, wSq, 255, 0);
    const h = map(scene[i], 0, sceneW, sceneH, 0);
    fill(newC);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2 - cos(bob) * 20, w + 1, h);
  }
  pop();

  // ray.show();
  // ray.lookAt(mouseX, mouseY);

  // let pt = ray.cast(wall);
  // if (pt) {
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}
