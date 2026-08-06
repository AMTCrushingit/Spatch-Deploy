import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "TT$") {
  return `${currency}${amount.toLocaleString()}`;
}

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-TT", {
    year: "numeric", month: "short", day: "numeric",
  });
}

export function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export function statusColor(status: string) {
  const map: Record<string, string> = {
    open: "bg-green-100 text-green-700",
    matched: "bg-amber-100 text-amber-700",
    closed: "bg-gray-100 text-gray-500",
    approved: "bg-green-100 text-green-700",
    pending: "bg-amber-100 text-amber-700",
    rejected: "bg-red-100 text-red-600",
    sent: "bg-blue-100 text-blue-700",
    accepted: "bg-green-100 text-green-700",
  };
  return map[status] ?? "bg-gray-100 text-gray-600";
}

export function ratingStars(rating: number) {
  return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
}