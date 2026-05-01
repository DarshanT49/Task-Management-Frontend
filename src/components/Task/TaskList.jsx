import TaskCard from './TaskCard';

const TaskList = ({ tasks, onTaskClick }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
        <p className="text-gray-500">No tasks found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onClick={onTaskClick} />
      ))}
    </div>
  );
};

export default TaskList;
