import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-100 py-4 mb-8 sticky top-0 z-10 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
          LearningTracker
        </Link>
        <div className="flex gap-4">
          <Link to="/" className="text-gray-600 hover:text-blue-500 font-medium">Dashboard</Link>
          <Link to="/todos" className="text-gray-600 hover:text-blue-500 font-medium">Todos</Link>
          <Link to="/notes" className="text-gray-600 hover:text-blue-500 font-medium">Notes</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
