const COLS = 10;
const ROWS = 20;
const board = Array.from({ length: ROWS }, () => Array(COLS).fill(''));
const boardElem = document.getElementById('board');
const nextElem = document.getElementById('next');
let cellElems = [];
let nextCells = [];
let score = 0;
let level = 1;
let linesCleared = 0;
let dropInterval = 1000;
let dropTimer = null;
class Sound {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    play(type) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        let freq = 440;
        let dur = 0.1;
        if (type === 'move') { freq = 200; dur = 0.05; }
        else if (type === 'rotate') { freq = 300; dur = 0.05; }
        else if (type === 'line') { freq = 600; dur = 0.2; }
        else if (type === 'gameOver') { freq = 120; dur = 0.5; }
        osc.frequency.value = freq;
        osc.type = 'square';
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        osc.start();
        osc.stop(this.ctx.currentTime + dur);
    }
}
const sound = new Sound();
const SHAPES = {
    I: [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    J: [[0,2,0],[0,2,0],[2,2,0]],
    L: [[0,3,0],[0,3,0],[0,3,3]],
    O: [[4,4],[4,4]],
    S: [[0,5,5],[5,5,0],[0,0,0]],
    T: [[0,6,0],[6,6,6],[0,0,0]],
    Z: [[7,7,0],[0,7,7],[0,0,0]]
};
const COLORS = {1:'I',2:'J',3:'L',4:'O',5:'S',6:'T',7:'Z'};
let current = null;
let next = null;
function createCells(element, elems, rows, cols) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            element.appendChild(cell);
            elems.push(cell);
        }
    }
}
function reset() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            board[r][c] = '';
        }
    }
    score = 0;
    level = 1;
    linesCleared = 0;
    dropInterval = 1000;
    updateInfo();
    current = createPiece();
    next = createPiece();
    drawBoard();
    drawNext();
    clearInterval(dropTimer);
    dropTimer = setInterval(drop, dropInterval);
}
function createPiece() {
    const types = Object.keys(SHAPES);
    const type = types[Math.floor(Math.random() * types.length)];
    const shape = SHAPES[type].map(row => row.slice());
    return { shape, type, row: 0, col: Math.floor((COLS - shape[0].length) / 2) };
}
function rotate(matrix) {
    const N = matrix.length;
    const res = matrix.map((row, i) => row.map((_, j) => matrix[N - 1 - j][i]));
    return res;
}
function valid(pos) {
    const { shape, row, col } = pos;
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
                const x = col + c;
                const y = row + r;
                if (x < 0 || x >= COLS || y >= ROWS || (y >= 0 && board[y][x])) {
                    return false;
                }
            }
        }
    }
    return true;
}
function merge() {
    const { shape, type, row, col } = current;
    for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
            if (shape[r][c]) {
                board[row + r][col + c] = type;
            }
        }
    }
}
function clearLines() {
    let cleared = 0;
    outer: for (let r = ROWS - 1; r >= 0; r--) {
        for (let c = 0; c < COLS; c++) {
            if (!board[r][c]) continue outer;
        }
        board.splice(r, 1);
        board.unshift(Array(COLS).fill(''));
        cleared++;
        r++;
    }
    if (cleared) {
        linesCleared += cleared;
        score += cleared * 100;
        if (linesCleared >= level * 10) {
            level++;
            dropInterval *= 0.9;
            clearInterval(dropTimer);
            dropTimer = setInterval(drop, dropInterval);
        }
        updateInfo();
        sound.play('line');
    }
}
function gameOver() {
    clearInterval(dropTimer);
    sound.play('gameOver');
    boardElem.classList.add('game-over');
}
function drop() {
    const pos = { shape: current.shape, type: current.type, row: current.row + 1, col: current.col };
    if (valid(pos)) {
        current.row++;
    } else {
        merge();
        clearLines();
        current = next;
        next = createPiece();
        drawNext();
        if (!valid(current)) {
            gameOver();
            return;
        }
    }
    drawBoard();
}
function move(dir) {
    const pos = { shape: current.shape, type: current.type, row: current.row, col: current.col + dir };
    if (valid(pos)) {
        current.col += dir;
        drawBoard();
        sound.play('move');
    }
}
function rotatePiece() {
    const newShape = rotate(current.shape);
    const pos = { shape: newShape, type: current.type, row: current.row, col: current.col };
    if (valid(pos)) {
        current.shape = newShape;
        drawBoard();
        sound.play('rotate');
    }
}
function hardDrop() {
    while (valid({ shape: current.shape, type: current.type, row: current.row + 1, col: current.col })) {
        current.row++;
    }
    drawBoard();
    drop();
}
function updateInfo() {
    document.getElementById('score').textContent = score;
    document.getElementById('level').textContent = level;
}
function drawBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const idx = r * COLS + c;
            const cell = cellElems[idx];
            const type = board[r][c];
            cell.className = 'cell';
            if (type) cell.classList.add(type);
        }
    }
    for (let r = 0; r < current.shape.length; r++) {
        for (let c = 0; c < current.shape[r].length; c++) {
            if (current.shape[r][c]) {
                const x = current.col + c;
                const y = current.row + r;
                if (y >= 0) {
                    const idx = y * COLS + x;
                    cellElems[idx].classList.add(current.type);
                }
            }
        }
    }
}
function drawNext() {
    nextCells.forEach(cell => cell.className = 'cell');
    for (let r = 0; r < next.shape.length; r++) {
        for (let c = 0; c < next.shape[r].length; c++) {
            if (next.shape[r][c]) {
                const idx = r * 4 + c;
                nextCells[idx].classList.add(next.type);
            }
        }
    }
}
createCells(boardElem, cellElems, ROWS, COLS);
createCells(nextElem, nextCells, 4, 4);
document.getElementById('move-left').addEventListener('click', () => move(-1));
document.getElementById('move-right').addEventListener('click', () => move(1));
document.getElementById('rotate').addEventListener('click', rotatePiece);
document.getElementById('soft-drop').addEventListener('click', drop);
document.getElementById('hard-drop').addEventListener('click', hardDrop);
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') move(-1);
    else if (e.key === 'ArrowRight') move(1);
    else if (e.key === 'ArrowUp' || e.key === 'x') rotatePiece();
    else if (e.key === 'ArrowDown') drop();
    else if (e.key === ' ') hardDrop();
});
reset();