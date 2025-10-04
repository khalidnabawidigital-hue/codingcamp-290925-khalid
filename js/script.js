const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskList = document.getElementById("taskList");
const filterBtn = document.getElementById("filterBtn");

let todos = [];

function renderTodos(highlightDate = null) {
  taskList.innerHTML = "";

  if (todos.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4" style="text-align:center;">No task found</td></tr>`;
    return;
  }

  todos.forEach((todo, index) => {
    const row = document.createElement("tr");

    // tambahkan class highlight kalau tanggal sama dengan tanggal terdekat
    if (highlightDate && new Date(todo.date).getTime() === highlightDate.getTime()) {
      row.classList.add("highlight");
    }

    row.innerHTML = `
      <td>${todo.task}</td>
      <td>${todo.date}</td>
      <td>${todo.done ? "Done" : "Pending"}</td>
      <td>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;

    taskList.appendChild(row);
  });
}

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;

  if (task === "" || date === "") {
    alert("Please fill in both fields!");
    return;
  }

  todos.push({ task, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTodos();
});

deleteAllBtn.addEventListener("click", () => {
  todos = [];
  renderTodos();
});

function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}

filterBtn.addEventListener("click", () => {
  if (todos.length === 0) {
    renderTodos();
    return;
  }

  const today = new Date();
  let closest = null;

  todos.forEach(todo => {
    const todoDate = new Date(todo.date);
    if (todoDate >= today) {
      if (!closest || todoDate < closest) {
        closest = todoDate;
      }
    }
  });

  renderTodos(closest);
});

// First render
renderTodos();
