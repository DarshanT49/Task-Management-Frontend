import { useState } from 'react';
import TaskList from '../components/Task/TaskList';
import TaskForm from '../components/Task/TaskForm';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import { Plus, LayoutGrid } from 'lucide-react';

const Dashboard = ({ tasks, addTask, onTaskClick }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Container>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            <LayoutGrid className="text-blue-500" /> My Learning Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Track your progress and key takeaways from each task.</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus size={20} /> Add Task
          </Button>
        )}
      </div>

      {showForm && (
        <TaskForm 
          onSubmit={(newTask) => {
            addTask(newTask);
            setShowForm(false);
          }} 
          onCancel={() => setShowForm(false)} 
        />
      )}

      <div className="mt-8">
        <TaskList tasks={tasks} onTaskClick={onTaskClick} />
      </div>
    </Container>
  );
};

export default Dashboard;
