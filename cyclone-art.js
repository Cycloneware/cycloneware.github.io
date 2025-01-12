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
const addLayerButton = document.getElementById("addLayer");
const deleteLayerButton = document.getElementById("deleteLayer");
const layerList = document.getElementById("layerList");

// Global variables
let isEraser = false;
let currentColor = "black";
let currentSize = 5;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Undo/Redo states
const undoStack = [];
const redoStack = [];

// Layers
let layers = [];
let currentLayerIndex = 0;

// Initialize first layer
function initializeCanvas() {
    addLayer();
    selectLayer(0);
}

// Save the current state of the canvas
function saveState() {
    const state = canvas.toDataURL();
    undoStack.push(state);
    redoStack.length = 0; // Clear redo stack after a new action
}

// Restore a canvas state
function restoreState(state) {
    const img = new Image();
    img.src = state;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
    };
}

// Undo function
undoButton.addEventListener("click", () => {
    if (undoStack.length > 0) {
        redoStack.push(undoStack.pop());
        const lastState = undoStack[undoStack.length - 1];
        if (lastState) {
            restoreState(lastState);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear if no state left
        }
    }
});

// Redo function
redoButton.addEventListener("click", () => {
    if (redoStack.length > 0) {
        const state = redoStack.pop();
        undoStack.push(state);
        restoreState(state);
    }
});

// Add new layer
addLayerButton.addEventListener("click", () => {
    addLayer();
});

// Delete the selected layer
deleteLayerButton.addEventListener("click", () => {
    if (layers.length > 1) {
        deleteLayer(currentLayerIndex);
    }
});

// Add a new layer
function addLayer() {
    const newLayer = document.createElement("li");
    newLayer.textContent = `Layer ${layers.length + 1}`;
    newLayer.addEventListener("click", () => {
        selectLayer(layers.length);
    });
    layerList.appendChild(newLayer);
    layers.push(newLayer);
    selectLayer(layers.length - 1);
}

// Select a layer
function selectLayer(index) {
    layers.forEach((layer, i) => {
        if (i === index) {
            layer.classList.add("active");
        } else {
            layer.classList.remove("active");
        }
    });
    currentLayerIndex = index;
    saveState();
}

// Delete a layer
function deleteLayer(index) {
    layerList.removeChild(layers[index]);
    layers.splice(index, 1);

    // Adjust active layer
    currentLayerIndex = Math.min(currentLayerIndex, layers.length - 1);
    selectLayer(currentLayerIndex);
}

// Drawing events
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    saveState();
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

// Clear canvas
clearCanvasButton.addEventListener("click", () => {
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Initialize
initializeCanvas();
