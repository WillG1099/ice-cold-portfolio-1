console.log("SCRIPT VERSION CHECK — PORT 5000");


console.log("TaskPro frontend loaded");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// GET all tasks
async function fetchTasks() {
  try {
    const res = await fetch("http://127.0.0.1:5000/tasks/all");
    const tasks = await res.json();

    taskList.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.title;
      taskList.appendChild(li);
    });

  } catch (err) {
    console.error("Error fetching tasks:", err);
  }
}

async function createTask(title) {
  try {
    await fetch("http://127.0.0.1:5000/tasks/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });

    fetchTasks(); // refresh list after adding

  } catch (err) {
    console.error("Error creating task:", err);
  }
}



// Handle form submit
taskForm.addEventListener("submit", event => {
  event.preventDefault();

  const title = taskInput.value.trim();
  if (!title) return;

  createTask(title);
  taskInput.value = "";
});

// Load tasks on page load
fetchTasks();
