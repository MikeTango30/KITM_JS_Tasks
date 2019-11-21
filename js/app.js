'use strict';

(function () {
    const displayNoneClass = 'd-none';

    //App Name
    const appName = "Task-O-Mizer";
    const appTitle = document.querySelector('.app-title');
    appTitle.textContent = appName;

    //New Task
    (function () {
        class Task {
            subject;
            priority;
            deadline;

            constructor(subject = "New Task", priority = "Low", deadline = " "){
                this.subject = subject;
                this.priority = priority;
                this.deadline = deadline;
            }

            getSubject() {
                return this.subject;
            }

            getPriority() {
                return this.priority;
            }

            getDeadline() {
                return this.deadline;
            }

        }

        function getTaskFromForm() {
            const taskSubject = document.querySelector('#taskSubject');
            const taskPriority = document.querySelector('#taskPriority');
            const taskDueDate = document.querySelector('#taskDueDate');

            return new Task(taskSubject.value, taskPriority.value, taskDueDate.value);
        }

        const newTaskForm = document.querySelector('.new-task-form');
        const newTask = document.querySelector('.new-task');
        const addTask = document.querySelector('.add-task');
        newTask.addEventListener('click', function (e) {
            newTaskForm.classList.remove(displayNoneClass);
            newTask.classList.add(displayNoneClass);
        });
        addTask.addEventListener('click', function (e) {
            newTaskForm.classList.add(displayNoneClass);
            newTask.classList.remove(displayNoneClass);
            let task = getTaskFromForm();
        });
    })();


    //Table Headers
    let tableHeaders = [
        'Icon',
        'Subject',
        'Select',
        'Remove',
        'Priority',
        'Due date',
        'Sort', 'Status',
        'Percent Completed',
        'Modified on'
    ];

    function createTableHeadColumn(name) {
        const tasksTableColumn = document.createElement('th');
        tasksTableColumn.setAttribute('scope', 'col');
        tasksTableColumn.textContent = name;

        return tasksTableColumn;
    }

    function createTableHeaders(headerNames) {
        const tasksTable = document.querySelector('table');
        const tasksTableHead = document.createElement('thead');
        const tasksTableRow = document.createElement('tr');

        tasksTable.classList.add('table');
        tasksTableHead.classList.add('thead-light');

        tasksTableHead.appendChild(tasksTableRow);
        tasksTable.appendChild(tasksTableHead);

        for (let tableHeader of headerNames) {
            tasksTableRow.appendChild(createTableHeadColumn(tableHeader));
        }
    }

    createTableHeaders(tableHeaders);

    //TODO table header Diagram icon, Sorting icon, Remove icon

    //Table Body
    // const tasksTableBody = document.createElement('tbody');
    // tasksTable.appendChild(tasksTableBody);

})();