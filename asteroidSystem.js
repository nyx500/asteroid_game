class AsteroidSystem {

  //creates arrays to store each asteroid's data
  constructor() {
    this.locations = [];
    this.velocities = [];
    this.accelerations = [];
    this.diams = [];
    // initally sets the probability that an asteroid will spawn to 0.01
    this.probabilityOfSpawning = 0.01;
  }

  run() {
    this.spawn();
    this.move();
    this.makeHarder();
    this.draw();
  }

  // spawns asteroid at random intervals
  spawn() {

    if (random(1) < this.probabilityOfSpawning) {
      this.accelerations.push(new createVector(0, random(0.1, 1)));
      this.velocities.push(new createVector(0, 0));
      this.locations.push(new createVector(random(width), 0));
      this.diams.push(random(30, 50));
    }
  }

  // increases probability of asteroids spawning as time goes on
  makeHarder()
  {
    // increases likelihood of spawning asteroids every 500 draw frames
    if (frameCount % 500 == 0)
    {
      // min function limits the top probability of asteroid spawning to 0.1
      this.probabilityOfSpawning = min(this.probabilityOfSpawning += 0.01, 0.1);
    }
  }

  //moves all asteroids
  move() {
    for (var i = 0; i < this.locations.length; i++) {
      this.velocities[i].add(this.accelerations[i]);
      this.locations[i].add(this.velocities[i]);
      this.accelerations[i].mult(0);
    }
  }

  applyForce(f) {
    for (var i = 0; i < this.locations.length; i++) {
      this.accelerations[i].add(f);
    }
  }

  //draws all asteroids
  draw() {  
    noStroke(); 
    fill(92, 64, 51);
    for (var i = 0; i < this.locations.length; i++) {
      ellipse(this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);
    }
  }

  //function that calculates effect of gravity on each asteroid and accelerates it
  calcGravity(centerOfMass) {
    for (var i = 0; i < this.locations.length; i++) {
      var gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
      gravity.normalize();
      gravity.mult(.001);
      this.applyForce(gravity);
    }
  }

  //destroys all data associated with each asteroid
  destroy(index) {
    this.locations.splice(index, 1);
    this.velocities.splice(index, 1);
    this.accelerations.splice(index, 1);
    this.diams.splice(index, 1);
  }
}
