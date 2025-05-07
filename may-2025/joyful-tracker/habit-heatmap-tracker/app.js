// Main application logic for Habit Heatmap Tracker

// DOM Elements
const habitForm = document.getElementById('habit-form');
const habitsContainer = document.getElementById('habits-container');
const noHabitsMessage = document.getElementById('no-habits-message');
const habitDetails = document.getElementById('habit-details');
const detailHabitName = document.getElementById('detail-habit-name');
const detailHabitDescription = document.getElementById('detail-habit-description');
const currentStreakElement = document.getElementById('current-streak');
const longestStreakElement = document.getElementById('longest-streak');
const completionRateElement = document.getElementById('completion-rate');
const heatmapElement = document.getElementById('heatmap');
const currentMonthYearElement = document.getElementById('current-month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const editHabitButton = document.getElementById('edit-habit');
const deleteHabitButton = document.getElementById('delete-habit');
const editModal = document.getElementById('edit-modal');
const editHabitForm = document.getElementById('edit-habit-form');
const editHabitNameInput = document.getElementById('edit-habit-name');
const editHabitDescriptionInput = document.getElementById('edit-habit-description');
const editHabitColorInput = document.getElementById('edit-habit-color');
const closeEditModalButton = document.querySelector('.close');
const confirmationModal = document.getElementById('confirmation-modal');
const confirmDeleteButton = document.getElementById('confirm-delete');
const cancelDeleteButton = document.getElementById('cancel-delete');

// State variables
let habits = [];
let currentHabitId = null;
let currentDate = new Date();
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Initialize the application
function init() {
    loadHabits();
    renderHabitsList();
    setupEventListeners();
}

// Load habits from localStorage
function loadHabits() {
    const savedHabits = localStorage.getItem('habits');
    habits = savedHabits ? JSON.parse(savedHabits) : [];
}

// Save habits to localStorage
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Setup event listeners
function setupEventListeners() {
    // Form submission for adding new habits
    habitForm.addEventListener('submit', addHabit);
    
    // Month navigation for heatmap
    prevMonthButton.addEventListener('click', () => navigateMonth(-1));
    nextMonthButton.addEventListener('click', () => navigateMonth(1));
    
    // Edit and delete buttons
    editHabitButton.addEventListener('click', openEditModal);
    deleteHabitButton.addEventListener('click', openConfirmationModal);
    
    // Modal interactions
    closeEditModalButton.addEventListener('click', closeEditModal);
    editHabitForm.addEventListener('submit', saveEditedHabit);
    confirmDeleteButton.addEventListener('click', deleteHabit);
    cancelDeleteButton.addEventListener('click', closeConfirmationModal);
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            closeEditModal();
        }
        if (event.target === confirmationModal) {
            closeConfirmationModal();
        }
    });
}

// Add a new habit
function addHabit(event) {
    event.preventDefault();
    
    const habitNameInput = document.getElementById('habit-name');
    const habitDescriptionInput = document.getElementById('habit-description');
    const habitColorInput = document.getElementById('habit-color');
    
    const newHabit = {
        id: generateId(),
        name: habitNameInput.value.trim(),
        description: habitDescriptionInput.value.trim(),
        color: habitColorInput.value,
        createdAt: new Date().toISOString(),
        completedDates: {}
    };
    
    habits.push(newHabit);
    saveHabits();
    renderHabitsList();
    
    // Reset form
    habitNameInput.value = '';
    habitDescriptionInput.value = '';
    habitColorInput.value = '#4CAF50';
    
    // Show the newly added habit details
    showHabitDetails(newHabit.id);
}

// Generate a unique ID for habits
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Render the list of habits
function renderHabitsList() {
    if (habits.length === 0) {
        noHabitsMessage.classList.remove('hidden');
        habitsContainer.innerHTML = '';
        return;
    }
    
    noHabitsMessage.classList.add('hidden');
    habitsContainer.innerHTML = '';
    
    habits.forEach(habit => {
        const habitCard = document.createElement('div');
        habitCard.className = 'habit-card';
        habitCard.dataset.id = habit.id;
        
        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'habit-color-indicator';
        colorIndicator.style.backgroundColor = habit.color;
        
        const habitInfo = document.createElement('div');
        habitInfo.className = 'habit-card-info';
        
        const habitName = document.createElement('h3');
        habitName.textContent = habit.name;
        
        const habitDescription = document.createElement('p');
        habitDescription.textContent = habit.description || 'No description';
        
        habitInfo.appendChild(habitName);
        habitInfo.appendChild(habitDescription);
        
        const checkContainer = document.createElement('div');
        checkContainer.className = 'habit-check';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isHabitCompletedToday(habit);
        checkbox.addEventListener('change', (e) => {
            e.stopPropagation();
            toggleHabitCompletion(habit.id);
        });
        
        checkContainer.appendChild(checkbox);
        
        habitCard.appendChild(colorIndicator);
        habitCard.appendChild(habitInfo);
        habitCard.appendChild(checkContainer);
        
        habitCard.addEventListener('click', (e) => {
            if (e.target !== checkbox) {
                showHabitDetails(habit.id);
            }
        });
        
        habitsContainer.appendChild(habitCard);
    });
}

