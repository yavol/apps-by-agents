// DOM Elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const tasksCounter = document.getElementById('tasks-counter');
const clearCompletedBtn = document.getElementById('clear-completed');
const filterBtns = document.querySelectorAll('.filter-btn');
const emptyState = document.getElementById('empty-state');

// App State
let tasks = [];
let currentFilter = 'all';

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('joyful-success-todo-tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
    updateEmptyState();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('joyful-success-todo-tasks', JSON.stringify(tasks));
}

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        // Shake animation for empty input
        taskInput.classList.add('shake');
        setTimeout(() => {
            taskInput.classList.remove('shake');
        }, 500);
        return;
    }
    
    const newTask = {
        id: Date.now().toString(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(newTask); // Add to beginning of array for newest-first order
    saveTasks();
    renderTasks();
    updateEmptyState();
    
    // Clear input field
    taskInput.value = '';
    taskInput.focus();
}

// Delete a task with animation
function deleteTask(taskId) {
    const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
    
    // Add deleting animation class
    taskElement.classList.add('deleting');
    
    // Wait for animation to complete before removing from DOM and data
    setTimeout(() => {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
        updateEmptyState();
    }, 300);
}

// Toggle task completion status with animation
function toggleTaskStatus(taskId) {
    const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
    taskElement.classList.add('completing');
    
    setTimeout(() => {
        taskElement.classList.remove('completing');
        
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
    }, 300);
}

// Clear all completed tasks
function clearCompletedTasks() {
    // Get all completed task elements
    const completedElements = document.querySelectorAll('.task-item.completed');
    
    // Add deleting animation to all completed tasks
    completedElements.forEach(element => {
        element.classList.add('deleting');
    });
    
    // Wait for animation to complete before removing from DOM and data
    setTimeout(() => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateEmptyState();
    }, 300);
}

// Filter tasks based on current filter
function getFilteredTasks() {
    switch (currentFilter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
}

// Update tasks counter
function updateTasksCounter() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    tasksCounter.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
}

// Update empty state visibility
function updateEmptyState() {
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        let message = 'No tasks yet. Add a task to get started!';
        
        if (currentFilter === 'active' && tasks.length > 0) {
            message = 'No active tasks. All tasks are completed!';
        } else if (currentFilter === 'completed' && tasks.length > 0) {
            message = 'No completed tasks yet.';
        }
        
        emptyState.querySelector('p').textContent = message;
        emptyState.style.display = 'flex';
    } else {
        emptyState.style.display = 'none';
    }
}

// Create a task element
function createTaskElement(task) {
    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.dataset.id = task.id;
    
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'task-checkbox-container';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    
    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    
    checkboxContainer.appendChild(checkbox);
    taskActions.appendChild(deleteBtn);
    
    taskItem.appendChild(checkboxContainer);
    taskItem.appendChild(taskText);
    taskItem.appendChild(taskActions);
    
    // Event listeners
    checkbox.addEventListener('change', () => {
        toggleTaskStatus(task.id);
    });
    
    deleteBtn.addEventListener('click', () => {
        deleteTask(task.id);
    });
    
    // Double click to toggle completion
    taskText.addEventListener('dblclick', () => {
        toggleTaskStatus(task.id);
    });
    
    return taskItem;
}

// Render tasks to the DOM
function renderTasks() {
    // Clear the task list
    taskList.innerHTML = '';
    
    // Get filtered tasks
    const filteredTasks = getFilteredTasks();
    
    // Create and append task elements
    filteredTasks.forEach(task => {
        const taskElement = createTaskElement(task);
        taskList.appendChild(taskElement);
    });
    
    // Update tasks counter
    updateTasksCounter();
    
    // Update empty state
    updateEmptyState();
}

// Set active filter
function setFilter(filter) {
    currentFilter = filter;
    
    // Update active filter button
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTasks();
}

// Add shake animation to input
function addShakeAnimation() {
    taskInput.style.animation = 'shake 0.5s';
    setTimeout(() => {
        taskInput.style.animation = '';
    }, 500);
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompletedBtn.addEventListener('click', clearCompletedTasks);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setFilter(btn.dataset.filter);
    });
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    taskInput.focus();
    
    // Add CSS for shake animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .shake {
            animation: shake 0.5s;
        }
    `;
    document.head.appendChild(style);
});