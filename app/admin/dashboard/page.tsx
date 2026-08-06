"use client";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import {
  providers, users, serviceRequests, analyticsData,
  getCategoryById, getUserById,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ArrowRight, AlertCircle, TrendingUp, Globe } from "lucide-react";

const pendingProviders = providers.filter(p => p.verification_status === "pending");
const recentRequests = serviceRequests.slice(-3).reverse();

export default function AdminDashboard() {
  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="admin" userName="Credii Admin" userAvatar="CA" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Credii Admin Panel</h1>
            <p className="text-sm mt-1" style={{ color: "#8A8070" }}>
              Spatch platform overview · August 6, 2026
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/admin/analytics"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium hover:bg-gray-50 transition"
              style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
              <TrendingUp size={15} /> Analytics
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
              style={{ background: "#FF6B4A" }}>
              Export Data
            </button>
          </div>
        </div>

        {/* Alert: pending approvals */}
        {pendingProviders.length > 0 && (
          <div className="mb-6 p-4 rounded-2xl flex items-center gap-3"
            style={{ background: "#FFB34715", border: "1px solid #FFB34730" }}>
            <AlertCircle size={18} style={{ color: "#FFB347", flexShrink: 0 }} />
            <p className="text-sm" style={{ color: "#1A1A2E" }}>
              <strong>{pendingProviders.length} provider{pendingProviders.length > 1 ? "s" : ""}</strong> awaiting verification approval.
            </p>
            <Link href="/admin/approvals"
              className="ml-auto text-xs font-medium px-3 py-1.5 rounded-lg text-white flex-shrink-0"
              style={{ background: "#FFB347" }}>
              Review Now <ArrowRight size={12} className="inline ml-1" />
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Providers" value={analyticsData.totalProviders} icon="🔧" color="#0ABFBC" trend={`${analyticsData.approvedProviders} approved`} />
          <StatCard label="Total Clients" value={analyticsData.totalClients} icon="👥" color="#FF6B4A" />
          <StatCard label="Total Requests" value={analyticsData.totalRequests} icon="📋" color="#FFB347" trend={`${analyticsData.openRequests} open`} />
          <StatCard label="Pending Approvals" value={analyticsData.pendingProviders} icon="⏳" color="#FF6B4A" trend="Needs action" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending providers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-base" style={{ color: "#1A1A2E" }}>
                  Pending Approvals
                  {pendingProviders.length > 0 && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full"
                      style={{ background: "#FFB34715", color: "#FFB347" }}>
                      {pendingProviders.length}
                    </span>
                  )}
                </h2>
                <Link href="/admin/approvals" className="text-xs flex items-center gap-1 hover:opacity-70"
                  style={{ color: "#FF6B4A" }}>View all <ArrowRight size={12} /></Link>
              </div>
              {pendingProviders.length === 0 ? (
                <div className="p-6 rounded-2xl border text-center" style={{ borderColor: "#E8E2D9" }}>
                  <p className="text-sm" style={{ color: "#8A8070" }}>No pending approvals 🎉</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingProviders.map(p => {
                    const user = getUserById(p.user_id);
                    return (
                      <div key={p.id} className="p-4 rounded-2xl border flex items-center gap-4"
                        style={{ borderColor: "#E8E2D9", background: "#fff" }}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                          {user?.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm" style={{ color: "#1A1A2E" }}>{user?.name}</p>
                          <p className="text-xs" style={{ color: "#8A8070" }}>
                            📍 {p.island} · {p.skills.join(", ")}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>
                            Applied {formatDate(p.created_at)}
                          </p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Link href="/admin/approvals"
                            className="px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                            style={{ background: "#2ECC71" }}>Approve</Link>
                          <button className="px-3 py-1.5 rounded-lg text-xs font-medium border"
                            style={{ borderColor: "#E8E2D9", color: "#8A8070" }}>Reject</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Recent requests */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-base" style={{ color: "#1A1A2E" }}>Recent Requests</h2>
                <Link href="/admin/analytics" className="text-xs flex items-center gap-1 hover:opacity-70"
                  style={{ color: "#FF6B4A" }}>Analytics <ArrowRight size={12} /></Link>
              </div>
              <div className="space-y-3">
                {recentRequests.map(req => {
                  const cat = getCategoryById(req.category_id);
                  return (
                    <div key={req.id} className="p-4 rounded-2xl border flex items-center gap-3"
                      style={{ borderColor: "#E8E2D9" }}>
                      <span className="text-xl">{cat?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{cat?.name}</p>
                        <p className="text-xs truncate" style={{ color: "#8A8070" }}>{req.description}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>📍 {req.island} · {formatDate(req.created_at)}</p>
                      </div>
                      <Badge status={req.status} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Island breakdown */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <div className="flex items-center gap-2 mb-4">
                <Globe size={16} style={{ color: "#0ABFBC" }} />
                <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Island Breakdown</h3>
              </div>
              <div className="space-y-3">
                {analyticsData.islandBreakdown.map(island => (
                  <div key={island.island}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: "#1A1A2E" }}>📍 {island.island}</span>
                      <span style={{ color: "#8A8070" }}>{island.providers}P · {island.clients}C · {island.requests}R</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ background: "#E8E2D9" }}>
                      <div className="h-full rounded-full" style={{
                        width: `${Math.max(10, (island.providers / analyticsData.totalProviders) * 100)}%`,
                        background: "linear-gradient(90deg, #FF6B4A, #0ABFBC)"
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue projection */}
            <div className="p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #1A1A2E, #2D2D4E)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#8A8070" }}>Revenue Projection (Y1)</p>
              <p className="text-2xl font-bold text-white">TT$1.2M–2.4M</p>
              <p className="text-xs mt-1" style={{ color: "#8A8070" }}>Based on 2,000 providers @ TT$50–100/mo</p>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Subscriptions", value: "TT$1.2M" },
                  { label: "Lead fees", value: "TT$720k" },
                  { label: "Partnerships", value: "TT$300k" },
                ].map(r => (
                  <div key={r.label} className="flex justify-between text-xs">
                    <span style={{ color: "#8A8070" }}>{r.label}</span>
                    <span className="font-medium" style={{ color: "#2ECC71" }}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick nav */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Admin Actions</h3>
              <div className="space-y-2">
                {[
                  { href: "/admin/approvals", label: "Provider Approvals", icon: "🛡️" },
                  { href: "/admin/categories", label: "Manage Categories", icon: "📂" },
                  { href: "/admin/analytics", label: "View Analytics", icon: "📊" },
                ].map(l => (
                  <Link key={l.href} href={l.href}
                    className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-gray-50 transition text-sm"
                    style={{ color: "#1A1A2E" }}>
                    <span>{l.icon}</span> {l.label}
                    <ArrowRight size={12} className="ml-auto" style={{ color: "#8A8070" }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}