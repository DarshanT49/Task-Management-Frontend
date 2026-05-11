import Card from '../common/Card';
import { CheckCircle2, Circle, MessageSquare, ArrowUpRight } from 'lucide-react';

const TaskCard = ({ task, onClick }) => {
  const isCompleted = task.status === 'completed';

  return (
    <Card 
      onClick={() => onClick(task.id)} 
      className="group hover:border-blue-300 transition-all duration-300 p-4 border-gray-100 shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden"
    >
      <div className="flex items-start gap-3">
        {/* Status Icon */}
        <div className={`mt-1 flex-shrink-0 ${isCompleted ? 'text-green-500' : 'text-blue-500'}`}>
          {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} className="animate-pulse" />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className={`text-sm font-bold truncate leading-tight transition-colors ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 group-hover:text-blue-600'}`}>
              {task.title}
            </h3>
            <ArrowUpRight size={14} className="text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          
          <p className="text-xs text-gray-500 line-clamp-1 mt-1 font-medium">
            {task.description || "No description provided."}
          </p>

          <div className="mt-3 flex items-center gap-4">
            {/* Status Tag */}
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
              isCompleted ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
            }`}>
              {task.status || 'In Progress'}
            </span>

            {/* Solutions Count */}
            <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <MessageSquare size={12} className="text-gray-300" />
              {task.solutions?.length || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Accent Border */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${isCompleted ? 'bg-green-400' : 'bg-blue-400'}`} />
    </Card>
  );
};

export default TaskCard;
