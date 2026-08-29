"use client";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { serviceRequests, quotes, providers, users, getCategoryById } from "@/lib/data";
import { formatDate, formatCurrency, ratingStars } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";

const currentProvider = providers.find(p => p.user_id === "u2")!;
const currentUser = users.find(u => u.id === "u2")!;
const myQuotes = quotes.filter(q => q.provider_id === currentProvider.id);
const acceptedQuotes = myQuotes.filter(q => q.status === "accepted");
const availableLeads = serviceRequests.filter(r => r.island === currentProvider.island && currentProvider.category_ids.some((c: string) => c === r.category_id) && r.status === "open");

export default function ProviderDashboard() {
  const { theme } = useTheme();
  const c = colors;

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="provider" userName={currentUser.name} userAvatar={currentUser.avatar} />
      <div style={{ padding: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.25rem" }}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Welcome back, {currentUser.name.split(" ")[0]} 👋</h1>
              <span style={{ padding: "0.2rem 0.625rem", borderRadius: "999px", background: "#2ECC7118", color: "#2ECC71", fontSize: "0.8rem", fontWeight: 700 }}>✓ Verified</span>
            </div>
            <p style={{ color: c.textMuted(theme) }}>📍 {currentProvider.island} · ⚡ Electrical · Responds in ~{currentProvider.response_speed}h</p>
          </div>
          <Link href="/provider/leads" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: "0.875rem", background: "linear-gradient(135deg, #0ABFBC, #0ABFBC)", color: "#fff", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}>
            <Zap size={16} /> View Leads
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "2.5rem" }} className="stats-grid">
          <StatCard label="Completed Jobs" value={currentProvider.completed_jobs} icon="✅" color="#2ECC71" trend="+12 this month" />
          <StatCard label="Rating" value={`${currentProvider.rating}★`} icon="⭐" color="#FFB347" />
          <StatCard label="Quotes Sent" value={myQuotes.length} icon="📬" color="#0ABFBC" />
          <StatCard label="Active Jobs" value={acceptedQuotes.length} icon="🔧" color="#FF6B4A" trend="In progress" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }} className="grid-2col">
          <div>
            {/* Available Leads */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: c.text(theme) }}>
                Available Leads
                {availableLeads.length > 0 && <span style={{ marginLeft: "0.5rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: "#FF6B4A15", color: "#FF6B4A", fontSize: "0.8rem", fontWeight: 700 }}>{availableLeads.length} new</span>}
              </h2>
              <Link href="/provider/leads" style={{ fontSize: "0.9rem", color: "#0ABFBC", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>View all <ArrowRight size={14} /></Link>
            </div>
            {availableLeads.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>📭</div>
                <p style={{ fontWeight: 600, color: c.text(theme) }}>No leads right now</p>
                <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginTop: "0.25rem" }}>New requests on {currentProvider.island} will appear here</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
                {availableLeads.map(req => {
                  const cat = getCategoryById(req.category_id);
                  const alreadyQuoted = myQuotes.some(q => q.request_id === req.id);
                  return (
                    <div key={req.id} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                        <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: c.bgMuted(theme), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{cat?.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                            <span style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{cat?.name}</span>
                            <Badge status={req.status} />
                            {alreadyQuoted && <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", background: "#0ABFBC15", color: "#0ABFBC", fontSize: "0.75rem", fontWeight: 600 }}>Quoted</span>}
                          </div>
                          <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.25rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{req.description}</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "0.8rem", color: c.textMuted(theme) }}>📍 {req.island}</span>
                            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#FF6B4A" }}>{req.budget}</span>
                            <span style={{ fontSize: "0.8rem", color: c.textFaint(theme) }}>{formatDate(req.created_at)}</span>
                          </div>
                        </div>
                        {!alreadyQuoted && (
                          <Link href="/provider/leads" style={{ padding: "0.4rem 0.875rem", borderRadius: "0.625rem", background: "#0ABFBC", color: "#fff", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0 }}>Quote</Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* My Quotes */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: c.text(theme) }}>My Quotes</h2>
              <Link href="/provider/quotes" style={{ fontSize: "0.9rem", color: "#0ABFBC", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>View all <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {myQuotes.map(q => {
                const req = serviceRequests.find(r => r.id === q.request_id);
                const cat = req ? getCategoryById(req.category_id) : null;
                return (
                  <div key={q.id} style={{ padding: "1rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), display: "flex", alignItems: "center", gap: "0.875rem" }}>
                    <span style={{ fontSize: "1.3rem" }}>{cat?.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{cat?.name}</p>
                      <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.message.slice(0, 50)}…</p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontWeight: 800, color: "#FF6B4A", fontSize: "1rem" }}>{formatCurrency(q.price)}</p>
                      <Badge status={q.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{currentUser.avatar}</div>
                <div>
                  <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{currentUser.name}</p>
                  <p style={{ fontSize: "0.85rem", color: "#FFB347" }}>{ratingStars(currentProvider.rating)} {currentProvider.rating}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {[{ label: "Subscription", value: "Pro · TT$100/mo", color: "#0ABFBC" }, { label: "Response speed", value: `~${currentProvider.response_speed}h avg` }, { label: "Member since", value: formatDate(currentProvider.created_at) }].map(item => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span style={{ color: c.textMuted(theme) }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: (item as any).color ?? c.text(theme) }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <Link href="/provider/profile" style={{ display: "block", textAlign: "center", padding: "0.625rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, color: c.text(theme), textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, marginTop: "1rem" }}>View Full Profile</Link>
            </div>

            <div style={{ padding: "1.5rem", borderRadius: "1rem", background: "linear-gradient(135deg, #1A0A05, #2D1510)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <TrendingUp size={16} style={{ color: "#FFB347" }} />
                <p style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>Earnings (Phase 2)</p>
              </div>
              <p style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fff" }}>TT$0</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>Payments launch in Phase 2</p>
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Projected monthly</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#2ECC71" }}>TT$8,400</p>
              </div>
            </div>

            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "0.875rem" }}>Quick Links</h3>
              {[{ href: "/provider/leads", label: "Browse Leads", icon: "🔍" }, { href: "/provider/quotes", label: "My Quotes", icon: "📬" }, { href: "/provider/verification", label: "Verification Status", icon: "🛡️" }, { href: "/provider/profile", label: "Edit Profile", icon: "✏️" }].map(l => (
                <Link key={l.href} href={l.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 0", fontSize: "0.9rem", color: c.text(theme), textDecoration: "none", borderBottom: `1px solid ${c.border(theme)}` }}>
                  <span>{l.icon}</span> {l.label} <ArrowRight size={12} style={{ color: c.textFaint(theme), marginLeft: "auto" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`.stats-grid{grid-template-columns:repeat(4,1fr);} .grid-2col{grid-template-columns:2fr 1fr;} @media(max-width:1024px){.stats-grid{grid-template-columns:1fr 1fr!important;} .grid-2col{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}