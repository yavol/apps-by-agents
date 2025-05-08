// DOM Elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const phaseLabel = document.getElementById('phase-label');
const progressIndicator = document.getElementById('progress-indicator');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const focusTimeInput = document.getElementById('focus-time');
const shortBreakInput = document.getElementById('short-break');
const longBreakInput = document.getElementById('long-break');
const pomodoroCyclesInput = document.getElementById('pomodoro-cycles');
const autoStartBreaksCheckbox = document.getElementById('auto-start-breaks');
const autoStartPomodorosCheckbox = document.getElementById('auto-start-pomodoros');
const notificationsCheckbox = document.getElementById('notifications');
const soundEnabledCheckbox = document.getElementById('sound-enabled');
const completedPomodoros = document.getElementById('completed-pomodoros');
const focusTimeToday = document.getElementById('focus-time-today');

// Timer state
let timer = {
    minutes: 25,
    seconds: 0,
    isRunning: false,
    interval: null,
    currentPhase: 'focus', // 'focus', 'shortBreak', 'longBreak'
    completedPomodoros: 0,
    pomodorosUntilLongBreak: 4,
    totalFocusTime: 0,
    originalTime: 25 * 60, // in seconds
    timeLeft: 25 * 60, // in seconds
};

// Audio elements
const focusEndSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
const breakEndSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2867/2867-preview.mp3');

// Check if browser supports notifications
let notificationsEnabled = false;
if ('Notification' in window) {
    if (Notification.permission === 'granted') {
        notificationsEnabled = true;
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            notificationsEnabled = permission === 'granted';
        });
    }
}

// Initialize from localStorage if available
function loadSettings() {
    if (localStorage.getItem('pomodoroSettings')) {
        const settings = JSON.parse(localStorage.getItem('pomodoroSettings'));
        focusTimeInput.value = settings.focusTime || 25;
        shortBreakInput.value = settings.shortBreak || 5;
        longBreakInput.value = settings.longBreak || 15;
        pomodoroCyclesInput.value = settings.pomodoroCycles || 4;
        autoStartBreaksCheckbox.checked = settings.autoStartBreaks !== false;
        autoStartPomodorosCheckbox.checked = settings.autoStartPomodoros === true;
        notificationsCheckbox.checked = settings.notifications !== false;
        soundEnabledCheckbox.checked = settings.soundEnabled !== false;
    }

    if (localStorage.getItem('pomodoroStats')) {
        const stats = JSON.parse(localStorage.getItem('pomodoroStats'));
        timer.completedPomodoros = stats.completedPomodoros || 0;
        timer.totalFocusTime = stats.totalFocusTime || 0;
        updateStats();
    }
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        focusTime: parseInt(focusTimeInput.value),
        shortBreak: parseInt(shortBreakInput.value),
        longBreak: parseInt(longBreakInput.value),
        pomodoroCycles: parseInt(pomodoroCyclesInput.value),
        autoStartBreaks: autoStartBreaksCheckbox.checked,
        autoStartPomodoros: autoStartPomodorosCheckbox.checked,
        notifications: notificationsCheckbox.checked,
        soundEnabled: soundEnabledCheckbox.checked
    };
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
}

