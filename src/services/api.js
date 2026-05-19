const BASE_URL = "https://task-management-backend-lmax.onrender.com";

async function handleResponse(res) {
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || res.statusText);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ---- Todo ----
export async function fetchTodos() {
  return handleResponse(await fetch(`${BASE_URL}/todos`));
}
export async function createTodo(todo) {
  return handleResponse(await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  }));
}
export async function toggleTodo(id) {
  return handleResponse(await fetch(`${BASE_URL}/todos/${id}/toggle`, { method: "PUT" }));
}
export async function deleteTodo(id) {
  return handleResponse(await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" }));
}

// ---- Task ----
export async function fetchTasks() {
  return handleResponse(await fetch(`${BASE_URL}/tasks`));
}
export async function createTask(task) {
  return handleResponse(await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  }));
}
export async function updateTaskStatus(id, status) {
  return handleResponse(await fetch(`${BASE_URL}/tasks/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  }));
}
export async function addSolution(taskId, solution) {
  return handleResponse(await fetch(`${BASE_URL}/tasks/${taskId}/solutions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(solution)
  }));
}
export async function deleteTask(id) {
  return handleResponse(await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" }));
}

// ---- Note ----
export async function fetchNotes() {
  return handleResponse(await fetch(`${BASE_URL}/notes`));
}
export async function createNote(note) {
  return handleResponse(await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  }));
}
export async function updateNote(id, note) {
  return handleResponse(await fetch(`${BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  }));
}
export async function deleteNote(id) {
  return handleResponse(await fetch(`${BASE_URL}/notes/${id}`, { method: "DELETE" }));
}
export async function fetchNoteGroups() {
  return handleResponse(await fetch(`${BASE_URL}/notes/groups`));
}
export async function createNoteGroup(group) {
  return handleResponse(await fetch(`${BASE_URL}/notes/groups`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(group)
  }));
}
export async function deleteNoteGroup(id) {
  return handleResponse(await fetch(`${BASE_URL}/notes/groups/${id}`, { method: "DELETE" }));
}
