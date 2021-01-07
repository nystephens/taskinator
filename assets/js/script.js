let taskIdCounter = 0;
let formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContentEl = document.querySelector("#page-content");
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");




let taskFormHandler = function(event) {

    event.preventDefault();

    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (taskNameInput === "" || taskTypeInput === "") {
        alert("You need to fill out the task form!")
        return false;
    };

    // reset form 
    document.querySelector("input[name= 'task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndexm= 0;

    let isEdit = formEl.hasAttribute("data-task-id");

    //  has data attribute, so get task Id and call function to complete edit process
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
    // package up data as an object
        let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };
    

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    }                                              
};

let createTaskEl = function(taskDataObj) {
    // create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and list item
    let taskInfoEl = document.createElement("div");
    // give the div a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);
    
    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase counter for next unique id
    taskIdCounter++;
};

let createTaskActions = function(taskId) {
    let actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn"
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    let deleteButtonEl =document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // dropdown menu
    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    let statusChoices = ["To Do", "In Progress", "Completed"];

    for (let i = 0; i < statusChoices.length; i++) {
        // create option element
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

let completeEditTask = function(taskName, taskType, taskId) {
    // find the matching task list item
    let taskSelected = document.querySelector(".task-item[data-task-id='" + "']");
    // set new values 
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType; 

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    formEl.querySelector("#save-task").textContent = "Add Task";
};

formEl.addEventListener("submit", taskFormHandler);

let editTask = function(taskId) {
    console.log("editing task #" + taskId);
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    
    // get content from task name and task type
    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    let taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);

};

let deleteTask = function(taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

let taskButtonHandler = function(event) {
    // get target element from event
    let targetEl = event.target;

    // edit button was clicked 
    if (targetEl.matches(".edit-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if (targetEl.matches(".delete-btn")) {
        let taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

let taskStatusChangeHandler = function(event) {
    // get the task item's id
    let taskId = event.target.getAttribute("data-task-id");

    // let the currently selected options value and convert to lowercase
    let statusValue = event.target.value.toLowercase();

    // find the parent task item element based on the id
    let tasksSelected = document.querySelector(".task-item[data-task-id='" + "']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    };

};

pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler)