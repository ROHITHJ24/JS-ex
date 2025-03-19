const inputbox = document.getElementById("input-box");
const listitems = document.getElementById("list-items");

// Load tasks from Local Storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    if (inputbox.value.trim() === '') {
        alert("No task added");
        return;
    }

    let taskText = inputbox.value.trim();
    let li = createTaskElement(taskText);

    listitems.appendChild(li);
    saveTasks();

    inputbox.value = "";
}


function createTaskElement(taskText) {
    let li = document.createElement("li");
    li.textContent = taskText;

    // Edit Buttongit
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function () {
        editTask(li);
    };

    // Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Close";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

// Function to Edit a Task
function editTask(li) {
    let newText = prompt("Edit your task:", li.firstChild.textContent);
    if (newText !== null && newText.trim() !== "") {
        li.firstChild.textContent = newText;
        saveTasks();
    }
}


function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#list-items li").forEach(li => {
        tasks.push(li.firstChild.textContent);
        
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to Load Tasks from Local Storage
function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(taskText => {
        let li = createTaskElement(taskText);
        listitems.appendChild(li);
    });
}

// Event listener for marking tasks as completed
listitems.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }
}, false);
