//Define all dom 
let form = document.querySelector('#task-form');
let addTask = document.querySelector('#add-task');
let addButton = document.querySelector('#add-btn');
let filter = document.querySelector('#filter');
let myTasks = document.querySelector('#myTasks');
let clearTasks = document.querySelector('#clear-tasks');


//Add new task
form.addEventListener('submit', addNewTask);

function addNewTask(e) {
    if (addTask.value == "") {
        alert("You must enter the name of the task")
    } else {
        let createLi = document.createElement('li');
        createLi.appendChild(document.createTextNode(addTask.value + " "));
        let cross = document.createElement('a');
        cross.setAttribute('href', '#');
        cross.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        createLi.append(cross);
        myTasks.appendChild(createLi);
        storeToLocalStorage(addTask.value);
        addTask.value = '';
    }
    e.preventDefault();
}


//Remove a task
myTasks.addEventListener('click', removeTask);

function removeTask(e) {
    if (e.target.classList.contains('fa-solid')) {
        if (confirm("Are you sure want to delete this task?")) {
            let crossParent = e.target.parentElement.parentElement;
            crossParent.remove();
            removeFromLocalStorage(crossParent);
        }
    }
}


//Clear all tasks
clearTasks.addEventListener('click', removeAllTasks);

function removeAllTasks() {
    myTasks.innerHTML = " ";
}


//Filter tasks
filter.addEventListener('keyup', filterTask);

function filterTask(e) {
    let filterInput = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(filterInput) != -1) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    })
}


//Store tasks to local storage
function storeToLocalStorage(tasks) {
    let allTasks;
    if (localStorage.getItem('allTasks') === null) {
        allTasks = []
    } else {
        allTasks = JSON.parse(localStorage.getItem('allTasks'))
    }
    allTasks.push(tasks);
    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}


//Retrieve tasks from local storage
document.addEventListener('DOMContentLoaded', retTasks);

function retTasks() {
    let allTasks;
    if (localStorage.getItem('allTasks') === null) {
        allTasks = []
    } else {
        allTasks = JSON.parse(localStorage.getItem('allTasks'))
    }


    allTasks.forEach(task => {
        let createLi = document.createElement('li');
        createLi.appendChild(document.createTextNode(task + " "));
        let cross = document.createElement('a');
        cross.setAttribute('href', '#');
        cross.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
        createLi.append(cross);
        myTasks.appendChild(createLi);
    })

}


//Remove task from local storage
function removeFromLocalStorage(taskItem) {
    let allTasks;
    if (localStorage.getItem('allTasks') === null) {
        allTasks = []
    } else {
        allTasks = JSON.parse(localStorage.getItem('allTasks'))
    }

    let itemToDelete = taskItem;

    allTasks.forEach((task, index) => {
        if (itemToDelete.textContent.trim() === task) {
            allTasks.splice(index, 1);
        }
    });

    localStorage.setItem('allTasks', JSON.stringify(allTasks));
}

