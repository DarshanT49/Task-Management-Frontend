import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { LayoutGrid, ListTodo, StickyNote, Search, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutGrid },
  { path: "/todos", label: "Todos", icon: ListTodo },
  { path: "/notes", label: "Notes", icon: StickyNote },
];

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (!isAuthenticated) return null;

  if (isMobile) {
    return (
      <>
        {/* Bottom Navigation for Mobile */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border/60 shadow-heavy safe-area-bottom">
          <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] px-3 py-1 rounded-xl transition-all duration-200",
                    active
                      ? "text-primary-600 bg-primary-50"
                      : "text-text-tertiary hover:text-text-secondary hover:bg-gray-50"
                  )}
                >
                  <Icon size={20} className={active ? "stroke-[2.5]" : "stroke-[1.5]"} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] px-3 py-1 rounded-xl text-text-tertiary hover:text-danger hover:bg-red-50 transition-all duration-200"
            >
              <LogOut size={20} className="stroke-[1.5]" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Logout</span>
            </button>
          </div>
        </nav>
        {/* Spacer for content so it's not hidden behind bottom nav */}
        <div className="h-16" />
      </>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border/60">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-lg font-extrabold text-primary-600 tracking-tight flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center text-sm font-black">L</span>
          LearningTracker
        </Link>
        <div className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const active = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                  active
                    ? "bg-primary-50 text-primary-700"
                    : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="ml-2 p-2 rounded-lg text-text-tertiary hover:text-danger hover:bg-red-50 transition-all duration-200"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