// Check if habit is completed today
function isHabitCompletedToday(habit) {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates && habit.completedDates[today];
}

// Toggle habit completion for today
function toggleHabitCompletion(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    if (!habit.completedDates) {
        habit.completedDates = {};
    }
    
    habit.completedDates[today] = !habit.completedDates[today];
    
    if (!habit.completedDates[today]) {
        delete habit.completedDates[today];
    }
    
    saveHabits();
    
    // If this habit is currently being viewed, update its details
    if (currentHabitId === habitId) {
        updateHabitStats(habit);
        renderHeatmap(habit);
    }
}

// Show habit details
function showHabitDetails(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    currentHabitId = habitId;
    detailHabitName.textContent = habit.name;
    detailHabitDescription.textContent = habit.description || 'No description';
    
    updateHabitStats(habit);
    renderHeatmap(habit);
    
    habitDetails.classList.remove('hidden');
    
    // Scroll to habit details
    habitDetails.scrollIntoView({ behavior: 'smooth' });
}

// Update habit statistics
function updateHabitStats(habit) {
    const { currentStreak, longestStreak, completionRate } = calculateHabitStats(habit);
    
    currentStreakElement.textContent = `${currentStreak} day${currentStreak !== 1 ? 's' : ''}`;
    longestStreakElement.textContent = `${longestStreak} day${longestStreak !== 1 ? 's' : ''}`;
    completionRateElement.textContent = `${completionRate}%`;
}

