import Card from '../common/Card';
import { ExternalLink, Calendar, Hash, FileText, Image as ImageIcon } from 'lucide-react';

const SolutionCard = ({ solution }) => {
  const isUrl = (string) => {
    try {
      if (!string.startsWith('http')) return false;
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const isImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) != null;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden border-l-4 border-l-blue-500">
      <div className="p-5">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
              {solution.summary}
            </h4>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md whitespace-nowrap">
            <Calendar size={12} className="text-gray-300" />
            {formatDate(solution.createdAt)}
          </div>
        </div>

        {solution.fields && solution.fields.length > 0 && (
          <div className="space-y-4 border-t border-gray-50 pt-4 mt-4">
            {solution.fields.map((field, index) => (
              <div key={index} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  <Hash size={10} /> {field.name}
                </div>
                
                <div className="text-sm text-gray-700">
                  {isImageUrl(field.value) ? (
                    <div className="mt-1 rounded-xl overflow-hidden border border-gray-100 max-w-md shadow-sm group-hover:shadow-md transition-shadow">
                      <img src={field.value} alt={field.name} className="w-full h-auto object-cover max-h-72" />
                    </div>
                  ) : isUrl(field.value) ? (
                    <a 
                      href={field.value} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 hover:underline font-bold transition-all bg-blue-50/50 px-2 py-1 rounded-lg border border-blue-100/50"
                    >
                      {field.value.replace(/^https?:\/\//, '')} <ExternalLink size={12} />
                    </a>
                  ) : (
                    <div className="bg-gray-50/80 p-3 rounded-xl border border-gray-100/50 flex items-start gap-3">
                      <FileText size={14} className="text-gray-300 mt-0.5" />
                      <p className="italic leading-relaxed flex-1">{field.value}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolutionCard;
