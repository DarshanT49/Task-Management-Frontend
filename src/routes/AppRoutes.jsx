import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import TaskDetail from '../pages/TaskDetail';
import Todo from '../pages/Todo';
import Notes from '../pages/Notes';

const AppRoutes = ({ tasks, todos, notes, addTask, addTodo, addNote, addSolution, toggleTaskStatus, toggleTodo, deleteTodo, convertTodoToTask, deleteNote, convertTaskToNote }) => {
  const navigate = useNavigate();

  const handleTaskClick = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            tasks={tasks}
            addTask={addTask}
            onTaskClick={handleTaskClick}
          />
        }
      />
      <Route
        path="/tasks"
        element={
          <Dashboard
            tasks={tasks}
            addTask={addTask}
            onTaskClick={handleTaskClick}
          />
        }
      />
      <Route
        path="/todos"
        element={
          <Todo
            todos={todos}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            convertTodoToTask={convertTodoToTask}
          />
        }
      />
      <Route
        path="/notes"
        element={
          <Notes
            notes={notes}
            addNote={addNote}
            deleteNote={deleteNote}
            convertTaskToNote={convertTaskToNote}
          />
        }
      />
      <Route
        path="/task/:id"
        element={
          <TaskDetail
            tasks={tasks}
            addSolution={addSolution}
            toggleTaskStatus={toggleTaskStatus}
            convertTaskToNote={convertTaskToNote}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
