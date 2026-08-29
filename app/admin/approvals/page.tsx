"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { providers, serviceCategories, getUserById } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { useTheme, colors } from "@/lib/theme";
import { CheckCircle, XCircle, Eye, Shield } from "lucide-react";
import type { VerificationStatus } from "@/lib/data";

export default function ApprovalsPage() {
  const { theme } = useTheme();
  const c = colors;
  const [filter, setFilter] = useState<"all" | VerificationStatus>("all");
  const [providerStates, setProviderStates] = useState<Record<string, VerificationStatus>>(
    Object.fromEntries(providers.map(p => [p.id, p.verification_status]))
  );
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  function approve(id: string) { setProviderStates(prev => ({ ...prev, [id]: "approved" })); }
  function reject(id: string) { setProviderStates(prev => ({ ...prev, [id]: "rejected" })); }

  const filtered = providers.filter(p => filter === "all" || providerStates[p.id] === filter);
  const counts = {
    all: providers.length,
    pending: Object.values(providerStates).filter(s => s === "pending").length,
    approved: Object.values(providerStates).filter(s => s === "approved").length,
    rejected: Object.values(providerStates).filter(s => s === "rejected").length,
  };

  const selectedProv = selectedProvider ? providers.find(p => p.id === selectedProvider) : null;
  const selectedUser = selectedProv ? getUserById(selectedProv.user_id) : null;

  const tabs = [
    { key: "all", label: "All", count: counts.all, color: c.text(theme) },
    { key: "pending", label: "Pending", count: counts.pending, color: "#FFB347" },
    { key: "approved", label: "Approved", count: counts.approved, color: "#2ECC71" },
    { key: "rejected", label: "Rejected", count: counts.rejected, color: "#E63946" },
  ] as const;

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="admin" userName="Credii Admin" userAvatar="CA" />
      <div style={{ padding: "2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Provider Approvals</h1>
          <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>Review and verify provider applications</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "0.625rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key as any)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "0.875rem", border: `2px solid ${filter === tab.key ? tab.color : c.border(theme)}`, background: filter === tab.key ? `${tab.color}12` : c.bgCard(theme), color: filter === tab.key ? tab.color : c.textMuted(theme), fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}>
              {tab.label}
              <span style={{ padding: "0.1rem 0.5rem", borderRadius: "999px", background: filter === tab.key ? `${tab.color}20` : c.bgMuted(theme), fontSize: "0.75rem" }}>{tab.count}</span>
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2rem" }} className="grid-approvals">
          {/* Provider list */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
                <Shield size={32} style={{ color: c.border(theme), margin: "0 auto 1rem" }} />
                <p style={{ fontWeight: 600, color: c.text(theme) }}>No providers in this category</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {filtered.map(p => {
                  const user = getUserById(p.user_id);
                  const status = providerStates[p.id];
                  const cat = serviceCategories.find(cat => cat.id === p.category_ids[0]);
                  const statusColor = status === "approved" ? "#2ECC71" : status === "pending" ? "#FFB347" : "#E63946";
                  return (
                    <div key={p.id} onClick={() => setSelectedProvider(p.id === selectedProvider ? null : p.id)} style={{ padding: "1.25rem", borderRadius: "1rem", border: `2px solid ${selectedProvider === p.id ? "#FF6B4A" : c.border(theme)}`, background: selectedProvider === p.id ? "#FF6B4A05" : c.bgCard(theme), cursor: "pointer", boxShadow: c.shadow(theme) }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                        <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>{user?.avatar}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
                            <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{user?.name}</p>
                            <span style={{ padding: "0.15rem 0.625rem", borderRadius: "999px", background: `${statusColor}18`, color: statusColor, fontSize: "0.75rem", fontWeight: 700, textTransform: "capitalize" }}>{status}</span>
                          </div>
                          <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>📍 {p.island} · {cat?.icon} {cat?.name}</p>
                          <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.bio}</p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.625rem" }}>
                            {p.skills.map(s => <span key={s} style={{ fontSize: "0.75rem", padding: "0.15rem 0.5rem", borderRadius: "999px", background: c.bgMuted(theme), color: c.textMuted(theme) }}>{s}</span>)}
                          </div>
                          <p style={{ fontSize: "0.75rem", color: c.textFaint(theme), marginTop: "0.5rem" }}>Applied {formatDate(p.created_at)}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", flexShrink: 0 }}>
                          <button onClick={e => { e.stopPropagation(); setSelectedProvider(p.id); }} style={{ padding: "0.4rem", borderRadius: "0.5rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), cursor: "pointer", color: c.textMuted(theme) }}><Eye size={14} /></button>
                          {status === "pending" && <>
                            <button onClick={e => { e.stopPropagation(); approve(p.id); }} style={{ padding: "0.4rem", borderRadius: "0.5rem", border: "none", background: "#2ECC7120", cursor: "pointer", color: "#2ECC71" }}><CheckCircle size={14} /></button>
                            <button onClick={e => { e.stopPropagation(); reject(p.id); }} style={{ padding: "0.4rem", borderRadius: "0.5rem", border: "none", background: "#E6394620", cursor: "pointer", color: "#E63946" }}><XCircle size={14} /></button>
                          </>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div>
            {selectedProv && selectedUser ? (
              <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), position: "sticky", top: "5rem", boxShadow: c.shadow(theme) }}>
                <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1.25rem" }}>Provider Detail</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.25rem" }}>
                  <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{selectedUser.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{selectedUser.name}</p>
                    <p style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>{selectedUser.email}</p>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.25rem" }}>
                  {[{ label: "Phone", value: selectedUser.phone }, { label: "Island", value: selectedProv.island }, { label: "Applied", value: formatDate(selectedProv.created_at) }, { label: "Status", value: providerStates[selectedProv.id] }].map(item => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                      <span style={{ color: c.textMuted(theme) }}>{item.label}</span>
                      <span style={{ fontWeight: 600, color: c.text(theme), textTransform: "capitalize" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: c.textMuted(theme), marginBottom: "0.4rem" }}>Bio</p>
                  <p style={{ fontSize: "0.85rem", color: c.text(theme) }}>{selectedProv.bio}</p>
                </div>
                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: c.textMuted(theme), marginBottom: "0.625rem" }}>Documents</p>
                  {["Government ID", "Skill Certificate"].map(doc => (
                    <div key={doc} style={{ display: "flex", alignItems: "center", gap: "0.625rem", padding: "0.625rem", borderRadius: "0.625rem", background: c.bgMuted(theme), marginBottom: "0.4rem" }}>
                      <span>📄</span>
                      <span style={{ fontSize: "0.85rem", flex: 1, color: c.text(theme) }}>{doc}</span>
                      <span style={{ fontSize: "0.75rem", color: "#2ECC71", fontWeight: 600 }}>Submitted</span>
                    </div>
                  ))}
                </div>
                {providerStates[selectedProv.id] === "pending" && (
                  <div style={{ display: "flex", gap: "0.625rem" }}>
                    <button onClick={() => approve(selectedProv.id)} style={{ flex: 1, padding: "0.75rem", borderRadius: "0.875rem", border: "none", background: "#2ECC71", color: "#fff", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}><CheckCircle size={14} /> Approve</button>
                    <button onClick={() => reject(selectedProv.id)} style={{ flex: 1, padding: "0.75rem", borderRadius: "0.875rem", border: `1px solid #E6394640`, background: "#E6394610", color: "#E63946", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}><XCircle size={14} /> Reject</button>
                  </div>
                )}
                {providerStates[selectedProv.id] === "approved" && <div style={{ padding: "0.875rem", borderRadius: "0.875rem", background: "#2ECC7115", color: "#2ECC71", textAlign: "center", fontWeight: 700, fontSize: "0.9rem" }}>✓ Provider is live on Rivva</div>}
                {providerStates[selectedProv.id] === "rejected" && <div style={{ padding: "0.875rem", borderRadius: "0.875rem", background: "#E6394615", color: "#E63946", textAlign: "center", fontWeight: 700, fontSize: "0.9rem" }}>✗ Application rejected</div>}
              </div>
            ) : (
              <div style={{ padding: "3rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), textAlign: "center" }}>
                <Eye size={28} style={{ color: c.border(theme), margin: "0 auto 1rem" }} />
                <p style={{ fontWeight: 600, color: c.text(theme) }}>Select a provider</p>
                <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.4rem" }}>Click any provider to view their full details</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`.grid-approvals{grid-template-columns:1fr 340px;} @media(max-width:1024px){.grid-approvals{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}