// Calculate habit statistics
function calculateHabitStats(habit) {
    if (!habit.completedDates) {
        return { currentStreak: 0, longestStreak: 0, completionRate: 0 };
    }
    
    const completedDates = Object.keys(habit.completedDates)
        .filter(date => habit.completedDates[date])
        .sort();
    
    if (completedDates.length === 0) {
        return { currentStreak: 0, longestStreak: 0, completionRate: 0 };
    }
    
    // Calculate current streak
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    let checkDate = new Date(today);
    
    while (true) {
        const dateString = checkDate.toISOString().split('T')[0];
        if (habit.completedDates[dateString]) {
            currentStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
    }
    
    // Calculate longest streak
    let longestStreak = 0;
    let currentStreakCount = 0;
    let previousDate = null;
    
    completedDates.forEach(dateString => {
        const currentDate = new Date(dateString);
        
        if (previousDate) {
            const dayDifference = Math.round((currentDate - previousDate) / (1000 * 60 * 60 * 24));
            
            if (dayDifference === 1) {
                currentStreakCount++;
            } else {
                longestStreak = Math.max(longestStreak, currentStreakCount);
                currentStreakCount = 1;
            }
        } else {
            currentStreakCount = 1;
        }
        
        previousDate = currentDate;
    });
    
    longestStreak = Math.max(longestStreak, currentStreakCount);
    
    // Calculate completion rate
    const habitStartDate = new Date(habit.createdAt);
    const daysSinceCreation = Math.max(1, Math.round((new Date() - habitStartDate) / (1000 * 60 * 60 * 24)));
    const completionRate = Math.round((completedDates.length / daysSinceCreation) * 100);
    
    return { currentStreak, longestStreak, completionRate };
}

// Render the heatmap for a habit
function renderHeatmap(habit) {
    // Update month/year display
    currentMonthYearElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Clear existing heatmap
    heatmapElement.innerHTML = '';
    
    // Add day labels (Sun, Mon, etc.)
    heatmapElement.appendChild(document.createElement('div')); // Empty corner cell
    
    for (let i = 0; i < 7; i++) {
        const dayLabel = document.createElement('div');
        dayLabel.className = 'heatmap-label';
        dayLabel.textContent = daysOfWeek[i];
        heatmapElement.appendChild(dayLabel);
    }
    
    // Generate days for the current month
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Calculate week rows needed
    const firstDayOfWeek = firstDay.getDay();
    const weeksNeeded = Math.ceil((firstDayOfWeek + daysInMonth) / 7);
    
    // Create week labels and day cells
    for (let week = 0; week < weeksNeeded; week++) {
        // Add week label
        const weekLabel = document.createElement('div');
        weekLabel.className = 'heatmap-label';
        const weekNumber = week + 1;
        weekLabel.textContent = weekNumber;
        heatmapElement.appendChild(weekLabel);
        
        // Add days for this week
        for (let weekday = 0; weekday < 7; weekday++) {
            const dayIndex = week * 7 + weekday - firstDayOfWeek + 1;
            const dayCell = document.createElement('div');
            
            if (dayIndex > 0 && dayIndex <= daysInMonth) {
                const date = new Date(year, month, dayIndex);
                const dateString = date.toISOString().split('T')[0];
                const isCompleted = habit.completedDates && habit.completedDates[dateString];
                const isToday = isSameDay(date, new Date());
                
                dayCell.className = 'heatmap-day';
                dayCell.textContent = dayIndex;
                dayCell.dataset.date = dateString;
                
                if (isCompleted) {
                    // Determine intensity level based on surrounding days
                    const intensityLevel = calculateIntensityLevel(habit, dateString);
                    dayCell.classList.add(`level-${intensityLevel}`);
                }
                
                if (isToday) {
                    dayCell.classList.add('today');
                }
                
                // Add click event to toggle completion
                dayCell.addEventListener('click', () => {
                    toggleDateCompletion(habit.id, dateString);
                });
            } else {
                dayCell.className = 'heatmap-day empty';
            }
            
            heatmapElement.appendChild(dayCell);
        }
    }
}

// Calculate intensity level for heatmap coloring
function calculateIntensityLevel(habit, dateString) {
    if (!habit.completedDates) return 1;
    
    const date = new Date(dateString);
    let consecutiveDays = 0;
    
    // Check previous days
    for (let i = 1; i <= 4; i++) {
        const prevDate = new Date(date);
        prevDate.setDate(prevDate.getDate() - i);
        const prevDateString = prevDate.toISOString().split('T')[0];
        
        if (habit.completedDates[prevDateString]) {
            consecutiveDays++;
        } else {
            break;
        }
    }
    
    // Return intensity level based on consecutive days
    return Math.min(consecutiveDays + 1, 4);
}

// Toggle completion for a specific date
function toggleDateCompletion(habitId, dateString) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    if (!habit.completedDates) {
        habit.completedDates = {};
    }
    
    habit.completedDates[dateString] = !habit.completedDates[dateString];
    
    if (!habit.completedDates[dateString]) {
        delete habit.completedDates[dateString];
    }
    
    saveHabits();
    updateHabitStats(habit);
    renderHeatmap(habit);
    renderHabitsList(); // Update the checkbox if today's date was toggled
}

// Navigate between months
function navigateMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    const habit = habits.find(h => h.id === currentHabitId);
    if (habit) {
        renderHeatmap(habit);
    }
}

// Check if two dates are the same day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// Open edit modal
function openEditModal() {
    const habit = habits.find(h => h.id === currentHabitId);
    if (!habit) return;
    
    editHabitNameInput.value = habit.name;
    editHabitDescriptionInput.value = habit.description || '';
    editHabitColorInput.value = habit.color;
    
    editModal.style.display = 'block';
}

// Close edit modal
function closeEditModal() {
    editModal.style.display = 'none';
}

// Save edited habit
function saveEditedHabit(event) {
    event.preventDefault();
    
    const habit = habits.find(h => h.id === currentHabitId);
    if (!habit) return;
    
    habit.name = editHabitNameInput.value.trim();
    habit.description = editHabitDescriptionInput.value.trim();
    habit.color = editHabitColorInput.value;
    
    saveHabits();
    renderHabitsList();
    showHabitDetails(currentHabitId);
    closeEditModal();
}

// Open confirmation modal for deletion
function openConfirmationModal() {
    confirmationModal.style.display = 'block';
}

// Close confirmation modal
function closeConfirmationModal() {
    confirmationModal.style.display = 'none';
}

// Delete current habit
function deleteHabit() {
    habits = habits.filter(h => h.id !== currentHabitId);
    saveHabits();
    renderHabitsList();
    closeConfirmationModal();
    habitDetails.classList.add('hidden');
    currentHabitId = null;
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);