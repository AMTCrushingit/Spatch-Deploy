"use client";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { serviceRequests, quotes, getCategoryById, getQuotesByRequestId } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { ArrowRight, Plus, MessageSquare, Star } from "lucide-react";

const currentUser = { id: "u1", name: "Aaliyah Joseph", avatar: "AJ", island: "Trinidad" };
const myRequests = serviceRequests.filter(r => r.client_id === "cl1");
const myQuotes = quotes.filter(q => myRequests.some(r => r.id === q.request_id));

export default function ClientDashboard() {
  const { theme } = useTheme();
  const c = colors;

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="client" userName={currentUser.name} userAvatar={currentUser.avatar} />
      <div style={{ padding: "2.5rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Good morning, {currentUser.name.split(" ")[0]} 👋</h1>
            <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>📍 {currentUser.island} · Here&apos;s what&apos;s happening with your requests</p>
          </div>
          <Link href="/request" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: "0.875rem", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
            <Plus size={16} /> New Request
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.25rem", marginBottom: "2.5rem" }} className="stats-grid">
          <StatCard label="Total Requests" value={myRequests.length} icon="📋" color="#FF6B4A" />
          <StatCard label="Open" value={myRequests.filter(r => r.status === "open").length} icon="🟢" color="#2ECC71" trend="Awaiting quotes" />
          <StatCard label="Quotes Received" value={myQuotes.length} icon="📬" color="#0ABFBC" />
          <StatCard label="Jobs Completed" value={myRequests.filter(r => r.status === "closed").length} icon="✅" color="#FFB347" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }} className="grid-2col">
          {/* Requests */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: c.text(theme) }}>My Requests</h2>
              <Link href="/quotes" style={{ fontSize: "0.9rem", color: "#FF6B4A", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>View all <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {myRequests.map(req => {
                const cat = getCategoryById(req.category_id);
                const reqQuotes = getQuotesByRequestId(req.id);
                return (
                  <div key={req.id} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                      <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: c.bgMuted(theme), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{cat?.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{cat?.name}</span>
                          <Badge status={req.status} />
                        </div>
                        <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{req.description}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
                          <span style={{ fontSize: "0.8rem", color: c.textFaint(theme) }}>{formatDate(req.created_at)}</span>
                          <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#0ABFBC" }}>{reqQuotes.length} quote{reqQuotes.length !== 1 ? "s" : ""}</span>
                        </div>
                      </div>
                      <Link href="/quotes" style={{ padding: "0.4rem 0.875rem", borderRadius: "0.625rem", background: c.bgMuted(theme), color: c.text(theme), textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, flexShrink: 0 }}>View</Link>
                    </div>
                  </div>
                );
              })}
              <Link href="/request" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "1rem", borderRadius: "1rem", border: `2px dashed ${c.border(theme)}`, color: "#FF6B4A", textDecoration: "none", fontWeight: 600 }}>
                <Plus size={16} /> Post a new request
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Recent quotes */}
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Recent Quotes</h3>
                <Link href="/quotes" style={{ fontSize: "0.85rem", color: "#FF6B4A", textDecoration: "none" }}>See all</Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {myQuotes.slice(0, 3).map(q => (
                  <div key={q.id} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0 }}>P</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: c.text(theme) }}>TT${q.price.toLocaleString()}</p>
                      <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.message.slice(0, 35)}…</p>
                    </div>
                    <Badge status={q.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1rem" }}>Quick Actions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  { href: "/request", icon: <Plus size={15} />, label: "Post a Request", color: "#FF6B4A" },
                  { href: "/quotes", icon: <MessageSquare size={15} />, label: "View Quotes", color: "#0ABFBC" },
                  { href: "/chat", icon: <MessageSquare size={15} />, label: "Messages", color: "#FFB347" },
                  { href: "/profile", icon: <Star size={15} />, label: "My Profile", color: "#2ECC71" },
                ].map(a => (
                  <Link key={a.href} href={a.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0.75rem", borderRadius: "0.75rem", textDecoration: "none", color: c.text(theme) }}>
                    <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.5rem", background: `${a.color}18`, color: a.color, display: "flex", alignItems: "center", justifyContent: "center" }}>{a.icon}</div>
                    <span style={{ fontSize: "0.9rem" }}>{a.label}</span>
                    <ArrowRight size={12} style={{ color: c.textFaint(theme), marginLeft: "auto" }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Island coverage */}
            <div style={{ padding: "1.5rem", borderRadius: "1rem", background: "linear-gradient(135deg, #1A0A05, #2D1510)" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: "0.875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>🌴 Island Coverage</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"].map(i => (
                  <span key={i} style={{ fontSize: "0.8rem", padding: "0.25rem 0.625rem", borderRadius: "999px", background: "rgba(255,255,255,0.1)", color: "#fff" }}>{i}</span>
                ))}
              </div>
              <p style={{ fontSize: "0.85rem", color: "#FF6B4A", marginTop: "0.875rem", fontWeight: 600 }}>Expanding to Africa 2027 🌍</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`.stats-grid { grid-template-columns: repeat(4,1fr); } .grid-2col { grid-template-columns: 2fr 1fr; } @media(max-width:1024px){ .stats-grid{grid-template-columns:1fr 1fr!important;} .grid-2col{grid-template-columns:1fr!important;} }`}</style>
    </div>
  );
}