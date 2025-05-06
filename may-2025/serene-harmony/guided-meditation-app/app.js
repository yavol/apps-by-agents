// DOM Elements
const setupScreen = document.getElementById('setupScreen');
const meditationScreen = document.getElementById('meditationScreen');
const completionScreen = document.getElementById('completionScreen');
const startButton = document.getElementById('startButton');
const endButton = document.getElementById('endButton');
const newSessionButton = document.getElementById('newSessionButton');
const repeatSessionButton = document.getElementById('repeatSessionButton');
const breathingCircle = document.getElementById('breathingCircle');
const breathingText = document.getElementById('breathingText');
const progressBar = document.getElementById('progressBar');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

// Theme buttons
const themeButtons = document.querySelectorAll('.theme-btn');
const durationButtons = document.querySelectorAll('.duration-btn');
const soundButtons = document.querySelectorAll('.sound-btn');

// Session configuration
let sessionConfig = {
    theme: 'focus',
    duration: 3, // minutes
    sound: 'none'
};

// Session state
let sessionActive = false;
let sessionTimer;
let progressTimer;
let breathingPhase = 'inhale'; // 'inhale', 'hold', 'exhale', 'rest'
let breathingCycle = 0;
let totalSessionTime; // in seconds
let remainingTime; // in seconds
let backgroundSound = null;

// Speech synthesis
const speechSynthesis = window.speechSynthesis;
let speechUtterance;

