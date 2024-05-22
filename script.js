let tasks = {};

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const daySelect = document.getElementById('daySelect');
    const day = daySelect.value;
    const task = taskInput.value.trim();

    if (!task) {
        alert('Please enter a task');
        return;
    }

    if (!tasks[day]) {
        tasks[day] = [];
    }

    tasks[day].push(task);
    displayTasks();
    saveTasks();
    taskInput.value = '';
}

function deleteTask(day, index) {
    tasks[day].splice(index, 1);
    displayTasks();
    saveTasks();
}

function displayTasks() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    for (const day in tasks) {
        const tasksForDay = tasks[day];
        const dayHeader = document.createElement('h2');
        dayHeader.textContent = day.toUpperCase();
        todoList.appendChild(dayHeader);

        tasksForDay.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.textContent = task;
            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = '❌';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.onclick = () => deleteTask(day, index);
            taskElement.appendChild(deleteBtn);
            todoList.appendChild(taskElement);
        });
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        displayTasks();
    }
}

loadTasks()
