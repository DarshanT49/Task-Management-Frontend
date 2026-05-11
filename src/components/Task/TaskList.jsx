import TaskCard from './TaskCard';
import { ClipboardList } from 'lucide-react';

const TaskList = ({ tasks, onTaskClick }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-gray-300">
          <ClipboardList size={32} />
        </div>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Your workspace is clear</p>
        <p className="text-gray-400 text-xs mt-1">Start by adding your first learning task.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </div>
  );
};

export default TaskList;
