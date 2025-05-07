// DOM Elements
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const timerStatusEl = document.getElementById('timer-status');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workTimeInput = document.getElementById('work-time');
const restTimeInput = document.getElementById('rest-time');
const roundsInput = document.getElementById('rounds');
const cyclesInput = document.getElementById('cycles');
const currentPhaseEl = document.getElementById('current-phase');
const currentRoundEl = document.getElementById('current-round');
const totalRoundsEl = document.getElementById('total-rounds');
const currentCycleEl = document.getElementById('current-cycle');
const totalCyclesEl = document.getElementById('total-cycles');
const timerProgressEl = document.querySelector('.timer-progress');
const timerCircle = document.querySelector('.timer-circle');
const beepSound = document.getElementById('beep-sound');
const completeSound = document.getElementById('complete-sound');

// Timer State
let timer = {
    workTime: 30,
    restTime: 10,
    rounds: 3,
    cycles: 2,
    currentTime: 0,
    currentRound: 0,
    currentCycle: 0,
    isRunning: false,
    isPaused: false,
    interval: null,
    phase: 'work', // 'work' or 'rest'
    totalTime: 0
};

// Initialize the app
function init() {
    updateTimerDisplay(0);
    updateProgressDisplay();
    
    // Event listeners
    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Update timer settings when inputs change
    workTimeInput.addEventListener('change', updateSettings);
    restTimeInput.addEventListener('change', updateSettings);
    roundsInput.addEventListener('change', updateSettings);
    cyclesInput.addEventListener('change', updateSettings);
    
    // Initialize settings
    updateSettings();
}

// Update timer settings from inputs
function updateSettings() {
    timer.workTime = parseInt(workTimeInput.value) || 30;
    timer.restTime = parseInt(restTimeInput.value) || 10;
    timer.rounds = parseInt(roundsInput.value) || 3;
    timer.cycles = parseInt(cyclesInput.value) || 2;
    
    // Update display
    totalRoundsEl.textContent = timer.rounds;
    totalCyclesEl.textContent = timer.cycles;
    
    resetTimer();
}

// Start the timer
function startTimer() {
    if (timer.isRunning && !timer.isPaused) return;
    
    if (!timer.isRunning) {
        // Starting fresh
        timer.isRunning = true;
        timer.currentTime = timer.workTime;
        timer.currentRound = 1;
        timer.currentCycle = 1;
        timer.phase = 'work';
        updatePhaseDisplay();
    } else {
        // Resuming from pause
        timer.isPaused = false;
    }
    
    // Update button states
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    // Disable settings inputs while timer is running
    toggleSettingsInputs(true);
    
    // Start the interval
    timer.interval = setInterval(updateTimer, 1000);
}

// Pause the timer
function pauseTimer() {
    if (!timer.isRunning || timer.isPaused) return;
    
    timer.isPaused = true;
    clearInterval(timer.interval);
    
    // Update button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    timerStatusEl.textContent = 'Paused';
}

// Reset the timer
function resetTimer() {
    // Clear any existing interval
    clearInterval(timer.interval);
    
    // Reset timer state
    timer.isRunning = false;
    timer.isPaused = false;
    timer.currentTime = 0;
    timer.currentRound = 0;
    timer.currentCycle = 0;
    timer.phase = 'work';
    
    // Update displays
    updateTimerDisplay(0);
    updateProgressDisplay();
    timerStatusEl.textContent = 'Ready';
    currentPhaseEl.textContent = '-';
    timerProgressEl.style.height = '0%';
    
    // Reset button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    // Enable settings inputs
    toggleSettingsInputs(false);
}

// Update the timer each second
function updateTimer() {
    if (timer.currentTime <= 0) {
        // Time's up for current phase
        beepSound.play();
        
        // Determine next phase
        if (timer.phase === 'work') {
            // Work phase complete, move to rest
            timer.phase = 'rest';
            timer.currentTime = timer.restTime;
        } else {
            // Rest phase complete, move to next round or cycle
            timer.phase = 'work';
            timer.currentTime = timer.workTime;
            
            // Increment round
            if (timer.currentRound < timer.rounds) {
                timer.currentRound++;
            } else {
                // Round complete, move to next cycle
                timer.currentRound = 1;
                timer.currentCycle++;
                
                // Check if workout is complete
                if (timer.currentCycle > timer.cycles) {
                    completeWorkout();
                    return;
                }
            }
        }
        
        // Update phase display
        updatePhaseDisplay();
    } else {
        // Decrement time
        timer.currentTime--;
    }
    
    // Update timer display
    updateTimerDisplay(timer.currentTime);
    
    // Update progress bar
    updateProgressBar();
}

// Update the timer display
function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
}

// Update the progress display
function updateProgressDisplay() {
    currentRoundEl.textContent = timer.currentRound || 0;
    currentCycleEl.textContent = timer.currentCycle || 0;
}

// Update the phase display
function updatePhaseDisplay() {
    if (timer.phase === 'work') {
        currentPhaseEl.textContent = 'WORK';
        currentPhaseEl.className = 'progress-value work-phase';
        timerStatusEl.textContent = 'Work!';
        timerCircle.style.borderColor = '#e74c3c';
    } else {
        currentPhaseEl.textContent = 'REST';
        currentPhaseEl.className = 'progress-value rest-phase';
        timerStatusEl.textContent = 'Rest';
        timerCircle.style.borderColor = '#2ecc71';
    }
    
    updateProgressDisplay();
}

// Update the progress bar
function updateProgressBar() {
    const totalTime = timer.phase === 'work' ? timer.workTime : timer.restTime;
    const remainingTime = timer.currentTime;
    const progressPercentage = ((totalTime - remainingTime) / totalTime) * 100;
    
    timerProgressEl.style.height = `${progressPercentage}%`;
}

// Complete the workout
function completeWorkout() {
    clearInterval(timer.interval);
    completeSound.play();
    
    timer.isRunning = false;
    timer.isPaused = false;
    
    timerStatusEl.textContent = 'Complete!';
    timerProgressEl.style.height = '100%';
    
    // Reset button states
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    
    // Enable settings inputs
    toggleSettingsInputs(false);
}

// Toggle settings inputs enabled/disabled
function toggleSettingsInputs(disabled) {
    workTimeInput.disabled = disabled;
    restTimeInput.disabled = disabled;
    roundsInput.disabled = disabled;
    cyclesInput.disabled = disabled;
}

// Initialize the app when the page loads
window.addEventListener('DOMContentLoaded', init);