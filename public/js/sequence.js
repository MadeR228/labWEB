$('#restartButton').click(function () {
    startNewGame();
});

let progress = 0;
let progressInterval = null;
let slideInterval = null;
let currentNumber = 1;
let gameTimer;
let timeLeft = 60;
let attempts = 0;
let gameActive = false;
let stats = JSON.parse(localStorage.getItem('sequenceGameStats')) || [];
let isPaused = true;
let remainingTime = 0;

function initGame() {
    createGameField();

    startTimer();

    loadStats();
}

function startProgressBar() {
    if (progressInterval) clearInterval(progressInterval);

    progress = 0;
    updateProgressBar(progress);

    progressInterval = setInterval(() => {
        progress = (1 - timeLeft / 60) * 100;
        updateProgressBar(progress);

        if (timeLeft <= 0) {
            clearInterval(progressInterval);
        }
    }, 100);
}

function updateProgressBar(value) {
    const halfValue = value / 2;

    $('.progress-left').css('width', halfValue + '%');
    $('.progress-right').css('width', halfValue + '%');

    let progressColor;
    if (value < 25) {
        progressColor = '#4CAF50';
    } else if (value < 75) {
        progressColor = '#ff9800';
    } else {
        progressColor = '#f44336';
    }

    $('.progress-bar').css('background-color', progressColor);
}

function createGameField() {
    const gameField = $('#gameField');
    gameField.empty();

    const numbers = Array.from({length: 20}, (_, i) => i + 1);

    shuffleArray(numbers);

    numbers.forEach(num => {
        const cell = $('<div>')
            .addClass('number-cell')
            .text(num)
            .css({
                'font-size': getRandomFontSize(),
                'background-color': getRandomColor(),
                'color': getContrastColor(getRandomColor())
            })
            .data('number', num)
            .click(function () {
                if (!gameActive || $(this).hasClass('selected')) return;

                const selectedNumber = $(this).data('number');

                if (selectedNumber === currentNumber) {
                    $(this).addClass('selected');
                    currentNumber++;

                    if (currentNumber > 20) {
                        gameWon();
                    }
                } else {
                    attempts++;
                    $(this).addClass('wrong');

                    setTimeout(() => {
                        $(this).removeClass('wrong');
                    }, 500);

                    showErrorModal();
                }
            });

        gameField.append(cell);
    });
}

function getRandomFontSize() {
    const sizes = [16, 20, 24, 28, 32, 36, 40];
    return sizes[Math.floor(Math.random() * sizes.length)] + 'px';
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getContrastColor(hexcolor) {
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? '#000000' : '#FFFFFF';
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startTimer() {
    timeLeft = 60;
    $('#timer').text(timeLeft);
    if (gameActive = true) {
        isPaused = false;
    }

    if (gameTimer) {
        clearInterval(gameTimer);
    }

    gameTimer = setInterval(function () {
        if (!isPaused) {
            timeLeft--;
            $('#timer').text(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                gameActive = false;
                showTimeOutModal();
            }
        }
    }, 1000);

    startProgressBar();

}

function showErrorModal() {
    $('#errorModal').css('display', 'flex');
}

function closeErrorModal() {
    $('#errorModal').css('display', 'none');
}

function showWinModal() {
    $('#winTime').text(60 - timeLeft);
    $('#winAttempts').text(attempts);
    $('#winModal').css('display', 'flex');
}

function showTimeOutModal() {
    isPaused = true;
    clearInterval(progressInterval);
    $('#timeOutModal').css('display', 'flex');
}

function showStartGameModal() {
    isPaused = true;
    clearInterval(progressInterval);
    document.getElementById('startGameModal').style.display = 'flex';
}

function startGame() {
    isPaused = false;
    clearInterval(progressInterval);
    document.getElementById('startGameModal').style.display = 'none';
    initGame();
}

function gameWon() {
    clearInterval(gameTimer);
    gameActive = false;

    const date = new Date().toLocaleDateString('uk-UA');
    const time = 60 - timeLeft;

    stats.push({
        date: date,
        time: time,
        attempts: attempts,
    });

    stats.sort((a, b) => a.time - b.time);

    localStorage.setItem('sequenceGameStats', JSON.stringify(stats));

    loadStats();

    showWinModal();
}

function loadStats() {
    const statsBody = $('#statsBody');
    statsBody.empty();

    stats.forEach((stat, index) => {
        const row = $('<tr>');

        if (index === 0) {
            row.addClass('best-result');
        }

        row.append($('<td>').text(stat.date));
        row.append($('<td>').text(stat.time + ' сек.'));
        row.append($('<td>').text(stat.attempts));

        statsBody.append(row);
    });
}

function startNewGame() {
    currentNumber = 1;
    attempts = 0;

    if (gameTimer) {
        clearInterval(gameTimer);
    }

    $('#errorModal').css('display', 'none');
    $('#winModal').css('display', 'none');
    $('#timeOutModal').css('display', 'none');

    $('.number-cell').removeClass('selected wrong');

    createGameField();

    startTimer();
}

document.addEventListener('DOMContentLoaded', showStartGameModal);
