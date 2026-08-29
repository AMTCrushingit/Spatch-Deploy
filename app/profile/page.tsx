"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { serviceRequests, reviews, getCategoryById } from "@/lib/data";
import { formatDate, ratingStars } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { Edit2, MapPin, Phone, Mail, Calendar, CheckCircle } from "lucide-react";

const currentUser = { id: "u1", name: "Aaliyah Joseph", email: "aaliyah@email.com", phone: "+1-868-555-0101", island: "Trinidad", avatar: "AJ", joined: "January 2026" };
const myRequests = serviceRequests.filter(r => r.client_id === "cl1");

export default function ClientProfilePage() {
  const { theme } = useTheme();
  const c = colors;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: currentUser.name, phone: currentUser.phone, island: currentUser.island });

  const inp = { width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.inputBg(theme), color: c.text(theme), fontSize: "0.95rem", outline: "none", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="client" userName={currentUser.name} userAvatar={currentUser.avatar} />
      <div style={{ padding: "2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme), marginBottom: "2rem" }}>My Profile</h1>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "2rem" }} className="grid-profile">
          {/* Left */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), textAlign: "center", boxShadow: c.shadow(theme) }}>
              <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.5rem", fontWeight: 900, margin: "0 auto 1rem" }}>{currentUser.avatar}</div>
              <h2 style={{ fontWeight: 800, fontSize: "1.1rem", color: c.text(theme) }}>{currentUser.name}</h2>
              <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>Client</p>
              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.625rem", textAlign: "left" }}>
                {[{ icon: <MapPin size={13} />, value: currentUser.island }, { icon: <Mail size={13} />, value: currentUser.email }, { icon: <Phone size={13} />, value: currentUser.phone }, { icon: <Calendar size={13} />, value: `Joined ${currentUser.joined}` }].map((item, i) => (
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
              <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: c.text(theme), marginBottom: "1rem" }}>Activity</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[{ label: "Requests posted", value: myRequests.length }, { label: "Jobs completed", value: myRequests.filter(r => r.status === "closed").length }, { label: "Reviews given", value: 2 }, { label: "Providers hired", value: 3 }].map(s => (
                  <div key={s.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                    <span style={{ color: c.textMuted(theme) }}>{s.label}</span>
                    <span style={{ fontWeight: 700, color: c.text(theme) }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {editing && (
              <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `2px solid #FF6B4A40`, background: "#FF6B4A05" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1.25rem" }}>Edit Details</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[{ label: "Full Name", key: "name", type: "text" }, { label: "Phone", key: "phone", type: "tel" }].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                      <input type={f.type} value={form[f.key as keyof typeof form]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))} style={inp} />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Island</label>
                    <select value={form.island} onChange={e => setForm(prev => ({ ...prev, island: e.target.value }))} style={inp}>
                      {["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"].map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                  <button onClick={() => setEditing(false)} style={{ padding: "0.875rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.95rem" }}>Save Changes</button>
                </div>
              </div>
            )}

            <div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1rem" }}>Request History</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {myRequests.map(req => {
                  const cat = getCategoryById(req.category_id);
                  const statusColor = req.status === "open" ? "#2ECC71" : req.status === "matched" ? "#FFB347" : "#888";
                  return (
                    <div key={req.id} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), display: "flex", alignItems: "center", gap: "0.875rem", boxShadow: c.shadow(theme) }}>
                      <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: c.bgMuted(theme), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{cat?.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{cat?.name}</p>
                        <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{req.description}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span style={{ padding: "0.2rem 0.625rem", borderRadius: "999px", background: `${statusColor}18`, color: statusColor, fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>{req.status}</span>
                        <p style={{ fontSize: "0.75rem", color: c.textFaint(theme), marginTop: "0.3rem" }}>{formatDate(req.created_at)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1rem" }}>Reviews I&apos;ve Given</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {reviews.filter(r => r.client_id === "cl1").map(rev => (
                  <div key={rev.id} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: "#FFB347", fontSize: "0.9rem" }}>{ratingStars(rev.rating)}</span>
                        <span style={{ fontSize: "0.8rem", color: c.textFaint(theme) }}>{formatDate(rev.created_at)}</span>
                      </div>
                      <CheckCircle size={14} style={{ color: "#2ECC71" }} />
                    </div>
                    <p style={{ fontSize: "0.9rem", color: c.text(theme), lineHeight: 1.6 }}>&ldquo;{rev.comment}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`.grid-profile{grid-template-columns:280px 1fr;} @media(max-width:1024px){.grid-profile{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}