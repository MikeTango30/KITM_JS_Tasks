'use strict';

(function () {
    //Task Object
    class Task {
        _icon;
        _subject;
        _remove;
        _priority;
        _deadline;
        _status;
        _completeness;
        _modifiedOn;

        constructor(subject = "New Task", priority = "Low", deadline = " ") {
            this._icon = 'check';
            this._remove = 0;
            this._status = 'New';
            this._completeness = 0;
            this._modifiedOn = new Date();
            this._subject = subject;
            this._priority = priority;
            this._deadline = deadline;
        }
        get icon() {
            return this._icon;
        }

        set icon(value) {
            this._icon = value;
        }

        get remove() {
            return this._remove;
        }

        set remove(value) {
            this._remove = value;
        }

        get subject() {
            return this._subject;
        }

        set subject(value) {
            this._subject = value;
        }

        get priority() {
            return this._priority;
        }

        set priority(value) {
            this._priority = value;
        }

        get deadline() {
            return this._deadline;
        }

        set deadline(value) {
            this._deadline = value;
        }

        get status() {
            return this._status;
        }

        set status(value) {
            this._status = value;
        }

        get completeness() {
            return this._completeness;
        }

        set completeness(value) {
            this._completeness = value;
        }

        get modifiedOn() {
            return this._modifiedOn;
        }

        set modifiedOn(value) {
            this._modifiedOn = value;
        }
    }

    //Basic vars
    const displayNoneClass = 'd-none';
    const tasksTable = document.querySelector('table');
    const newTaskForm = document.querySelector('.new-task-form');
    const newTask = document.querySelector('.new-task');
    const addTask = document.querySelector('.add-task');
    const cancelNewTask = document.querySelector('.cancel-new-task');
    const tasksTableBody = document.createElement('tbody');

    //Table Headers
    let tableHeaders = [
        'Icon',
        'Subject',
        //'Select',
        'Remove',
        'Priority',
        'Due date',
        //'Sort',
        'Status',
        'Percent Completed',
        'Modified on'
    ];

    //App Name
    (function () {
        const appName = "Task-O-Mizer";
        const appTitle = document.querySelector('.app-title');
        appTitle.textContent = appName
    })();

    //Create Task Object from Form Data
    function getTaskFromForm() {
        const taskSubject = document.querySelector('#taskSubject');
        const taskPriority = document.querySelector('#taskPriority');
        const taskDueDate = document.querySelector('#taskDueDate');
        const newTask = new Task(taskSubject.value, taskPriority.value, taskDueDate.value);
        newTask._modifiedOn = newTask._modifiedOn.toLocaleDateString("lt") + ' ' +
                                      newTask._modifiedOn.toLocaleTimeString("lt");
        return newTask;
    }

    //Show/Hide new Task Form
    (function () {
        newTask.addEventListener('click', function (e) {
            newTaskForm.classList.remove(displayNoneClass);
            newTask.classList.add(displayNoneClass);
        });
        cancelNewTask.addEventListener('click', function (e) {
            newTaskForm.classList.add(displayNoneClass);
            newTask.classList.remove(displayNoneClass);
        });
    })();

    // Insert new Task: Object
    (function () {
        addTask.addEventListener('click', function (e) {
            newTaskForm.classList.add(displayNoneClass);
            newTask.classList.remove(displayNoneClass);
            let task = getTaskFromForm();
            const tableRow = document.createElement('tr');
            for (let [, value] of Object.entries(task)) {
                const tableData = document.createElement('td');
                tableData.textContent = value;
                tableRow.appendChild(tableData);
                tasksTableBody.appendChild(tableRow);
            }
        })
    })();

    //Create Table Column Header
    function createTableHeadColumn(name) {
        const tasksTableColumn = document.createElement('th');
        tasksTableColumn.setAttribute('scope', 'col');
        tasksTableColumn.textContent = name;

        return tasksTableColumn;
    }

    function createTableHeaders(headerNames) {
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

    //Table Body
    (function () {
        tasksTable.appendChild(tasksTableBody);
    })();


    //TODO table header Diagram icon, Sorting icon, Remove icon


})();