// Game state
let gameState = {
    players: [
        { name: 'Player 1', score: 0, currentBreak: 0 },
        { name: 'Player 2', score: 0, currentBreak: 0 }
    ],
    currentPlayerIndex: 0,
    gameLog: [],
    moveHistory: []
};

// DOM Elements
const setupScreen = document.getElementById('setup-screen');
const gameScreen = document.getElementById('game-screen');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const startGameBtn = document.getElementById('start-game');
const player1Display = document.getElementById('player1-display');
const player2Display = document.getElementById('player2-display');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const player1Break = document.getElementById('player1-break');
const player2Break = document.getElementById('player2-break');
const currentPlayerDisplay = document.getElementById('current-player');
const ballButtons = document.querySelectorAll('.ball');
const foulBtn = document.getElementById('foul-btn');
const foulOptions = document.getElementById('foul-options');
const foulOptionBtns = document.querySelectorAll('.foul-option');
const endTurnBtn = document.getElementById('end-turn');
const undoBtn = document.getElementById('undo');
const logEntries = document.getElementById('log-entries');
const newGameBtn = document.getElementById('new-game');
const saveGameBtn = document.getElementById('save-game');
const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');

// Initialize the game
function init() {
    // Check for saved game
    checkForSavedGame();
    
    // Event listeners
    startGameBtn.addEventListener('click', startGame);
    ballButtons.forEach(button => {
        button.addEventListener('click', () => potBall(parseInt(button.dataset.value)));
    });
    foulBtn.addEventListener('click', toggleFoulOptions);
    foulOptionBtns.forEach(button => {
        button.addEventListener('click', () => recordFoul(parseInt(button.dataset.value)));
    });
    endTurnBtn.addEventListener('click', endTurn);
    undoBtn.addEventListener('click', undoLastMove);
    newGameBtn.addEventListener('click', confirmNewGame);
    saveGameBtn.addEventListener('click', saveGame);
}

// Check for saved game in localStorage
function checkForSavedGame() {
    const savedGame = localStorage.getItem('snookerDuelGame');
    if (savedGame) {
        const shouldRestore = confirm('A saved game was found. Would you like to restore it?');
        if (shouldRestore) {
            gameState = JSON.parse(savedGame);
            startGame(true);
        } else {
            localStorage.removeItem('snookerDuelGame');
        }
    }
}

// Start the game
function startGame(isRestored = false) {
    if (!isRestored) {
        // Get player names from inputs
        const player1Name = player1NameInput.value.trim() || 'Player 1';
        const player2Name = player2NameInput.value.trim() || 'Player 2';
        
        // Reset game state
        gameState = {
            players: [
                { name: player1Name, score: 0, currentBreak: 0 },
                { name: player2Name, score: 0, currentBreak: 0 }
            ],
            currentPlayerIndex: 0,
            gameLog: [],
            moveHistory: []
        };
    }
    
    // Update UI
    setupScreen.classList.remove('active');
    gameScreen.classList.add('active');
    updateUI();
}

// Update all UI elements
function updateUI() {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const otherPlayer = gameState.players[1 - gameState.currentPlayerIndex];
    
    // Update player names and scores
    player1Display.textContent = gameState.players[0].name;
    player2Display.textContent = gameState.players[1].name;
    player1Score.textContent = gameState.players[0].score;
    player2Score.textContent = gameState.players[1].score;
    player1Break.textContent = gameState.players[0].currentBreak;
    player2Break.textContent = gameState.players[1].currentBreak;
    
    // Update current player indicator
    currentPlayerDisplay.textContent = currentPlayer.name;
    
    // Highlight active player
    player1Element.classList.toggle('active', gameState.currentPlayerIndex === 0);
    player2Element.classList.toggle('active', gameState.currentPlayerIndex === 1);
    
    // Update game log
    renderGameLog();
}

// Record a potted ball
function potBall(value) {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Save current state for undo
    saveStateForUndo();
    
    // Update scores
    currentPlayer.score += value;
    currentPlayer.currentBreak += value;
    
    // Add to game log
    const ballColors = {
        1: 'Red',
        2: 'Yellow',
        3: 'Green',
        4: 'Brown',
        5: 'Blue',
        6: 'Pink',
        7: 'Black'
    };
    
    addToGameLog(`${currentPlayer.name} potted ${ballColors[value]} (${value})`);
    
    // Update UI
    updateUI();
}

// Toggle foul options display
function toggleFoulOptions() {
    foulOptions.classList.toggle('hidden');
}

// Record a foul
function recordFoul(value) {
    // Save current state for undo
    saveStateForUndo();
    
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const otherPlayerIndex = 1 - gameState.currentPlayerIndex;
    const otherPlayer = gameState.players[otherPlayerIndex];
    
    // Add points to the opponent
    otherPlayer.score += value;
    
    // Reset current break
    currentPlayer.currentBreak = 0;
    
    // Add to game log
    addToGameLog(`${currentPlayer.name} committed a foul (-${value})`);
    
    // Hide foul options
    foulOptions.classList.add('hidden');
    
    // Switch turn
    gameState.currentPlayerIndex = otherPlayerIndex;
    
    // Update UI
    updateUI();
}

// End the current player's turn
function endTurn() {
    // Save current state for undo
    saveStateForUndo();
    
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    
    // Reset current break
    currentPlayer.currentBreak = 0;
    
    // Switch turn
    gameState.currentPlayerIndex = 1 - gameState.currentPlayerIndex;
    
    // Add to game log
    addToGameLog(`${currentPlayer.name} ended their turn`);
    
    // Update UI
    updateUI();
}

// Save current state for undo functionality
function saveStateForUndo() {
    gameState.moveHistory.push(JSON.stringify(gameState));
    
    // Limit history size to prevent memory issues
    if (gameState.moveHistory.length > 20) {
        gameState.moveHistory.shift();
    }
}

// Undo the last move
function undoLastMove() {
    if (gameState.moveHistory.length > 0) {
        const previousState = gameState.moveHistory.pop();
        gameState = JSON.parse(previousState);
        
        // Add to game log
        addToGameLog('Last move undone');
        
        // Update UI
        updateUI();
    } else {
        alert('No moves to undo!');
    }
}

// Add entry to game log
function addToGameLog(message) {
    const timestamp = new Date().toLocaleTimeString();
    gameState.gameLog.unshift(`[${timestamp}] ${message}`);
    
    // Limit log size
    if (gameState.gameLog.length > 50) {
        gameState.gameLog.pop();
    }
}

// Render game log entries
function renderGameLog() {
    logEntries.innerHTML = '';
    gameState.gameLog.forEach(entry => {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = entry;
        logEntries.appendChild(logEntry);
    });
}

// Confirm new game
function confirmNewGame() {
    if (confirm('Are you sure you want to start a new game? Current progress will be lost.')) {
        // Clear localStorage
        localStorage.removeItem('snookerDuelGame');
        
        // Return to setup screen
        gameScreen.classList.remove('active');
        setupScreen.classList.add('active');
        
        // Clear input fields
        player1NameInput.value = '';
        player2NameInput.value = '';
    }
}

// Save game to localStorage
function saveGame() {
    localStorage.setItem('snookerDuelGame', JSON.stringify(gameState));
    alert('Game saved successfully!');
}

// Initialize the app
document.addEventListener('DOMContentLoaded', init);