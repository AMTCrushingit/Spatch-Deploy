"use client";
import Navbar from "@/components/shared/Navbar";
import { analyticsData } from "@/lib/data";
import { useTheme, colors } from "@/lib/theme";
import { TrendingUp, Download, Globe, Users, FileText, BarChart2 } from "lucide-react";

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const c = colors;
  const maxRequests = Math.max(...analyticsData.monthlyRequests.map(m => m.requests));
  const maxCat = Math.max(...analyticsData.categoryBreakdown.map(c => c.count));

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="admin" userName="Credii Admin" userAvatar="CA" />
      <div style={{ padding: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Platform Analytics</h1>
            <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>Rivva MVP · Data for grants, valuation &amp; partnerships</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
            <Download size={15} /> Export Report
          </button>
        </div>

        {/* KPI cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "2.5rem" }} className="stats-grid">
          {[
            { label: "Total Providers", value: analyticsData.totalProviders, sub: `${analyticsData.approvedProviders} approved`, icon: "🔧", color: "#0ABFBC" },
            { label: "Total Clients", value: analyticsData.totalClients, sub: "Registered users", icon: "👥", color: "#FF6B4A" },
            { label: "Total Requests", value: analyticsData.totalRequests, sub: `${analyticsData.openRequests} open`, icon: "📋", color: "#FFB347" },
            { label: "Quotes Sent", value: analyticsData.totalQuotes, sub: `${analyticsData.acceptedQuotes} accepted`, icon: "📬", color: "#2ECC71" },
          ].map(s => (
            <div key={s.label} style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), fontWeight: 500 }}>{s.label}</p>
                <span style={{ fontSize: "1.3rem" }}>{s.icon}</span>
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 900, color: s.color }}>{s.value}</p>
              <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), marginTop: "0.25rem" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }} className="grid-2col">
          {/* Monthly requests chart */}
          <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <BarChart2 size={16} style={{ color: "#FF6B4A" }} />
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Monthly Requests</h3>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.625rem", height: "160px" }}>
              {analyticsData.monthlyRequests.map(m => (
                <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: c.text(theme) }}>{m.requests}</span>
                  <div style={{ width: "100%", borderRadius: "0.4rem 0.4rem 0 0", height: `${(m.requests / maxRequests) * 120}px`, minHeight: "8px", background: m.month === "Aug" ? "linear-gradient(180deg, #FF6B4A, #FFB347)" : `linear-gradient(180deg, #0ABFBC, #0ABFBC60)` }} />
                  <span style={{ fontSize: "0.75rem", color: c.textMuted(theme) }}>{m.month}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "1rem" }}>📈 Growth since March: +{Math.round(((analyticsData.monthlyRequests[5].requests - analyticsData.monthlyRequests[0].requests) / analyticsData.monthlyRequests[0].requests) * 100)}%</p>
          </div>

          {/* Category breakdown */}
          <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <FileText size={16} style={{ color: "#0ABFBC" }} />
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Requests by Category</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {analyticsData.categoryBreakdown.map((cat, i) => {
                const barColors = ["#FF6B4A", "#0ABFBC", "#FFB347", "#2ECC71", "#E63946"];
                return (
                  <div key={cat.category}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      <span style={{ color: c.text(theme) }}>{cat.category}</span>
                      <span style={{ color: c.textMuted(theme) }}>{cat.count} request{cat.count !== 1 ? "s" : ""}</span>
                    </div>
                    <div style={{ width: "100%", height: "0.4rem", borderRadius: "999px", background: c.border(theme) }}>
                      <div style={{ height: "100%", borderRadius: "999px", background: barColors[i % barColors.length], width: `${(cat.count / maxCat) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }} className="grid-3col">
          {/* Island breakdown */}
          <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <Globe size={16} style={{ color: "#FFB347" }} />
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Island Breakdown</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {analyticsData.islandBreakdown.map(island => (
                <div key={island.island} style={{ padding: "0.875rem", borderRadius: "0.875rem", background: c.bgMuted(theme) }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: c.text(theme), marginBottom: "0.625rem" }}>📍 {island.island}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.25rem", textAlign: "center" }}>
                    {[{ label: "Providers", value: island.providers, color: "#0ABFBC" }, { label: "Clients", value: island.clients, color: "#FF6B4A" }, { label: "Requests", value: island.requests, color: "#FFB347" }].map(s => (
                      <div key={s.label}>
                        <p style={{ fontWeight: 900, color: s.color, fontSize: "1.1rem" }}>{s.value}</p>
                        <p style={{ fontSize: "0.7rem", color: c.textMuted(theme) }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Provider stats */}
          <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <Users size={16} style={{ color: "#2ECC71" }} />
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Provider Stats</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { label: "Total registered", value: analyticsData.totalProviders, color: c.text(theme) },
                { label: "Approved & live", value: analyticsData.approvedProviders, color: "#2ECC71" },
                { label: "Pending review", value: analyticsData.pendingProviders, color: "#FFB347" },
                { label: "Avg rating", value: "4.7★", color: "#FFB347" },
                { label: "Avg jobs done", value: "118", color: "#0ABFBC" },
                { label: "Avg response", value: "~2.4h", color: "#FF6B4A" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: c.textMuted(theme) }}>{s.label}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue model */}
          <div style={{ padding: "1.5rem", borderRadius: "1rem", background: "linear-gradient(135deg, #1A0A05, #2D1510)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
              <TrendingUp size={16} style={{ color: "#FFB347" }} />
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}>Revenue Model (Y1)</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {[
                { stream: "Provider Subscriptions", low: "TT$1.2M", high: "TT$2.4M", icon: "💳", desc: "2,000 providers @ TT$50–100/mo" },
                { stream: "Lead Fees", low: "TT$720k", high: "TT$1.2M", icon: "📬", desc: "5,000 leads/mo @ TT$12–20" },
                { stream: "Partnerships", low: "TT$200k", high: "TT$500k", icon: "🤝", desc: "Gov, NGO, development agencies" },
              ].map(r => (
                <div key={r.stream} style={{ padding: "0.875rem", borderRadius: "0.875rem", background: "rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span>{r.icon}</span>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{r.stream}</p>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{r.desc}</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 900, color: "#2ECC71", marginTop: "0.25rem" }}>{r.low} – {r.high}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>Total Y1 projection</p>
              <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff" }}>TT$2.1M – TT$4.1M</p>
            </div>
          </div>
        </div>

        {/* Data export */}
        <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Data Export for Grants &amp; Partnerships</h3>
            <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.25rem" }}>Export platform data for development agency reports, grant applications, and investor decks</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }} className="grid-3col">
            {[
              { label: "Provider Impact Report", desc: "Verified providers, skills, islands", format: "PDF", icon: "📄" },
              { label: "Request Volume Data", desc: "Monthly trends, categories, islands", format: "CSV", icon: "📊" },
              { label: "Economic Impact Summary", desc: "Jobs created, revenue generated", format: "PDF", icon: "🌍" },
            ].map(e => (
              <div key={e.label} style={{ padding: "1.25rem", borderRadius: "0.875rem", border: `1px solid ${c.border(theme)}`, display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                <span style={{ fontSize: "1.75rem" }}>{e.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.9rem" }}>{e.label}</p>
                  <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>{e.desc}</p>
                  <button style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginTop: "0.75rem", background: "none", border: "none", color: "#FF6B4A", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>
                    <Download size={12} /> Export {e.format}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`.stats-grid{grid-template-columns:repeat(4,1fr);} .grid-2col{grid-template-columns:1fr 1fr;} .grid-3col{grid-template-columns:repeat(3,1fr);} @media(max-width:1024px){.stats-grid{grid-template-columns:1fr 1fr!important;} .grid-2col{grid-template-columns:1fr!important;} .grid-3col{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}