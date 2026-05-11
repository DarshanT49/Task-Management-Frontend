import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import Button from '../components/common/Button';
import SolutionForm from '../components/Solution/SolutionForm';
import SolutionCard from '../components/Solution/SolutionCard';
import { ArrowLeft, CheckCircle2, Circle, Plus, Archive, ChevronRight, LayoutGrid } from 'lucide-react';

const TaskDetail = ({ tasks, addSolution, toggleTaskStatus, convertTaskToNote }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 text-gray-300">
            <LayoutGrid size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Task not found</h2>
          <Button onClick={() => navigate('/')} className="mt-4 shadow-lg shadow-blue-100">Back to Dashboard</Button>
        </div>
      </Container>
    );
  }

  const handleConvertToNote = () => {
    convertTaskToNote(task);
    navigate('/notes');
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className="bg-white min-h-screen pb-10">
      {/* Premium Task Header */}
      <div className="bg-gray-50/30 border-b border-gray-100">
        <Container>
          <div className="py-2">
            <nav className="flex items-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              <button onClick={() => navigate('/')} className="hover:text-blue-500 transition-colors">Dashboard</button>
              <ChevronRight size={8} />
              <span className="text-gray-900">Task</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`${isCompleted ? 'text-green-500' : 'text-blue-500'}`}>
                    {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} className="animate-pulse" />}
                  </div>
                  <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight truncate">{task.title}</h1>
                </div>
                <p className="text-xs text-gray-500 max-w-3xl leading-tight font-medium pl-7">
                  {task.description || "No description provided."}
                </p>
              </div>

              <div className="flex items-center gap-2 pl-7 md:pl-0">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
                    isCompleted 
                      ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isCompleted ? 'Completed' : 'Mark Complete'}
                </button>

                {isCompleted && !showArchiveConfirm && (
                  <button
                    onClick={() => setShowArchiveConfirm(true)}
                    className="p-1.5 bg-gray-100 text-gray-400 hover:bg-gray-900 hover:text-white rounded-lg transition-all"
                    title="Convert to Note"
                  >
                    <Archive size={16} />
                  </button>
                )}

                {isCompleted && showArchiveConfirm && (
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-0.5 shadow-sm">
                    <span className="text-[9px] font-bold text-gray-400 uppercase px-1.5 text-nowrap">Archive?</span>
                    <button onClick={handleConvertToNote} className="px-2 py-0.5 bg-gray-900 text-white text-[9px] font-bold rounded hover:bg-gray-800 uppercase">Yes</button>
                    <button onClick={() => setShowArchiveConfirm(false)} className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[9px] font-bold rounded hover:bg-gray-100 uppercase">No</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Solutions Section */}
      <Container className="mt-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
            <div>
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                Solution Log <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md">{task.solutions?.length || 0}</span>
              </h2>
            </div>
            {!showSolutionForm && (
              <button 
                onClick={() => setShowSolutionForm(true)} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-all active:scale-95"
              >
                <Plus size={14} /> New Entry
              </button>
            )}
          </div>

          {showSolutionForm && (
            <div className="mb-6">
              <SolutionForm
                onSubmit={(solution) => {
                  addSolution(task.id, solution);
                  setShowSolutionForm(false);
                }}
                onCancel={() => setShowSolutionForm(false)}
              />
            </div>
          )}

          <div className="space-y-3">
            {task.solutions && task.solutions.length > 0 ? (
              task.solutions.map((solution) => (
                <SolutionCard key={solution.id} solution={solution} />
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50/30 rounded-2xl border-2 border-dashed border-gray-50 flex flex-col items-center">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-2 text-gray-200 shadow-sm border border-gray-50">
                  <CheckCircle2 size={20} />
                </div>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-[9px]">No solutions yet</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TaskDetail;
