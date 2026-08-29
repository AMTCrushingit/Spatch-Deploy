"use client";
import Navbar from "@/components/shared/Navbar";
import Badge from "@/components/shared/Badge";
import { quotes, serviceRequests, getCategoryById } from "@/lib/data";
import { formatDate, formatCurrency } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

const myQuotes = quotes.filter(q => q.provider_id === "p1");
const stats = {
  total: myQuotes.length,
  accepted: myQuotes.filter(q => q.status === "accepted").length,
  sent: myQuotes.filter(q => q.status === "sent").length,
  totalValue: myQuotes.filter(q => q.status === "accepted").reduce((s, q) => s + q.price, 0),
};

export default function ProviderQuotesPage() {
  const { theme } = useTheme();
  const c = colors;

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="provider" userName="Marcus Williams" userAvatar="MW" />
      <div style={{ padding: "2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>My Quotes</h1>
          <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>Track all quotes you&apos;ve submitted</p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "2rem" }} className="stats-grid">
          {[
            { label: "Total Sent", value: stats.total, color: "#0ABFBC", icon: "📬" },
            { label: "Accepted", value: stats.accepted, color: "#2ECC71", icon: "✅" },
            { label: "Pending", value: stats.sent, color: "#FFB347", icon: "⏳" },
            { label: "Won Value", value: formatCurrency(stats.totalValue), color: "#FF6B4A", icon: "💰" },
          ].map(s => (
            <div key={s.label} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>{s.label}</span>
                <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
              </div>
              <p style={{ fontSize: "1.75rem", fontWeight: 900, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Conversion rate */}
        <div style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem", boxShadow: c.shadow(theme) }}>
          <TrendingUp size={20} style={{ color: "#2ECC71", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>Quote conversion rate</p>
            <p style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>{stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0}% of your quotes are accepted</p>
          </div>
          <div style={{ width: "8rem", height: "0.5rem", borderRadius: "999px", background: c.border(theme), flexShrink: 0 }}>
            <div style={{ height: "100%", borderRadius: "999px", background: "#2ECC71", width: `${stats.total > 0 ? (stats.accepted / stats.total) * 100 : 0}%` }} />
          </div>
        </div>

        {/* Quotes list */}
        {myQuotes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
            <p style={{ fontWeight: 600, color: c.text(theme) }}>No quotes yet</p>
            <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginTop: "0.5rem" }}>Browse leads and submit your first quote</p>
            <Link href="/provider/leads" style={{ display: "inline-block", marginTop: "1.25rem", padding: "0.75rem 1.5rem", borderRadius: "0.875rem", background: "#0ABFBC", color: "#fff", textDecoration: "none", fontWeight: 700 }}>Browse Leads</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {myQuotes.map(q => {
              const req = serviceRequests.find(r => r.id === q.request_id);
              const cat = req ? getCategoryById(req.category_id) : null;
              return (
                <div key={q.id} style={{ padding: "1.5rem", borderRadius: "1.25rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                    <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.875rem", background: c.bgMuted(theme), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{cat?.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                        <div>
                          <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{cat?.name} · {req?.island}</p>
                          <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "300px" }}>{req?.description}</p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#FF6B4A" }}>{formatCurrency(q.price)}</p>
                          <Badge status={q.status} />
                        </div>
                      </div>
                      <div style={{ padding: "0.875rem", borderRadius: "0.75rem", background: c.bgMuted(theme), color: c.text(theme), fontSize: "0.9rem", marginTop: "1rem" }}>
                        &ldquo;{q.message}&rdquo;
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.875rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <span style={{ fontSize: "0.8rem", color: c.textFaint(theme) }}>Submitted {formatDate(q.created_at)}</span>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {q.status === "accepted" && (
                            <Link href="/provider/chat" style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "0.75rem", background: "#0ABFBC", color: "#fff", textDecoration: "none", fontSize: "0.85rem", fontWeight: 700 }}>
                              <MessageSquare size={13} /> Open Chat
                            </Link>
                          )}
                          {q.status === "sent" && (
                            <span style={{ padding: "0.5rem 1rem", borderRadius: "0.75rem", background: "#FFB34715", color: "#E6900A", fontSize: "0.85rem", fontWeight: 600 }}>⏳ Awaiting response</span>
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
      <style>{`.stats-grid{grid-template-columns:repeat(4,1fr);} @media(max-width:768px){.stats-grid{grid-template-columns:1fr 1fr!important;}}`}</style>
    </div>
  );
}