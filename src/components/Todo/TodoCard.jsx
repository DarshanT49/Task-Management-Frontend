import Card from '../common/Card';
import { Trash2, CheckCircle, Circle, ArrowRight } from 'lucide-react';

const TodoCard = ({ todo, onToggle, onDelete, onConvertToTask }) => {
  return (
    <Card
      className={`hover:shadow-md transition-all duration-200 ${
        todo.completed ? 'opacity-60 bg-gray-50' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 flex-shrink-0 transition-colors ${
            todo.completed ? 'text-green-500' : 'text-gray-300 hover:text-blue-500'
          }`}
        >
          {todo.completed ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`text-base font-medium transition-all ${
              todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {!todo.completed && onConvertToTask && (
            <button
              onClick={() => onConvertToTask(todo)}
              title="Convert to Task"
              className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowRight size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TodoCard;
