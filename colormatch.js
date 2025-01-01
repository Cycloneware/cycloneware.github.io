const colors = ["RED", "BLUE", "GREEN", "YELLOW", "PURPLE", "ORANGE"];
const colorHex = {
    RED: "#ff4d4d",
    BLUE: "#4d79ff",
    GREEN: "#4dff4d",
    YELLOW: "#ffff4d",
    PURPLE: "#bf4dff",
    ORANGE: "#ff994d",
};

let currentColor = "";
let score = 0;

const colorWord = document.getElementById("color-word");
const colorButtons = document.getElementById("color-buttons");
const scoreDisplay = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function setupGame() {
    currentColor = randomColor();
    colorWord.textContent = currentColor;
    colorWord.style.color = colorHex[randomColor];

    colorButtons.innerHTML = ""; // Clear existing buttons
    const shuffledColors = [...colors].sort(() => 0.5 - Math.random());

    shuffledColors.forEach(color => {
        const btn = document.createElement("button");
        btn.classList.add("color-btn");
        btn.style.backgroundColor = colorHex[color];
        btn.dataset.color = color;
        btn.addEventListener("click", checkAnswer);
        colorButtons.appendChild(btn);
    });
}

function checkAnswer(e) {
    const selectedColor = e.target.dataset.color;
    if (selectedColor === currentColor) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        setupGame();
    } else {
        endGame();
    }
}

function endGame() {
    colorWord.textContent = "Game Over!";
    colorWord.style.color = "#333";
    colorButtons.innerHTML = "";
    restartButton.style.display = "inline-block";
}

restartButton.addEventListener("click", () => {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    restartButton.style.display = "none";
    setupGame();
});

// Initialize game on load
setupGame();
