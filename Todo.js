const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("task-list");
const deleteallBtn = document.getElementById("deleteallBtn");
const taskDate = document.getElementById("taskDate");


addBtn.addEventListener("click", function () {
  const taskValue = taskInput.value.trim();
  const dateValue = taskDate.value;

  if (taskValue === '') {
    alert("Please write a task before adding");
    return;
  }

  const fullTask = dateValue
    ? `${taskValue} (🗓 ${dateValue})`
    : taskValue;

  createTask(fullTask);       
  saveToLocal(fullTask);

  taskInput.value = ""; 
  taskDate.value = "";  
});

deleteallBtn.addEventListener("click", function () {
  taskList.innerHTML = '';
  localStorage.removeItem("tasks");
});

window.addEventListener("DOMContentLoaded", function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function(taskValue) {
    createTask(taskValue);
  });

  // 🌗 Load mode from localStorage if saved
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    modeToggle.textContent = "☀️ Light Mode";
  }
});

// ✅ Toggle Dark/Light Mode
modeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    modeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark"); // save mode
  } else {
    modeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light"); // save mode
  }
});

function createTask(taskValue) {
  const newTask = document.createElement("div");
  newTask.textContent = `• ${taskValue}`;
  newTask.classList.add("task-item");

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.classList.add("done-btn");

  doneBtn.addEventListener("click", function () {
    newTask.classList.toggle("done");
  });

  newTask.appendChild(doneBtn);
  taskList.appendChild(newTask);
}

function saveToLocal(taskValue) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskValue);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
