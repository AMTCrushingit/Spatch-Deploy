"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { providers, users, serviceCategories, getUserById } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { CheckCircle, XCircle, Eye, Shield, Clock, Filter } from "lucide-react";
import type { VerificationStatus } from "@/lib/data";

export default function ApprovalsPage() {
  const [filter, setFilter] = useState<"all" | VerificationStatus>("all");
  const [providerStates, setProviderStates] = useState<Record<string, VerificationStatus>>(
    Object.fromEntries(providers.map(p => [p.id, p.verification_status]))
  );
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  function approve(id: string) {
    setProviderStates(prev => ({ ...prev, [id]: "approved" }));
  }
  function reject(id: string) {
    setProviderStates(prev => ({ ...prev, [id]: "rejected" }));
  }

  const filtered = providers.filter(p =>
    filter === "all" || providerStates[p.id] === filter
  );

  const counts = {
    all: providers.length,
    pending: Object.values(providerStates).filter(s => s === "pending").length,
    approved: Object.values(providerStates).filter(s => s === "approved").length,
    rejected: Object.values(providerStates).filter(s => s === "rejected").length,
  };

  const selectedProv = selectedProvider ? providers.find(p => p.id === selectedProvider) : null;
  const selectedUser = selectedProv ? getUserById(selectedProv.user_id) : null;

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="admin" userName="Credii Admin" userAvatar="CA" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Provider Approvals</h1>
          <p className="text-sm mt-1" style={{ color: "#8A8070" }}>
            Review and verify provider applications
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {([
            { key: "all", label: "All", count: counts.all, color: "#1A1A2E" },
            { key: "pending", label: "Pending", count: counts.pending, color: "#FFB347" },
            { key: "approved", label: "Approved", count: counts.approved, color: "#2ECC71" },
            { key: "rejected", label: "Rejected", count: counts.rejected, color: "#FF6B4A" },
          ] as const).map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition"
              style={{
                borderColor: filter === tab.key ? tab.color : "#E8E2D9",
                background: filter === tab.key ? `${tab.color}12` : "#fff",
                color: filter === tab.key ? tab.color : "#8A8070",
              }}>
              {tab.label}
              <span className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: filter === tab.key ? `${tab.color}20` : "#F7F4EF" }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Provider list */}
          <div className="lg:col-span-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                <Shield size={32} className="mx-auto mb-3" style={{ color: "#E8E2D9" }} />
                <p className="font-medium" style={{ color: "#1A1A2E" }}>No providers in this category</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(p => {
                  const user = getUserById(p.user_id);
                  const status = providerStates[p.id];
                  const cat = serviceCategories.find(c => c.id === p.category_ids[0]);
                  return (
                    <div key={p.id}
                      className="p-5 rounded-2xl border hover:shadow-sm transition cursor-pointer"
                      style={{
                        borderColor: selectedProvider === p.id ? "#FF6B4A" : "#E8E2D9",
                        background: selectedProvider === p.id ? "#FF6B4A05" : "#fff",
                      }}
                      onClick={() => setSelectedProvider(p.id === selectedProvider ? null : p.id)}>
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                          style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                          {user?.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{user?.name}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize
                              ${status === "approved" ? "bg-green-100 text-green-700" :
                                status === "pending" ? "bg-amber-100 text-amber-700" :
                                "bg-red-100 text-red-600"}`}>
                              {status}
                            </span>
                          </div>
                          <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>
                            📍 {p.island} · {cat?.icon} {cat?.name}
                          </p>
                          <p className="text-xs mt-1 line-clamp-1" style={{ color: "#8A8070" }}>{p.bio}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {p.skills.map(s => (
                              <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                                style={{ background: "#F7F4EF", color: "#8A8070" }}>{s}</span>
                            ))}
                          </div>
                          <p className="text-xs mt-2" style={{ color: "#8A8070" }}>
                            Applied {formatDate(p.created_at)}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 flex-shrink-0">
                          <button onClick={e => { e.stopPropagation(); setSelectedProvider(p.id); }}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                            style={{ color: "#8A8070" }}>
                            <Eye size={15} />
                          </button>
                          {status === "pending" && (
                            <>
                              <button onClick={e => { e.stopPropagation(); approve(p.id); }}
                                className="p-1.5 rounded-lg hover:bg-green-50 transition"
                                style={{ color: "#2ECC71" }}>
                                <CheckCircle size={15} />
                              </button>
                              <button onClick={e => { e.stopPropagation(); reject(p.id); }}
                                className="p-1.5 rounded-lg hover:bg-red-50 transition"
                                style={{ color: "#FF6B4A" }}>
                                <XCircle size={15} />
                              </button>
                            </>
                          )}
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
              <div className="p-5 rounded-2xl border sticky top-24" style={{ borderColor: "#E8E2D9" }}>
                <h3 className="font-semibold text-sm mb-4" style={{ color: "#1A1A2E" }}>Provider Detail</h3>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{selectedUser.name}</p>
                    <p className="text-xs" style={{ color: "#8A8070" }}>{selectedUser.email}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {[
                    { label: "Phone", value: selectedUser.phone },
                    { label: "Island", value: selectedProv.island },
                    { label: "Applied", value: formatDate(selectedProv.created_at) },
                    { label: "Status", value: providerStates[selectedProv.id] },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-xs">
                      <span style={{ color: "#8A8070" }}>{item.label}</span>
                      <span className="font-medium capitalize" style={{ color: "#1A1A2E" }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium mb-1" style={{ color: "#8A8070" }}>Bio</p>
                  <p className="text-xs" style={{ color: "#1A1A2E" }}>{selectedProv.bio}</p>
                </div>

                {/* Documents */}
                <div className="mb-4">
                  <p className="text-xs font-medium mb-2" style={{ color: "#8A8070" }}>Documents</p>
                  <div className="space-y-2">
                    {["Government ID", "Skill Certificate"].map(doc => (
                      <div key={doc} className="flex items-center gap-2 p-2 rounded-lg"
                        style={{ background: "#F7F4EF" }}>
                        <span className="text-sm">📄</span>
                        <span className="text-xs flex-1" style={{ color: "#1A1A2E" }}>{doc}</span>
                        <span className="text-xs" style={{ color: "#2ECC71" }}>Submitted</span>
                      </div>
                    ))}
                  </div>
                </div>

                {providerStates[selectedProv.id] === "pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => approve(selectedProv.id)}
                      className="flex-1 py-2.5 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-1.5 hover:opacity-90 transition"
                      style={{ background: "#2ECC71" }}>
                      <CheckCircle size={14} /> Approve
                    </button>
                    <button onClick={() => reject(selectedProv.id)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-1.5 border hover:bg-red-50 transition"
                      style={{ borderColor: "#FF6B4A40", color: "#FF6B4A" }}>
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                )}
                {providerStates[selectedProv.id] === "approved" && (
                  <div className="p-3 rounded-xl text-center text-sm font-medium"
                    style={{ background: "#2ECC7115", color: "#2ECC71" }}>
                    ✓ Provider is live on Spatch
                  </div>
                )}
                {providerStates[selectedProv.id] === "rejected" && (
                  <div className="p-3 rounded-xl text-center text-sm font-medium"
                    style={{ background: "#FF6B4A15", color: "#FF6B4A" }}>
                    ✗ Application rejected
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl border text-center" style={{ borderColor: "#E8E2D9" }}>
                <Eye size={28} className="mx-auto mb-3" style={{ color: "#E8E2D9" }} />
                <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>Select a provider</p>
                <p className="text-xs mt-1" style={{ color: "#8A8070" }}>Click any provider to view their full details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}