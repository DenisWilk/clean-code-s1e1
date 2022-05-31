const taskInput = document.querySelector('.new-task__text');
const addButton = document.querySelector('.task__add-btn');
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

//New task list item.
const createNewTaskElement = function (taskString) {
    const listItem = document.createElement('li');
    const checkBox = document.createElement('input');
    const label = document.createElement('label');
    const editInput = document.createElement('input');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const deleteButtonImg = document.createElement('img');

    listItem.className = 'list__task';

    label.innerText = taskString;
    label.className = 'task__label';

    checkBox.className = 'task__checkbox';
    checkBox.type = 'checkbox';
    editInput.className = 'task__text task__text_edit';

    editButton.innerText = 'Edit';
    editButton.className = 'task__btn task__edit-btn';

    deleteButton.className = 'task__btn task__delete-btn';
    deleteButtonImg.src = './assets/svg/remove.svg';
    deleteButtonImg.className = 'delete-btn__img';
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

const addTask = function () {
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = '';
}

//Edit an existing task.
const editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelector('.task__text_edit');
    const label = listItem.querySelector('.task__label');
    const editBtn = listItem.querySelector('.task__edit-btn');
    const containsClass = listItem.classList.contains('list__edit_mode');

    if (containsClass) {
        label.innerText = editInput.value;
        editBtn.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editBtn.innerText = 'Save';
    }
    listItem.classList.toggle('list__edit_mode');
};

//Delete task.
const deleteTask = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;

    ul.removeChild(listItem);
}

//Mark task completed.
const taskCompleted = function () {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function () {
    console.log('AJAX Request');
}

//The glue to hold it all together.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    const checkBox = taskListItem.querySelector('.task__checkbox');
    const editButton = taskListItem.querySelector('.task__edit-btn');
    const deleteButton = taskListItem.querySelector('.task__delete-btn');

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}