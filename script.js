
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
const clearButton = document.getElementById('clear-button');


function createTaskElement(taskText) {
    const listItem = document.createElement('li');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', function () {
        deleteButton.parentElement.remove();
        saveTasks();
    });

    listItem.textContent = taskText;
    listItem.appendChild(deleteButton);

    return listItem;
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(listItem => {

        const taskText = listItem.textContent.slice(0, -1);
        tasks.push(taskText);
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
    const taskText = taskInput.value;
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

    taskList.innerHTML = '';

    saveTasks();
});

loadTasks();