// Save stats to localStorage
function saveStats() {
    const stats = {
        completedPomodoros: timer.completedPomodoros,
        totalFocusTime: timer.totalFocusTime,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
}

// Format time display (add leading zeros)
function formatTimeDisplay(time) {
    return time < 10 ? `0${time}` : time;
}

// Update timer display
function updateDisplay() {
    minutesDisplay.textContent = formatTimeDisplay(timer.minutes);
    secondsDisplay.textContent = formatTimeDisplay(timer.seconds);
    
    // Update progress bar
    const progressPercentage = 100 - (timer.timeLeft / timer.originalTime * 100);
    progressIndicator.style.width = `${progressPercentage}%`;
}

// Update statistics display
function updateStats() {
    completedPomodoros.textContent = timer.completedPomodoros;
    const focusTimeMinutes = Math.floor(timer.totalFocusTime / 60);
    focusTimeToday.textContent = `${focusTimeMinutes} min`;
}

// Start timer
function startTimer() {
    if (timer.isRunning) return;
    
    timer.isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    
    timer.interval = setInterval(() => {
        if (timer.seconds === 0) {
            if (timer.minutes === 0) {
                clearInterval(timer.interval);
                timerComplete();
                return;
            }
            timer.minutes--;
            timer.seconds = 59;
        } else {
            timer.seconds--;
        }
        
        timer.timeLeft--;
        updateDisplay();
    }, 1000);
}

// Pause timer
function pauseTimer() {
    if (!timer.isRunning) return;
    
    timer.isRunning = false;
    clearInterval(timer.interval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Reset timer
function resetTimer() {
    pauseTimer();
    
    // Reset to focus phase
    setTimerPhase('focus');
    
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

// Timer complete
function timerComplete() {
    timer.isRunning = false;
    
    if (timer.currentPhase === 'focus') {
        timer.completedPomodoros++;
        timer.totalFocusTime += parseInt(focusTimeInput.value) * 60;
        updateStats();
        saveStats();
        
        // Determine next break type
        if (timer.completedPomodoros % timer.pomodorosUntilLongBreak === 0) {
            if (soundEnabledCheckbox.checked) {
                focusEndSound.play();
            }
            showNotification('Focus session complete!', 'Time for a long break.');
            if (autoStartBreaksCheckbox.checked) {
                setTimerPhase('longBreak');
                startTimer();
            } else {
                setTimerPhase('longBreak');
            }
        } else {
            if (soundEnabledCheckbox.checked) {
                focusEndSound.play();
            }
            showNotification('Focus session complete!', 'Time for a short break.');
            if (autoStartBreaksCheckbox.checked) {
                setTimerPhase('shortBreak');
                startTimer();
            } else {
                setTimerPhase('shortBreak');
            }
        }
    } else {
        // Break is complete
        if (soundEnabledCheckbox.checked) {
            breakEndSound.play();
        }
        showNotification('Break complete!', 'Ready to focus again?');
        if (autoStartPomodorosCheckbox.checked) {
            setTimerPhase('focus');
            startTimer();
        } else {
            setTimerPhase('focus');
        }
    }
    
    startBtn.disabled = autoStartBreaksCheckbox.checked || autoStartPomodorosCheckbox.checked;
    pauseBtn.disabled = !startBtn.disabled;
}

// Set timer phase
function setTimerPhase(phase) {
    timer.currentPhase = phase;
    
    switch (phase) {
        case 'focus':
            timer.minutes = parseInt(focusTimeInput.value);
            phaseLabel.textContent = 'Focus Time';
            document.title = 'Focus Time - Pomodoro Timer';
            break;
        case 'shortBreak':
            timer.minutes = parseInt(shortBreakInput.value);
            phaseLabel.textContent = 'Short Break';
            document.title = 'Short Break - Pomodoro Timer';
            break;
        case 'longBreak':
            timer.minutes = parseInt(longBreakInput.value);
            phaseLabel.textContent = 'Long Break';
            document.title = 'Long Break - Pomodoro Timer';
            break;
    }
    
    timer.seconds = 0;
    timer.originalTime = timer.minutes * 60;
    timer.timeLeft = timer.originalTime;
    
    updateDisplay();
}

// Show browser notification
function showNotification(title, body) {
    if (!notificationsCheckbox.checked || !notificationsEnabled) return;
    
    try {
        new Notification(title, {
            body: body,
            icon: 'https://cdn-icons-png.flaticon.com/512/5695/5695864.png'
        });
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Settings change listeners
[focusTimeInput, shortBreakInput, longBreakInput, pomodoroCyclesInput].forEach(input => {
    input.addEventListener('change', () => {
        if (input.value < 1) input.value = 1;
        if (input === pomodoroCyclesInput && input.value < 1) input.value = 1;
        
        saveSettings();
        
        // Update timer if not running
        if (!timer.isRunning) {
            timer.pomodorosUntilLongBreak = parseInt(pomodoroCyclesInput.value);
            setTimerPhase(timer.currentPhase);
        } else {
            timer.pomodorosUntilLongBreak = parseInt(pomodoroCyclesInput.value);
        }
    });
});

[autoStartBreaksCheckbox, autoStartPomodorosCheckbox, notificationsCheckbox, soundEnabledCheckbox].forEach(checkbox => {
    checkbox.addEventListener('change', saveSettings);
});

// Request notification permission when checkbox is checked
notificationsCheckbox.addEventListener('change', () => {
    if (notificationsCheckbox.checked && Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            notificationsEnabled = permission === 'granted';
            if (!notificationsEnabled) {
                notificationsCheckbox.checked = false;
                saveSettings();
            }
        });
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    timer.pomodorosUntilLongBreak = parseInt(pomodoroCyclesInput.value);
    setTimerPhase('focus');
    
    // Check if we need to reset daily stats
    if (localStorage.getItem('pomodoroStats')) {
        const stats = JSON.parse(localStorage.getItem('pomodoroStats'));
        const lastUpdated = new Date(stats.lastUpdated);
        const today = new Date();
        
        // Reset stats if last update was not today
        if (lastUpdated.getDate() !== today.getDate() || 
            lastUpdated.getMonth() !== today.getMonth() || 
            lastUpdated.getFullYear() !== today.getFullYear()) {
            timer.totalFocusTime = 0;
            updateStats();
            saveStats();
        }
    }
});