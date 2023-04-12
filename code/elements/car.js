class Car {
    //Initialize variables
    // x and y are coordinates for starting positions of the car
    // width and height for the dimensions of the car
    //other variables are used for motion of the car itself; simulating physics
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.velocity = 0;
        this.acceleration = 0.5;

        this.maxSpeed = 5;
        this.friction = 0.1;

        this.angle = 0;

        this.controls = new Controls();
    }
    //Update position of the agent depending on the which control direction is set as truthy
    //Add border constrains while moving
    updatePosition = () => {
        this.velocity = checkSpeedLimit(this.maxSpeed, this.velocity);
        this.velocity = frictionControl(this.friction, this.velocity)

        if (this.controls.forwards && this.y >= 0) {
            this.velocity -= this.acceleration;
        }
        if (this.controls.backwards && this.y <= window.innerHeight) {
            this.velocity += this.acceleration;
        }

        //Horizontal life-like movement; not necessary just rather simple improvement
        if (this.velocity != 0) {
            const correction = this.velocity > 0 ? -1 : 1;
            if (this.controls.right && this.x <= window.innerWidth / 2) {
                this.angle -= 0.05 * correction;
            }
            if (this.controls.left && this.x >= 0) {
                this.angle += 0.05 * correction;
            }
        }

        //Based of unit circle
        this.x += Math.sin(this.angle) * this.velocity;
        this.y += Math.cos(this.angle) * this.velocity;

    }

    //Draw car using preset dimensions and setting a center of the car
    draw = (ctx) => {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath(ctx);
        ctx.rect(
            this.width / 2,
            this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();
    }
}

//Add speed limit, check if conditions are met
const checkSpeedLimit = (maxSpeed, velocity) => {
    let finalVelocity = velocity;
    if (maxSpeed < Math.abs(velocity)) {
        if (velocity < 0) {
            finalVelocity = -maxSpeed;
        } else {
            finalVelocity = maxSpeed;
        }
    }
    return finalVelocity;
}

//Add friction to the movement for more realistic controls; if speed is less than friction stop the motion
const frictionControl = (friction, velocity) => {
    let finalVelocity = velocity;
    if (velocity < 0) {
        finalVelocity += friction;
    } else if (Math.abs(velocity) < friction) {
        finalVelocity = 0;
    } else {
        finalVelocity -= friction;
    }

    return finalVelocity;
}
