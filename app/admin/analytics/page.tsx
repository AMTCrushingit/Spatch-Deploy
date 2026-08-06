"use client";
import Navbar from "@/components/shared/Navbar";
import { analyticsData, providers, serviceRequests, users } from "@/lib/data";
import { TrendingUp, Download, Globe, Users, FileText, BarChart2 } from "lucide-react";

export default function AnalyticsPage() {
  const maxRequests = Math.max(...analyticsData.monthlyRequests.map(m => m.requests));
  const maxCat = Math.max(...analyticsData.categoryBreakdown.map(c => c.count));

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="admin" userName="Credii Admin" userAvatar="CA" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Platform Analytics</h1>
            <p className="text-sm mt-1" style={{ color: "#8A8070" }}>
              Spatch MVP · Data for grants, valuation & partnerships
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
            style={{ background: "#FF6B4A" }}>
            <Download size={15} /> Export Report
          </button>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Providers", value: analyticsData.totalProviders, sub: `${analyticsData.approvedProviders} approved`, icon: "🔧", color: "#0ABFBC" },
            { label: "Total Clients", value: analyticsData.totalClients, sub: "Registered users", icon: "👥", color: "#FF6B4A" },
            { label: "Total Requests", value: analyticsData.totalRequests, sub: `${analyticsData.openRequests} open`, icon: "📋", color: "#FFB347" },
            { label: "Quotes Sent", value: analyticsData.totalQuotes, sub: `${analyticsData.acceptedQuotes} accepted`, icon: "📬", color: "#2ECC71" },
          ].map(s => (
            <div key={s.label} className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <div className="flex items-start justify-between mb-2">
                <p className="text-xs" style={{ color: "#8A8070" }}>{s.label}</p>
                <span className="text-xl">{s.icon}</span>
              </div>
              <p className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: "#8A8070" }}>{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Monthly requests chart */}
          <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 size={16} style={{ color: "#FF6B4A" }} />
              <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Monthly Requests</h3>
            </div>
            <div className="flex items-end gap-2 h-40">
              {analyticsData.monthlyRequests.map(m => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium" style={{ color: "#1A1A2E" }}>{m.requests}</span>
                  <div className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${(m.requests / maxRequests) * 120}px`,
                      background: m.month === "Aug"
                        ? "linear-gradient(180deg, #FF6B4A, #FFB347)"
                        : "linear-gradient(180deg, #0ABFBC, #0ABFBC80)",
                      minHeight: 8,
                    }} />
                  <span className="text-xs" style={{ color: "#8A8070" }}>{m.month}</span>
                </div>
              ))}
            </div>
            <p className="text-xs mt-3" style={{ color: "#8A8070" }}>
              📈 +{Math.round(((analyticsData.monthlyRequests[5].requests - analyticsData.monthlyRequests[0].requests) / analyticsData.monthlyRequests[0].requests) * 100)}% growth since March
            </p>
          </div>

          {/* Category breakdown */}
          <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
            <div className="flex items-center gap-2 mb-5">
              <FileText size={16} style={{ color: "#0ABFBC" }} />
              <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Requests by Category</h3>
            </div>
            <div className="space-y-3">
              {analyticsData.categoryBreakdown.map((c, i) => {
                const colors = ["#FF6B4A", "#0ABFBC", "#FFB347", "#2ECC71", "#9B59B6"];
                return (
                  <div key={c.category}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "#1A1A2E" }}>{c.category}</span>
                      <span style={{ color: "#8A8070" }}>{c.count} request{c.count !== 1 ? "s" : ""}</span>
                    </div>
                    <div className="w-full h-2 rounded-full" style={{ background: "#E8E2D9" }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${(c.count / maxCat) * 100}%`, background: colors[i % colors.length] }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Island breakdown */}
          <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} style={{ color: "#FFB347" }} />
              <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Island Breakdown</h3>
            </div>
            <div className="space-y-3">
              {analyticsData.islandBreakdown.map(island => (
                <div key={island.island} className="p-3 rounded-xl" style={{ background: "#F7F4EF" }}>
                  <p className="text-xs font-medium mb-2" style={{ color: "#1A1A2E" }}>📍 {island.island}</p>
                  <div className="grid grid-cols-3 gap-1 text-center">
                    {[
                      { label: "Providers", value: island.providers, color: "#0ABFBC" },
                      { label: "Clients", value: island.clients, color: "#FF6B4A" },
                      { label: "Requests", value: island.requests, color: "#FFB347" },
                    ].map(s => (
                      <div key={s.label}>
                        <p className="text-base font-bold" style={{ color: s.color }}>{s.value}</p>
                        <p className="text-xs" style={{ color: "#8A8070" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Provider stats */}
          <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
            <div className="flex items-center gap-2 mb-4">
              <Users size={16} style={{ color: "#2ECC71" }} />
              <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Provider Stats</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Total registered", value: analyticsData.totalProviders, color: "#1A1A2E" },
                { label: "Approved & live", value: analyticsData.approvedProviders, color: "#2ECC71" },
                { label: "Pending review", value: analyticsData.pendingProviders, color: "#FFB347" },
                { label: "Avg rating", value: "4.7★", color: "#FFB347" },
                { label: "Avg jobs done", value: "118", color: "#0ABFBC" },
                { label: "Avg response", value: "~2.4h", color: "#FF6B4A" },
              ].map(s => (
                <div key={s.label} className="flex justify-between text-sm">
                  <span style={{ color: "#8A8070" }}>{s.label}</span>
                  <span className="font-semibold" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue model */}
          <div className="p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #1A1A2E, #2D2D4E)" }}>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} style={{ color: "#FFB347" }} />
              <h3 className="font-semibold text-sm text-white">Revenue Model (Y1)</h3>
            </div>
            <div className="space-y-4">
              {[
                { stream: "Provider Subscriptions", low: "TT$1.2M", high: "TT$2.4M", icon: "💳", desc: "2,000 providers @ TT$50–100/mo" },
                { stream: "Lead Fees", low: "TT$720k", high: "TT$1.2M", icon: "📬", desc: "5,000 leads/mo @ TT$12–20" },
                { stream: "Partnerships", low: "TT$200k", high: "TT$500k", icon: "🤝", desc: "Gov, NGO, development agencies" },
              ].map(r => (
                <div key={r.stream} className="p-3 rounded-xl" style={{ background: "#ffffff08" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{r.icon}</span>
                    <p className="text-xs font-medium text-white">{r.stream}</p>
                  </div>
                  <p className="text-xs" style={{ color: "#8A8070" }}>{r.desc}</p>
                  <p className="text-sm font-bold mt-1" style={{ color: "#2ECC71" }}>
                    {r.low} – {r.high}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "#ffffff15" }}>
              <p className="text-xs" style={{ color: "#8A8070" }}>Total Y1 projection</p>
              <p className="text-xl font-bold text-white">TT$2.1M – TT$4.1M</p>
            </div>
          </div>
        </div>

        {/* Grant / partnership data export */}
        <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Data Export for Grants & Partnerships</h3>
              <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>
                Export platform data for development agency reports, grant applications, and investor decks
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Provider Impact Report", desc: "Verified providers, skills, islands", format: "PDF", icon: "📄" },
              { label: "Request Volume Data", desc: "Monthly trends, categories, islands", format: "CSV", icon: "📊" },
              { label: "Economic Impact Summary", desc: "Jobs created, revenue generated", format: "PDF", icon: "🌍" },
            ].map(e => (
              <div key={e.label} className="p-4 rounded-xl border flex items-start gap-3"
                style={{ borderColor: "#E8E2D9" }}>
                <span className="text-2xl">{e.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{e.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>{e.desc}</p>
                  <button className="mt-2 flex items-center gap-1 text-xs font-medium hover:opacity-70 transition"
                    style={{ color: "#FF6B4A" }}>
                    <Download size={11} /> Export {e.format}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}