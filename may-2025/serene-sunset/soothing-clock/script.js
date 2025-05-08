// DOM Elements
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const periodElement = document.getElementById('period');
const currentThemeElement = document.getElementById('current-theme');

// Time periods and their corresponding themes
const timePeriods = {
    morning: { name: 'Morning', start: 5, end: 11, theme: 'morning-theme' },
    afternoon: { name: 'Afternoon', start: 12, end: 16, theme: 'afternoon-theme' },
    evening: { name: 'Evening', start: 17, end: 20, theme: 'evening-theme' },
    night: { name: 'Night', start: 21, end: 4, theme: 'night-theme' }
};

// Days of the week
const daysOfWeek = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

// Months of the year
const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Function to determine the current time period
function getCurrentTimePeriod(hour) {
    if (hour >= timePeriods.morning.start && hour <= timePeriods.morning.end) {
        return timePeriods.morning;
    } else if (hour >= timePeriods.afternoon.start && hour <= timePeriods.afternoon.end) {
        return timePeriods.afternoon;
    } else if (hour >= timePeriods.evening.start && hour <= timePeriods.evening.end) {
        return timePeriods.evening;
    } else {
        return timePeriods.night;
    }
}

// Function to format time with leading zeros
function formatTimeComponent(component) {
    return component < 10 ? `0${component}` : component;
}

// Function to update the clock
function updateClock() {
    const now = new Date();
    
    // Get time components
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Format time string (24-hour format)
    const timeString = `${formatTimeComponent(hours)}:${formatTimeComponent(minutes)}:${formatTimeComponent(seconds)}`;
    
    // Format date string
    const dayOfWeek = daysOfWeek[now.getDay()];
    const month = monthsOfYear[now.getMonth()];
    const date = now.getDate();
    const dateString = `${dayOfWeek}, ${month} ${date}`;
    
    // Determine current time period
    const currentPeriod = getCurrentTimePeriod(hours);
    
    // Update DOM elements
    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
    periodElement.textContent = currentPeriod.name;
    currentThemeElement.textContent = currentPeriod.name;
    
    // Update theme
    updateTheme(currentPeriod.theme);
}

// Function to update the theme
function updateTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove(
        timePeriods.morning.theme,
        timePeriods.afternoon.theme,
        timePeriods.evening.theme,
        timePeriods.night.theme
    );
    
    // Add the current theme class
    document.body.classList.add(theme);
}

// Initialize the clock
function initClock() {
    // Update the clock immediately
    updateClock();
    
    // Update the clock every second
    setInterval(updateClock, 1000);
}

// Start the clock when the page loads
document.addEventListener('DOMContentLoaded', initClock);