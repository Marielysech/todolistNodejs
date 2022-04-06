// Global variables

const button = document.getElementById("taskButton");
const inputField = document.getElementById("taskInput");
let taskListDiv = document.getElementById("tasksList")
let taskArray = [];


// Events

// when clicked adds task to the task list
button.addEventListener('click', addTaskToTheList);

// when enter key is press adds task to the task list
inputField.addEventListener('keypress', addTaskToTheListFromKeyPress);

 


// Functions

function addTaskToTheList () { // Adds task to the list
    if(inputField.value) { // Check that input is not empty

    taskArray.push(inputField.value);

    // Create a list item that will contain a span and a checkbox
    let taskEntry = document.createElement('li')
    let inlineTask = document.createElement('div')
    let taskText = document.createElement('span');
    let statusTag = document.createElement('p')
    let taskCheckbox = document.createElement('input');
    let deleteButton = document.createElement('i')

    // set the inner HTML
    let newEntry = taskArray[taskArray.length-1]
    taskText.innerHTML = newEntry;
    statusTag.innerHTML = "TO DO"

    // adds class and id
    taskEntry.classList.add("newTaskEntry");
    inlineTask.classList.add("inlineTaskEntry");
    taskCheckbox.classList.add("checkbox");
    taskText.classList.add("taskText");
    deleteButton.setAttribute("class","fa-solid fa-trash-can")
    deleteButton.setAttribute("id","deleteButton")
    statusTag.setAttribute("id","toDoTag")
    taskCheckbox.setAttribute("type", "checkbox"); 



    // append the new task in the ul
    taskListDiv.append(taskEntry);
    taskEntry.append(inlineTask);
    inlineTask.append(taskText);
    inlineTask.append(statusTag);
    inlineTask.append(taskCheckbox);
    inlineTask.append(deleteButton);

    // clear input
    
    inputField.value = '';

    // event listeners
    taskCheckbox.addEventListener('change', crossDoneTask);
    deleteButton.addEventListener('click', supressTask);

    }
}

// Secondary event function 

function addTaskToTheListFromKeyPress(event) {
    if (event.keyCode === 13) { 
        event.preventDefault();
        addTaskToTheList();
    }
}

function crossDoneTask(event) {
    if(this.checked) {
    this.parentElement.firstElementChild.classList.add('crossedTask');
    let doneTag = document.createElement('p')
    this.previousElementSibling.replaceWith(doneTag);
    doneTag.setAttribute("id","doneTag");
    doneTag.innerHTML = "DONE"
   } else {
    this.parentElement.firstElementChild.classList.remove('crossedTask');
    this.previousElementSibling.removeAttribute("id");
    this.previousElementSibling.setAttribute("id", "toDoTag");
    this.previousElementSibling.innerHTML = "TO DO"
   }  
}

function supressTask(event) {
    this.parentElement.remove();
}