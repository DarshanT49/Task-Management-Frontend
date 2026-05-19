import { motion } from "framer-motion";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { ExternalLink, Calendar, FileText } from "lucide-react";
import { formatDate, cn } from "../../lib/utils";

export default function SolutionCard({ solution }) {
  const isUrl = (string) => {
    try {
      if (!string.startsWith("http")) return false;
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const isImageUrl = (url) => url.match(/\.(jpeg|jpg|gif|png|webp|svg)(\?.*)?$/i);

  return (
    <Card padding="md" hover className="border-l-[3px] border-l-primary-500">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="text-sm font-bold text-text-primary leading-tight group-hover:text-primary-600 transition-colors">
          {solution.summary}
        </h4>
        <Badge variant="default" size="sm" className="whitespace-nowrap flex-shrink-0">
          <Calendar size={10} />
          <span>{formatDate(solution.createdAt)}</span>
        </Badge>
      </div>

      {solution.fields && solution.fields.length > 0 && (
        <div className="space-y-3 border-t border-border/60 pt-3 mt-3">
          {solution.fields.map((field, index) => (
            <div key={index}>
              <div className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest mb-1 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-primary-400" />
                {field.name}
              </div>
              <div className="text-sm">
                {isImageUrl(field.value) ? (
                  <div className="mt-1 rounded-xl overflow-hidden border border-border/60 shadow-soft">
                    <img src={field.value} alt={field.name} className="w-full h-auto object-cover max-h-72" />
                  </div>
                ) : isUrl(field.value) ? (
                  <a
                    href={field.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 hover:underline font-bold transition-all bg-primary-50/50 px-2 py-1 rounded-lg border border-primary-100/50"
                  >
                    {field.value.replace(/^https?:\/\//, "")} <ExternalLink size={12} />
                  </a>
                ) : (
                  <div className="bg-surface-subtle/80 p-3 rounded-xl border border-border/50 flex items-start gap-3">
                    <FileText size={14} className="text-text-tertiary mt-0.5" />
                    <p className="italic leading-relaxed flex-1 text-text-secondary">{field.value}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
