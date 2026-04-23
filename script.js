// Game Constants & State
let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let bestScore = localStorage.getItem('bestScore') || Infinity;

// DOM Elements
const guessInput = document.getElementById('guessInput');
const predictBtn = document.getElementById('predictBtn');
const resetBtn = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');
const attemptCountDisplay = document.getElementById('attemptCount');
const bestScoreDisplay = document.getElementById('bestScore');
const gameCard = document.getElementById('gameCard');

// Initialize
if (bestScore !== Infinity) {
    bestScoreDisplay.textContent = bestScore;
}

// Game Logic
function checkGuess() {
    const guess = parseInt(guessInput.value);

    // Validation
    if (isNaN(guess) || guess < 1 || guess > 100) {
        showFeedback('Please enter a number between 1 and 100', 'too-high');
        triggerShake();
        return;
    }

    attempts++;
    attemptCountDisplay.textContent = attempts;

    if (guess === targetNumber) {
        handleWin();
    } else if (guess > targetNumber) {
        showFeedback('Too High! Try a smaller number.', 'too-high');
        triggerShake();
    } else {
        showFeedback('Too Low! Try a bigger number.', 'too-low');
        triggerShake();
    }

    guessInput.value = '';
    guessInput.focus();
}

function handleWin() {
    showFeedback(`🎉 Correct! It was ${targetNumber}!`, 'success');
    predictBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');
    guessInput.disabled = true;

    // Update Best Score
    if (attempts < bestScore) {
        bestScore = attempts;
        localStorage.setItem('bestScore', bestScore);
        bestScoreDisplay.textContent = bestScore;
        showFeedback(`🎉 Correct! New Best Score: ${attempts}!`, 'success');
    }

    triggerPop();
}

function resetGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptCountDisplay.textContent = '0';
    guessInput.value = '';
    guessInput.disabled = false;
    guessInput.focus();
    feedback.textContent = '';
    feedback.className = 'feedback';
    predictBtn.classList.remove('hidden');
    resetBtn.classList.add('hidden');
}

// UI Helpers
function showFeedback(text, className) {
    feedback.textContent = text;
    feedback.className = `feedback ${className}`;
}

function triggerShake() {
    gameCard.classList.remove('shake');
    void gameCard.offsetWidth; // Trigger reflow
    gameCard.classList.add('shake');
}

function triggerPop() {
    gameCard.classList.remove('pop');
    void gameCard.offsetWidth; // Trigger reflow
    gameCard.classList.add('pop');
}

// Event Listeners
predictBtn.addEventListener('click', checkGuess);

guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});

resetBtn.addEventListener('click', resetGame);

// Initial focus
guessInput.focus();
