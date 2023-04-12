// Get canvas element and store it into a variable
const canvas = document.getElementById("driving-canvas");

// Set dimensions of the canvas; height is available vertical length while width is 50% of available space
canvas.height = window.innerHeight;
canvas.width = window.innerWidth / 2;

const ctx = canvas.getContext("2d");

//Initialize car object with dimensions
const car = new Car(100, 100, 30, 50);
car.draw(ctx);

//Animate car moving, update agent position and draw the changes 
const animate = () => {
    car.updatePosition();
    canvas.height = window.innerHeight;
    car.draw(ctx);
    requestAnimationFrame(animate);
}

animate();
