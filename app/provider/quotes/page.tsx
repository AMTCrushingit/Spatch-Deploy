"use client";
import Navbar from "@/components/shared/Navbar";
import Badge from "@/components/shared/Badge";
import { quotes, serviceRequests, getCategoryById } from "@/lib/data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

const myQuotes = quotes.filter(q => q.provider_id === "p1");

const stats = {
  total: myQuotes.length,
  accepted: myQuotes.filter(q => q.status === "accepted").length,
  sent: myQuotes.filter(q => q.status === "sent").length,
  rejected: myQuotes.filter(q => q.status === "rejected").length,
  totalValue: myQuotes.filter(q => q.status === "accepted").reduce((s, q) => s + q.price, 0),
};

export default function ProviderQuotesPage() {
  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="provider" userName="Marcus Williams" userAvatar="MW" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>My Quotes</h1>
          <p className="text-sm mt-1" style={{ color: "#8A8070" }}>Track all quotes you've submitted</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Sent", value: stats.total, color: "#0ABFBC", icon: "📬" },
            { label: "Accepted", value: stats.accepted, color: "#2ECC71", icon: "✅" },
            { label: "Pending", value: stats.sent, color: "#FFB347", icon: "⏳" },
            { label: "Won Value", value: formatCurrency(stats.totalValue), color: "#FF6B4A", icon: "💰" },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: "#8A8070" }}>{s.label}</span>
                <span className="text-base">{s.icon}</span>
              </div>
              <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Conversion rate */}
        <div className="p-4 rounded-2xl border mb-6 flex items-center gap-4"
          style={{ borderColor: "#E8E2D9", background: "#F7F4EF" }}>
          <TrendingUp size={20} style={{ color: "#2ECC71" }} />
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>Quote conversion rate</p>
            <p className="text-xs" style={{ color: "#8A8070" }}>
              {stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0}% of your quotes are accepted
            </p>
          </div>
          <div className="w-32 h-2 rounded-full overflow-hidden" style={{ background: "#E8E2D9" }}>
            <div className="h-full rounded-full" style={{
              width: `${stats.total > 0 ? (stats.accepted / stats.total) * 100 : 0}%`,
              background: "#2ECC71"
            }} />
          </div>
        </div>

        {/* Quotes list */}
        {myQuotes.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
            <div className="text-4xl mb-3">📭</div>
            <p className="font-medium" style={{ color: "#1A1A2E" }}>No quotes yet</p>
            <p className="text-sm mt-1" style={{ color: "#8A8070" }}>Browse leads and submit your first quote</p>
            <Link href="/provider/leads"
              className="inline-block mt-4 px-5 py-2 rounded-xl text-white text-sm font-medium"
              style={{ background: "#0ABFBC" }}>Browse Leads</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {myQuotes.map(q => {
              const req = serviceRequests.find(r => r.id === q.request_id);
              const cat = req ? getCategoryById(req.category_id) : null;
              return (
                <div key={q.id} className="p-5 rounded-2xl border hover:shadow-sm transition"
                  style={{ background: "#fff", borderColor: "#E8E2D9" }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "#F7F4EF" }}>{cat?.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>
                            {cat?.name} · {req?.island}
                          </p>
                          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "#8A8070" }}>
                            {req?.description}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold" style={{ color: "#FF6B4A" }}>
                            {formatCurrency(q.price)}
                          </p>
                          <Badge status={q.status} />
                        </div>
                      </div>

                      <div className="mt-3 p-3 rounded-xl text-sm" style={{ background: "#F7F4EF", color: "#1A1A2E" }}>
                        &ldquo;{q.message}&rdquo;
                      </div>

                      <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                        <span className="text-xs" style={{ color: "#8A8070" }}>
                          Submitted {formatDate(q.created_at)}
                        </span>
                        <div className="flex gap-2">
                          {q.status === "accepted" && (
                            <Link href="/provider/chat"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-medium"
                              style={{ background: "#0ABFBC" }}>
                              <MessageSquare size={12} /> Open Chat
                            </Link>
                          )}
                          {q.status === "sent" && (
                            <span className="text-xs px-3 py-1.5 rounded-xl"
                              style={{ background: "#FFB34715", color: "#FFB347" }}>
                              ⏳ Awaiting response
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}