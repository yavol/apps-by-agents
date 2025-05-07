// Simple test suite for Todo App functionality

// Mock localStorage
const localStorageMock = (function() {
    let store = {};
    return {
        getItem: function(key) {
            return store[key] || null;
        },
        setItem: function(key, value) {
            store[key] = value.toString();
        },
        clear: function() {
            store = {};
        }
    };
})();

// Replace the real localStorage with our mock
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// Test functions
function runTests() {
    console.log('Running Todo App Tests...');
    
    // Test adding a task
    console.log('Test: Adding a task');
    document.getElementById('task-input').value = 'Test Task';
    document.getElementById('add-task-btn').click();
    
    const taskItems = document.querySelectorAll('.task-item');
    console.assert(taskItems.length === 1, 'Task should be added to the list');
    console.assert(taskItems[0].querySelector('.task-text').textContent === 'Test Task', 'Task text should match input');
    
    // Test marking a task as completed
    console.log('Test: Marking task as completed');
    const checkbox = taskItems[0].querySelector('.task-checkbox');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    
    console.assert(taskItems[0].classList.contains('completed'), 'Task should have completed class');
    
    // Test filtering tasks
    console.log('Test: Filtering tasks');
    document.querySelector('[data-filter="completed"]').click();
    console.assert(document.querySelectorAll('.task-item:not(.hidden)').length === 1, 'Should show 1 completed task');
    
    document.querySelector('[data-filter="active"]').click();
    console.assert(document.querySelectorAll('.task-item:not(.hidden)').length === 0, 'Should show 0 active tasks');
    
    // Test deleting a task
    console.log('Test: Deleting a task');
    document.querySelector('[data-filter="all"]').click();
    document.querySelector('.delete-btn').click();
    console.assert(document.querySelectorAll('.task-item').length === 0, 'Task should be deleted');
    
    console.log('All tests completed!');
}

// Run tests when the page is fully loaded
window.addEventListener('load', runTests);