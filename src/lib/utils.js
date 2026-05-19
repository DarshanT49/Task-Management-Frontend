import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

export function formatDateFull(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function truncate(str, len = 80) {
  if (!str) return "";
  return str.length > len ? str.slice(0, len) + "…" : str;
}

export function getStatusColor(status) {
  switch (status?.toLowerCase()) {
    case "completed":
      return { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" };
    case "in progress":
      return { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" };
    case "pending":
      return { bg: "bg-yellow-50", text: "text-yellow-700", dot: "bg-yellow-500" };
    default:
      return { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };
  }
}
