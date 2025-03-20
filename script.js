const inputbox = document.getElementById("input-box");
const listitems = document.getElementById("list-items");
const taskCounter = document.getElementById("task-counter"); // Counter for completed tasks

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    if (inputbox.value.trim() === '') {
        alert("No task added");
        return;
    }

    let taskText = inputbox.value.trim();
    let createdDate = new Date().toLocaleDateString();

    let li = createTaskElement(taskText, createdDate, false);

    listitems.appendChild(li);
    saveTasks();

    inputbox.value = "";
}

function createTaskElement(taskText, createdDate, isCompleted) {
    let li = document.createElement("li");
    if (isCompleted) li.classList.add("checked");

    let taskContent = document.createElement("span");
    taskContent.classList.add("task-content");
    taskContent.textContent = taskText;

    let taskDate = document.createElement("span");
    taskDate.classList.add("task-date");
    taskDate.textContent = `(${createdDate})`;

    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function () {
        editTask(li);
    };

    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Close";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        li.remove();
        saveTasks();
    };

    li.appendChild(taskContent);
    li.appendChild(taskDate);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    return li;
}

function editTask(li) {
    let newText = prompt("Edit your task:", li.querySelector(".task-content").textContent);
    if (newText !== null && newText.trim() !== "") {
        li.querySelector(".task-content").textContent = newText;
        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#list-items li").forEach(li => {
        let taskText = li.querySelector(".task-content").textContent;
        let taskDate = li.querySelector(".task-date").textContent;
        let isCompleted = li.classList.contains("checked");
        tasks.push({ text: taskText, date: taskDate, completed: isCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskCounter();
}

function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => {
        let li = createTaskElement(task.text, task.date.replace(/[()]/g, ""), task.completed);
        listitems.appendChild(li);
    });
    updateTaskCounter();
}

function updateTaskCounter() {
    let completedTasks = document.querySelectorAll("#list-items li.checked").length;
    taskCounter.textContent = `Completed Tasks: ${completedTasks}`;
}

listitems.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    }
}, false);
