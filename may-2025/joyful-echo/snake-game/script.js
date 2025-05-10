const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20; // size of one square
const canvasSize = 16; // 16x16 grid
let snake = [];
let direction = 'RIGHT';
let food = {};
let score = 0;
let gameInterval = null;
let isGameOver = false;

function resetGame() {
    snake = [
        {x: 8, y: 8},
        {x: 7, y: 8},
        {x: 6, y: 8}
    ];
    direction = 'RIGHT';
    score = 0;
    isGameOver = false;
    document.getElementById('score').textContent = score;
    placeFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(draw, 100);
}

function placeFood() {
    let valid = false;
    while (!valid) {
        food = {
            x: Math.floor(Math.random() * canvasSize),
            y: Math.floor(Math.random() * canvasSize)
        };
        valid = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * box, y * box, box, box);
}

function draw() {
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        drawPixel(snake[i].x, snake[i].y, i === 0 ? '#7ec850' : '#b6e97a');
    }

    // Draw food
    drawPixel(food.x, food.y, '#e0e040');

    // Move snake
    let head = {x: snake[0].x, y: snake[0].y};
    if (direction === 'LEFT') head.x--;
    if (direction === 'UP') head.y--;
    if (direction === 'RIGHT') head.x++;
    if (direction === 'DOWN') head.y++;

    // Check collision with wall
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        gameOver();
        return;
    }
    // Check collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);
    // Check if food eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
}

function gameOver() {
    clearInterval(gameInterval);
    isGameOver = true;
    ctx.fillStyle = 'rgba(34,34,34,0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 32px Courier New, monospace';
    ctx.fillStyle = '#e0e040';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width/2, canvas.height/2 - 10);
    ctx.font = '20px Courier New, monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText('Score: ' + score, canvas.width/2, canvas.height/2 + 24);
}

document.addEventListener('keydown', e => {
    if (isGameOver) return;
    if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    else if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    else if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    else if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

document.getElementById('restartBtn').addEventListener('click', resetGame);

resetGame();
