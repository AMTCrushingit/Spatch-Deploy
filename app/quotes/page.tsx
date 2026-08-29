"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Badge from "@/components/shared/Badge";
import { serviceRequests, quotes, providers, users, getCategoryById, getQuotesByRequestId } from "@/lib/data";
import { formatDate, ratingStars, formatCurrency } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { MessageSquare, CheckCircle, XCircle, Star, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

const myRequests = serviceRequests.filter(r => r.client_id === "cl1");

export default function QuotesPage() {
  const { theme } = useTheme();
  const c = colors;
  const [selectedRequest, setSelectedRequest] = useState(myRequests[0]?.id ?? "");
  const [acceptedQuote, setAcceptedQuote] = useState<string | null>("q2");
  const activeRequest = myRequests.find(r => r.id === selectedRequest);
  const requestQuotes = getQuotesByRequestId(selectedRequest);

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="client" userName="Aaliyah Joseph" userAvatar="AJ" />
      <div style={{ padding: "2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>My Quotes</h1>
          <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>Review and accept quotes from verified providers</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "2rem" }} className="grid-quotes">
          {/* Request list */}
          <div>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, color: c.textFaint(theme), letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.875rem" }}>YOUR REQUESTS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {myRequests.map(req => {
                const cat = getCategoryById(req.category_id);
                const qCount = getQuotesByRequestId(req.id).length;
                return (
                  <button key={req.id} onClick={() => setSelectedRequest(req.id)} style={{ width: "100%", textAlign: "left", padding: "1rem", borderRadius: "1rem", border: `2px solid ${selectedRequest === req.id ? "#FF6B4A" : c.border(theme)}`, background: selectedRequest === req.id ? "#FF6B4A08" : c.bgCard(theme), cursor: "pointer", boxShadow: c.shadow(theme) }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{cat?.icon}</span>
                      <span style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.9rem" }}>{cat?.name}</span>
                      <Badge status={req.status} />
                    </div>
                    <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{req.description}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", color: c.textFaint(theme) }}>{formatDate(req.created_at)}</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#0ABFBC" }}>{qCount} quote{qCount !== 1 ? "s" : ""}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quotes panel */}
          <div>
            {activeRequest && (
              <>
                <div style={{ padding: "1rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                    <span style={{ fontSize: "1.75rem" }}>{getCategoryById(activeRequest.category_id)?.icon}</span>
                    <div>
                      <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{getCategoryById(activeRequest.category_id)?.name} · {activeRequest.island}</p>
                      <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.25rem" }}>{activeRequest.description}</p>
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#FF6B4A", marginTop: "0.25rem" }}>Budget: {activeRequest.budget}</p>
                    </div>
                  </div>
                </div>
                {requestQuotes.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📬</div>
                    <p style={{ fontWeight: 600, color: c.text(theme) }}>Waiting for quotes</p>
                    <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginTop: "0.5rem" }}>Providers typically respond within 1–3 hours</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: c.textFaint(theme), letterSpacing: "0.08em", textTransform: "uppercase" }}>{requestQuotes.length} QUOTE{requestQuotes.length !== 1 ? "S" : ""} RECEIVED</p>
                    {requestQuotes.map(q => {
                      const provider = providers.find(p => p.id === q.provider_id);
                      const user = provider ? users.find(u => u.id === provider.user_id) : null;
                      const isAccepted = acceptedQuote === q.id;
                      return (
                        <div key={q.id} style={{ padding: "1.5rem", borderRadius: "1.25rem", border: `2px solid ${isAccepted ? "#2ECC71" : c.border(theme)}`, background: isAccepted ? "#2ECC7108" : c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                          {isAccepted && <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "#2ECC71", fontSize: "0.9rem", fontWeight: 600 }}><CheckCircle size={14} /> Accepted — Job in progress</div>}
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                            <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>{user?.avatar}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                                <div>
                                  <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "1rem" }}>{user?.name}</p>
                                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.25rem", flexWrap: "wrap" }}>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.85rem", color: c.textMuted(theme) }}><MapPin size={12} /> {provider?.island}</span>
                                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.85rem", color: c.textMuted(theme) }}><Briefcase size={12} /> {provider?.completed_jobs} jobs</span>
                                    {provider && provider.rating > 0 && <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#FFB347" }}>{ratingStars(provider.rating)} {provider.rating.toFixed(1)}</span>}
                                  </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                  <p style={{ fontSize: "1.5rem", fontWeight: 900, color: "#FF6B4A" }}>{formatCurrency(q.price)}</p>
                                  <p style={{ fontSize: "0.8rem", color: c.textFaint(theme) }}>{formatDate(q.created_at)}</p>
                                </div>
                              </div>
                              <p style={{ fontSize: "0.95rem", padding: "0.875rem", borderRadius: "0.75rem", background: c.bgMuted(theme), color: c.text(theme), marginTop: "1rem" }}>&ldquo;{q.message}&rdquo;</p>
                              {provider && <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.875rem" }}>{provider.skills.map(s => <span key={s} style={{ fontSize: "0.8rem", padding: "0.2rem 0.625rem", borderRadius: "999px", background: c.bgMuted(theme), color: c.textMuted(theme) }}>{s}</span>)}</div>}
                              {!isAccepted && (
                                <div style={{ display: "flex", gap: "0.625rem", marginTop: "1rem" }}>
                                  <button onClick={() => setAcceptedQuote(q.id)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.625rem 1.25rem", borderRadius: "0.75rem", border: "none", background: "#2ECC71", color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer" }}><CheckCircle size={14} /> Accept</button>
                                  <Link href="/chat" style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.625rem 1.25rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, color: c.text(theme), fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}><MessageSquare size={14} /> Message</Link>
                                  <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.625rem 1.25rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: "transparent", color: c.textMuted(theme), fontSize: "0.9rem", cursor: "pointer" }}><XCircle size={14} /> Decline</button>
                                </div>
                              )}
                              {isAccepted && (
                                <div style={{ display: "flex", gap: "0.625rem", marginTop: "1rem" }}>
                                  <Link href="/chat" style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.625rem 1.25rem", borderRadius: "0.75rem", background: "#0ABFBC", color: "#fff", fontSize: "0.9rem", fontWeight: 700, textDecoration: "none" }}><MessageSquare size={14} /> Open Chat</Link>
                                  <button style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.625rem 1.25rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: "transparent", color: c.textMuted(theme), fontSize: "0.9rem", cursor: "pointer" }}><Star size={14} /> Leave Review</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`.grid-quotes{grid-template-columns:300px 1fr;} @media(max-width:900px){.grid-quotes{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}