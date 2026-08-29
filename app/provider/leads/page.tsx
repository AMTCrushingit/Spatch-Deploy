"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Badge from "@/components/shared/Badge";
import { serviceRequests, serviceCategories, getCategoryById, providers } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { Filter, MapPin, DollarSign, Clock, Send, X } from "lucide-react";

const currentProvider = providers.find(p => p.user_id === "u2")!;
const islands = ["All Islands", "Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"];

export default function LeadsPage() {
  const { theme } = useTheme();
  const c = colors;
  const [islandFilter, setIslandFilter] = useState("All Islands");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [quoteModal, setQuoteModal] = useState<string | null>(null);
  const [quoteForm, setQuoteForm] = useState({ price: "", message: "" });
  const [submitted, setSubmitted] = useState<string[]>([]);

  const filtered = serviceRequests.filter(r => {
    const islandMatch = islandFilter === "All Islands" || r.island === islandFilter;
    const catMatch = categoryFilter === "all" || r.category_id === categoryFilter;
    return islandMatch && catMatch && r.status === "open";
  });

  function submitQuote(requestId: string) {
    setSubmitted(prev => [...prev, requestId]);
    setQuoteModal(null);
    setQuoteForm({ price: "", message: "" });
  }

  const inp = { width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.inputBg(theme), color: c.text(theme), fontSize: "1rem", outline: "none", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="provider" userName="Marcus Williams" userAvatar="MW" />
      <div style={{ padding: "2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Available Leads</h1>
          <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>Browse open requests and submit your best quote</p>
        </div>

        {/* Filters */}
        <div style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: c.textMuted(theme) }}>
            <Filter size={15} />
            <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>Filter:</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {islands.map(i => (
              <button key={i} onClick={() => setIslandFilter(i)} style={{ padding: "0.4rem 0.875rem", borderRadius: "999px", border: `1px solid ${islandFilter === i ? "#0ABFBC" : c.border(theme)}`, background: islandFilter === i ? "#0ABFBC" : c.bgMuted(theme), color: islandFilter === i ? "#fff" : c.textMuted(theme), fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>{i}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", borderLeft: `1px solid ${c.border(theme)}`, paddingLeft: "0.75rem" }}>
            <button onClick={() => setCategoryFilter("all")} style={{ padding: "0.4rem 0.875rem", borderRadius: "999px", border: `1px solid ${categoryFilter === "all" ? "#FF6B4A" : c.border(theme)}`, background: categoryFilter === "all" ? "#FF6B4A" : c.bgMuted(theme), color: categoryFilter === "all" ? "#fff" : c.textMuted(theme), fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>All</button>
            {serviceCategories.slice(0, 6).map(cat => (
              <button key={cat.id} onClick={() => setCategoryFilter(cat.id)} style={{ padding: "0.4rem 0.875rem", borderRadius: "999px", border: `1px solid ${categoryFilter === cat.id ? "#FF6B4A" : c.border(theme)}`, background: categoryFilter === cat.id ? "#FF6B4A" : c.bgMuted(theme), color: categoryFilter === cat.id ? "#fff" : c.textMuted(theme), fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>{cat.icon} {cat.name}</button>
            ))}
          </div>
        </div>

        <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginBottom: "1.25rem" }}>
          Showing <strong style={{ color: c.text(theme) }}>{filtered.length}</strong> open requests
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <p style={{ fontWeight: 600, color: c.text(theme) }}>No leads match your filters</p>
            <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginTop: "0.5rem" }}>Try adjusting your island or category filter</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.25rem" }} className="leads-grid">
            {filtered.map(req => {
              const cat = getCategoryById(req.category_id);
              const isSubmitted = submitted.includes(req.id);
              return (
                <div key={req.id} style={{ padding: "1.5rem", borderRadius: "1.25rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem", marginBottom: "1rem" }}>
                    <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.875rem", background: c.bgMuted(theme), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{cat?.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, color: c.text(theme), fontSize: "1rem" }}>{cat?.name}</span>
                        <Badge status={req.status} />
                      </div>
                      <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginTop: "0.25rem" }}>{req.description}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem", marginBottom: "1.25rem" }}>
                    {[{ icon: <MapPin size={12} />, text: req.island, color: c.textMuted(theme), bg: c.bgMuted(theme) }, { icon: <DollarSign size={12} />, text: req.budget, color: "#FF6B4A", bg: "#FF6B4A10" }, { icon: <Clock size={12} />, text: formatDate(req.created_at), color: c.textMuted(theme), bg: c.bgMuted(theme) }].map((tag, i) => (
                      <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.3rem 0.75rem", borderRadius: "999px", background: tag.bg, color: tag.color, fontSize: "0.8rem", fontWeight: 600 }}>{tag.icon} {tag.text}</span>
                    ))}
                  </div>
                  {isSubmitted ? (
                    <div style={{ padding: "0.75rem", borderRadius: "0.75rem", background: "#0ABFBC15", color: "#0ABFBC", fontSize: "0.9rem", fontWeight: 600, textAlign: "center" }}>✓ Quote submitted — awaiting client response</div>
                  ) : (
                    <button onClick={() => setQuoteModal(req.id)} style={{ width: "100%", padding: "0.875rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #0ABFBC, #0ABFBC)", color: "#fff", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                      <Send size={15} /> Submit Quote
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quote Modal */}
      {quoteModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", background: "rgba(0,0,0,0.5)" }}>
          <div style={{ width: "100%", maxWidth: "480px", borderRadius: "1.5rem", padding: "2rem", background: c.bgCard(theme), boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
              <h2 style={{ fontWeight: 900, fontSize: "1.3rem", color: c.text(theme) }}>Submit a Quote</h2>
              <button onClick={() => setQuoteModal(null)} style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted(theme) }}><X size={20} /></button>
            </div>
            {(() => {
              const req = serviceRequests.find(r => r.id === quoteModal);
              const cat = req ? getCategoryById(req.category_id) : null;
              return req ? (
                <div style={{ padding: "0.875rem", borderRadius: "0.875rem", background: c.bgMuted(theme), marginBottom: "1.25rem" }}>
                  <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{cat?.icon} {cat?.name} · {req.island}</p>
                  <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.25rem" }}>{req.description}</p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#FF6B4A", marginTop: "0.25rem" }}>Client budget: {req.budget}</p>
                </div>
              ) : null;
            })()}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Your Price (TT$)</label>
                <input type="number" value={quoteForm.price} onChange={e => setQuoteForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g. 1200" style={inp} />
              </div>
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Message to Client</label>
                <textarea value={quoteForm.message} onChange={e => setQuoteForm(f => ({ ...f, message: e.target.value }))} rows={4} placeholder="Introduce yourself and explain your approach…" style={{ ...inp, resize: "none" }} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setQuoteModal(null)} style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), color: c.text(theme), fontWeight: 700, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => submitQuote(quoteModal)} disabled={!quoteForm.price || !quoteForm.message} style={{ flex: 1, padding: "0.875rem", borderRadius: "0.875rem", border: "none", background: (!quoteForm.price || !quoteForm.message) ? c.border(theme) : "linear-gradient(135deg, #0ABFBC, #0ABFBC)", color: "#fff", fontWeight: 700, cursor: (!quoteForm.price || !quoteForm.message) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                <Send size={15} /> Send Quote
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`.leads-grid{grid-template-columns:repeat(2,1fr);} @media(max-width:768px){.leads-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}