// Initialize can counters
let canCounts = {
    'coke-zero': 0,
    'fanta-zero': 0,
    'sparkling-water': 0
};

// DOM Elements
const cokeZeroBtn = document.querySelector('#coke-zero .add-btn');
const fantaZeroBtn = document.querySelector('#fanta-zero .add-btn');
const sparklingWaterBtn = document.querySelector('#sparkling-water .add-btn');

// Event Listeners
cokeZeroBtn.addEventListener('click', () => incrementCan('coke-zero'));
fantaZeroBtn.addEventListener('click', () => incrementCan('fanta-zero'));
sparklingWaterBtn.addEventListener('click', () => incrementCan('sparkling-water'));

// Load data from localStorage if available
function loadData() {
    const savedData = localStorage.getItem('canCounterData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Check if the saved data is from today
        const savedDate = new Date(parsedData.date);
        const today = new Date();
        
        if (savedDate.toDateString() === today.toDateString()) {
            canCounts = parsedData.counts;
            updateUI();
        } else {
            // Reset for a new day
            resetData();
        }
    }
}

// Save data to localStorage
function saveData() {
    const dataToSave = {
        date: new Date(),
        counts: canCounts
    };
    localStorage.setItem('canCounterData', JSON.stringify(dataToSave));
}

// Reset data for a new day
function resetData() {
    canCounts = {
        'coke-zero': 0,
        'fanta-zero': 0,
        'sparkling-water': 0
    };
    
    saveData();
    updateUI();
}

// Increment can count
function incrementCan(canType) {
    canCounts[canType]++;
    
    // Add animation effect
    const canElement = document.getElementById(canType);
    canElement.classList.add('pulse');
    setTimeout(() => {
        canElement.classList.remove('pulse');
    }, 500);
    
    saveData();
    updateUI();
}

// Update UI with current counts
function updateUI() {
    // Update individual can counts
    document.getElementById('coke-zero-count').textContent = canCounts['coke-zero'];
    document.getElementById('fanta-zero-count').textContent = canCounts['fanta-zero'];
    document.getElementById('sparkling-water-count').textContent = canCounts['sparkling-water'];
    
    // Update summary details
    document.getElementById('coke-zero-total').textContent = canCounts['coke-zero'];
    document.getElementById('fanta-zero-total').textContent = canCounts['fanta-zero'];
    document.getElementById('sparkling-water-total').textContent = canCounts['sparkling-water'];
    
    // Update total cans
    const totalCans = canCounts['coke-zero'] + canCounts['fanta-zero'] + canCounts['sparkling-water'];
    document.getElementById('total-cans').textContent = totalCans;
    
    // Update button colors based on count
    updateButtonStyles();
}

// Update button styles based on count
function updateButtonStyles() {
    const buttons = ['coke-zero', 'fanta-zero', 'sparkling-water'];
    
    buttons.forEach(btn => {
        const element = document.getElementById(btn);
        const count = canCounts[btn];
        
        // Remove any existing count classes
        element.classList.remove('high-count', 'medium-count', 'low-count');
        
        // Add appropriate class based on count
        if (count >= 3) {
            element.classList.add('high-count');
        } else if (count >= 1) {
            element.classList.add('medium-count');
        } else {
            element.classList.add('low-count');
        }
    });
}

// Add dynamic styles for count indicators
const style = document.createElement('style');
style.textContent = `
    .high-count {
        border-width: 5px;
        border-style: solid;
    }
    
    .medium-count {
        border-width: 3px;
        border-style: solid;
    }
    
    .low-count {
        border-width: 1px;
        border-style: solid;
    }
    
    #coke-zero.high-count {
        border-color: var(--coke-color);
    }
    
    #fanta-zero.high-count {
        border-color: var(--fanta-color);
    }
    
    #sparkling-water.high-count {
        border-color: var(--water-color);
    }
`;
document.head.appendChild(style);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});