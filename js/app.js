'use strict';

(function () {
    //Task Object
    class Task {
        _icon;
        _subject;
        //_remove;
        _priority;
        _deadline;
        _status;
        _completeness;
        _modifiedOn;

        constructor(subject, priority, deadline) {
            this._icon = 'check';
            //this._remove = 0;
            this._status = 'New';
            this._completeness = '0%';
            this._modifiedOn = new Date();
            this._subject = subject;
            this._priority = priority;
            this._deadline = deadline;
        }
    }

    //Task's property names
    let taskIcon = '_icon';
    let taskSubject = '_subject';
    let taskPriority = '_priority';
    let taskStatus = '_status';
    let taskCompleteness = '_completeness';

    //Classes
    const displayNoneClass = 'd-none';
    const priority = 'priority';
    const priorityLow = 'low';
    const priorityMedium = 'medium';
    const priorityHigh = 'high';
    const priorityNone = 'none'; //for default case
    const iconCheck = 'check';
    const iconDiamond = 'diamond';
    const subjectName = 'task-subject';
    const taskStatusNew = 'task-status-new';
    const taskCompletenessZero = 'task-completeness-0';
    const taskCompletenessDone = 'task-completeness-100';
    const strikethrough = 'strikethrough';
    const checkbox = 'checkbox';
    const checkmark = 'checkmark';


    //Elements
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
        //'Remove',
        'Priority',
        'Due date',
        //'Sort',
        'Status',
        'Percent Completed',
        'Modified on'
    ];

    //App Name
    const appName = "Task-O-Mizer";
    const appTitle = document.querySelector('.app-title');
    appTitle.textContent = appName;

    //Create Task from Form Data
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
        let dateValue = document.querySelector('#taskDueDate');
        let today = new Date();
        dateValue.setAttribute('value', today.toLocaleDateString("lt"));
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
    tasksTable.appendChild(tasksTableBody);

    //Create Checkbox
    let id = 1;
    function createCheckBox(tableDataSpan, tableData) {
        let checkboxId = checkbox + '-' + id;
        tableDataSpan.classList.add(subjectName);
        const checkboxLabel = document.createElement('label');
        const checkboxInput = document.createElement('input');
        const checkMark = document.createElement('span');
        checkboxLabel.setAttribute('for', checkboxId);
        checkboxInput.setAttribute('type', checkbox);
        checkboxInput.setAttribute('id', checkboxId);
        checkMark.classList.add(checkbox);
        checkboxLabel.classList.add(checkmark);
        checkMark.innerHTML = "<i class=\"fas fa-check\"></i>";
        checkboxLabel.appendChild(checkboxInput);
        checkboxLabel.appendChild(checkMark);
        tableData.prepend(checkboxLabel);
        id++;
    }

    //Add Priority Class
    function addPriority(tableDataSpan, value) {
        switch (value) {
            case 'Low':
                tableDataSpan.classList.add(priority, priorityLow);
                break;
            case 'Medium':
                tableDataSpan.classList.add(priority, priorityMedium);
                break;
            case 'High':
                tableDataSpan.classList.add(priority, priorityHigh);
                break;
            default:
                tableDataSpan.classList.add(priority, priorityNone);
        }
    }

    // Subject Check Mark: strikethrough subject, progress bar
    function addCheckboxFunctionality() {
        const subjectChecks = document.querySelectorAll('.' + checkmark);
        for(let subjectCheck of subjectChecks) {
            subjectCheck.addEventListener('change', function (e) {
                const taskName = subjectCheck.nextSibling;
                const completeness = subjectCheck.parentElement.nextSibling.nextSibling.
                                                                nextSibling.nextSibling.
                                                                firstChild.firstChild;
                const target = e.target;
                taskName.classList.remove(strikethrough);
                completeness.textContent = '0%';
                completeness.parentElement.classList.add(taskCompletenessZero);
                completeness.parentElement.classList.remove(taskCompletenessDone);
                if (target.checked === true) {
                    taskName.classList.add(strikethrough);
                    completeness.textContent = '100%';
                    completeness.parentElement.classList.remove(taskCompletenessZero);
                    completeness.parentElement.classList.add(taskCompletenessDone)
                }
            })
        }
    }

    function addProgressBar(tableDataSpan, tableData) {
        // const progressBarContainer = document.createElement('span');
        const progressBar = document.createElement('span');
        // progressBarContainer.classList.add('progress');
        tableDataSpan.classList.add('progress', taskCompletenessZero);
        progressBar.classList.add('progress-bar',  'bg-success');
        // progressBar.setAttribute('style', 'width: 1%');
        // progressBarContainer.appendChild(progressBar);
        tableDataSpan.appendChild(progressBar);//Container);
        tableData.appendChild(tableDataSpan);
    }

    // Insert new Task
    (function () {
        addTask.addEventListener('click', function (e) {
            newTaskForm.classList.add(displayNoneClass);
            newTask.classList.remove(displayNoneClass);
            let task = getTaskFromForm();
            const tableRow = document.createElement('tr');
            for (let [key, value] of Object.entries(task)) {
                const tableData = document.createElement('td');
                const tableDataSpan = document.createElement('span');
                tableData.appendChild(tableDataSpan);
                tableDataSpan.textContent = value;

                key === taskIcon && tableDataSpan.classList.add(iconCheck);
                key === taskStatus && tableDataSpan.classList.add(taskStatusNew);
                key === taskCompleteness && addProgressBar(tableDataSpan, tableData);
                key === taskSubject && createCheckBox(tableDataSpan, tableData);
                key === taskPriority && addPriority(tableDataSpan, value);

                tableRow.appendChild(tableData);
                tasksTableBody.appendChild(tableRow);
            }
            addCheckboxFunctionality();
        });
    })();
    //TODO table header Diagram icon, Sorting icon, Remove icon
})();