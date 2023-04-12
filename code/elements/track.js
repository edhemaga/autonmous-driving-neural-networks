class Track {
    //Initialize variables
    //x tells starting point, width tells us the track width, lanes is the number of lanes
    //trackLength is used in order to simulate infinitely long road, just a very large number but can be refactored to be dynamically updated if certain border is reached
    constructor(x, width, lanes = 3) {
        this.x = x;
        this.width = width;
        this.lanes = lanes;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const trackLength = 999999;
        this.top = -trackLength;
        this.bottom = trackLength;
    }

    draw = (ctx) => {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "white";

        ctx.beginPath();
        ctx.moveTo(this.left, this.top);
        ctx.lineTo(this.left, this.bottom);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.right, this.top);
        ctx.lineTo(this.right, this.bottom);
        ctx.stroke();
    }
}
