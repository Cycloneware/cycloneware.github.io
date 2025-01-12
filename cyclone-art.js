// Cyclone Art Studio Script

// Canvas and context
const canvas = document.getElementById("artCanvas");
const ctx = canvas.getContext("2d");

// Toolbar elements
const pencilTool = document.getElementById("pencilTool");
const eraserTool = document.getElementById("eraserTool");
const clearCanvasButton = document.getElementById("clearCanvas");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");
const colorPicker = document.getElementById("color-picker");
const brushSize = document.getElementById("brush-size");

// Global variables
let isEraser = false; // Define the isEraser variable
let currentColor = "black"; // Default color
let currentSize = 5; // Default brush size

// Drawing state
let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Event listeners
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = isEraser ? "white" : currentColor;
    ctx.lineWidth = currentSize;
    ctx.lineCap = "round";
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Tool activation
pencilTool.addEventListener("click", () => {
    isEraser = false;
    pencilTool.classList.add("active");
    eraserTool.classList.remove("active");
});

eraserTool.addEventListener("click", () => {
    isEraser = true;
    eraserTool.classList.add("active");
    pencilTool.classList.remove("active");
});

// Color picker
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
    isEraser = false; // Automatically switch to pen mode
    pencilTool.classList.add("active");
    eraserTool.classList.remove("active");
});

// Brush size
brushSize.addEventListener("input", (e) => {
    currentSize = e.target.value;
});

// Clear canvas
clearCanvasButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
