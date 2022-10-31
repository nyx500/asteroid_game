class Spaceship {

  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    // array storing fireball objects which create the rocket's exhaust
    this.fireballs = [];
    /** array of the triangle's vertices, which enables better
    triangle-circle collision detection:
    see the checkCollisions() function in sketch.js for more details**/
    this.vertices = [
      createVector(
        this.location.x - this.size / 2,
        this.location.y + this.size / 2
      ),
      createVector(
        this.location.x + this.size / 2,
        this.location.y + this.size / 2
      ),
      createVector(
        this.location.x,
        this.location.y - this.size / 2
      ),
    ]
    // midpoints of triangle stored for even more precise collision detection
    this.midpoints = [
      createVector((this.vertices[0].x + this.vertices[1].x) / 2,
        (this.vertices[0].y + this.vertices[1].y) / 2,
      ),
      createVector((this.vertices[1].x + this.vertices[2].x) / 2,
        (this.vertices[1].y + this.vertices[2].y) / 2,
      ),
      createVector((this.vertices[0].x + this.vertices[2].x) / 2,
        (this.vertices[0].y + this.vertices[2].y) / 2,
      ),
    ];
  }

  run() {
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
    // updates the vertices and midpoints array of vectors in relation
    // to current spaceship location
    this.updateVertices();
    this.updateMidpoints();
  }

  draw() {

    /** draws the exhaust/fire coming out from the bottom of the spaceship:
    has to come before the spaceship is drawn, so it comes out from behind**/
    this.displaySpaceshipExhaust();

    fill(125);
    // draws the grey body of the spaceship
    triangle(this.vertices[0].x, this.vertices[0].y,
      this.vertices[1].x, this.vertices[1].y,
      this.vertices[2].x, this.vertices[2].y
    )

    // draws some blue windows on spaceship
    fill(10, 114, 150);
    stroke(0);
    ellipse(this.location.x, this.location.y - 10, 6);
    ellipse(this.location.x, this.location.y, 6);
    ellipse(this.location.x, this.location.y + 10, 6);
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

  applyForce(f) {
    this.acceleration.add(f);
  }

  interaction() {
    if (keyIsDown(LEFT_ARROW)) {
      this.applyForce(createVector(-0.1, 0));
      this.addFireballs();
    }
    if (keyIsDown(RIGHT_ARROW)) {
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0.1, 0));
      this.addFireballs();
    }
    if (keyIsDown(UP_ARROW)) {
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, -0.1));
      this.addFireballs();
    }
    if (keyIsDown(DOWN_ARROW)) {
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, 0.1));
    }
  }

  // draws all the fireballs coming out of the spaceship at the bottom
  displaySpaceshipExhaust() {
    // iterates over the fireballs array
    for (var i = this.fireballs.length - 1; i >= 0; i--) {
      // draws and updates each fireball
      this.fireballs[i].run();
      // if a fireball has shrunk too much, remove it from the array
      if (this.fireballs[i].size < 0.1) {
        this.fireballs.splice(i, 1);
      }
    }
  }

  // populates the this.fireballs array with new Fireball objects
  addFireballs() {
    for (var i = 0; i < 50; i++) {
      // creates some randomness in fireball's starting position
      var yoff = random(10, this.size / 2);
      this.fireballs.push(new Fireball(this.location.x,
        this.location.y + yoff));
    }
  }

  fire() {
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges() {
    if (this.location.x < 0) this.location.x = width;
    else if (this.location.x > width) this.location.x = 0;
    else if (this.location.y < 0) this.location.y = height;
    else if (this.location.y > height) this.location.y = 0;
  }

  setNearEarth() {
    //YOUR CODE HERE (6 lines approx)
    let gravity = createVector(0, 0.05);
    // reverses direction of velocity and stores it as 'friction'
    let friction = this.velocity.copy().mult(-1);
    // sets the magnitude of the friction vector to 1
    friction.normalize();
    // sets the size/magnitude of the friction to 1/30th the magnitude of velocity
    friction.mult(this.velocity.mag() / 30);
    // applies these two new forces to the spaceship
    this.applyForce(gravity);
    this.applyForce(friction);
  }

  // updates vertices/midpoints data (for collision-detection) based on location
  updateVertices() {
    this.vertices[0].x = this.location.x - this.size / 2;
    this.vertices[0].y = this.location.y + this.size / 2;
    this.vertices[1].x = this.location.x + this.size / 2;
    this.vertices[1].y = this.location.y + this.size / 2
    this.vertices[2].x = this.location.x;
    this.vertices[2].y = this.location.y - this.size / 2
  }
  updateMidpoints() {
    this.midpoints[0] = createVector(
      (this.vertices[0].x + this.vertices[1].x) / 2,
      (this.vertices[0].y + this.vertices[1].y) / 2,
    );
    this.midpoints[1] = createVector(
      (this.vertices[0].x + this.vertices[2].x) / 2,
      (this.vertices[0].y + this.vertices[2].y) / 2,
    );
    this.midpoints[2] = createVector(
      (this.vertices[1].x + this.vertices[2].x) / 2,
      (this.vertices[1].y + this.vertices[2].y) / 2,
    );
  }
}
