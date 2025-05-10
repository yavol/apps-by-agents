const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];
let timers = {};

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, idx) => {
        const li = document.createElement('li');
        li.className = 'todo-item' + (todo.completed ? ' completed' : '');

        const spanText = document.createElement('span');
        spanText.className = 'todo-text';
        spanText.textContent = todo.text;

        const spanTimer = document.createElement('span');
        spanTimer.className = 'todo-timer';
        spanTimer.textContent = formatTime(todo.elapsed);
        spanTimer.id = `timer-${idx}`;

        li.appendChild(spanText);
        li.appendChild(spanTimer);

        if (!todo.completed) {
            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            completeBtn.textContent = 'Complete';
            completeBtn.onclick = () => completeTodo(idx);
            li.appendChild(completeBtn);
        }

        todoList.appendChild(li);
    });
}

function addTodo(text) {
    todos.push({
        text,
        created: Date.now(),
        elapsed: 0,
        completed: false
    });
    startTimer(todos.length - 1);
    renderTodos();
}

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = todoInput.value.trim();
    if (value) {
        addTodo(value);
        todoInput.value = '';
    }
});

function startTimer(idx) {
    if (timers[idx]) clearInterval(timers[idx]);
    timers[idx] = setInterval(() => {
        if (!todos[idx].completed) {
            todos[idx].elapsed = Math.floor((Date.now() - todos[idx].created) / 1000);
            const timerSpan = document.getElementById(`timer-${idx}`);
            if (timerSpan) timerSpan.textContent = formatTime(todos[idx].elapsed);
        }
    }, 1000);
}

function completeTodo(idx) {
    todos[idx].completed = true;
    clearInterval(timers[idx]);
    renderTodos();
}

// Initial render
renderTodos();
