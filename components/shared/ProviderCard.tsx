"use client";
import { ratingStars } from "@/lib/utils";
import Badge from "./Badge";
import type { Provider } from "@/lib/data";
import { getUserById, getCategoryById } from "@/lib/data";
import { MapPin, Briefcase, Clock, Globe } from "lucide-react";
import { useTheme, colors } from "@/lib/theme";

interface ProviderCardProps {
  provider: Provider;
  showActions?: boolean;
  onContact?: () => void;
}

export default function ProviderCard({ provider, showActions = false, onContact }: ProviderCardProps) {
  const { theme } = useTheme();
  const c = colors;
  const user = getUserById(provider.user_id);
  const category = getCategoryById(provider.category_ids[0]);

  if (!user) return null;

  return (
    <div style={{ borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, padding: "1.25rem", background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
        {/* Avatar */}
        <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "linear-gradient(135deg, #0ABFBC, #1A7FBF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>
          {user.avatar}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: c.text(theme) }}>{user.name}</h3>
            <Badge status={provider.verification_status} />
            {provider.multi_island && (
              <span style={{ display: "flex", alignItems: "center", gap: "0.2rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: "#1DB87A15", color: "#1DB87A", fontSize: "0.72rem", fontWeight: 700 }}>
                <Globe size={10} /> Multi-island
              </span>
            )}
          </div>

          {category && (
            <p style={{ fontSize: "0.85rem", marginTop: "0.2rem", color: "#0ABFBC" }}>{category.icon} {category.name}</p>
          )}

          <p style={{ fontSize: "0.85rem", marginTop: "0.5rem", color: c.textMuted(theme), overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{provider.bio}</p>

          {/* Skills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.625rem" }}>
            {provider.skills.map((skill: string) => (
              <span key={skill} style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: c.bgMuted(theme), color: c.textMuted(theme) }}>{skill}</span>
            ))}
          </div>

          {/* Service areas */}
          {provider.service_areas && provider.service_areas.length > 0 && (
            <div style={{ marginTop: "0.625rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#1A7FBF", marginBottom: "0.3rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>📍 Areas Served</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {provider.service_areas.slice(0, 4).map((area: string) => (
                  <span key={area} style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: "#1A7FBF12", color: "#1A7FBF", border: "1px solid #1A7FBF25", fontWeight: 500 }}>
                    {area}
                  </span>
                ))}
                {provider.service_areas.length > 4 && (
                  <span style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: c.bgMuted(theme), color: c.textMuted(theme) }}>
                    +{provider.service_areas.length - 4} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: c.textMuted(theme) }}>
              <MapPin size={12} /> {provider.island}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: c.textMuted(theme) }}>
              <Briefcase size={12} /> {provider.completed_jobs} jobs
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: c.textMuted(theme) }}>
              <Clock size={12} /> ~{provider.response_speed}h response
            </span>
            {provider.rating > 0 && (
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#F4A623" }}>
                {ratingStars(provider.rating)} {provider.rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      {showActions && (
        <div style={{ display: "flex", gap: "0.625rem", marginTop: "1rem", paddingTop: "1rem", borderTop: `1px solid ${c.border(theme)}` }}>
          <button onClick={onContact} style={{ flex: 1, padding: "0.625rem", borderRadius: "0.75rem", border: "none", background: "linear-gradient(135deg, #0ABFBC, #1A7FBF)", color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>
            Contact
          </button>
          <button style={{ flex: 1, padding: "0.625rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: "transparent", color: c.text(theme), fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>
            View Profile
          </button>
        </div>
      )}
    </div>
  );
}