var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var score;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
  score = 0;
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
  displayScore();
  
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(100,255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

// writes the user's score on top-left hand corner of the canvas
function displayScore()
{
  textSize(22);
  textStyle(BOLD);
  fill(200, 0, 0);
  text("Score: " + score, width * 0.01, height * 0.04);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (var i = 0; i < asteroids.locations.length; i++)
    {

      /** I completed this using just the location & size of spaceship, but
      it was not very precise --> isInside() kept returning true when spaceship
      was not quite touching the asteroid. I tested both versions
      and the one I chose (by adapting the spaceship class to store
      vertices and midpoints) was more precise, at the cost of memory **/
      // if (isInside(
      //   asteroids.locations[i],
      //   asteroids.diams[i],
      //   spaceship.location,
      //   spaceship.size
      // ))
      // {
      //   gameOver();
      // } 

      // More precise collision detection:
      // Checks if spaceship's vertex is within circle
      for (var j = 0; j < spaceship.vertices.length; j++)
      {
        if (isInside(
          asteroids.locations[i],
          asteroids.diams[i],
          spaceship.vertices[j],
          0
        ) ||
        /* After vertex-circle checks, it also checks if the distance
        between center of asteroid and the midpoint of the 
        triangle/spaceship's sides is less than the radius of the asteroid
        */
        (isInside(
          asteroids.locations[i],
          asteroids.diams[i],
          spaceship.midpoints[j],
          0)
        ))
        {
          gameOver();
        } 
      }
      
    }

    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for (var i = 0; i < asteroids.locations.length; i++)
    {
      if (isInside(
        asteroids.locations[i],
        asteroids.diams[i],
        earthLoc,
        earthSize.x
      ))
      {
        gameOver();
      }
    }

    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    // Subtracted '1' from earth's radius because game over was showing
    // when spaceship's base was not quite touching earth
    if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x - 1))
    {
      gameOver();
    }

    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if (isInside(
      spaceship.location,
      spaceship.size,
      atmosphereLoc,
      atmosphereSize.x
    ))
    {
      spaceship.setNearEarth();
    }

    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for (var i = 0; i < spaceship.bulletSys.bullets.length; i++)
    {
      for (var j = 0; j < asteroids.locations.length; j++)
      {
        if (isInside(
          spaceship.bulletSys.bullets[i],
          spaceship.bulletSys.diam,
          asteroids.locations[j],
          asteroids.diams[j]
        ))
        {
          asteroids.destroy(j);
          score++;
        }
      }
      
    }

}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    let radiusA = sizeA / 2;
    let radiusB = sizeB / 2;
    if (p5.Vector.dist(locA, locB) <= radiusA + radiusB)
    {
      return true;
    }
    return false;
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
