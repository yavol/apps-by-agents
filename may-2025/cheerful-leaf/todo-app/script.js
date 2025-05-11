document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            input.value = '';
            saveAndRender();
        }
    });

    list.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-btn')) {
            const idx = e.target.parentElement.dataset.index;
            todos.splice(idx, 1);
            saveAndRender();
        } else if (e.target.classList.contains('todo-text')) {
            const idx = e.target.parentElement.dataset.index;
            todos[idx].completed = !todos[idx].completed;
            saveAndRender();
        }
    });

    function saveAndRender() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        list.innerHTML = '';
        todos.forEach((todo, idx) => {
            const li = document.createElement('li');
            li.className = 'todo-item' + (todo.completed ? ' todo-completed' : '');
            li.dataset.index = idx;
            li.innerHTML = `
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn">Delete</button>
            `;
            list.appendChild(li);
        });
    }
});
