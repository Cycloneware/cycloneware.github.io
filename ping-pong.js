// Get the canvas and its context
const canvas = document.getElementById('pingpong-canvas');
const ctx = canvas.getContext('2d');

// Game variables
const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let player1Score = 0;
let player2Score = 0;

// Paddle movement speed
const paddleSpeed = 6; // Adjust speed for Player 2 (human)
const aiSpeed = 4; // AI speed for Player 1 (computer-controlled)

// Track key states for Player 2 (human)
let player2Up = false;
let player2Down = false;

// Draw functions
function drawPaddles() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight); // Left paddle (AI controlled Player 1)
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight); // Right paddle (Player 2, human)
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawScores() {
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;
}

// Game functions
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball bouncing off top and bottom
    if (ballY - ballRadius <= 0 || ballY + ballRadius >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball hitting player paddles
    if (ballX - ballRadius <= paddleWidth && ballY >= player1Y && ballY <= player1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        player1Score++;
    }

    if (ballX + ballRadius >= canvas.width - paddleWidth && ballY >= player2Y && ballY <= player2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        player2Score++;
    }

    // Ball out of bounds (reset)
    if (ballX - ballRadius <= 0 || ballX + ballRadius >= canvas.width) {
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

// Paddle movement functions
function movePaddles() {
    // AI movement for Player 1 (computer)
    if (ballY < player1Y + paddleHeight / 2) {
        player1Y -= aiSpeed; // Move up
    } else if (ballY > player1Y + paddleHeight / 2) {
        player1Y += aiSpeed; // Move down
    }

    // Restrict AI paddle to within canvas bounds
    if (player1Y < 0) player1Y = 0;
    if (player1Y > canvas.height - paddleHeight) player1Y = canvas.height - paddleHeight;

    // Human-controlled Player 2
    if (player2Up && player2Y > 0) {
        player2Y -= paddleSpeed;
    }
    if (player2Down && player2Y < canvas.height - paddleHeight) {
        player2Y += paddleSpeed;
    }
}

// Handle key events for Player 2 (human)
document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        player2Up = true;
    } else if (e.key === 's') {
        player2Down = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') {
        player2Up = false;
    } else if (e.key === 's') {
        player2Down = false;
    }
});

// Game update function
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddles();
    drawBall();
    drawScores();
    moveBall();
}

// Game loop
function gameLoop() {
    update();
    movePaddles();
    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
