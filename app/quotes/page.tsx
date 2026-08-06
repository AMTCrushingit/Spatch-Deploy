"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Badge from "@/components/shared/Badge";
import {
  serviceRequests, quotes, providers, users,
  getCategoryById, getQuotesByRequestId,
} from "@/lib/data";
import { formatDate, ratingStars, formatCurrency } from "@/lib/utils";
import { MessageSquare, CheckCircle, XCircle, Star, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

const myRequests = serviceRequests.filter(r => r.client_id === "cl1");

export default function QuotesPage() {
  const [selectedRequest, setSelectedRequest] = useState(myRequests[0]?.id ?? "");
  const [acceptedQuote, setAcceptedQuote] = useState<string | null>("q2");

  const activeRequest = myRequests.find(r => r.id === selectedRequest);
  const requestQuotes = getQuotesByRequestId(selectedRequest);

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="client" userName="Aaliyah Joseph" userAvatar="AJ" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>My Quotes</h1>
          <p className="text-sm mt-1" style={{ color: "#8A8070" }}>Review and accept quotes from verified providers</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Request list */}
          <div>
            <h2 className="text-sm font-semibold mb-3" style={{ color: "#8A8070" }}>YOUR REQUESTS</h2>
            <div className="space-y-2">
              {myRequests.map(req => {
                const cat = getCategoryById(req.category_id);
                const qCount = getQuotesByRequestId(req.id).length;
                return (
                  <button key={req.id} onClick={() => setSelectedRequest(req.id)}
                    className="w-full text-left p-4 rounded-2xl border transition"
                    style={{
                      borderColor: selectedRequest === req.id ? "#FF6B4A" : "#E8E2D9",
                      background: selectedRequest === req.id ? "#FF6B4A08" : "#fff",
                    }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{cat?.icon}</span>
                      <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{cat?.name}</span>
                      <Badge status={req.status} className="ml-auto" />
                    </div>
                    <p className="text-xs line-clamp-1" style={{ color: "#8A8070" }}>{req.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs" style={{ color: "#8A8070" }}>{formatDate(req.created_at)}</span>
                      <span className="text-xs font-medium" style={{ color: "#0ABFBC" }}>
                        {qCount} quote{qCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quotes panel */}
          <div className="lg:col-span-2">
            {activeRequest && (
              <>
                {/* Request summary */}
                <div className="p-4 rounded-2xl border mb-5" style={{ borderColor: "#E8E2D9", background: "#F7F4EF" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getCategoryById(activeRequest.category_id)?.icon}</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>
                        {getCategoryById(activeRequest.category_id)?.name} · {activeRequest.island}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#8A8070" }}>{activeRequest.description}</p>
                      <p className="text-xs mt-1 font-medium" style={{ color: "#FF6B4A" }}>Budget: {activeRequest.budget}</p>
                    </div>
                  </div>
                </div>

                {requestQuotes.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-3">📬</div>
                    <p className="font-medium" style={{ color: "#1A1A2E" }}>Waiting for quotes</p>
                    <p className="text-sm mt-1" style={{ color: "#8A8070" }}>Providers typically respond within 1–3 hours</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-sm font-semibold" style={{ color: "#8A8070" }}>
                      {requestQuotes.length} QUOTE{requestQuotes.length !== 1 ? "S" : ""} RECEIVED
                    </h2>
                    {requestQuotes.map(q => {
                      const provider = providers.find(p => p.id === q.provider_id);
                      const user = provider ? users.find(u => u.id === provider.user_id) : null;
                      const isAccepted = acceptedQuote === q.id;

                      return (
                        <div key={q.id}
                          className="p-5 rounded-2xl border transition"
                          style={{
                            borderColor: isAccepted ? "#2ECC71" : "#E8E2D9",
                            background: isAccepted ? "#2ECC7108" : "#fff",
                          }}>
                          {isAccepted && (
                            <div className="flex items-center gap-1.5 mb-3 text-xs font-medium"
                              style={{ color: "#2ECC71" }}>
                              <CheckCircle size={14} /> Accepted — Job in progress
                            </div>
                          )}

                          <div className="flex items-start gap-4">
                            {/* Provider avatar */}
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                              style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                              {user?.avatar}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 flex-wrap">
                                <div>
                                  <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{user?.name}</p>
                                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                                    <span className="flex items-center gap-1 text-xs" style={{ color: "#8A8070" }}>
                                      <MapPin size={11} /> {provider?.island}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs" style={{ color: "#8A8070" }}>
                                      <Briefcase size={11} /> {provider?.completed_jobs} jobs
                                    </span>
                                    {provider && provider.rating > 0 && (
                                      <span className="text-xs font-medium" style={{ color: "#FFB347" }}>
                                        {ratingStars(provider.rating)} {provider.rating.toFixed(1)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xl font-bold" style={{ color: "#FF6B4A" }}>
                                    {formatCurrency(q.price)}
                                  </p>
                                  <p className="text-xs" style={{ color: "#8A8070" }}>{formatDate(q.created_at)}</p>
                                </div>
                              </div>

                              <p className="text-sm mt-3 p-3 rounded-xl" style={{ background: "#F7F4EF", color: "#1A1A2E" }}>
                                &ldquo;{q.message}&rdquo;
                              </p>

                              {/* Skills */}
                              {provider && (
                                <div className="flex flex-wrap gap-1.5 mt-3">
                                  {provider.skills.map(s => (
                                    <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                                      style={{ background: "#F7F4EF", color: "#8A8070" }}>{s}</span>
                                  ))}
                                </div>
                              )}

                              {/* Actions */}
                              {!isAccepted && (
                                <div className="flex gap-2 mt-4">
                                  <button onClick={() => setAcceptedQuote(q.id)}
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-medium hover:opacity-90 transition"
                                    style={{ background: "#2ECC71" }}>
                                    <CheckCircle size={13} /> Accept Quote
                                  </button>
                                  <Link href="/chat"
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border hover:bg-gray-50 transition"
                                    style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
                                    <MessageSquare size={13} /> Message
                                  </Link>
                                  <button
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border hover:bg-gray-50 transition"
                                    style={{ borderColor: "#E8E2D9", color: "#8A8070" }}>
                                    <XCircle size={13} /> Decline
                                  </button>
                                </div>
                              )}
                              {isAccepted && (
                                <div className="flex gap-2 mt-4">
                                  <Link href="/chat"
                                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-medium hover:opacity-90 transition"
                                    style={{ background: "#0ABFBC" }}>
                                    <MessageSquare size={13} /> Open Chat
                                  </Link>
                                  <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border"
                                    style={{ borderColor: "#E8E2D9", color: "#8A8070" }}>
                                    <Star size={13} /> Leave Review
                                  </button>
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
    </div>
  );
}