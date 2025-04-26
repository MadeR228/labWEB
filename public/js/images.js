const imageDatabase = {
    animals: [
        "images/animals/animal1.jpg", "images/animals/animal2.jpg", "images/animals/animal3.jpg",
        "images/animals/animal4.jpg", "images/animals/animal5.jpg", "images/animals/animal6.jpg",
        "images/animals/animal7.jpg", "images/animals/animal8.jpg", "images/animals/animal9.jpg",
        "images/animals/animal10.jpg", "images/animals/animal11.jpg", "images/animals/animal12.jpg",
        "images/animals/animal13.jpg", "images/animals/animal14.jpg", "images/animals/animal15.jpg",
        "images/animals/animal16.jpg", "images/animals/animal17.jpg", "images/animals/animal18.jpg",
        "images/animals/animal19.jpg", "images/animals/animal20.jpg", "images/animals/animal21.jpg",
        "images/animals/animal22.jpg", "images/animals/animal23.jpg", "images/animals/animal24.jpg",
        "images/animals/animal25.jpg", "images/animals/animal26.jpg", "images/animals/animal27.jpg",
        "images/animals/animal28.jpg", "images/animals/animal29.jpg", "images/animals/animal30.jpg",
        "images/animals/animal31.jpg", "images/animals/animal32.jpg", "images/animals/animal33.jpg",
        "images/animals/animal34.jpg", "images/animals/animal35.jpg", "images/animals/animal36.jpg",
        "images/animals/animal37.jpg", "images/animals/animal38.jpg", "images/animals/animal39.jpg",
        "images/animals/animal40.jpg", "images/animals/animal41.jpg", "images/animals/animal42.jpg",
        "images/animals/animal43.jpg", "images/animals/animal44.jpg", "images/animals/animal45.jpg",
        "images/animals/animal46.jpg", "images/animals/animal47.jpg", "images/animals/animal48.jpg",
        "images/animals/animal49.jpg", "images/animals/animal50.jpg"
    ],
    insects: [
        "images/insects/insect1.jpg", "images/insects/insect2.jpg", "images/insects/insect3.jpg",
        "images/insects/insect4.jpg", "images/insects/insect5.jpg", "images/insects/insect6.jpg",
        "images/insects/insect7.jpg", "images/insects/insect8.jpg", "images/insects/insect9.jpg",
        "images/insects/insect10.jpg", "images/insects/insect11.jpg", "images/insects/insect12.jpg",
        "images/insects/insect13.jpg", "images/insects/insect14.jpg", "images/insects/insect15.jpg",
        "images/insects/insect16.jpg", "images/insects/insect17.jpg", "images/insects/insect18.jpg",
        "images/insects/insect19.jpg", "images/insects/insect20.jpg", "images/insects/insect21.jpg",
        "images/insects/insect22.jpg", "images/insects/insect23.jpg", "images/insects/insect24.jpg",
        "images/insects/insect25.jpg", "images/insects/insect26.jpg", "images/insects/insect27.jpg",
        "images/insects/insect28.jpg", "images/insects/insect29.jpg", "images/insects/insect30.jpg",
        "images/insects/insect31.jpg", "images/insects/insect32.jpg", "images/insects/insect33.jpg",
        "images/insects/insect34.jpg", "images/insects/insect35.jpg", "images/insects/insect36.jpg",
        "images/insects/insect37.jpg", "images/insects/insect38.jpg", "images/insects/insect39.jpg",
        "images/insects/insect40.jpg", "images/insects/insect41.jpg", "images/insects/insect42.jpg",
        "images/insects/insect43.jpg", "images/insects/insect44.jpg", "images/insects/insect45.jpg",
        "images/insects/insect46.jpg", "images/insects/insect47.jpg", "images/insects/insect48.jpg",
        "images/insects/insect49.jpg", "images/insects/insect50.jpg"
    ],
    fish: [
        "images/fish/fish1.jpg", "images/fish/fish2.jpg", "images/fish/fish3.jpg",
        "images/fish/fish4.jpg", "images/fish/fish5.jpg", "images/fish/fish6.jpg",
        "images/fish/fish7.jpg", "images/fish/fish8.jpg", "images/fish/fish9.jpg",
        "images/fish/fish10.jpg", "images/fish/fish11.jpg", "images/fish/fish12.jpg",
        "images/fish/fish13.jpg", "images/fish/fish14.jpg", "images/fish/fish15.jpg",
        "images/fish/fish16.jpg", "images/fish/fish17.jpg", "images/fish/fish18.jpg",
        "images/fish/fish19.jpg", "images/fish/fish20.jpg", "images/fish/fish21.jpg",
        "images/fish/fish22.jpg", "images/fish/fish23.jpg", "images/fish/fish24.jpg",
        "images/fish/fish25.jpg", "images/fish/fish26.jpg", "images/fish/fish27.jpg",
        "images/fish/fish28.jpg", "images/fish/fish29.jpg", "images/fish/fish30.jpg",
        "images/fish/fish31.jpg", "images/fish/fish32.jpg", "images/fish/fish33.jpg",
        "images/fish/fish34.jpg", "images/fish/fish35.jpg", "images/fish/fish36.jpg",
        "images/fish/fish37.jpg", "images/fish/fish38.jpg", "images/fish/fish39.jpg",
        "images/fish/fish40.jpg", "images/fish/fish41.jpg", "images/fish/fish42.jpg",
        "images/fish/fish43.jpg", "images/fish/fish44.jpg", "images/fish/fish45.jpg",
        "images/fish/fish46.jpg", "images/fish/fish47.jpg", "images/fish/fish48.jpg",
        "images/fish/fish49.jpg", "images/fish/fish50.jpg"
    ]
};

