"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { providers, users, serviceCategories, getReviewsByProviderId } from "@/lib/data";
import { formatDate, ratingStars } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { Edit2, MapPin, Phone, Mail, Star, Briefcase, Clock, Shield } from "lucide-react";

const currentProvider = providers.find(p => p.user_id === "u2")!;
const currentUser = users.find(u => u.id === "u2")!;
const myReviews = getReviewsByProviderId(currentProvider.id);

export default function ProviderProfilePage() {
  const { theme } = useTheme();
  const c = colors;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ bio: currentProvider.bio, skills: currentProvider.skills.join(", ") });

  const inp = { width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.inputBg(theme), color: c.text(theme), fontSize: "0.95rem", outline: "none", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="provider" userName={currentUser.name} userAvatar={currentUser.avatar} />
      <div style={{ padding: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme), marginBottom: "2rem" }}>My Profile</h1>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "2rem" }} className="grid-profile">
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), textAlign: "center", boxShadow: c.shadow(theme) }}>
              <div style={{ position: "relative", display: "inline-block", marginBottom: "1rem" }}>
                <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.5rem", fontWeight: 900, margin: "0 auto" }}>{currentUser.avatar}</div>
                <div style={{ position: "absolute", bottom: 0, right: 0, width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: "#2ECC71", border: `2px solid ${c.bgCard(theme)}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={10} color="#fff" />
                </div>
              </div>
              <h2 style={{ fontWeight: 800, fontSize: "1.1rem", color: c.text(theme) }}>{currentUser.name}</h2>
              <p style={{ fontSize: "0.9rem", color: "#0ABFBC", marginTop: "0.2rem" }}>⚡ Electrical</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "0.4rem" }}>
                <span style={{ color: "#FFB347" }}>{ratingStars(currentProvider.rating)}</span>
                <span style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.9rem" }}>{currentProvider.rating}</span>
                <span style={{ fontSize: "0.8rem", color: c.textMuted(theme) }}>({myReviews.length} reviews)</span>
              </div>
              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem", textAlign: "left" }}>
                {[{ icon: <MapPin size={13} />, value: currentProvider.island }, { icon: <Mail size={13} />, value: currentUser.email }, { icon: <Phone size={13} />, value: currentUser.phone }, { icon: <Briefcase size={13} />, value: `${currentProvider.completed_jobs} jobs completed` }, { icon: <Clock size={13} />, value: `Responds in ~${currentProvider.response_speed}h` }].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: c.textMuted(theme) }}>
                    <span style={{ color: "#FF6B4A" }}>{item.icon}</span> {item.value}
                  </div>
                ))}
              </div>
              <button onClick={() => setEditing(!editing)} style={{ marginTop: "1.25rem", width: "100%", padding: "0.625rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), color: c.text(theme), fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", fontSize: "0.9rem" }}>
                <Edit2 size={14} /> {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
              <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: c.text(theme), marginBottom: "0.875rem" }}>Service Categories</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {currentProvider.category_ids.map(cid => {
                  const cat = serviceCategories.find(cat => cat.id === cid);
                  return cat ? <span key={cid} style={{ padding: "0.3rem 0.75rem", borderRadius: "999px", background: "#0ABFBC15", color: "#0ABFBC", fontSize: "0.85rem", fontWeight: 600 }}>{cat.icon} {cat.name}</span> : null;
                })}
              </div>
            </div>

            <div style={{ padding: "1.5rem", borderRadius: "1rem", background: "linear-gradient(135deg, #1A0A05, #2D1510)" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Current Plan</p>
              <p style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff" }}>Pro · TT$100/mo</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem" }}>Renews Aug 20, 2026</p>
              <div style={{ marginTop: "0.875rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {["Unlimited leads", "Priority matching", "Profile badge"].map(f => (
                  <p key={f} style={{ fontSize: "0.85rem", color: "#fff", display: "flex", alignItems: "center", gap: "0.4rem" }}><span style={{ color: "#2ECC71" }}>✓</span> {f}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {editing && (
              <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `2px solid #FF6B4A40`, background: "#FF6B4A05" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1.25rem" }}>Edit Profile</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Bio</label>
                    <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={4} style={{ ...inp, resize: "none" }} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Skills <span style={{ color: c.textMuted(theme), fontWeight: 400 }}>(comma-separated)</span></label>
                    <input value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} style={inp} />
                  </div>
                  <button onClick={() => setEditing(false)} style={{ padding: "0.875rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.95rem" }}>Save Changes</button>
                </div>
              </div>
            )}

            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "0.875rem" }}>About</h3>
              <p style={{ fontSize: "0.95rem", color: c.textMuted(theme), lineHeight: 1.7 }}>{currentProvider.bio}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                {currentProvider.skills.map(skill => <span key={skill} style={{ padding: "0.3rem 0.75rem", borderRadius: "999px", background: c.bgMuted(theme), color: c.text(theme), fontSize: "0.85rem" }}>{skill}</span>)}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Client Reviews</h3>
                <span style={{ padding: "0.2rem 0.625rem", borderRadius: "999px", background: "#FFB34715", color: "#E6900A", fontSize: "0.8rem", fontWeight: 700 }}>{ratingStars(currentProvider.rating)} {currentProvider.rating}</span>
              </div>
              {myReviews.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
                  <Star size={24} style={{ color: c.border(theme), margin: "0 auto 0.75rem" }} />
                  <p style={{ fontSize: "0.9rem", color: c.textMuted(theme) }}>No reviews yet</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {myReviews.map(rev => (
                    <div key={rev.id} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                          <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.65rem", fontWeight: 700 }}>C</div>
                          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: c.text(theme) }}>Verified Client</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ color: "#FFB347", fontSize: "0.85rem" }}>{ratingStars(rev.rating)}</span>
                          <span style={{ fontSize: "0.8rem", color: c.textFaint(theme) }}>{formatDate(rev.created_at)}</span>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.9rem", color: c.text(theme), lineHeight: 1.6 }}>&ldquo;{rev.comment}&rdquo;</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`.grid-profile{grid-template-columns:300px 1fr;} @media(max-width:1024px){.grid-profile{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}