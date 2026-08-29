"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { providers, users } from "@/lib/data";
import { useTheme, colors } from "@/lib/theme";
import { CheckCircle, Clock, Upload, Shield, AlertCircle } from "lucide-react";

const currentProvider = providers.find(p => p.user_id === "u2")!;
const currentUser = users.find(u => u.id === "u2")!;

const verificationSteps = [
  { id: "account", label: "Account Created", status: "done", icon: "✅", desc: "Your Rivva account is active" },
  { id: "id", label: "ID Verification", status: "done", icon: "🪪", desc: "Government-issued ID submitted and verified" },
  { id: "skill", label: "Skill Verification", status: "done", icon: "🎓", desc: "Electrical licence verified by Credii admin" },
  { id: "approved", label: "Profile Approved", status: "done", icon: "🛡️", desc: "You are a verified Rivva provider" },
];

export default function VerificationPage() {
  const { theme } = useTheme();
  const c = colors;
  const [uploading, setUploading] = useState<string | null>(null);
  const isApproved = currentProvider.verification_status === "approved";

  function simulateUpload(docType: string) {
    setUploading(docType);
    setTimeout(() => setUploading(null), 2000);
  }

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="provider" userName={currentUser.name} userAvatar={currentUser.avatar} />
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Verification Status</h1>
          <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>Verified providers get more leads and higher client trust</p>
        </div>

        {/* Status banner */}
        <div style={{ padding: "1.5rem", borderRadius: "1rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "1rem", background: isApproved ? "#2ECC7110" : "#FFB34710", border: `1px solid ${isApproved ? "#2ECC7130" : "#FFB34730"}` }}>
          <div style={{ width: "3rem", height: "3rem", borderRadius: "50%", background: isApproved ? "#2ECC7120" : "#FFB34720", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {isApproved ? <Shield size={22} style={{ color: "#2ECC71" }} /> : <Clock size={22} style={{ color: "#FFB347" }} />}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>{isApproved ? "✓ Fully Verified Provider" : "⏳ Verification Pending"}</p>
            <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>{isApproved ? "Your profile is live and visible to clients across the Caribbean" : "Your documents are under review. Typically 24–48 hours."}</p>
          </div>
          {isApproved && <span style={{ padding: "0.3rem 0.875rem", borderRadius: "999px", background: "#2ECC71", color: "#fff", fontSize: "0.85rem", fontWeight: 700, flexShrink: 0 }}>Active</span>}
        </div>

        {/* Verification steps */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1rem" }}>Verification Checklist</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {verificationSteps.map((step, i) => (
              <div key={step.id} style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${step.status === "done" ? "#2ECC7130" : c.border(theme)}`, background: step.status === "done" ? "#2ECC7105" : c.bgCard(theme) }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: step.status === "done" ? "#2ECC7120" : c.bgMuted(theme), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {step.status === "done" ? <CheckCircle size={18} style={{ color: "#2ECC71" }} /> : <span style={{ fontSize: "1.1rem" }}>{step.icon}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{step.label}</p>
                  <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>{step.desc}</p>
                </div>
                {step.status === "done" && <span style={{ padding: "0.2rem 0.625rem", borderRadius: "999px", background: "#2ECC7115", color: "#2ECC71", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>Done</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1rem" }}>Submitted Documents</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[{ label: "Government-issued ID", file: "passport_marcus_williams.pdf" }, { label: "Electrical Licence", file: "electrical_licence_2026.pdf" }].map(doc => (
              <div key={doc.label} style={{ padding: "1rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), display: "flex", alignItems: "center", gap: "0.875rem" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: c.bgMuted(theme), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>📄</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.9rem" }}>{doc.label}</p>
                  <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.file}</p>
                </div>
                <span style={{ padding: "0.2rem 0.625rem", borderRadius: "999px", background: "#2ECC7115", color: "#2ECC71", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>✓ Verified</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upload new */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1rem" }}>Update Documents</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[{ label: "Replace ID Document", type: "id", hint: "Passport, driver's licence, national ID" }, { label: "Add Certification", type: "cert", hint: "New skill certificate or licence" }].map(doc => (
              <button key={doc.type} onClick={() => simulateUpload(doc.type)} style={{ padding: "1.5rem", borderRadius: "1rem", border: `2px dashed ${c.border(theme)}`, background: c.bgCard(theme), cursor: "pointer", textAlign: "left" }}>
                {uploading === doc.type ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <div style={{ width: "1.25rem", height: "1.25rem", borderRadius: "50%", border: "2px solid #0ABFBC", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
                    <span style={{ fontSize: "0.9rem", color: "#0ABFBC", fontWeight: 600 }}>Uploading…</span>
                  </div>
                ) : (
                  <>
                    <Upload size={20} style={{ color: c.textMuted(theme), marginBottom: "0.625rem" }} />
                    <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.9rem" }}>{doc.label}</p>
                    <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>{doc.hint}</p>
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Verification tiers */}
        <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
          <h2 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), marginBottom: "1.25rem" }}>Verification Tiers</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { tier: "Basic", icon: "🟢", desc: "ID verified · Visible to clients", current: true, phase: "MVP" },
              { tier: "Pro", icon: "🔵", desc: "Background check · Priority matching", current: false, phase: "Phase 2" },
              { tier: "Elite", icon: "🟡", desc: "Full audit · Featured placement · Micro-loan eligible", current: false, phase: "Phase 2" },
            ].map(t => (
              <div key={t.tier} style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem", borderRadius: "0.875rem", background: t.current ? "#2ECC7108" : c.bgMuted(theme) }}>
                <span style={{ fontSize: "1.3rem" }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.9rem" }}>{t.tier}</p>
                    {t.current && <span style={{ padding: "0.1rem 0.5rem", borderRadius: "999px", background: "#2ECC71", color: "#fff", fontSize: "0.7rem", fontWeight: 700 }}>Current</span>}
                    <span style={{ padding: "0.1rem 0.5rem", borderRadius: "999px", background: c.bgMuted(theme), color: c.textMuted(theme), fontSize: "0.7rem", marginLeft: "auto" }}>{t.phase}</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.25rem", padding: "0.875rem", borderRadius: "0.875rem", background: "#E6394610", border: "1px solid #E6394625", display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
            <AlertCircle size={14} style={{ color: "#E63946", flexShrink: 0, marginTop: "0.1rem" }} />
            <p style={{ fontSize: "0.85rem", color: c.text(theme) }}>Pro and Elite tiers launch in Phase 2. You&apos;ll be notified when they&apos;re available.</p>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}