$('#restartButton').click(function () {
    showRestartGameModal();
});

let currentCategory = "animals";
let gameImages = [];
let matchedImages = 0;
let gameTimer;
let timeLeft = 90;
let attempts = 0;
let gameActive = false;
let isPaused = true;
let progressInterval;
let progress = 0;
let timeUsed = 0;
let selectedCell = null;

$(document).ready(function () {

    $('.category-button:not(.restart-category)').click(function (event) {
        startGame(event);
    });
    
    $('.restart-category').click(function (event) {
        startGame(event);
    });
    
    $('#closeRestartModal').click(function() {
        closeRestartModal();
    });

    initClickSelection();

    initClickedSelection();

    showStartGameModal();
});

function initGame() {
    const gameField = $('#gameField');
    gameField.empty();

    prepareGameImages();

    createGameField();

    selectNewCurrentImage();

    startTimer();

    startProgressBar();

    gameActive = true;
    attempts = 0;
    matchedImages = 0;
    timeUsed = 0;
    selectedCell = null;
}

function prepareGameImages() {
    const allImages = [...imageDatabase[currentCategory]];

    shuffleArray(allImages);

    gameImages = allImages.slice(0, 25);
}

function createGameField() {
    const gameField = $('#gameField');

    const shuffledImages = [...gameImages];
    shuffleArray(shuffledImages);

    shuffledImages.forEach((imageSrc, index) => {
        const cell = $('<div>')
            .addClass('game-cell')
            .attr('data-index', index)
            .attr('data-image', imageSrc);

        const img = $('<img>')
            .attr('src', imageSrc)
            .attr('alt', 'Game image');

        cell.append(img);
        gameField.append(cell);
    });
}

function selectNewCurrentImage() {
    if (matchedImages >= 25) {
        gameWon();
    }

    const remainingImages = gameImages.filter(img => !$(`[data-image="${img}"]`).hasClass('correct'));

    const randomIndex = Math.floor(Math.random() * remainingImages.length);
    const selectedImage = remainingImages[randomIndex];

    $('#currentImage').attr('src', selectedImage).data('image', selectedImage);
}

function initClickedSelection() {
    $(document).on('click', '.game-cell', function () {
        if (!gameActive || $(this).hasClass('correct')) return;

        const clickedImage = $(this).data('image');
        const currentImage = $('#currentImage').data('image');

        attempts++;

        if (clickedImage === currentImage) {
            $(this).addClass('correct');
            matchedImages++;

            setTimeout(selectNewCurrentImage, 500);
        } else {
            $(this).addClass('wrong-flash');
            setTimeout(() => {
                $(this).removeClass('wrong-flash');
            }, 300);
        }
    });
}

