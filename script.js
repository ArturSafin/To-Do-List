const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const clearButton = document.getElementById('clear-button');

function createTaskElement(taskText) {
    const listItem = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function () {
        listItem.remove();
        saveTasks();
    });

    listItem.appendChild(taskSpan);
    listItem.appendChild(deleteButton);

    return listItem;
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li span').forEach(taskSpan => {
        tasks.push(taskSpan.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
        const listItem = createTaskElement(taskText);
        taskList.appendChild(listItem);
    });
}

addButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Пожалуйста, введите задачу!');
        return;
    }

    const listItem = createTaskElement(taskText);
    taskList.appendChild(listItem);
    taskInput.value = '';
    saveTasks();
});

clearButton.addEventListener('click', function () {
    if (confirm('Вы уверены, что хотите очистить весь список?')) {
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');
    }
});

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addButton.click();
    }
});

document.addEventListener('DOMContentLoaded', loadTasks);
