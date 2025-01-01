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
    gravity: 0.5,
    jumpStrength: -10,
};

const platforms = [];
const platformWidth = 80;
const platformHeight = 10;

let score = 0;
let gameOver = false;

function createPlatform(x, y) {
    return { x, y, width: platformWidth, height: platformHeight, speed: 2 };
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

    if (player.y > canvas.height) {
        gameOver = true;
    }
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
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

    player.y += player.velocityY;
    player.velocityY += player.gravity;

    drawPlatforms();
    drawPlayer();
    drawScore();

    updatePlatforms();
    checkCollision();

    requestAnimationFrame(update);
}

function keyHandler(event) {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= 20;
    } else if (event.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += 20;
    }
}

document.addEventListener("keydown", keyHandler);

initPlatforms();
update();
