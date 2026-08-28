"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { providers, users } from "@/lib/data";
import { CheckCircle, Clock, Upload, Shield, AlertCircle, ArrowRight } from "lucide-react";

const currentProvider = providers.find(p => p.user_id === "u2")!;
const currentUser = users.find(u => u.id === "u2")!;

const verificationSteps = [
  { id: "account", label: "Account Created", status: "done", icon: "✅", desc: "Your Rivva account is active" },
  { id: "id", label: "ID Verification", status: "done", icon: "🪪", desc: "Government-issued ID submitted and verified" },
  { id: "skill", label: "Skill Verification", status: "done", icon: "🎓", desc: "Electrical licence verified by Credii admin" },
  { id: "approved", label: "Profile Approved", status: "done", icon: "🛡️", desc: "You are a verified Rivva provider" },
];

export default function VerificationPage() {
  const [uploading, setUploading] = useState<string | null>(null);

  function simulateUpload(docType: string) {
    setUploading(docType);
    setTimeout(() => setUploading(null), 2000);
  }

  const isApproved = currentProvider.verification_status === "approved";

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="provider" userName={currentUser.name} userAvatar={currentUser.avatar} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Verification Status</h1>
          <p className="text-sm mt-1" style={{ color: "#8A8070" }}>
            Verified providers get more leads and higher client trust
          </p>
        </div>

        {/* Status banner */}
        <div className="p-5 rounded-2xl mb-6 flex items-center gap-4"
          style={{
            background: isApproved ? "#2ECC7110" : "#FFB34710",
            border: `1px solid ${isApproved ? "#2ECC7130" : "#FFB34730"}`,
          }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: isApproved ? "#2ECC7120" : "#FFB34720" }}>
            {isApproved
              ? <Shield size={24} style={{ color: "#2ECC71" }} />
              : <Clock size={24} style={{ color: "#FFB347" }} />}
          </div>
          <div>
            <p className="font-bold text-base" style={{ color: "#1A1A2E" }}>
              {isApproved ? "✓ Fully Verified Provider" : "⏳ Verification Pending"}
            </p>
            <p className="text-sm mt-0.5" style={{ color: "#8A8070" }}>
              {isApproved
                ? "Your profile is live and visible to clients across the Caribbean"
                : "Your documents are under review. Typically 24–48 hours."}
            </p>
          </div>
          {isApproved && (
            <div className="ml-auto flex-shrink-0">
              <span className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: "#2ECC71", color: "#fff" }}>Active</span>
            </div>
          )}
        </div>

        {/* Verification steps */}
        <div className="mb-6">
          <h2 className="font-semibold text-sm mb-4" style={{ color: "#1A1A2E" }}>Verification Checklist</h2>
          <div className="space-y-3">
            {verificationSteps.map((step, i) => (
              <div key={step.id} className="flex items-start gap-4 p-4 rounded-2xl border"
                style={{ borderColor: step.status === "done" ? "#2ECC7130" : "#E8E2D9",
                  background: step.status === "done" ? "#2ECC7105" : "#fff" }}>
                {/* Step connector */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-base"
                    style={{ background: step.status === "done" ? "#2ECC7120" : "#F7F4EF" }}>
                    {step.status === "done" ? <CheckCircle size={18} style={{ color: "#2ECC71" }} /> : step.icon}
                  </div>
                  {i < verificationSteps.length - 1 && (
                    <div className="w-0.5 h-4 mt-1" style={{ background: "#E8E2D9" }} />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-medium text-sm" style={{ color: "#1A1A2E" }}>{step.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>{step.desc}</p>
                </div>
                {step.status === "done" && (
                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 mt-1"
                    style={{ background: "#2ECC7115", color: "#2ECC71" }}>Done</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Documents section */}
        <div className="mb-6">
          <h2 className="font-semibold text-sm mb-4" style={{ color: "#1A1A2E" }}>Submitted Documents</h2>
          <div className="space-y-3">
            {[
              { label: "Government-issued ID", type: "id", status: "verified", file: "passport_marcus_williams.pdf" },
              { label: "Electrical Licence", type: "licence", status: "verified", file: "electrical_licence_2026.pdf" },
            ].map(doc => (
              <div key={doc.type} className="p-4 rounded-2xl border flex items-center gap-4"
                style={{ borderColor: "#E8E2D9" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: "#F7F4EF" }}>📄</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{doc.label}</p>
                  <p className="text-xs truncate" style={{ color: "#8A8070" }}>{doc.file}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0"
                  style={{ background: "#2ECC7115", color: "#2ECC71" }}>
                  ✓ Verified
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload new document */}
        <div className="mb-6">
          <h2 className="font-semibold text-sm mb-4" style={{ color: "#1A1A2E" }}>Update Documents</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Replace ID Document", type: "id", hint: "Passport, driver's licence, national ID" },
              { label: "Add Certification", type: "cert", hint: "New skill certificate or licence" },
            ].map(doc => (
              <button key={doc.type} onClick={() => simulateUpload(doc.type)}
                className="p-4 rounded-2xl border-2 border-dashed text-left hover:border-teal-400 transition"
                style={{ borderColor: "#E8E2D9" }}>
                {uploading === doc.type ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: "#0ABFBC" }} />
                    <span className="text-sm" style={{ color: "#0ABFBC" }}>Uploading…</span>
                  </div>
                ) : (
                  <>
                    <Upload size={20} style={{ color: "#8A8070" }} className="mb-2" />
                    <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{doc.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>{doc.hint}</p>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Verification tiers */}
        <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
          <h2 className="font-semibold text-sm mb-4" style={{ color: "#1A1A2E" }}>Verification Tiers</h2>
          <div className="space-y-3">
            {[
              { tier: "Basic", icon: "🟢", desc: "ID verified · Visible to clients", current: true, phase: "MVP" },
              { tier: "Pro", icon: "🔵", desc: "Background check · Priority matching", current: false, phase: "Phase 2" },
              { tier: "Elite", icon: "🟡", desc: "Full audit · Featured placement · Micro-loan eligible", current: false, phase: "Phase 2" },
            ].map(t => (
              <div key={t.tier} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: t.current ? "#2ECC7108" : "#F7F4EF" }}>
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{t.tier}</p>
                    {t.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "#2ECC71", color: "#fff" }}>Current</span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full ml-auto"
                      style={{ background: "#F7F4EF", color: "#8A8070" }}>{t.phase}</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl flex items-start gap-2"
            style={{ background: "#0ABFBC10", border: "1px solid #0ABFBC20" }}>
            <AlertCircle size={14} style={{ color: "#0ABFBC", flexShrink: 0, marginTop: 1 }} />
            <p className="text-xs" style={{ color: "#1A1A2E" }}>
              Pro and Elite tiers launch in Phase 2. You&apos;ll be notified when they&apos;re available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}