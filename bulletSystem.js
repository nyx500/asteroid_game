class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run(){
      this.move();
      this.draw();
      this.edges();
      
    console.log(this.bullets.length);
  }

  fire(x, y){
    this.bullets.push(createVector(x,y));
  }

  //draws all bullets
  draw(){
    fill(255);
    for (var i=0; i<this.bullets.length; i++){
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  //updates the location of all bullets
  move(){
    for (var i=0; i<this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
      // YOUR CODE HERE (3 lines approx)
      // Checks each bullet to see if it has left the screen
      for (var i = 0; i < this.bullets.length; i++)
      {
        // If the bullet has left the screen, removes it from the bullets arrays
        if (this.bullets[i].y < 0 
          || this.bullets[i].x < 0 ||
           this.bullets[i].x > width
          )
        {
          this.bullets.splice(i, 1);
          i--;
        }
      }
  }
}