function initClickSelection() {
    $(document).on('click', '#currentImage', function () {
        if (!gameActive) return;

        if (selectedCell) {
            selectedCell = null;
            $('.game-cell').removeClass('selected');
            return;
        }

        $(this).addClass('selected');

        $('.game-cell:not(.correct)').addClass('clickable');
    });

    $(document).on('click', '.game-cell', function () {
        if (!gameActive || $(this).hasClass('correct')) return;

        if ($('#currentImage').hasClass('selected')) {
            const currentImage = $('#currentImage').data('image');
            const targetImage = $(this).data('image');

            attempts++;

            // Remove highlighting
            $('.game-cell').removeClass('clickable');
            $('#currentImage').removeClass('selected');

            if (currentImage === targetImage) {
                // Correct match
                $(this).addClass('correct');
                matchedImages++;

                // Select a new current image
                setTimeout(selectNewCurrentImage, 500);
            } else {
                // Wrong match - show brief indication
                $(this).addClass('wrong-flash');
                setTimeout(() => {
                    $(this).removeClass('wrong-flash');
                }, 300);
            }
        }
    });
}

// Start the timer
function startTimer() {
    timeLeft = 90;

    if (gameActive) {
        isPaused = false;
    }

    if (gameTimer) {
        clearInterval(gameTimer);
    }

    gameTimer = setInterval(function () {
        if (!isPaused) {
            timeLeft--;
            timeUsed = 90 - timeLeft;
            $('#timer').text(timeLeft);

            // Check if time is up
            if (timeLeft <= 0) {
                clearInterval(gameTimer);
                gameActive = false;
                showTimeOutModal();
            }
        }
    }, 1000);
}

function startProgressBar() {
    if (progressInterval) clearInterval(progressInterval);

    progress = 0;
    updateProgressBar(progress);

    progressInterval = setInterval(() => {
        progress = (1 - timeLeft / 90) * 100;
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
    if (value < 50) {
        progressColor = '#4CAF50';
    } else if (value < 75) {
        progressColor = '#ff9800';
    } else {
        progressColor = '#f44336';
    }

    $('.progress-bar').css('background-color', progressColor);
}

// Shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Show the game start modal
function showStartGameModal() {
    $('#startGameModal').css('display', 'flex');
    gameActive = false;
    isPaused = true;
}

// Show the restart game modal
function showRestartGameModal() {
    $('#restartGameModal').css('display', 'flex');
    // Приостанавливаем игру
    isPaused = true;
}

// Close the restart modal and resume the game
function closeRestartModal() {
    // Скрываем модальное окно перезапуска
    $('#restartGameModal').css('display', 'none');
    
    // Возобновляем игру
    if (gameImages.length > 0) {
        gameActive = true;
        isPaused = false;
    }
}

// Show the win modal
function showWinModal() {
    $('#winTime').text(timeUsed);
    $('#winAttempts').text(attempts);
    $('#winModal').css('display', 'flex');
}

// Show the time-out modal
function showTimeOutModal() {
    isPaused = true;
    clearInterval(progressInterval);
    $('#timeOutModal').css('display', 'flex');
}

// Исправляем функцию startNewGame
function startNewGame() {
    // Остановить все таймеры и сбросить состояние
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    if (progressInterval) {
        clearInterval(progressInterval);
    }
    
    // Сбросить флаги состояния игры
    gameActive = false;
    isPaused = true;
    
    // Закрыть все модальные окна
    $('.modal-overlay').css('display', 'none');
    
    // Показать модальное окно выбора категории
    $('#startGameModal').css('display', 'flex');
}

// Исправляем функцию startGame
function startGame(event) {
    // Останавливаем распространение события (чтобы избежать двойных вызовов)
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Получаем выбранную категорию из кнопки
        currentCategory = $(event.target).data('category');
    }
    
    // Закрываем все модальные окна
    $('.modal-overlay').css('display', 'none');
    
    // Сбрасываем состояние игры
    attempts = 0;
    matchedImages = 0;
    timeUsed = 0;
    selectedCell = null;
    gameActive = true;
    
    // Запускаем игру с выбранной категорией
    initGame();
}

// Додаємо обробники подій для кнопок категорій
$(document).ready(function () {
    $('.category-button').click(function (event) {
        startGame(event);
    });
});

// Function called when the game is won
function gameWon() {
    gameActive = false;
    isPaused = true;

    clearInterval(gameTimer);
    clearInterval(progressInterval);

    showWinModal();
}