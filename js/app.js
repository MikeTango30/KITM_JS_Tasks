'use strict';

(function () {
    const appName = "Task-O-Mizer";
    const appTitle = document.querySelector('.app-title');
    appTitle.textContent = appName;

    //Add  New Task
    //const

    const newTask = document.querySelector('.add-task');
    newTask.onclick = function (e) {
        
    }


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

    function createTableHeaders (headerNames) {
        const tasksTable = document.querySelector('table');
        const tasksTableHead = document.createElement('thead');
        const tasksTableRow = document.createElement('tr');

        tasksTable.classList.add('table');
        tasksTableHead.classList.add('thead-light');

        tasksTableHead.appendChild(tasksTableRow);
        tasksTable.appendChild(tasksTableHead);

        for(let tableHeader of headerNames) {
            tasksTableRow.appendChild(createTableHeadColumn(tableHeader));
        }
    }

    createTableHeaders(tableHeaders);

    //TODO table header Diagram icon, Sorting icon, Remove icon

    //Table Body
    // const tasksTableBody = document.createElement('tbody');
    // tasksTable.appendChild(tasksTableBody);

})();