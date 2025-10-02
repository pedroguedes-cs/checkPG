/* LOAD PAGE */
let tasks = getTasks();
renderTasks();



function addTask()
{
    let nameInput = document.querySelector('.js-task-name-input'); 
    let dateInput = document.querySelector('.js-task-date-input'); 

    let taskName = nameInput.value;
    let taskDate = formatDate(dateInput.value);

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
        let task = {name: taskName, date: taskDate, check: false};
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
    /* Remove errors */
    let nameInput = document.querySelector('.js-task-name-input'); 
    let dateInput = document.querySelector('.js-task-date-input'); 

    if (nameInput.classList.contains('task-name-input-error'))
    {
        nameInput.classList.remove('task-name-input-error');
    }
    if (dateInput.classList.contains('task-date-input-error'))
    {
        dateInput.classList.remove('task-date-input-error');
    }

    /* Delete */
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
            let itemCode = '';

            if (task.check)
            {
                itemCode = `
                <div class="name-plus-check">
                    <button class="check-button check-button-true" onclick="check(${i});"><img class="ckeck-image" src="images/check-white.png" alt="Check"></button>
                    <p class="task-name task-name-true">${task.name}</p>
                </div>
                <p class="task-date task-date-true">${task.date}</p>
                <button class="delete-button" onclick="deleteTask(${i});">Delete</button>
                `;
            }
            else
            {
                itemCode = `
                <div class="name-plus-check">
                    <button class="check-button" onclick="check(${i});"><img class="ckeck-image" src="images/check-white.png" alt="Check"></button>
                    <p class="task-name">${task.name}</p>
                </div>
                <p class="task-date">${task.date}</p>
                <button class="delete-button" onclick="deleteTask(${i});">Delete</button>
                `;
            }



            htmlCode += itemCode;
        }

        taskGrid.innerHTML = htmlCode;
    }

}

function check(index)
{
    if (tasks[index].check)
    {
        tasks[index].check = false;
    }
    else
    {
        tasks[index].check = true;
    }

    saveTasks();
    renderTasks();
}

function formatDate(date)
{
    if (date === '')
    {
        return date;
    }
    else
    {
        let result = {day: '', month: '', year: ''};

        let dashCounter = 0;

        for (let i = 0; i < date.length; i++)
        {
            if (date[i] === '-')
            {
                dashCounter++;
            }
            else if (dashCounter === 0)
            {
                result.year += date[i];
            }
            else if (dashCounter === 1)
            {
                result.month += date[i];
            }
            else if (dashCounter === 2)
            {
                result.day += date[i];
            }
        }

        let format = `${result.day} / ${result.month} / ${result.year}`;
        return format;
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