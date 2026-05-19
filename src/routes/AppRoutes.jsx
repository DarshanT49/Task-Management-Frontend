import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import TaskDetail from '../pages/TaskDetail';
import Todo from '../pages/Todo';
import Notes from '../pages/Notes';
import Login from '../pages/Login';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = ({ 
  tasks, todos, notes, groups, loading,
  addTask, addTodo, addNote, updateNote, addSolution, 
  toggleTaskStatus, toggleTodo, deleteTodo, convertTodoToTask, 
  deleteNote, convertTaskToNote, addGroup, deleteGroup, updateNoteGroup 
}) => {
  const navigate = useNavigate();

  const handleTaskClick = (id) => {
    navigate(`/task/${id}`);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard
              tasks={tasks}
              loading={loading}
              addTask={addTask}
              onTaskClick={handleTaskClick}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Dashboard
              tasks={tasks}
              loading={loading}
              addTask={addTask}
              onTaskClick={handleTaskClick}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/todos"
        element={
          <ProtectedRoute>
            <Todo
              todos={todos}
              addTodo={addTodo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              convertTodoToTask={convertTodoToTask}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notes"
        element={
          <ProtectedRoute>
            <Notes
              notes={notes}
              groups={groups}
              addNote={addNote}
              updateNote={updateNote}
              deleteNote={deleteNote}
              convertTaskToNote={convertTaskToNote}
              addGroup={addGroup}
              deleteGroup={deleteGroup}
              updateNoteGroup={updateNoteGroup}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <TaskDetail
              tasks={tasks}
              addSolution={addSolution}
              toggleTaskStatus={toggleTaskStatus}
              convertTaskToNote={convertTaskToNote}
            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
