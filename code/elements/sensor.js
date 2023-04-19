class Sensor {
    constructor(car) {
        this.car = car;

        // Rays are defined for the purpose of collision detection
        // At this moment 5 rays would be used
        // Ray length represents the length the sensors can detect objects
        // Ray spread represents what would the angle the rays would be detecting objects
        this.rayCount = 10;
        this.rayLength = 150;
        this.raySpread = Math.PI / 2;
        this.rays = [];
        this.readings = [];
    }

    // Set the logic how rays should adjust their position relative to the car and preset values
    update = (borders) => {
        this.rays = [];
        this.readings = [];

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

            //Add this check so that no indexes are out of bounds
            if (i <= this.rays.length) {
                this.readings.push(this.getReading(this.rays[i], borders));
            }
        }
    }


    //Get the reading value based on where array hits an obstacle
    //Get the value from the ray that has the smallest distance to an object
    getReading = (ray, borders) => {
        let intersections = [];
        if (!borders || borders?.length === 0) return null;
        borders.forEach((border, indx) => {
            const touched = getIntersection(
                ray[0],
                ray[1],
                border[0],
                border[1]
            );
            if (touched) {
                intersections.push(touched);
            }
        });
        if (intersections.length === 0) {
            return null;
        }
        const offsets = intersections.map(intersection => intersection.offset);
        return intersections.find(intersection => intersection.offset === Math.min(...offsets));
    }


    //Draw rays function, paint the ray line in yellow before it hits an obstacle and after it hits an obstacle paint it black
    draw = (ctx) => {
        this.rays.forEach((ray, indx) => {
            let end = ray[1];
            if (this.readings[indx])
                end = this.readings[indx];

            //TODO Refactor this later as a separate function, avoid code duplication
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(
                ray[0].x,
                ray[0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "black";
            ctx.moveTo(
                ray[1].x,
                ray[1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        })
    }
}

//TODO put to some common util file; tbd
lerp = (x1, x2, relativePosition) => {
    return x1 + (x2 - x1) * relativePosition;
}

//Add comment later
//TODO put to some common util file; tbd
getIntersection = (A, B, C, D) => {
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

    if (bottom != 0) {
        const t = tTop / bottom; const u = uTop / bottom; if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return {
                x: lerp(A.x, B.x, t), y: lerp(A.y, B.y, t), offset: t
            }
        }
    }
    return null;
} 
