// Get canvas element and store it into a variable
const canvas = document.getElementById("driving-canvas");

// Set dimensions of the canvas; height is available vertical length while width is 50% of available space
canvas.height = window.innerHeight;
canvas.width = window.innerWidth / 2;

const ctx = canvas.getContext("2d");

const numberOfLanes = 5;
const initCarInLaneIndex = 1;
//Initialize track object with the set dimensions
const track = new Track(canvas.width / 2, canvas.width * 0.8, numberOfLanes ?? 1);
const alignCarInLane = initCarInLaneIndex < numberOfLanes ? track.getLaneCenter(initCarInLaneIndex) : track.getLaneCenter(1);
//Initialize car object with dimensions
const car = new Car(alignCarInLane, 100, 30, 50);

//Animate car moving, update agent position and draw the changes 
const animate = () => {
    car.updatePosition();
    canvas.height = window.innerHeight;
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.5);
    track.draw(ctx);
    car.draw(ctx);
    ctx.restore();
    requestAnimationFrame(animate);
    ctx.fill();

}

animate();