// Load saved configuration from localStorage
function loadSavedConfig() {
    const savedConfig = localStorage.getItem('meditationConfig');
    if (savedConfig) {
        try {
            const parsedConfig = JSON.parse(savedConfig);
            sessionConfig = { ...sessionConfig, ...parsedConfig };
            
            // Update UI to reflect saved config
            themeButtons.forEach(btn => {
                if (btn.dataset.theme === sessionConfig.theme) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            durationButtons.forEach(btn => {
                if (parseInt(btn.dataset.duration) === sessionConfig.duration) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            soundButtons.forEach(btn => {
                if (btn.dataset.sound === sessionConfig.sound) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        } catch (e) {
            console.error('Error loading saved configuration:', e);
        }
    }
}

// Save configuration to localStorage
function saveConfig() {
    localStorage.setItem('meditationConfig', JSON.stringify(sessionConfig));
}

// Initialize audio elements
function initializeAudio() {
    // Create audio elements for background sounds
    const rainSound = new Audio('sounds/rain.mp3');
    rainSound.loop = true;
    
    const forestSound = new Audio('sounds/forest.mp3');
    forestSound.loop = true;
    
    const wavesSound = new Audio('sounds/waves.mp3');
    wavesSound.loop = true;
    
    // Map of available sounds
    const sounds = {
        rain: rainSound,
        forest: forestSound,
        waves: wavesSound
    };
    
    return sounds;
}

// Audio elements
const sounds = initializeAudio();

// Play background sound
function playBackgroundSound() {
    if (sessionConfig.sound !== 'none') {
        try {
            backgroundSound = sounds[sessionConfig.sound];
            if (backgroundSound) {
                backgroundSound.volume = 0.3;
                backgroundSound.play().catch(e => console.log('Audio play error:', e));
            }
        } catch (e) {
            console.error('Error playing background sound:', e);
        }
    }
}

// Stop background sound
function stopBackgroundSound() {
    if (backgroundSound) {
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        backgroundSound = null;
    }
}

// Speak guidance using speech synthesis
function speakGuidance(text) {
    if (speechSynthesis) {
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        // Create new utterance
        speechUtterance = new SpeechSynthesisUtterance(text);
        speechUtterance.rate = 0.8; // Slightly slower rate
        speechUtterance.pitch = 1;
        speechUtterance.volume = 1;
        
        // Speak the text
        speechSynthesis.speak(speechUtterance);
    }
}

// Update breathing animation and guidance
function updateBreathing() {
    switch (breathingPhase) {
        case 'inhale':
            breathingCircle.className = 'breathing-circle inhale';
            breathingText.textContent = 'Inhale';
            speakGuidance('Inhale deeply');
            setTimeout(() => {
                breathingPhase = 'hold';
                updateBreathing();
            }, 4000); // 4 seconds to inhale
            break;
            
        case 'hold':
            breathingCircle.className = 'breathing-circle inhale';
            breathingText.textContent = 'Hold';
            speakGuidance('Hold your breath');
            setTimeout(() => {
                breathingPhase = 'exhale';
                updateBreathing();
            }, 2000); // 2 seconds to hold
            break;
            
        case 'exhale':
            breathingCircle.className = 'breathing-circle exhale';
            breathingText.textContent = 'Exhale';
            speakGuidance('Exhale slowly');
            setTimeout(() => {
                breathingPhase = 'rest';
                updateBreathing();
            }, 4000); // 4 seconds to exhale
            break;
            
        case 'rest':
            breathingCircle.className = 'breathing-circle exhale';
            breathingText.textContent = 'Rest';
            setTimeout(() => {
                breathingPhase = 'inhale';
                breathingCycle++;
                updateBreathing();
            }, 2000); // 2 seconds to rest
            break;
    }
}

// Update timer display
function updateTimerDisplay(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    
    minutesDisplay.textContent = minutes;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
}

// Update progress bar
function updateProgressBar() {
    const elapsedTime = totalSessionTime - remainingTime;
    const progressPercentage = (elapsedTime / totalSessionTime) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Start meditation session
function startSession() {
    // Save configuration
    saveConfig();
    
    // Set up session
    totalSessionTime = sessionConfig.duration * 60; // convert minutes to seconds
    remainingTime = totalSessionTime;
    
    // Update timer display
    updateTimerDisplay(remainingTime);
    
    // Apply theme to body
    document.body.className = `${sessionConfig.theme}-theme`;
    
    // Hide setup screen, show meditation screen
    setupScreen.classList.add('hidden');
    meditationScreen.classList.remove('hidden');
    
    // Start background sound
    playBackgroundSound();
    
    // Start session
    sessionActive = true;
    
    // Initial guidance
    setTimeout(() => {
        speakGuidance(`Welcome to your ${sessionConfig.theme} meditation session. Find a comfortable position and let's begin.`);
        
        // Start breathing cycle after initial guidance
        setTimeout(() => {
            updateBreathing();
        }, 5000);
    }, 1000);
    
    // Start countdown timer
    sessionTimer = setInterval(() => {
        remainingTime--;
        updateTimerDisplay(remainingTime);
        updateProgressBar();
        
        // Provide mid-session guidance
        if (remainingTime === Math.floor(totalSessionTime / 2)) {
            speakGuidance(`You're doing great. Continue focusing on your breath.`);
        }
        
        // Provide near-end guidance
        if (remainingTime === 30) {
            speakGuidance(`We're approaching the end of our session. Begin to bring your awareness back.`);
        }
        
        // End session when time is up
        if (remainingTime <= 0) {
            endSession(true);
        }
    }, 1000);
}

// End meditation session
function endSession(completed = false) {
    // Clear timers
    clearInterval(sessionTimer);
    
    // Stop speech
    if (speechSynthesis) {
        speechSynthesis.cancel();
    }
    
    // Stop background sound
    stopBackgroundSound();
    
    // Reset session state
    sessionActive = false;
    breathingPhase = 'inhale';
    breathingCycle = 0;
    
    // Hide meditation screen
    meditationScreen.classList.add('hidden');
    
    if (completed) {
        // Show completion screen
        completionScreen.classList.remove('hidden');
        speakGuidance(`Congratulations. Your meditation session is complete. Take a moment to notice how you feel.`);
    } else {
        // Return to setup screen
        setupScreen.classList.remove('hidden');
    }
}

// Event Listeners
// Theme selection
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        themeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update session config
        sessionConfig.theme = button.dataset.theme;
    });
});

// Duration selection
durationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        durationButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update session config
        sessionConfig.duration = parseInt(button.dataset.duration);
    });
});

// Sound selection
soundButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        soundButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Update session config
        sessionConfig.sound = button.dataset.sound;
    });
});

// Start button
startButton.addEventListener('click', startSession);

// End button
endButton.addEventListener('click', () => endSession(false));

// New session button
newSessionButton.addEventListener('click', () => {
    completionScreen.classList.add('hidden');
    setupScreen.classList.remove('hidden');
});

// Repeat session button
repeatSessionButton.addEventListener('click', () => {
    completionScreen.classList.add('hidden');
    startSession();
});

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadSavedConfig();
});