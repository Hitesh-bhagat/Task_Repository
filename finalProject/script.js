
    document.addEventListener('DOMContentLoaded', function() {
    const showFormButton = document.getElementById('show-form-button');
    const taskForm = document.getElementById('task-form');
    const cancelButton = document.getElementById('cancel-button');
    const parentTaskForm = document.getElementById('parent-task-form');
    const taskList = document.getElementById('task-list');
    
    // Initialize an array to store tasks
    const tasks = [];

    showFormButton.addEventListener('click', function() {
        taskForm.style.display = 'block';
    });

    cancelButton.addEventListener('click', function() {
        taskForm.style.display = 'none';
        parentTaskForm.reset();
    });

    parentTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const taskId = document.getElementById('task-id').value;
        const taskName = document.getElementById('task-name').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        const status = document.getElementById('status').value;

        // Create a task object
        const task = {
            taskId,
            taskName,
            startDate,
            endDate,
            status
        };

        // Add the task object to the tasks array
        tasks.push(task);

        // Clear the form fields and hide the form
        parentTaskForm.reset();
        taskForm.style.display = 'none';

        // Display the tasks in the table
        displayTasks();
    });

    // Function to display tasks in the table
    function displayTasks() {
        taskList.innerHTML = ''; // Clear the table
        tasks.forEach((task, index) => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${task.taskId}</td>
                <td>${task.taskName}</td>
                <td>${task.startDate}</td>
                <td>${task.endDate}</td>
                <td>${task.status}</td>
                <td><button onclick="editTask(${index})">Edit</button></td>
                <td><button onclick="deleteTask(${index})">Delete</button></td>
                <td><button onclick="addSubTask(${index})">Add Sub Task</button></td>
            `;
            taskList.appendChild(newRow);
        });

        
    }
    
    taskList.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Delete') {
            const rowIndex = event.target.parentElement.parentElement.rowIndex - 1;
            deleteTask(rowIndex);
        }
    });

    // Add an event listener to the table to handle edit clicks
    taskList.addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
            const rowIndex = event.target.parentElement.parentElement.rowIndex - 1;
            editTask(rowIndex);
        }
    });

    // Function to edit a task
    function editTask(index) {
        const task = tasks[index];
    
        // Fill the form with the task's data
        document.getElementById('task-id').value = task.taskId;
        document.getElementById('task-name').value = task.taskName;
        document.getElementById('start-date').value = task.startDate;
        document.getElementById('end-date').value = task.endDate;
        document.getElementById('status').value = task.status;
         
        //Open pre-filled form to edit record
        taskForm.style.display = 'block';

        // Remove the old task from the array
        tasks.splice(index, 1);
        displayTasks();

        // Add an event listener to the form for submission after editing
        const parentTaskForm = document.getElementById('parent-task-form');
        parentTaskForm.removeEventListener('submit', handleAddTask); // Remove previous submit event
        parentTaskForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get edited values from the form
            const editedTask = {
                taskId: document.getElementById('task-id').value,
                taskName: document.getElementById('task-name').value,
                startDate: document.getElementById('start-date').value,
                endDate: document.getElementById('end-date').value,
                status: document.getElementById('status').value,
            };

            // Add the edited task to the array
            tasks.splice(index, 0, editedTask);

            // Clear the form fields and hide the form
            parentTaskForm.reset();
            taskForm.style.display = 'none';
            console.log(tasks);

            // Update the table after editing
            displayTasks();
    });
    }

        
    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        displayTasks(); // Refresh the table after deletion
        console.log(tasks);
    }
    
});
