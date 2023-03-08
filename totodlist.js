const form = document.querySelector('form');
const input = document.querySelector('#new-task');
const taskList = document.querySelector('#task-list');

let tasks = [];

// Add task
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        id: Date.now(),
        name: input.value,
        completed: false,
    };
    tasks.push(task);
    displayTasks();
    input.value = '';
});

// Display tasks
function displayTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        li.innerHTML = `
            <span>${task.name}</span>
            <div>
                <button type="button" class="btn btn-secondary btn-sm edit-btn" data-id="${task.id}">Editer</button>
                <button type="button" class="btn btn-danger btn-sm delete-btn" data-id="${task.id}">Supprimer</button>
            </div>
        `;
        taskList.appendChild(li);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CECI EST UN TEST GIT

// Edit task
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const task = tasks.find((task) => task.id === id);
        const newName = prompt('Enter new task name:', task.name);
        if (newName !== null && newName !== '') {
            task.name = newName;
            displayTasks();
        }
    }
});

// Delete task
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const id = parseInt(event.target.getAttribute('data-id'));
        tasks = tasks.filter((task) => task.id !== id);
        displayTasks();
    }
});

// Load tasks from local storage
const storedTasks = JSON.parse(localStorage.getItem('tasks'));
if (storedTasks !== null) {
    tasks = storedTasks
}