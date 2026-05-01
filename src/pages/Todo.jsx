import { useState } from 'react';
import TodoList from '../components/Todo/TodoList';
import TodoForm from '../components/Todo/TodoForm';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import { Plus, ListTodo } from 'lucide-react';

const Todo = ({ todos, addTodo, toggleTodo, deleteTodo, convertTodoToTask }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <ListTodo className="text-blue-500" /> My Todo List
          </h1>
          <p className="text-gray-500 mt-1">Plan your tasks and convert them to learning tasks when ready.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus size={20} /> Add Todo
          </Button>
        )}
      </div>

      {showForm && (
        <TodoForm
          onSubmit={(newTodo) => {
            addTodo(newTodo);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="mt-8">
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onConvertToTask={convertTodoToTask}
        />
      </div>
    </Container>
  );
};

export default Todo;
