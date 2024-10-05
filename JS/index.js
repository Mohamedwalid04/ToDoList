let AddInput = document.querySelector(".add-input");
let AddButton = document.querySelector(".add");
let container = document.querySelector(".content")

// empty Array
let Tasks = [];
// Get Tasks when Window load
window.onload = () => {
    getTasks()

}
// Get Tasks from LocalStorage
function getTasks() {
    let list = JSON.parse(window.localStorage.getItem("Tasks"))
    if (!list) return;
    list.map((el) => AddTask(el))
    Tasks = [...list]
}

// check if the input is empty and b
function CheckInput() {
    if (AddInput.value === "") {
        alert("You have to Type Something")
        return;
    }
    CreateTask(AddInput.value)
    alert("Task Successfully Created")
    AddInput.value = ""
}
// Create Task
function CreateTask(value) {
    const Task = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        title: value,
    }
    // Add Task to Array
    Tasks.push(Task)
    // Add Task to Content
    AddTask(Task)
    AddTasksListToLocalStorage(Tasks)
}
// Add Task to Content
function AddTask(Task) {
    let { id, title } = Task;
    // Making the Box
    let box = document.createElement("div");
    box.classList.add("box");
    // Making the Task container that contant Task Name and Input CheckBox
    let taskName = document.createElement("div");
    taskName.classList.add("task-name");

    let input = document.createElement("input");
    input.type = "checkbox";
    let TaskTitle = document.createElement("h3");
    TaskTitle.innerText = title;

    // Adding Style to the Task depends on the input is Checked or not
    input.onclick = () => {
        TaskTitle.style.textDecoration = input.checked ? "line-through" : ""
    }

    taskName.append(input, TaskTitle)
    // Making Edit and Delete Buttons
    let buttons = document.createElement("div");
    let editButton = document.createElement("button")
    editButton.innerText = "Edit"
    editButton.classList.add("edit")
    editButton.addEventListener("click", () => edit(id, title))

    let deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.classList.add("delete")
    deleteButton.addEventListener("click", () => Delete(id, title))

    buttons.append(editButton, deleteButton)

    box.append(taskName, buttons)
    container.append(box)
}
// Save Tasks List to LocalStorage
function AddTasksListToLocalStorage(Tasks) {
    window.localStorage.setItem("Tasks", JSON.stringify(Tasks))
}

// Edit Task Function
function edit(id, title) {
    let task = Tasks.find((task) => task.id === id);
    let result = prompt(`Edit the Task from "${title}" to... `)
    if (result !== null) {
        task.title = result;
        Tasks = [...Tasks.filter((task) => task.id !== id), task]
        AddTasksListToLocalStorage(Tasks)
        container.innerHTML = ""
        getTasks()
        alert("Task Successfully Edited")
    } else {
        return;
    }


}

// Delete Task Function
function Delete(id, title) {
    let result = confirm(`Do You Want To Delete Task "${title}" ?`);
    if (result !== false) {
        Tasks = Tasks.filter((task) => task.id !== id)
        AddTasksListToLocalStorage(Tasks)
        container.innerHTML = ""
        getTasks()
        alert("Task Successfully Deleted")
    }
}

// Add Task Button Click Event
AddButton.addEventListener("click", CheckInput)

