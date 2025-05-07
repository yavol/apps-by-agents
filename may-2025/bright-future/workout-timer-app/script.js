let timer;
let isRunning = false;
let time = 0;

const display = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

startButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startButton.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            time++;
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            display.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
        startButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timer);
    time = 0;
    display.textContent = '00:00';
    startButton.textContent = 'Start';
    isRunning = false;
});