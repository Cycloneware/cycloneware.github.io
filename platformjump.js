const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

const player = {
    x: 200,
    y: 500,
    width: 20,
    height: 20,
    color: "red",
    velocityY: 0,
    gravity: 0.4,
    jumpStrength: -10,
    speed: 0, // Initial speed for left/right movement
    maxSpeed: 5, // Maximum horizontal speed
    acceleration: 0.2, // Acceleration for smooth movement
    friction: 0.1, // Friction for deceleration
};

const platforms = [];
const platformWidth = 100;
const platformHeight = 10;

let score = 0;
let gameOver = false;

function createPlatform(x, y) {
    return { x, y, width: platformWidth, height: platformHeight, speed: 1.5 };
}

function initPlatforms() {
    for (let i = 0; i < 6; i++) {
        platforms.push(createPlatform(Math.random() * (canvas.width - platformWidth), i * 100));
    }
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    platforms.forEach(platform => {
        ctx.fillStyle = "green";
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function updatePlatforms() {
    platforms.forEach(platform => {
        platform.y += platform.speed;

        // Reset platform when it moves off screen
        if (platform.y > canvas.height) {
            platform.y = -platformHeight;
            platform.x = Math.random() * (canvas.width - platformWidth);
            score++;
        }
    });
}

function checkCollision() {
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height < platform.y + platform.height &&
            player.y + player.height + player.velocityY >= platform.y
        ) {
            player.velocityY = player.jumpStrength;
        }
    });

    // Prevent the player from falling off horizontally
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Grace period for falling off-screen
    if (player.y > canvas.height + 20) {
        gameOver = true;
    }
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function updatePlayer() {
    // Apply movement and boundaries
    player.x += player.speed;

    // Apply gravity
    player.y += player.velocityY;
    player.velocityY += player.gravity;

    // Apply friction to slow the player down when no keys are pressed
    if (player.speed > 0) {
        player.speed -= player.friction;
        if (player.speed < 0) player.speed = 0;
    } else if (player.speed < 0) {
        player.speed += player.friction;
        if (player.speed > 0) player.speed = 0;
    }
}

function handleInput() {
    if (keys["ArrowLeft"] && !keys["ArrowRight"]) {
        player.speed -= player.acceleration;
        if (player.speed < -player.maxSpeed) player.speed = -player.maxSpeed;
    }
    if (keys["ArrowRight"] && !keys["ArrowLeft"]) {
        player.speed += player.acceleration;
        if (player.speed > player.maxSpeed) player.speed = player.maxSpeed;
    }
}

function update() {
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 90, canvas.height / 2 + 40);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleInput();
    updatePlayer();
    updatePlatforms();
    checkCollision();

    drawPlatforms();
    drawPlayer();
    drawScore();

    requestAnimationFrame(update);
}

// Input Handling
const keys = {};
document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});

initPlatforms();
update();
