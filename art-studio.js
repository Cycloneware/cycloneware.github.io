// Canvas setup
const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');
let painting = false;

// Brush settings
const colorPicker = document.getElementById('color');
const brushSize = document.getElementById('brushSize');
const clearButton = document.getElementById('clearCanvas');
const saveButton = document.getElementById('saveImage');

// Start drawing
function startPosition(e) {
    painting = true;
    draw(e);
}

// End drawing
function endPosition() {
    painting = false;
    ctx.beginPath(); // Stop connecting lines
}

// Draw on canvas
function draw(e) {
    if (!painting) return;
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colorPicker.value;

    // Adjust for canvas offset
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Clear the canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the canvas as an image
saveButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'CycloneArt.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseout', endPosition); // Stop drawing when the mouse leaves the canvas
