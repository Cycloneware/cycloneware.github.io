// scripts.js

function startGame(game) {
    // Redirect to the game page based on the button clicked
    if (game === 'game1') {
        window.location.href = 'game1.html'; // Change to the actual game URL
    } else if (game === 'game2') {
        window.location.href = 'game2.html';
    } else if (game === 'game3') {
        window.location.href = 'game3.html';
    }
}
