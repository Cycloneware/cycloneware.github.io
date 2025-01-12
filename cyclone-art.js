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
const addLayerButton = document.getElementById("addLayerButton");
const removeLayerButton = document.getElementById("removeLayerButton");
const toggleLayerButton = document.getElementById("toggleLayerButton");
const colorPicker = document.getElementById("color-picker");
const brushSize = document.getElementById("brush-size");

// Global variables
let isEraser = false; // Define the isEraser variable
let currentColor = "black"; // Default color
let currentSize = 5; // Default brush size

// Layer array and current layer
let layers = [{
    canvas: document.createElement('canvas'),
    ctx: null,
    visible: true,
    undoStack: [],
    redoStack: []
}];
let currentLayerIndex = 0;

// Set up initial layer
function setupLayer() {
    const layer = layers[currentLayerIndex];
    layer.ctx = layer.canvas.getContext("2d");
    layer.canvas.width = canvas.width;
    layer.canvas.height = canvas.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(layer.canvas, 0, 0);
}

// Mouse events for drawing
let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    saveState(); // Save the state before starting a new drawing
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

// Draw on the current layer's canvas
canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    const layer = layers[currentLayerIndex];
    layer.ctx.beginPath();
    layer.ctx.moveTo(lastX, lastY);
    layer.ctx.lineTo(e.offsetX, e.offsetY);
    layer.ctx.strokeStyle = (isEraser ? "white" : currentColor);
    layer.ctx.lineWidth = currentSize;
    layer.ctx.lineCap = "round";
    layer.ctx.stroke();
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

// Color picker change
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
    isEraser = false;
    pencilTool.classList.add("active");
    eraserTool.classList.remove("active");
});

// Brush size adjustment
brushSize.addEventListener("input", (e) => {
    currentSize = e.target.value;
});

// Save the current layer's state for Undo
function saveState() {
    const currentLayer = layers[currentLayerIndex];
    currentLayer.undoStack.push(currentLayer.canvas.toDataURL());
    if (currentLayer.undoStack.length > 10) {
        currentLayer.undoStack.shift();
    }
    currentLayer.redoStack = [];
}

// Load a previous state for Undo
function loadState(state) {
    const currentLayer = layers[currentLayerIndex];
    const img = new Image();
    img.src = state;
    img.onload = () => {
        currentLayer.ctx.clearRect(0, 0, canvas.width, canvas.height);
        currentLayer.ctx.drawImage(img, 0, 0);
    };
}

// Undo functionality
undoButton.addEventListener("click", () => {
    const currentLayer = layers[currentLayerIndex];
    if (currentLayer.undoStack.length > 0) {
        const lastState = currentLayer.undoStack.pop();
        currentLayer.redoStack.push(currentLayer.canvas.toDataURL());
        loadState(lastState);
    }
});

// Redo functionality
redoButton.addEventListener("click", () => {
    const currentLayer = layers[currentLayerIndex];
    if (currentLayer.redoStack.length > 0) {
        const nextState = currentLayer.redoStack.pop();
        currentLayer.undoStack.push(currentLayer.canvas.toDataURL());
        loadState(nextState);
    }
});

// Add a new layer
addLayerButton.addEventListener("click", () => {
    const newLayer = {
        canvas: document.createElement('canvas'),
        ctx: null,
        visible: true,
        undoStack: [],
        redoStack: []
    };
    layers.push(newLayer);
    currentLayerIndex = layers.length - 1; // Switch to the new layer
    setupLayer();
});

// Remove current layer
removeLayerButton.addEventListener("click", () => {
    if (layers.length > 1) {
        layers.splice(currentLayerIndex, 1);
        if (currentLayerIndex >= layers.length) currentLayerIndex = layers.length - 1;
        setupLayer();
    }
});

// Toggle layer visibility
toggleLayerButton.addEventListener("click", () => {
    const currentLayer = layers[currentLayerIndex];
    currentLayer.visible = !currentLayer.visible;
    if (currentLayer.visible) {
        ctx.drawImage(currentLayer.canvas, 0, 0);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Set up the initial layer
setupLayer();
