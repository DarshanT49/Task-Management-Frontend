import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useToast } from "./context/ToastContext";
import * as api from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksData, todosData, notesData, groupsData] = await Promise.all([
        api.fetchTasks(),
        api.fetchTodos(),
        api.fetchNotes(),
        api.fetchNoteGroups(),
      ]);
      setTasks(tasksData || []);
      setTodos(todosData || []);
      setNotes(notesData || []);
      setGroups(groupsData || []);
    } catch (error) {
      toast.error("Failed to load data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask) => {
    try {
      const createdTask = await api.createTask(newTask);
      setTasks((prev) => [...prev, createdTask]);
      toast.success("Task created!");
    } catch (error) {
      toast.error("Failed to create task.");
    }
  };

  const addSolution = async (taskId, solution) => {
    try {
      const updatedTask = await api.addSolution(taskId, solution);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
    } catch (error) {
      toast.error("Failed to add solution.");
    }
  };

  const toggleTaskStatus = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const newStatus = task.status === "completed" ? "In Progress" : "completed";
      const updatedTask = await api.updateTaskStatus(taskId, newStatus);
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updatedTask : t)));
      toast.success(newStatus === "completed" ? "Task completed!" : "Task reopened");
    } catch (error) {
      toast.error("Failed to update task status.");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const createdTodo = await api.createTodo(newTodo);
      setTodos((prev) => [...prev, createdTodo]);
      toast.success("Todo added!");
    } catch (error) {
      toast.error("Failed to create todo.");
    }
  };

  const toggleTodo = async (todoId) => {
    try {
      const updatedTodo = await api.toggleTodo(todoId);
      setTodos((prev) => prev.map((t) => (t.id === todoId ? updatedTodo : t)));
    } catch (error) {
      toast.error("Failed to toggle todo.");
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await api.deleteTodo(todoId);
      setTodos((prev) => prev.filter((t) => t.id !== todoId));
      toast.success("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo.");
    }
  };

  const convertTodoToTask = async (todo) => {
    await addTask({
      title: todo.text,
      description: "",
      status: "In Progress",
      solutions: [],
    });
    await deleteTodo(todo.id);
    toast.success("Todo converted to task!");
  };

  const addNote = async (newNote) => {
    try {
      const createdNote = await api.createNote(newNote);
      setNotes((prev) => [...prev, createdNote]);
      return createdNote;
    } catch (error) {
      toast.error("Failed to create note.");
    }
  };

  const updateNote = async (updatedNote) => {
    try {
      const result = await api.updateNote(updatedNote.id, updatedNote);
      setNotes((prev) => prev.map((n) => (n.id === updatedNote.id ? result : n)));
      toast.success("Note saved");
    } catch (error) {
      toast.error("Failed to update note.");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await api.deleteNote(noteId);
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      toast.success("Note deleted");
    } catch (error) {
      toast.error("Failed to delete note.");
    }
  };

  const addGroup = async (name) => {
    try {
      const newGroup = await api.createNoteGroup({ name });
      setGroups((prev) => [...prev, newGroup]);
      toast.success("Group created");
    } catch (error) {
      toast.error("Failed to create group.");
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      await api.deleteNoteGroup(groupId);
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
      setNotes((prev) =>
        prev.map((note) => (note.groupId === groupId ? { ...note, groupId: null } : note))
      );
      toast.success("Group deleted");
    } catch (error) {
      toast.error("Failed to delete group.");
    }
  };

  const updateNoteGroup = (noteId, groupId) => {
    setNotes((prev) => prev.map((note) => (note.id === noteId ? { ...note, groupId } : note)));
  };

  const convertTaskToNote = async (task) => {
    const newNote = {
      title: task.title,
      content: task.description || "",
      category: "Task Archive",
      tags: ["task", "completed"],
      createdAt: new Date().toISOString(),
      groupId: null,
    };
    await addNote(newNote);
    await deleteTask(task.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 sm:pb-0">
      <Navbar />
      <main className="pt-2">
        <AppRoutes
          tasks={tasks}
          todos={todos}
          notes={notes}
          groups={groups}
          loading={loading}
          addTask={addTask}
          addTodo={addTodo}
          addNote={addNote}
          updateNote={updateNote}
          addSolution={addSolution}
          toggleTaskStatus={toggleTaskStatus}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          convertTodoToTask={convertTodoToTask}
          deleteNote={deleteNote}
          convertTaskToNote={convertTaskToNote}
          addGroup={addGroup}
          deleteGroup={deleteGroup}
          updateNoteGroup={updateNoteGroup}
        />
      </main>
    </div>
  );
}
