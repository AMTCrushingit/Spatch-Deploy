import { ratingStars, formatDate } from "@/lib/utils";
import Badge from "./Badge";
import { type Provider } from "@/lib/data";
import { getUserById, getCategoryById } from "@/lib/data";
import { MapPin, Briefcase, Clock } from "lucide-react";

interface ProviderCardProps {
  provider: Provider;
  showActions?: boolean;
  onContact?: () => void;
}

export default function ProviderCard({ provider, showActions = false, onContact }: ProviderCardProps) {
  const user = getUserById(provider.user_id);
  const category = getCategoryById(provider.category_ids[0]);

  if (!user) return null;

  return (
    <div className="rounded-2xl border p-5 hover:shadow-md transition-shadow"
      style={{ background: "#FFFDF9", borderColor: "#E8E2D9" }}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
          {user.avatar}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-base" style={{ color: "#1A1A2E" }}>{user.name}</h3>
            <Badge status={provider.verification_status} />
          </div>

          {category && (
            <p className="text-sm mt-0.5" style={{ color: "#0ABFBC" }}>{category.icon} {category.name}</p>
          )}

          <p className="text-sm mt-2 line-clamp-2" style={{ color: "#8A8070" }}>{provider.bio}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {provider.skills.map(skill => (
              <span key={skill} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "#F7F4EF", color: "#1A1A2E" }}>{skill}</span>
            ))}
          </div>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <span className="flex items-center gap-1 text-xs" style={{ color: "#8A8070" }}>
              <MapPin size={12} /> {provider.island}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "#8A8070" }}>
              <Briefcase size={12} /> {provider.completed_jobs} jobs
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: "#8A8070" }}>
              <Clock size={12} /> Responds in ~{provider.response_speed}h
            </span>
            {provider.rating > 0 && (
              <span className="text-xs font-medium" style={{ color: "#FFB347" }}>
                {ratingStars(provider.rating)} {provider.rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      {showActions && (
        <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor: "#E8E2D9" }}>
          <button
            onClick={onContact}
            className="flex-1 py-2 rounded-xl text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: "#FF6B4A" }}>
            Contact
          </button>
          <button className="flex-1 py-2 rounded-xl text-sm font-medium border transition hover:bg-gray-50"
            style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
            View Profile
          </button>
        </div>
      )}
    </div>
  );
}