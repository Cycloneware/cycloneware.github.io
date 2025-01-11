const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const eraserTool = document.getElementById('eraser-tool');
const penTool = document.getElementById('pen-tool');
const brushSize = document.getElementById('brush-size');
const colorPicker = document.getElementById('color-picker');

let isDrawing = false;
let isEraser = false;
let brushColor = colorPicker.value;
let brushWidth = brushSize.value;

// Update canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

// Start drawing
canvas.addEventListener('mousedown', () => (isDrawing = true));
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseleave', () => (isDrawing = false));

canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    ctx.lineWidth = brushWidth;
    ctx.lineCap = 'round';

    if (isEraser) {
        ctx.globalCompositeOperation = 'destination-out'; // Erase mode
        ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
        ctx.globalCompositeOperation = 'source-over'; // Draw mode
        ctx.strokeStyle = brushColor;
    }

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Switch to eraser
eraserTool.addEventListener('click', () => {
    isEraser = true;
    eraserTool.style.border = '2px solid black'; // Highlight eraser tool
    penTool.style.border = 'none';
});

// Switch to pen
penTool.addEventListener('click', () => {
    isEraser = false;
    eraserTool.style.border = 'none';
    penTool.style.border = '2px solid black'; // Highlight pen tool
});

// Update brush size and color
brushSize.addEventListener('input', () => (brushWidth = brushSize.value));
colorPicker.addEventListener('input', () => (brushColor = colorPicker.value));
