import Card from '../common/Card';
import { ExternalLink } from 'lucide-react';

const SolutionCard = ({ solution }) => {
  const isUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const isImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/) != null;
  };

  return (
    <Card className="mb-4 hover:border-blue-200">
      <div className="flex justify-between items-start mb-4">
        <h4 className="font-semibold text-gray-800 text-lg leading-tight">{solution.summary}</h4>
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded">
          {new Date(solution.createdAt).toLocaleDateString()}
        </span>
      </div>

      {solution.fields && solution.fields.length > 0 && (
        <div className="space-y-4 pt-2 border-t border-gray-50">
          {solution.fields.map((field, index) => (
            <div key={index} className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">{field.name}</span>
              <div className="text-sm text-gray-700">
                {isImageUrl(field.value) ? (
                  <div className="mt-1 rounded-lg overflow-hidden border border-gray-100 max-w-sm">
                    <img src={field.value} alt={field.name} className="w-full h-auto object-cover max-h-60" />
                  </div>
                ) : isUrl(field.value) ? (
                  <a 
                    href={field.value} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:text-blue-600 hover:underline font-medium"
                  >
                    {field.value} <ExternalLink size={12} />
                  </a>
                ) : (
                  <p className="bg-gray-50/50 p-2 rounded-md border border-gray-100/50 italic">{field.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default SolutionCard;
