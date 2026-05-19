import { createContext, useContext, useState, useCallback, useRef } from "react";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    timers.current.delete(id);
  }, []);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      const timer = setTimeout(() => removeToast(id), duration);
      timers.current.set(id, timer);
    }
    return id;
  }, [removeToast]);

  const toast = useCallback({
    success: (msg, dur) => addToast(msg, "success", dur),
    error: (msg, dur) => addToast(msg, "error", dur),
    info: (msg, dur) => addToast(msg, "info", dur),
    warning: (msg, dur) => addToast(msg, "warning", dur),
  }, [addToast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto animate-slide-in-right max-w-sm w-full rounded-xl shadow-modal border p-4 flex items-start gap-3 bg-white"
            role="alert"
          >
            <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full mt-0.5 flex-shrink-0 ${
              t.type === "success" ? "bg-green-100 text-green-600" :
              t.type === "error" ? "bg-red-100 text-red-600" :
              t.type === "warning" ? "bg-yellow-100 text-yellow-600" :
              "bg-blue-100 text-blue-600"
            }`}>
              {t.type === "success" ? "✓" : t.type === "error" ? "✕" : t.type === "warning" ? "!" : "i"}
            </span>
            <p className="text-sm text-text-primary flex-1">{t.message}</p>
            <button onClick={() => removeToast(t.id)} className="text-text-tertiary hover:text-text-primary transition-colors">
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
