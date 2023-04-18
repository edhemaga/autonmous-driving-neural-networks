class Track {
    //Initialize variables
    //x tells starting point, width tells us the track width, lanes is the number of lanes
    //trackLength is used in order to simulate infinitely long road, just a very large number but can be refactored to be dynamically updated if certain border is reached
    constructor(x, width, lanes = 5) {
        this.x = x;
        this.width = width;
        this.lanes = lanes;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const trackLength = 999999;
        this.top = -trackLength;
        this.bottom = trackLength;

        const topLeft = { x: this.left, y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };

        this.borders = [[topLeft, bottomLeft], [topRight, bottomRight]];
    }


    //Function that draws white border on each of the lane
    draw = (ctx) => {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        for (let i = 0; i <= this.lanes - 1; i++) {
            const x = lerp(this.left, this.right, i / this.lanes)

            createDashedLines(i, this.lanes, ctx);

            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();

            ctx.setLineDash([]);
            this.borders.forEach(border => {
                ctx.beginPath();
                ctx.moveTo(border[0].x, border[0].y);
                ctx.lineTo(border[1].x, border[1].y);
                ctx.stroke();
            });
        }
    }

    getLaneCenter = (laneIndex) => {
        const laneWidth = this.width / this.lanes;
        return this.left +
            Math.min(laneIndex, this.lanes - 1) * laneWidth;
    }
}

//Utility function used to return where a line should be drawn based on the relative position
//relative position is calculated based on the number of iterations and total available lanes expressed as a percentage  
lerp = (x1, x2, relativePosition) => {
    return x1 + (x2 - x1) * relativePosition;
}

//Utility function that checks whether white lines are the border lines
createDashedLines = (iterator, laneCount, ctx) => {
    if (iterator > 0 && iterator < laneCount) {
        ctx.setLineDash([30, 30]);
    } else {
        ctx.setLineDash([]);
    }
}
