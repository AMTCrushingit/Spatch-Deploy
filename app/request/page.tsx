"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { serviceCategories } from "@/lib/data";
import { useTheme, colors } from "@/lib/theme";
import { CheckCircle, ArrowRight, ArrowLeft, Zap } from "lucide-react";

const islands = ["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"];
const budgetRanges = ["TT$0–TT$500","TT$500–TT$1,000","TT$1,000–TT$2,500","TT$2,500–TT$5,000","TT$5,000–TT$10,000","TT$10,000+"];

export default function PostRequestPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ category: "", island: "Trinidad", description: "", budget: "", urgency: "normal" });
  const [submitted, setSubmitted] = useState(false);

  function update(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => router.push("/quotes"), 2500);
  }

  const inp = { width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.inputBg(theme), color: c.text(theme), fontSize: "1rem", outline: "none", boxSizing: "border-box" as const };

  if (submitted) return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="client" userName="Aaliyah Joseph" userAvatar="AJ" />
      <div style={{ maxWidth: "480px", margin: "0 auto", padding: "5rem 2rem", textAlign: "center" }}>
        <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", background: "#2ECC7115", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
          <CheckCircle size={40} style={{ color: "#2ECC71" }} />
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, color: c.text(theme), marginBottom: "0.75rem" }}>Request posted!</h1>
        <p style={{ color: c.textMuted(theme), fontSize: "1rem", marginBottom: "1.5rem" }}>Your request has been sent to the top 5 matching providers on {form.island}.</p>
        <div style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <Zap size={16} style={{ color: "#FFB347" }} />
            <span style={{ fontWeight: 600, color: c.text(theme) }}>Matching engine running…</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.5rem" }}>Providers typically respond within 1–3 hours</p>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="client" userName="Aaliyah Joseph" userAvatar="AJ" />
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "3rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Post a Request</h1>
          <span style={{ fontSize: "0.9rem", color: c.textMuted(theme) }}>Step {step} of 3</span>
        </div>
        <div style={{ width: "100%", height: "0.4rem", borderRadius: "999px", background: c.border(theme), marginBottom: "2.5rem" }}>
          <div style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #FF6B4A, #FFB347)", width: `${(step / 3) * 100}%`, transition: "width 0.3s" }} />
        </div>

        {/* Step 1 — Category */}
        {step === 1 && (
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: c.text(theme), marginBottom: "0.5rem" }}>What do you need?</h2>
            <p style={{ color: c.textMuted(theme), marginBottom: "1.5rem" }}>Select the service category</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.875rem", marginBottom: "2rem" }}>
              {serviceCategories.map(cat => (
                <button key={cat.id} onClick={() => update("category", cat.id)} style={{ padding: "1.25rem", borderRadius: "1rem", border: `2px solid ${form.category === cat.id ? "#FF6B4A" : c.border(theme)}`, background: form.category === cat.id ? "#FF6B4A08" : c.bgCard(theme), cursor: "pointer", textAlign: "left", boxShadow: c.shadow(theme) }}>
                  <span style={{ fontSize: "1.75rem" }}>{cat.icon}</span>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), marginTop: "0.5rem" }}>{cat.name}</p>
                  <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), marginTop: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cat.description}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} disabled={!form.category} style={{ width: "100%", padding: "1rem", borderRadius: "0.875rem", border: "none", background: form.category ? "linear-gradient(135deg, #FF6B4A, #FF8C42)" : c.border(theme), color: form.category ? "#fff" : c.textMuted(theme), fontWeight: 700, fontSize: "1rem", cursor: form.category ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              Continue <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Step 2 — Details */}
        {step === 2 && (
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: c.text(theme), marginBottom: "0.5rem" }}>Describe your job</h2>
            <p style={{ color: c.textMuted(theme), marginBottom: "1.5rem" }}>The more detail you give, the better quotes you&apos;ll get</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Island</label>
                <select value={form.island} onChange={e => update("island", e.target.value)} style={inp}>
                  {islands.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Description <span style={{ color: c.textMuted(theme), fontWeight: 400 }}>(min. 30 characters)</span></label>
                <textarea value={form.description} onChange={e => update("description", e.target.value)} rows={5} placeholder="e.g. I need a licensed electrician to install 3 ceiling fans and fix a tripping breaker in my home in Maraval, Trinidad." style={{ ...inp, resize: "none" }} />
                <p style={{ fontSize: "0.8rem", marginTop: "0.25rem", textAlign: "right", color: form.description.length >= 30 ? "#2ECC71" : c.textMuted(theme) }}>{form.description.length} / 30 min</p>
              </div>
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Budget range</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.625rem" }}>
                  {budgetRanges.map(b => (
                    <button key={b} onClick={() => update("budget", b)} style={{ padding: "0.625rem", borderRadius: "0.75rem", border: `2px solid ${form.budget === b ? "#0ABFBC" : c.border(theme)}`, background: form.budget === b ? "#0ABFBC10" : c.bgCard(theme), color: form.budget === b ? "#0ABFBC" : c.text(theme), fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>{b}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Urgency</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.625rem" }}>
                  {[{ v: "urgent", label: "🔴 Urgent", hint: "Today" }, { v: "normal", label: "🟡 Normal", hint: "This week" }, { v: "flexible", label: "🟢 Flexible", hint: "Anytime" }].map(u => (
                    <button key={u.v} onClick={() => update("urgency", u.v)} style={{ padding: "0.75rem", borderRadius: "0.75rem", border: `2px solid ${form.urgency === u.v ? "#FF6B4A" : c.border(theme)}`, background: form.urgency === u.v ? "#FF6B4A10" : c.bgCard(theme), color: form.urgency === u.v ? "#FF6B4A" : c.text(theme), fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                      <div>{u.label}</div>
                      <div style={{ fontSize: "0.75rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>{u.hint}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "1rem", borderRadius: "0.875rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), color: c.text(theme), fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}><ArrowLeft size={18} /> Back</button>
              <button onClick={() => setStep(3)} disabled={form.description.length < 30 || !form.budget} style={{ flex: 1, padding: "1rem", borderRadius: "0.875rem", border: "none", background: (form.description.length >= 30 && form.budget) ? "linear-gradient(135deg, #FF6B4A, #FF8C42)" : c.border(theme), color: (form.description.length >= 30 && form.budget) ? "#fff" : c.textMuted(theme), fontWeight: 700, cursor: (form.description.length >= 30 && form.budget) ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>Continue <ArrowRight size={18} /></button>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div>
            <h2 style={{ fontWeight: 700, fontSize: "1.2rem", color: c.text(theme), marginBottom: "0.5rem" }}>Review your request</h2>
            <p style={{ color: c.textMuted(theme), marginBottom: "1.5rem" }}>Confirm the details before posting</p>
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), marginBottom: "1.25rem" }}>
              {[
                { label: "Category", value: serviceCategories.find(cat => cat.id === form.category)?.name ?? "" },
                { label: "Island", value: form.island },
                { label: "Budget", value: form.budget },
                { label: "Urgency", value: form.urgency.charAt(0).toUpperCase() + form.urgency.slice(1) },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.625rem 0", borderBottom: `1px solid ${c.border(theme)}` }}>
                  <span style={{ color: c.textMuted(theme), fontSize: "0.95rem" }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{item.value}</span>
                </div>
              ))}
              <div style={{ paddingTop: "1rem" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 600, color: c.textMuted(theme), marginBottom: "0.5rem" }}>Description</p>
                <p style={{ fontSize: "0.95rem", color: c.text(theme) }}>{form.description}</p>
              </div>
            </div>
            <div style={{ padding: "1rem", borderRadius: "0.875rem", background: "#FF6B4A10", border: "1px solid #FF6B4A30", display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <Zap size={15} style={{ color: "#FF6B4A", flexShrink: 0, marginTop: "0.1rem" }} />
              <p style={{ fontSize: "0.9rem", color: c.text(theme) }}>Your request will be matched to up to <strong>5 verified providers</strong> on {form.island}. They&apos;ll respond within 1–3 hours.</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, padding: "1rem", borderRadius: "0.875rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), color: c.text(theme), fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}><ArrowLeft size={18} /> Back</button>
              <button onClick={handleSubmit} style={{ flex: 1, padding: "1rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>Post Request <ArrowRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}