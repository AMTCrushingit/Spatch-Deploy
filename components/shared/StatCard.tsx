interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  color?: string;
}

export default function StatCard({ label, value, icon, trend, color = "#FF6B4A" }: StatCardProps) {
  return (
    <div className="rounded-2xl p-5 border" style={{ background: "#FFFDF9", borderColor: "#E8E2D9" }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium" style={{ color: "#8A8070" }}>{label}</p>
          <p className="text-3xl font-bold mt-1" style={{ color: "#1A1A2E" }}>{value}</p>
          {trend && <p className="text-xs mt-1" style={{ color: "#2ECC71" }}>{trend}</p>}
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
          style={{ background: `${color}18` }}>
          {icon}
        </div>
      </div>
    </div>
  );
}