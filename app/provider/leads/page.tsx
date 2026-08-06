"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Badge from "@/components/shared/Badge";
import { serviceRequests, serviceCategories, getCategoryById, providers } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { Filter, MapPin, DollarSign, Clock, Send, X } from "lucide-react";

const currentProvider = providers.find(p => p.user_id === "u2")!;
const islands = ["All Islands", "Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"];

export default function LeadsPage() {
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

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="provider" userName="Marcus Williams" userAvatar="MW" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Available Leads</h1>
          <p className="text-sm mt-1" style={{ color: "#8A8070" }}>
            Browse open requests and submit your best quote
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 rounded-2xl border" style={{ borderColor: "#E8E2D9", background: "#F7F4EF" }}>
          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color: "#8A8070" }} />
            <span className="text-xs font-medium" style={{ color: "#8A8070" }}>Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {islands.map(i => (
              <button key={i} onClick={() => setIslandFilter(i)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition"
                style={{
                  borderColor: islandFilter === i ? "#0ABFBC" : "#E8E2D9",
                  background: islandFilter === i ? "#0ABFBC" : "#fff",
                  color: islandFilter === i ? "#fff" : "#8A8070",
                }}>{i}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 border-l pl-3" style={{ borderColor: "#E8E2D9" }}>
            <button onClick={() => setCategoryFilter("all")}
              className="px-3 py-1 rounded-full text-xs font-medium border transition"
              style={{
                borderColor: categoryFilter === "all" ? "#FF6B4A" : "#E8E2D9",
                background: categoryFilter === "all" ? "#FF6B4A" : "#fff",
                color: categoryFilter === "all" ? "#fff" : "#8A8070",
              }}>All Categories</button>
            {serviceCategories.slice(0, 6).map(cat => (
              <button key={cat.id} onClick={() => setCategoryFilter(cat.id)}
                className="px-3 py-1 rounded-full text-xs font-medium border transition"
                style={{
                  borderColor: categoryFilter === cat.id ? "#FF6B4A" : "#E8E2D9",
                  background: categoryFilter === cat.id ? "#FF6B4A" : "#fff",
                  color: categoryFilter === cat.id ? "#fff" : "#8A8070",
                }}>{cat.icon} {cat.name}</button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm mb-4" style={{ color: "#8A8070" }}>
          Showing <strong style={{ color: "#1A1A2E" }}>{filtered.length}</strong> open requests
        </p>

        {/* Leads grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium" style={{ color: "#1A1A2E" }}>No leads match your filters</p>
            <p className="text-sm mt-1" style={{ color: "#8A8070" }}>Try adjusting your island or category filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(req => {
              const cat = getCategoryById(req.category_id);
              const isSubmitted = submitted.includes(req.id);
              return (
                <div key={req.id} className="p-5 rounded-2xl border hover:shadow-md transition"
                  style={{ background: "#fff", borderColor: "#E8E2D9" }}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "#F7F4EF" }}>{cat?.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{cat?.name}</span>
                        <Badge status={req.status} />
                      </div>
                      <p className="text-sm mt-1" style={{ color: "#8A8070" }}>{req.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "#F7F4EF", color: "#8A8070" }}>
                      <MapPin size={11} /> {req.island}
                    </span>
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "#FF6B4A10", color: "#FF6B4A" }}>
                      <DollarSign size={11} /> {req.budget}
                    </span>
                    <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "#F7F4EF", color: "#8A8070" }}>
                      <Clock size={11} /> {formatDate(req.created_at)}
                    </span>
                  </div>

                  {isSubmitted ? (
                    <div className="flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-medium"
                      style={{ background: "#0ABFBC15", color: "#0ABFBC" }}>
                      ✓ Quote submitted — awaiting client response
                    </div>
                  ) : (
                    <button onClick={() => setQuoteModal(req.id)}
                      className="w-full py-2.5 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
                      style={{ background: "#0ABFBC" }}>
                      <Send size={14} /> Submit Quote
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="w-full max-w-md rounded-2xl p-6" style={{ background: "#FFFDF9" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-lg" style={{ color: "#1A1A2E" }}>Submit a Quote</h2>
              <button onClick={() => setQuoteModal(null)} style={{ color: "#8A8070" }}>
                <X size={20} />
              </button>
            </div>

            {/* Request summary */}
            {(() => {
              const req = serviceRequests.find(r => r.id === quoteModal);
              const cat = req ? getCategoryById(req.category_id) : null;
              return req ? (
                <div className="p-3 rounded-xl mb-4" style={{ background: "#F7F4EF" }}>
                  <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>
                    {cat?.icon} {cat?.name} · {req.island}
                  </p>
                  <p className="text-xs mt-1 line-clamp-2" style={{ color: "#8A8070" }}>{req.description}</p>
                  <p className="text-xs mt-1 font-medium" style={{ color: "#FF6B4A" }}>Client budget: {req.budget}</p>
                </div>
              ) : null;
            })()}

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>
                  Your Price (TT$)
                </label>
                <input
                  type="number"
                  value={quoteForm.price}
                  onChange={e => setQuoteForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="e.g. 1200"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }}
                />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>
                  Message to Client
                </label>
                <textarea
                  value={quoteForm.message}
                  onChange={e => setQuoteForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  placeholder="Introduce yourself, explain your approach, and why you're the best fit…"
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button onClick={() => setQuoteModal(null)}
                className="flex-1 py-2.5 rounded-xl border text-sm font-medium"
                style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
                Cancel
              </button>
              <button
                onClick={() => submitQuote(quoteModal)}
                disabled={!quoteForm.price || !quoteForm.message}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-40"
                style={{ background: "#0ABFBC" }}>
                <Send size={14} /> Send Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}