// Test suite for Todo App functionality

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
        },
        removeItem: function(key) {
            delete store[key];
        }
    };
})();

// Replace the real localStorage with our mock
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

// Test functions
function runTests() {
    console.group('Todo App Tests');
    console.log('Running Todo App Tests...');
    
    // Clear any existing tasks
    localStorage.removeItem('joyful-success-todo-tasks');
    
    // Test adding a task
    console.group('Test: Adding a task');
    document.getElementById('task-input').value = 'Test Task 1';
    document.getElementById('add-task-btn').click();
    
    let taskItems = document.querySelectorAll('.task-item');
    console.assert(taskItems.length === 1, 'Task should be added to the list');
    console.assert(taskItems[0].querySelector('.task-text').textContent === 'Test Task 1', 'Task text should match input');
    console.log('✓ Task added successfully');
    console.groupEnd();
    
    // Test adding multiple tasks
    console.group('Test: Adding multiple tasks');
    document.getElementById('task-input').value = 'Test Task 2';
    document.getElementById('add-task-btn').click();
    
    taskItems = document.querySelectorAll('.task-item');
    console.assert(taskItems.length === 2, 'Second task should be added to the list');
    console.assert(taskItems[0].querySelector('.task-text').textContent === 'Test Task 2', 'New task should be at the top (newest first)');
    console.log('✓ Multiple tasks added successfully');
    console.groupEnd();
    
    // Test marking a task as completed
    console.group('Test: Marking task as completed');
    const checkbox = taskItems[0].querySelector('.task-checkbox');
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change'));
    
    // Wait for the animation to complete
    setTimeout(() => {
        console.assert(document.querySelectorAll('.task-item')[0].classList.contains('completed'), 'Task should have completed class');
        console.log('✓ Task marked as completed');
        console.groupEnd();
        
        // Test filtering tasks
        console.group('Test: Filtering tasks');
        document.querySelector('[data-filter="completed"]').click();
        console.assert(document.querySelectorAll('.task-item').length === 1, 'Should show 1 completed task');
        console.log('✓ Completed filter works');
        
        document.querySelector('[data-filter="active"]').click();
        console.assert(document.querySelectorAll('.task-item').length === 1, 'Should show 1 active task');
        console.log('✓ Active filter works');
        
        document.querySelector('[data-filter="all"]').click();
        console.assert(document.querySelectorAll('.task-item').length === 2, 'Should show all tasks');
        console.log('✓ All filter works');
        console.groupEnd();
        
        // Test task counter
        console.group('Test: Task counter');
        const counter = document.getElementById('tasks-counter').textContent;
        console.assert(counter === '1 task left', 'Counter should show 1 task left');
        console.log('✓ Task counter works');
        console.groupEnd();
        
        // Test clearing completed tasks
        console.group('Test: Clearing completed tasks');
        document.getElementById('clear-completed').click();
        
        // Wait for the animation to complete
        setTimeout(() => {
            taskItems = document.querySelectorAll('.task-item');
            console.assert(taskItems.length === 1, 'Should have 1 task left after clearing completed');
            console.assert(!taskItems[0].classList.contains('completed'), 'Remaining task should not be completed');
            console.log('✓ Completed tasks cleared');
            console.groupEnd();
            
            // Test deleting a task
            console.group('Test: Deleting a task');
            document.querySelector('.delete-btn').click();
            
            // Wait for the animation to complete
            setTimeout(() => {
                console.assert(document.querySelectorAll('.task-item').length === 0, 'All tasks should be deleted');
                console.log('✓ Task deletion works');
                
                // Test empty state
                console.assert(document.getElementById('empty-state').style.display !== 'none', 'Empty state should be visible');
                console.log('✓ Empty state shows correctly');
                console.groupEnd();
                
                console.log('All tests completed successfully!');
                console.groupEnd();
            }, 400);
        }, 400);
    }, 400);
}

// Run tests when the page is fully loaded
window.addEventListener('load', () => {
    // Wait a bit to make sure the app is fully initialized
    setTimeout(runTests, 500);
});