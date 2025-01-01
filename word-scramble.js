// Words to use in the game
const words = ["javascript", "developer", "cyclone", "scramble", "coding", "project", "challenge", "algorithm", "program", "variable"];

// Game state variables
let currentWord = "";
let scrambledWord = "";
let score = 0;
let lives = 3;

// DOM elements
const scrambledWordElement = document.getElementById("scrambled-word");
const userInput = document.getElementById("user-input");
const submitButton = document.getElementById("submit-btn");
const feedback = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const restartButton = document.getElementById("restart-btn");

// Helper function to shuffle a word
function shuffleWord(word) {
    return word.split("").sort(() => Math.random() - 0.5).join("");
}

// Function to start a new round
function newRound() {
    if (lives > 0) {
        // Choose a random word
        currentWord = words[Math.floor(Math.random() * words.length)];
        // Scramble the word
        scrambledWord = shuffleWord(currentWord);
        // Display the scrambled word
        scrambledWordElement.textContent = scrambledWord;
        // Clear input and feedback
        userInput.value = "";
        feedback.textContent = "";
    } else {
        endGame();
    }
}

// Function to check the user's answer
function checkAnswer() {
    const userAnswer = userInput.value.trim().toLowerCase();
    if (userAnswer === currentWord) {
        // Correct answer
        score++;
        feedback.textContent = "Correct!";
        feedback.className = "correct";
        scoreElement.textContent = score;
        newRound();
    } else {
        // Wrong answer
        lives--;
        feedback.textContent = `Wrong! The correct word was "${currentWord}".`;
        feedback.className = "wrong";
        livesElement.textContent = lives;
        newRound();
    }
}

// Function to end the game
function endGame() {
    scrambledWordElement.textContent = "Game Over!";
    feedback.textContent = `Final Score: ${score}`;
    submitButton.disabled = true;
    restartButton.classList.remove("hidden");
}

// Function to restart the game
function restartGame() {
    score = 0;
    lives = 3;
    scoreElement.textContent = score;
    livesElement.textContent = lives;
    submitButton.disabled = false;
    restartButton.classList.add("hidden");
    newRound();
}

// Event listeners
submitButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartGame);

// Start the first round
newRound();
