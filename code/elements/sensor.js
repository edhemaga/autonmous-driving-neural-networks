class Sensor {
    constructor(car) {
        this.car = car;

        // Rays are defined for the purpose of collision detection
        // At this moment 5 rays would be used
        // Ray length represents the length the sensors can detect objects
        // Ray spread represents what would the angle the rays would be detecting objects
        this.rayCount = 30;
        this.rayLength = 150;
        this.raySpread = Math.PI / 2;
        this.rays = [];
    }

    // Set the logic how rays should adjust their position relative to the car and preset values
    update = () => {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(
                this.raySpread / 2,
                -this.raySpread / 2,
                i / (this.rayCount - 1)
            ) + this.car.angle;
            const start = { x: this.car.x, y: this.car.y };
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength,
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw = (ctx) => {
        this.rays.forEach(ray => {
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                ray[0].x,
                ray[0].y
            );
            ctx.lineTo(
                ray[1].x,
                ray[1].y
            );
            ctx.stroke();
        })
    }
}

lerp = (x1, x2, relativePosition) => {
    return x1 + (x2 - x1) * relativePosition;
}
