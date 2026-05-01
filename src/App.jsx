import { useState } from 'react';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';

const MOCK_DATA = [
  {
    id: '1',
    title: 'Learn React useEffect',
    description: 'Master the useEffect hook and its various dependency array configurations.',
    status: 'completed',
    solutions: [
      {
        id: 's1',
        summary: 'Understood basic lifecycle',
        createdAt: '2024-04-20T10:00:00Z',
        fields: [
          { name: 'link', value: 'https://react.dev/reference/react/useEffect' },
          { name: 'notes', value: 'useEffect runs after every render by default, but we can control it with dependencies.' }
        ]
      },
      {
        id: 's2',
        summary: 'Cleanup function importance',
        createdAt: '2024-04-21T14:30:00Z',
        fields: [
          { name: 'YouTube', value: 'https://www.youtube.com/watch?v=0ZJgIjIuY7U' },
          { name: 'image', value: 'https://raw.githubusercontent.com/facebook/react/main/fixtures/dom/public/react-logo.png' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Tailwind CSS Grid & Flexbox',
    description: 'Build responsive layouts using Tailwind utility classes.',
    status: 'In Progress',
    solutions: []
  }
];

function App() {
  const [tasks, setTasks] = useState(MOCK_DATA);
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now().toString(),
    };
    setTasks([...tasks, taskWithId]);
  };

  const addSolution = (taskId, solution) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId 
        ? { ...task, solutions: [solution, ...task.solutions] }
        : task
    ));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'In Progress' : 'completed' }
        : task
    ));
  };

  // Todo list functions
  const addTodo = (newTodo) => {
    const todoWithId = {
      ...newTodo,
      id: Date.now().toString(),
    };
    setTodos([...todos, todoWithId]);
  };

  const toggleTodo = (todoId) => {
    setTodos(prevTodos => prevTodos.map(todo =>
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (todoId) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
  };

  const convertTodoToTask = (todo) => {
    const newTask = {
      title: todo.text,
      description: '',
      status: 'In Progress',
      solutions: []
    };
    addTask(newTask);
    deleteTodo(todo.id);
  };

  // Note list functions
  const addNote = (newNote) => {
    const noteWithId = {
      ...newNote,
      id: Date.now().toString(),
    };
    setNotes([...notes, noteWithId]);
  };

  const deleteNote = (noteId) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
  };

  const convertTaskToNote = (task) => {
    const newNote = {
      title: task.title,
      content: task.description || '',
      category: 'Task Archive',
      tags: ['task', 'completed'],
      createdAt: new Date().toISOString()
    };
    addNote(newNote);
    setTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Navbar />
      <AppRoutes
        tasks={tasks}
        todos={todos}
        notes={notes}
        addTask={addTask}
        addTodo={addTodo}
        addNote={addNote}
        addSolution={addSolution}
        toggleTaskStatus={toggleTaskStatus}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        convertTodoToTask={convertTodoToTask}
        deleteNote={deleteNote}
        convertTaskToNote={convertTaskToNote}
      />
    </div>
  );
}

export default App;
