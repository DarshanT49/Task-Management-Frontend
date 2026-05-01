import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import SolutionForm from '../components/Solution/SolutionForm';
import SolutionCard from '../components/Solution/SolutionCard';
import { ArrowLeft, CheckCircle, Clock, Plus, Archive } from 'lucide-react';

const TaskDetail = ({ tasks, addSolution, toggleTaskStatus, convertTaskToNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <Container>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800">Task not found</h2>
          <Button onClick={() => navigate('/')} className="mt-4">Back to Dashboard</Button>
        </div>
      </Container>
    );
  }

  const handleConvertToNote = () => {
    convertTaskToNote(task);
    navigate('/notes');
  };

  return (
    <Container className="pb-20">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-500 mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
             <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {task.status === 'completed' ? <CheckCircle size={14} /> : <Clock size={14} />}
              {task.status}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{task.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl">{task.description || "No description provided."}</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={task.status === 'completed' ? 'secondary' : 'outline'}
            onClick={() => toggleTaskStatus(task.id)}
            className="whitespace-nowrap"
          >
            Mark as {task.status === 'completed' ? 'In Progress' : 'Completed'}
          </Button>

          {task.status === 'completed' && !showArchiveConfirm && (
            <Button
              variant="secondary"
              onClick={() => setShowArchiveConfirm(true)}
              title="Convert to Note"
            >
              <Archive size={18} />
            </Button>
          )}

          {task.status === 'completed' && showArchiveConfirm && (
            <div className="flex items-center gap-2 bg-white border rounded-lg p-2">
              <span className="text-xs text-gray-600">Archive to Notes?</span>
              <Button
                variant="primary"
                onClick={handleConvertToNote}
                className="text-xs px-3 py-1"
              >
                Yes
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowArchiveConfirm(false)}
                className="text-xs px-3 py-1"
              >
                No
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-gray-800">Solutions & Learning</h2>
          {!showSolutionForm && (
            <Button onClick={() => setShowSolutionForm(true)} className="flex items-center gap-2">
              <Plus size={18} /> Add Solution
            </Button>
          )}
        </div>

        {showSolutionForm && (
          <SolutionForm
            onSubmit={(solution) => {
              addSolution(task.id, solution);
              setShowSolutionForm(false);
            }}
            onCancel={() => setShowSolutionForm(false)}
          />
        )}

        <div className="grid grid-cols-1 gap-4">
          {task.solutions && task.solutions.length > 0 ? (
            task.solutions.map((solution) => (
              <SolutionCard key={solution.id} solution={solution} />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-400">No solutions added yet. What did you learn while working on this?</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default TaskDetail;
