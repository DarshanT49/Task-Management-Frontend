import Card from '../common/Card';

const TaskCard = ({ task, onClick }) => {
  return (
    <Card onClick={() => onClick(task.id)} className="h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{task.description || "No description provided."}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
        }`}>
          {task.status || 'In Progress'}
        </span>
        <span className="text-xs text-gray-400">
          {task.solutions?.length || 0} Solutions
        </span>
      </div>
    </Card>
  );
};

export default TaskCard;
