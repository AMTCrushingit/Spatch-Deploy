"use client";
import { useTheme, colors } from "@/lib/theme";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: string;
}

export default function StatCard({ label, value, icon, trend, color = "#FF6B4A" }: StatCardProps) {
  const { theme } = useTheme();
  const c = colors;
  return (
    <div style={{
      background: c.bgCard(theme), border: `1px solid ${c.border(theme)}`,
      borderRadius: "1rem", padding: "1.25rem", boxShadow: c.shadow(theme),
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), fontWeight: 500 }}>{label}</p>
          <p style={{ fontSize: "2rem", fontWeight: 800, color: c.text(theme), marginTop: "0.25rem", lineHeight: 1 }}>{value}</p>
          {trend && <p style={{ fontSize: "0.8rem", color: c.green, marginTop: "0.3rem" }}>{trend}</p>}
        </div>
        <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.75rem", background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
          {icon}
        </div>
      </div>
    </div>
  );
}