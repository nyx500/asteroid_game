class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.vertices = [
      createVector(
                    this.location.x - this.size/2,
                    this.location.y + this.size / 2
                  ),
      createVector(
                    this.location.x + this.size/2,
                    this.location.y + this.size / 2
                  ),
      createVector(
                    this.location.x,
                    this.location.y - this.size / 2
                  ),
    ]
    this.midpoints = [
      createVector((this.vertices[0].x + this.vertices[1].x)/2,
                    (this.vertices[0].y + this.vertices[1].y)/2,
                  ),
      createVector((this.vertices[1].x + this.vertices[2].x)/2,
      (this.vertices[1].y + this.vertices[2].y)/2,
      ),
      createVector((this.vertices[0].x + this.vertices[2].x)/2,
      (this.vertices[0].y + this.vertices[2].y)/2,
      ),         
    ];
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(125);
    // triangle(this.location.x - this.size/2, this.location.y + this.size/2,
    //     this.location.x + this.size/2, this.location.y + this.size/2,
    //     this.location.x, this.location.y - this.size/2);
    this.updateVertices();
    this.updateMidpoints();
    triangle(this.vertices[0].x, this.vertices[0].y,
            this.vertices[1].x, this.vertices[1].y,
            this.vertices[2].x, this.vertices[2].y
            )
  }

  move() {
    // YOUR CODE HERE (4 lines)
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    /* Make sure you limit the velocity vector to maxVelocity
     so that the spaceship does not accelerate too much. 
    */
   this.velocity.limit(this.maxVelocity);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, -0.1));
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    let gravity = createVector(0, 0.05);
    let friction = this.velocity.copy().mult(-1);
    friction.normalize();
    friction.mult(this.velocity.mag() / 30);
    this.applyForce(gravity);
    this.applyForce(friction);
  }

  updateVertices()
  {
    this.vertices[0].x = this.location.x - this.size/2;
    this.vertices[0].y = this.location.y + this.size / 2;
    this.vertices[1].x = this.location.x + this.size/2;
    this.vertices[1].y = this.location.y + this.size / 2
    this.vertices[2].x = this.location.x;
    this.vertices[2].y = this.location.y - this.size / 2
  }
  
  updateMidpoints()
  {
    this.midpoints[0] = createVector(
      (this.vertices[0].x + this.vertices[1].x)/2,
      (this.vertices[0].y + this.vertices[1].y)/2,
    );
    this.midpoints[1] = createVector(
      (this.vertices[0].x + this.vertices[2].x)/2,
      (this.vertices[0].y + this.vertices[2].y)/2,
    );
    this.midpoints[2] = createVector(
      (this.vertices[1].x + this.vertices[2].x)/2,
      (this.vertices[1].y + this.vertices[2].y)/2,
    );
  }
}
