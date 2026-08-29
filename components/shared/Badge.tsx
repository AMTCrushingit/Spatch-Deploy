"use client";
import { useTheme } from "@/lib/theme";

interface BadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, { bg: string; color: string }> = {
  open:     { bg: "#2ECC7118", color: "#2ECC71" },
  matched:  { bg: "#FFB34718", color: "#E6900A" },
  closed:   { bg: "#88888818", color: "#888888" },
  approved: { bg: "#2ECC7118", color: "#2ECC71" },
  pending:  { bg: "#FFB34718", color: "#E6900A" },
  rejected: { bg: "#E6394618", color: "#E63946" },
  sent:     { bg: "#0ABFBC18", color: "#0ABFBC" },
  accepted: { bg: "#2ECC7118", color: "#2ECC71" },
};

export default function Badge({ status, className }: BadgeProps) {
  const style = statusStyles[status] ?? { bg: "#88888818", color: "#888888" };
  return (
    <span className={className} style={{
      display: "inline-flex", alignItems: "center",
      padding: "0.2rem 0.65rem", borderRadius: "999px",
      fontSize: "0.75rem", fontWeight: 600,
      background: style.bg, color: style.color,
      textTransform: "capitalize",
    }}>
      {status}
    </span>
  );
}