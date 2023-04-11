// Get canvas element and store it into a variable
const canvas = document.getElementById("driving-canvas");
console.log(canvas);

// Set dimensions of the canvas; height is available vertical length while width is 50% of available space
canvas.height = window.innerHeight;
canvas.width = window.innerWidth / 2;