import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

export default function Modal({ open, onClose, title, children, className = "" }) {
  const overlayRef = useRef();

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm animate-fade-in"
      onClick={(e) => e.target === overlayRef.current && onClose?.()}
    >
      <div className={cn(
        "bg-white rounded-2xl shadow-heavy w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up",
        className
      )}>
        {title && (
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            <h2 className="text-lg font-bold text-text-primary">{title}</h2>
            <button onClick={onClose} className="p-1.5 text-text-tertiary hover:text-text-primary rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
