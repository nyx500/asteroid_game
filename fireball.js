// CODE ATTRIBUTION: inspired/refactored from this link:
// "Particle Flame Fountain", by aferriss
// https://editor.p5js.org/aferriss/sketches/SyTRx_bof

// creates an individual ball that the spaceship's exhaust will consist of
class Fireball {
    constructor(xPos, yPos, direction) {
        this.location = createVector(xPos, yPos);
        this.size = random(5, 10);
        this.color = color(255);
        this.velocity = createVector(0, 0);
        /* xBounce and yBounce determine which axis 
        (opposite to direction axis) the fireball should
        shake around randomly on */
        this.xBounce;
        this.yBounce;

        switch (direction)
        {
            case ('R'):
                this.velocity.x = random(2, 5);
                this.velocity.y = 0;
                /* If the direction of the thruster is right or left, then shake
                the fireball randomly on the y-axis */
                this.yBounce = true;
                this.xBounce = false;
                break;
            case ('L'):
                this.velocity.x = random(-2, -5);
                this.velocity.y = 0;
                this.yBounce = true;
                this.xBounce = false;
                break;
            case ('D'):
                this.velocity.x = 0;
                this.velocity.y = random(2, 5);
                /* If the direction of the thruster is up or down, then shake
                the fireball randomly on the x-axis */
                this.yBounce = false;
                this.xBounce = true;
                break;
            case ('U'):
                this.velocity.x = 0;
                this.velocity.y = random(-2, -5);
                this.yBounce = false;
                this.xBounce = true;
                break;
            default:
                console.log("Error: wrong direction input parameter!");
        }

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
       this.location.add(this.velocity);

       // Shakes the fireball around slightly on the opposite axis to the
       // main direction axis of the thruster
       if (this.xBounce)
       {
        this.location.x += random(-1, 1);
       }
       if (this.yBounce)
       {
        this.location.y += random(-1, 1);
       }
    }

    // shrinks size of fireball over time
    shrink()
    {
        this.size -= 0.6;
    }
}