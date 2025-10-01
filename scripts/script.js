/* LOAD PAGE */
let tasks = getTasks();
renderTasks();



function addTask()
{
    let nameInput = document.querySelector('.js-task-name-input'); 
    let dateInput = document.querySelector('.js-task-date-input'); 

    let taskName = nameInput.value;
    let taskDate = dateInput.value;

    let task = {name: taskName, date: taskDate};
    tasks.push(task);
    renderTasks();
    saveTasks();

    /* Clean inputs */
    nameInput.value = '';
    dateInput.value = '';
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
        taskGrid.innerHTML = `<p class="done-message">DONE!</p>`;
    }

    else 
    {
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