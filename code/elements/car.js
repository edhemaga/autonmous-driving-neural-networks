class Car {
    //Initialize variable
    // x and y are coordinates for starting positions of the car
    // width and height for the dimensions of the car
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.controls = new Controls();
    }

    //Update position of the agent depending on the which control direction is set as truthy
    updatePosition = () => {
        if (this.controls.forwards) {
            this.y -= 5;
        }
        if (this.controls.backwards) {
            this.y += 5;
        }
        if (this.controls.right) {
            this.x += 5;
        }
        if (this.controls.left) {
            this.x -= 5;
        }
    }

    //Draw car using preset dimensions and setting a center of the car
    draw = (ctx) => {
        ctx.beginPath(ctx);
        ctx.rect(
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
        ctx.fill();
    }
}
