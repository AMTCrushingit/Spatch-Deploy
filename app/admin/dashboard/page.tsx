"use client";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import { providers, serviceRequests, analyticsData, getCategoryById, getUserById } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { ArrowRight, AlertCircle, TrendingUp, Globe } from "lucide-react";

const pendingProviders = providers.filter(p => p.verification_status === "pending");
const recentRequests = serviceRequests.slice(-3).reverse();

export default function AdminDashboard() {
  const { theme } = useTheme();
  const c = colors;

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="admin" userName="Credii Admin" userAvatar="CA" />
      <div style={{ padding: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Credii Admin Panel</h1>
            <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>Rivva platform overview · August 2026</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Link href="/admin/analytics" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.625rem 1.25rem", borderRadius: "0.875rem", border: `1px solid ${c.border(theme)}`, color: c.text(theme), textDecoration: "none", fontSize: "0.9rem", fontWeight: 600, background: c.bgCard(theme) }}>
              <TrendingUp size={15} /> Analytics
            </Link>
            <button style={{ padding: "0.625rem 1.25rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}>Export Data</button>
          </div>
        </div>

        {/* Alert */}
        {pendingProviders.length > 0 && (
          <div style={{ padding: "1rem 1.25rem", borderRadius: "1rem", background: "#FFB34712", border: "1px solid #FFB34730", display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "2rem" }}>
            <AlertCircle size={18} style={{ color: "#FFB347", flexShrink: 0 }} />
            <p style={{ fontSize: "0.95rem", color: c.text(theme) }}>
              <strong>{pendingProviders.length} provider{pendingProviders.length > 1 ? "s" : ""}</strong> awaiting verification approval.
            </p>
            <Link href="/admin/approvals" style={{ marginLeft: "auto", padding: "0.4rem 0.875rem", borderRadius: "0.625rem", background: "#FFB347", color: "#fff", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>
              Review Now <ArrowRight size={12} />
            </Link>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "2.5rem" }} className="stats-grid">
          <StatCard label="Total Providers" value={analyticsData.totalProviders} icon="🔧" color="#0ABFBC" trend={`${analyticsData.approvedProviders} approved`} />
          <StatCard label="Total Clients" value={analyticsData.totalClients} icon="👥" color="#FF6B4A" />
          <StatCard label="Total Requests" value={analyticsData.totalRequests} icon="📋" color="#FFB347" trend={`${analyticsData.openRequests} open`} />
          <StatCard label="Pending Approvals" value={analyticsData.pendingProviders} icon="⏳" color="#E63946" trend="Needs action" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }} className="grid-2col">
          <div>
            {/* Pending providers */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: c.text(theme) }}>
                Pending Approvals
                {pendingProviders.length > 0 && <span style={{ marginLeft: "0.5rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: "#FFB34715", color: "#E6900A", fontSize: "0.8rem", fontWeight: 700 }}>{pendingProviders.length}</span>}
              </h2>
              <Link href="/admin/approvals" style={{ fontSize: "0.9rem", color: "#FF6B4A", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>View all <ArrowRight size={14} /></Link>
            </div>
            {pendingProviders.length === 0 ? (
              <div style={{ padding: "2rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), textAlign: "center" }}>
                <p style={{ color: c.textMuted(theme) }}>No pending approvals 🎉</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2rem" }}>
                {pendingProviders.map(p => {
                  const user = getUserById(p.user_id);
                  return (
                    <div key={p.id} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), display: "flex", alignItems: "center", gap: "1rem", boxShadow: c.shadow(theme) }}>
                      <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>{user?.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{user?.name}</p>
                        <p style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>📍 {p.island} · {p.skills.join(", ")}</p>
                        <p style={{ fontSize: "0.8rem", color: c.textFaint(theme), marginTop: "0.2rem" }}>Applied {formatDate(p.created_at)}</p>
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                        <Link href="/admin/approvals" style={{ padding: "0.4rem 0.875rem", borderRadius: "0.625rem", background: "#2ECC71", color: "#fff", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700 }}>Approve</Link>
                        <button style={{ padding: "0.4rem 0.875rem", borderRadius: "0.625rem", border: `1px solid ${c.border(theme)}`, background: "transparent", color: c.textMuted(theme), fontSize: "0.85rem", cursor: "pointer" }}>Reject</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Recent requests */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: c.text(theme) }}>Recent Requests</h2>
              <Link href="/admin/analytics" style={{ fontSize: "0.9rem", color: "#FF6B4A", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.25rem" }}>Analytics <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {recentRequests.map(req => {
                const cat = getCategoryById(req.category_id);
                return (
                  <div key={req.id} style={{ padding: "1rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), display: "flex", alignItems: "center", gap: "0.875rem" }}>
                    <span style={{ fontSize: "1.3rem" }}>{cat?.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{cat?.name}</p>
                      <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{req.description}</p>
                      <p style={{ fontSize: "0.75rem", color: c.textFaint(theme), marginTop: "0.2rem" }}>📍 {req.island} · {formatDate(req.created_at)}</p>
                    </div>
                    <Badge status={req.status} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Island breakdown */}
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Globe size={16} style={{ color: "#FFB347" }} />
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Island Breakdown</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {analyticsData.islandBreakdown.map(island => (
                  <div key={island.island}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      <span style={{ color: c.text(theme) }}>📍 {island.island}</span>
                      <span style={{ color: c.textMuted(theme) }}>{island.providers}P · {island.clients}C · {island.requests}R</span>
                    </div>
                    <div style={{ width: "100%", height: "0.35rem", borderRadius: "999px", background: c.border(theme) }}>
                      <div style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #FF6B4A, #0ABFBC)", width: `${Math.max(10, (island.providers / analyticsData.totalProviders) * 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue projection */}
            <div style={{ padding: "1.5rem", borderRadius: "1rem", background: "linear-gradient(135deg, #1A0A05, #2D1510)" }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Revenue Projection (Y1)</p>
              <p style={{ fontSize: "1.75rem", fontWeight: 900, color: "#fff" }}>TT$1.2M–2.4M</p>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>Based on 2,000 providers @ TT$50–100/mo</p>
              <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[{ label: "Subscriptions", value: "TT$1.2M" }, { label: "Lead fees", value: "TT$720k" }, { label: "Partnerships", value: "TT$300k" }].map(r => (
                  <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{r.label}</span>
                    <span style={{ fontWeight: 700, color: "#2ECC71" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick nav */}
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "0.875rem" }}>Admin Actions</h3>
              {[{ href: "/admin/approvals", label: "Provider Approvals", icon: "🛡️" }, { href: "/admin/categories", label: "Manage Categories", icon: "📂" }, { href: "/admin/analytics", label: "View Analytics", icon: "📊" }].map(l => (
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