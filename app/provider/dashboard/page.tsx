"use client";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import {
  serviceRequests, quotes, serviceCategories,
  getCategoryById, providers, users,
} from "@/lib/data";
import { formatDate, formatCurrency, ratingStars } from "@/lib/utils";
import { ArrowRight, TrendingUp, Clock, Star, Zap } from "lucide-react";

const currentProvider = providers.find(p => p.user_id === "u2")!;
const currentUser = users.find(u => u.id === "u2")!;
const myQuotes = quotes.filter(q => q.provider_id === currentProvider.id);
const acceptedQuotes = myQuotes.filter(q => q.status === "accepted");

// Available leads on my island + category
const availableLeads = serviceRequests.filter(r =>
  r.island === currentProvider.island &&
  currentProvider.category_ids.some(c => c === r.category_id) &&
  r.status === "open"
);

export default function ProviderDashboard() {
  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="provider" userName={currentUser.name} userAvatar={currentUser.avatar} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
                Welcome back, {currentUser.name.split(" ")[0]} 👋
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "#2ECC7115", color: "#2ECC71" }}>✓ Verified</span>
            </div>
            <p className="text-sm" style={{ color: "#8A8070" }}>
              📍 {currentProvider.island} · ⚡ Electrical · Responds in ~{currentProvider.response_speed}h
            </p>
          </div>
          <Link href="/provider/leads"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
            style={{ background: "#0ABFBC" }}>
            <Zap size={16} /> View Leads
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Completed Jobs" value={currentProvider.completed_jobs} icon="✅" color="#2ECC71" trend="+12 this month" />
          <StatCard label="Rating" value={`${currentProvider.rating}★`} icon="⭐" color="#FFB347" />
          <StatCard label="Quotes Sent" value={myQuotes.length} icon="📬" color="#0ABFBC" />
          <StatCard label="Active Jobs" value={acceptedQuotes.length} icon="🔧" color="#FF6B4A" trend="In progress" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Available Leads */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base" style={{ color: "#1A1A2E" }}>
                Available Leads
                {availableLeads.length > 0 && (
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "#FF6B4A15", color: "#FF6B4A" }}>
                    {availableLeads.length} new
                  </span>
                )}
              </h2>
              <Link href="/provider/leads" className="text-xs flex items-center gap-1 hover:opacity-70"
                style={{ color: "#0ABFBC" }}>View all <ArrowRight size={12} /></Link>
            </div>

            {availableLeads.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                <div className="text-3xl mb-2">📭</div>
                <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>No leads right now</p>
                <p className="text-xs mt-1" style={{ color: "#8A8070" }}>New requests on {currentProvider.island} will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {availableLeads.map(req => {
                  const cat = getCategoryById(req.category_id);
                  const alreadyQuoted = myQuotes.some(q => q.request_id === req.id);
                  return (
                    <div key={req.id} className="p-4 rounded-2xl border hover:shadow-sm transition"
                      style={{ background: "#fff", borderColor: "#E8E2D9" }}>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                          style={{ background: "#F7F4EF" }}>{cat?.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-sm" style={{ color: "#1A1A2E" }}>{cat?.name}</span>
                            <Badge status={req.status} />
                            {alreadyQuoted && (
                              <span className="text-xs px-2 py-0.5 rounded-full"
                                style={{ background: "#0ABFBC15", color: "#0ABFBC" }}>Quoted</span>
                            )}
                          </div>
                          <p className="text-xs mt-1 line-clamp-2" style={{ color: "#8A8070" }}>{req.description}</p>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className="text-xs" style={{ color: "#8A8070" }}>📍 {req.island}</span>
                            <span className="text-xs font-medium" style={{ color: "#FF6B4A" }}>{req.budget}</span>
                            <span className="text-xs" style={{ color: "#8A8070" }}>{formatDate(req.created_at)}</span>
                          </div>
                        </div>
                        {!alreadyQuoted && (
                          <Link href="/provider/leads"
                            className="text-xs px-3 py-1.5 rounded-lg font-medium text-white flex-shrink-0"
                            style={{ background: "#0ABFBC" }}>
                            Quote
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* My Quotes */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-base" style={{ color: "#1A1A2E" }}>My Quotes</h2>
                <Link href="/provider/quotes" className="text-xs flex items-center gap-1 hover:opacity-70"
                  style={{ color: "#0ABFBC" }}>View all <ArrowRight size={12} /></Link>
              </div>
              <div className="space-y-3">
                {myQuotes.map(q => {
                  const req = serviceRequests.find(r => r.id === q.request_id);
                  const cat = req ? getCategoryById(req.category_id) : null;
                  return (
                    <div key={q.id} className="p-4 rounded-2xl border flex items-center gap-3"
                      style={{ borderColor: "#E8E2D9" }}>
                      <span className="text-xl">{cat?.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{cat?.name}</p>
                        <p className="text-xs truncate" style={{ color: "#8A8070" }}>{q.message.slice(0, 50)}…</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold" style={{ color: "#FF6B4A" }}>{formatCurrency(q.price)}</p>
                        <Badge status={q.status} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Profile summary */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                  {currentUser.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{currentUser.name}</p>
                  <p className="text-xs" style={{ color: "#FFB347" }}>{ratingStars(currentProvider.rating)} {currentProvider.rating}</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Subscription", value: "Pro · TT$100/mo", color: "#0ABFBC" },
                  { label: "Response speed", value: `~${currentProvider.response_speed}h avg` },
                  { label: "Member since", value: formatDate(currentProvider.created_at) },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-xs">
                    <span style={{ color: "#8A8070" }}>{item.label}</span>
                    <span className="font-medium" style={{ color: item.color ?? "#1A1A2E" }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <Link href="/provider/profile"
                className="mt-4 block text-center py-2 rounded-xl border text-xs font-medium hover:bg-gray-50 transition"
                style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
                View Full Profile
              </Link>
            </div>

            {/* Earnings preview */}
            <div className="p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #1A1A2E, #2D2D4E)" }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} style={{ color: "#FFB347" }} />
                <p className="text-sm font-semibold text-white">Earnings (Phase 2)</p>
              </div>
              <p className="text-2xl font-bold text-white">TT$0</p>
              <p className="text-xs mt-1" style={{ color: "#8A8070" }}>Payments launch in Phase 2</p>
              <div className="mt-3 pt-3 border-t" style={{ borderColor: "#ffffff15" }}>
                <p className="text-xs" style={{ color: "#8A8070" }}>Projected monthly</p>
                <p className="text-lg font-bold" style={{ color: "#2ECC71" }}>TT$8,400</p>
                <p className="text-xs" style={{ color: "#8A8070" }}>Based on {currentProvider.completed_jobs} completed jobs</p>
              </div>
            </div>

            {/* Quick links */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Quick Links</h3>
              <div className="space-y-2">
                {[
                  { href: "/provider/leads", label: "Browse Leads", icon: "🔍" },
                  { href: "/provider/quotes", label: "My Quotes", icon: "📬" },
                  { href: "/provider/verification", label: "Verification Status", icon: "🛡️" },
                  { href: "/provider/profile", label: "Edit Profile", icon: "✏️" },
                ].map(l => (
                  <Link key={l.href} href={l.href}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition text-sm"
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