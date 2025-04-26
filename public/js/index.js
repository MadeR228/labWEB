// 1 TIME
function updateTimeDisplay() {
    const timeDisplay = document.getElementById('timeDisplay');
    const date = new Date();
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const daysOfWeek = ['понеділок', 'вівторок', 'середа', 'четвер', 'пятниця', 'субота', 'неділя'];    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const day = String(date.getDate()).padStart(2, '0');
    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}, ${dayOfWeek}, ${day} ${month} ${year} року`;
}

// 2 GAME
function getTemperature(difference) {
    if (difference <= 5) return "Гаряче";
    if (difference <= 10) return "Тепло";
    return "Холодно";
}

let secretNumber;
let attempts = 0;
let gameOver = false;

function initGame() {
    secretNumber = Math.floor(Math.random() * 51);
    attempts = 0;
    gameOver = false;
    document.getElementById('attemptsCount').textContent = '0';
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'message';
    document.getElementById('guessInput').value = '';
    document.getElementById('consoleOutput').innerHTML = '';
}

function addToConsole(message) {
    const consoleOutput = document.getElementById('consoleOutput');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    consoleOutput.appendChild(messageElement);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function updateMessage(text, temperature) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = 'message ' + temperature;
}

function showGameOverModal(number, attempts) {
    const modal = document.getElementById('gameOverModal');
    document.getElementById('modalNumber').textContent = number;
    document.getElementById('modalAttempts').textContent = attempts;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('gameOverModal');
    modal.style.display = 'none';
}

function startNewGame() {
    closeModal();
    initGame();
}

function makeGuess() {
    if (gameOver) {
        initGame();
        return;
    }

    const guessInput = document.getElementById('guessInput');
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 0 || userGuess > 50) {
        updateMessage('Введіть число від 0 до 50', '');
        return;
    }

    attempts++;
    document.getElementById('attemptsCount').textContent = attempts;

    const difference = Math.abs(secretNumber - userGuess);
    addToConsole(`Спроба ${attempts}: число ${userGuess} – ${getTemperature(difference)}.`);

    if (userGuess === secretNumber) {
        updateMessage(`Вітаємо! За ${attempts} ${attempts === 1 ? 'спробу' : 'спроб'} ви вгадали число ${secretNumber}!`, '');
        gameOver = true;
        showGameOverModal(secretNumber, attempts);
    } else {
        updateMessage(`${getTemperature(difference)}. Спробуйте ще раз!`, getTemperature(difference));
    }

    guessInput.value = '';
    guessInput.focus();
}

document.getElementById('guessInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        makeGuess();
    }
});

window.onload = function() {
    initGame();
    updateTimeDisplay();
    setInterval(updateTimeDisplay, 1000);
};
