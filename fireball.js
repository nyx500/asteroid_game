// CODE ATTRIBUTION: inspired/refactored from this link:
// "Particle Flame Fountain", by aferriss
// https://editor.p5js.org/aferriss/sketches/SyTRx_bof

// creates an individual ball that the spaceship's exhaust will consist of
class Fireball {
    constructor(xPos, yPos) {
        this.location = createVector(xPos, yPos);
        this.size = random(10, 20);
        this.color = color(255);
        let r = random(1);
        // ball's colored selected randomly from orange/yellow/2 types red
        if (r < 0.25) {
            this.color = color(255, 192, 0, 50); // orange-yellow
        } else if (r >= 0.25 && r < 0.5) {
            this.color = color(250, 250, 51, 50); // yellow
        } else if (r >= 0.5 && r < 0.75) {
            this.color = color(210, 43, 43, 50); // cadmium red
        } else if (r >= 0.75)
        {
            this.color = color(255, 0, 0, 40); // true red
        }
    }

    run()
    {
        this.move();
        this.shrink();
        this.draw();
    }

    // draws the individual fireball
    draw()
    {
        noStroke();
        fill(this.color);
        ellipse(this.location.x, this.location.y, this.size, this.size);
    }

    move()
    {   
        // makes the fireball shake a bit left to right
        this.location.x += random(-2, 2);
        // moves the fireball down the canvas
        this.location.y += random(2, 5);
    }

    // shrinks size of fireball over time
    shrink()
    {
        this.size -= 0.6;
    }
}