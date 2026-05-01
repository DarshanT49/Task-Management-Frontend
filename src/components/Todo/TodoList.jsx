import TodoCard from './TodoCard';

const TodoList = ({ todos, onToggle, onDelete, onConvertToTask }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No todos found. Add one to get started!</p>
      </div>
    );
  }

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500 font-medium">
          {completedCount} of {totalCount} completed
        </span>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onConvertToTask={onConvertToTask}
          />
        ))}
      </div>

      {completedCount > 0 && completedCount === totalCount && (
        <div className="text-center py-4 bg-green-50 rounded-lg">
          <p className="text-green-700 font-medium">All tasks completed! Great job!</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
