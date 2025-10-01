/* LOAD PAGE */
let tasks = getTasks();
renderTasks();



function addTask()
{
    let nameInput = document.querySelector('.js-task-name-input'); 
    let dateInput = document.querySelector('.js-task-date-input'); 

    let taskName = nameInput.value;
    let taskDate = dateInput.value;

    if (taskName === '')
    {
        nameInput.classList.add('task-name-input-error');
    }
    else
    {
        if (nameInput.classList.contains('task-name-input-error'))
        {
            nameInput.classList.remove('task-name-input-error');
        }
    }
    if (taskDate === '')
    {
        dateInput.classList.add('task-date-input-error');
    }
    else
    {
        if (dateInput.classList.contains('task-date-input-error'))
        {
            dateInput.classList.remove('task-date-input-error');
        }
    }

    if (taskName !== '' && taskDate !== '')
    {
        let task = {name: taskName, date: taskDate};
        tasks.push(task);
        renderTasks();
        saveTasks();

        /* Clean inputs */
        nameInput.value = '';
        dateInput.value = '';
    }
}

function deleteTask(index)
{
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
}

function renderTasks()
{
    let taskGrid = document.querySelector('.grid-section');
    
    if (tasks.length === 0)
    {
        taskGrid.classList.add('grid-section-done');

        taskGrid.innerHTML = `                <img class="logo-gray" src="logo/logo-gray.png" alt="CheckPG">`;
    }

    else 
    {
        if (taskGrid.classList.contains('grid-section-done'))
        {
            taskGrid.classList.remove('grid-section-done');
        }

        let htmlCode = '';

        for (let i = 0; i < tasks.length; i++)
        {
            let task = tasks[i];
            let itemCode = `
                <p class="task-name">${task.name}</p>
                <p class="task-date">${task.date}</p>
                <button class="delete-button" onclick="deleteTask(${i});">Delete</button>
                `;

            htmlCode += itemCode;
        }

        taskGrid.innerHTML = htmlCode;
    }

}

function getTasks()
{
    let array = JSON.parse(localStorage.getItem('tasks'));

    if (!array)
    {
        return [];
    }
    else
    {
        return array;
    }
}

function saveTasks()
{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}