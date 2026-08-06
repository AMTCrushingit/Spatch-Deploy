"use client";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import StatCard from "@/components/shared/StatCard";
import Badge from "@/components/shared/Badge";
import {
  serviceRequests, quotes, serviceCategories,
  getCategoryById, getQuotesByRequestId,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Plus, MessageSquare, Star } from "lucide-react";

const currentUser = { id: "u1", name: "Aaliyah Joseph", avatar: "AJ", island: "Trinidad" };
const myRequests = serviceRequests.filter(r => r.client_id === "cl1");
const myQuotes = quotes.filter(q =>
  myRequests.some(r => r.id === q.request_id)
);

export default function ClientDashboard() {
  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="client" userName={currentUser.name} userAvatar={currentUser.avatar} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>
              Good morning, {currentUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-sm mt-1" style={{ color: "#8A8070" }}>
              📍 {currentUser.island} · Here&apos;s what&apos;s happening with your requests
            </p>
          </div>
          <Link href="/request"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
            style={{ background: "#FF6B4A" }}>
            <Plus size={16} /> New Request
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Requests" value={myRequests.length} icon="📋" color="#FF6B4A" />
          <StatCard label="Open" value={myRequests.filter(r => r.status === "open").length} icon="🟢" color="#2ECC71" trend="Awaiting quotes" />
          <StatCard label="Quotes Received" value={myQuotes.length} icon="📬" color="#0ABFBC" />
          <StatCard label="Jobs Completed" value={myRequests.filter(r => r.status === "closed").length} icon="✅" color="#FFB347" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Requests */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base" style={{ color: "#1A1A2E" }}>My Requests</h2>
              <Link href="/quotes" className="text-xs flex items-center gap-1 hover:opacity-70"
                style={{ color: "#FF6B4A" }}>View all <ArrowRight size={12} /></Link>
            </div>
            <div className="space-y-3">
              {myRequests.map(req => {
                const cat = getCategoryById(req.category_id);
                const reqQuotes = getQuotesByRequestId(req.id);
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
                        </div>
                        <p className="text-xs mt-1 line-clamp-1" style={{ color: "#8A8070" }}>{req.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs" style={{ color: "#8A8070" }}>{formatDate(req.created_at)}</span>
                          <span className="text-xs font-medium" style={{ color: "#0ABFBC" }}>
                            {reqQuotes.length} quote{reqQuotes.length !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                      <Link href="/quotes"
                        className="text-xs px-3 py-1.5 rounded-lg font-medium flex-shrink-0"
                        style={{ background: "#F7F4EF", color: "#1A1A2E" }}>
                        View
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Post new request CTA */}
            <Link href="/request"
              className="mt-3 flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-dashed hover:border-coral transition"
              style={{ borderColor: "#E8E2D9" }}>
              <Plus size={16} style={{ color: "#FF6B4A" }} />
              <span className="text-sm font-medium" style={{ color: "#FF6B4A" }}>Post a new request</span>
            </Link>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Recent quotes */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Recent Quotes</h3>
                <Link href="/quotes" className="text-xs" style={{ color: "#FF6B4A" }}>See all</Link>
              </div>
              <div className="space-y-3">
                {myQuotes.slice(0, 3).map(q => (
                  <div key={q.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>P</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: "#1A1A2E" }}>
                        TT${q.price.toLocaleString()}
                      </p>
                      <p className="text-xs truncate" style={{ color: "#8A8070" }}>{q.message.slice(0, 40)}…</p>
                    </div>
                    <Badge status={q.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <h3 className="font-semibold text-sm mb-4" style={{ color: "#1A1A2E" }}>Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { href: "/request", icon: <Plus size={15} />, label: "Post a Request", color: "#FF6B4A" },
                  { href: "/quotes", icon: <MessageSquare size={15} />, label: "View Quotes", color: "#0ABFBC" },
                  { href: "/chat", icon: <MessageSquare size={15} />, label: "Messages", color: "#FFB347" },
                  { href: "/profile", icon: <Star size={15} />, label: "My Profile", color: "#2ECC71" },
                ].map(a => (
                  <Link key={a.href} href={a.href}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition"
                    style={{ color: "#1A1A2E" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: `${a.color}18`, color: a.color }}>{a.icon}</div>
                    <span className="text-sm">{a.label}</span>
                    <ArrowRight size={12} className="ml-auto" style={{ color: "#8A8070" }} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Island coverage */}
            <div className="p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #1A1A2E, #2D2D4E)" }}>
              <p className="text-xs font-medium mb-3" style={{ color: "#8A8070" }}>🌴 Island Coverage</p>
              <div className="flex flex-wrap gap-1.5">
                {["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"].map(i => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#ffffff15", color: "#fff" }}>{i}</span>
                ))}
              </div>
              <p className="text-xs mt-3 text-white">Expanding to Africa in 2027 🌍</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}