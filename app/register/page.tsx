"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { serviceCategories } from "@/lib/data";
import { useTheme, colors } from "@/lib/theme";

const islands = ["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"];

export default function RegisterPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors;
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"client" | "provider">("client");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", island: "", bio: "", categories: [] as string[], serviceAreas: [] as string[], multiIsland: false });

  function update(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }
  function toggleCat(id: string) { setForm(f => ({ ...f, categories: f.categories.includes(id) ? f.categories.filter(c => c !== id) : [...f.categories, id] })); }
  function handleSubmit() { if (role === "client") router.push("/dashboard"); else router.push("/provider/verification"); }

  const totalSteps = role === "provider" ? 3 : 2;
  const inp = { width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.inputBg(theme), color: c.text(theme), fontSize: "1rem", outline: "none", boxSizing: "border-box" as const };
  const btn = (primary = true) => ({ width: "100%", padding: "1rem", borderRadius: "0.875rem", border: primary ? "none" : `1px solid ${c.border(theme)}`, background: primary ? "linear-gradient(135deg, #FF6B4A, #FF8C42)" : c.bgMuted(theme), color: primary ? "#fff" : c.text(theme), fontWeight: 700, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" });

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme), display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 1.5rem" }}>
      <div style={{ width: "100%", maxWidth: "520px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <span style={{ fontWeight: 900, fontSize: "1.2rem", color: c.text(theme), letterSpacing: "-0.02em" }}>RIVVA</span>
          </Link>
          <span style={{ fontSize: "0.9rem", color: c.textMuted(theme) }}>Step {step} of {totalSteps}</span>
        </div>

        {/* Progress */}
        <div style={{ width: "100%", height: "0.4rem", borderRadius: "999px", background: c.border(theme), marginBottom: "2.5rem" }}>
          <div style={{ height: "100%", borderRadius: "999px", background: "linear-gradient(90deg, #FF6B4A, #FFB347)", width: `${(step / totalSteps) * 100}%`, transition: "width 0.3s" }} />
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, color: c.text(theme), marginBottom: "0.5rem" }}>Create your account</h1>
            <p style={{ color: c.textMuted(theme), fontSize: "1rem", marginBottom: "2rem" }}>Trusted talent. Real opportunity.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
              {(["client", "provider"] as const).map(r => (
                <button key={r} onClick={() => setRole(r)} style={{ padding: "1.25rem", borderRadius: "1rem", border: `2px solid ${role === r ? "#FF6B4A" : c.border(theme)}`, background: role === r ? "#FF6B4A08" : c.bgCard(theme), cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{r === "client" ? "🙋" : "🔧"}</div>
                  <p style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme), textTransform: "capitalize" }}>{r}</p>
                  <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.25rem" }}>{r === "client" ? "I need services done" : "I provide services"}</p>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              {[{ label: "Full Name", key: "name", type: "text", placeholder: "e.g. Aaliyah Joseph" }, { label: "Email", key: "email", type: "email", placeholder: "you@example.com" }, { label: "Phone", key: "phone", type: "tel", placeholder: "+1-868-555-0000" }, { label: "Password", key: "password", type: "password", placeholder: "••••••••" }].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>{f.label}</label>
                  <input type={f.type} value={form[f.key as keyof typeof form] as string} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} style={inp} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Island</label>
                <select value={form.island} onChange={e => update("island", e.target.value)} style={{ ...inp }}>
                  <option value="">Select your island</option>
                  {islands.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>
            </div>
            <button onClick={() => setStep(2)} style={btn()}>Continue <ArrowRight size={18} /></button>
            <p style={{ textAlign: "center", fontSize: "0.95rem", color: c.textMuted(theme), marginTop: "1.25rem" }}>
              Already have an account? <Link href="/login" style={{ fontWeight: 700, color: "#FF6B4A", textDecoration: "none" }}>Log in</Link>
            </p>
          </div>
        )}

        {/* Step 2 — Provider: categories */}
        {step === 2 && role === "provider" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, color: c.text(theme), marginBottom: "0.5rem" }}>Your services</h1>
            <p style={{ color: c.textMuted(theme), fontSize: "1rem", marginBottom: "1.5rem" }}>Select the categories you work in</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {serviceCategories.map(cat => (
                <button key={cat.id} onClick={() => toggleCat(cat.id)} style={{ padding: "0.875rem", borderRadius: "0.875rem", border: `2px solid ${form.categories.includes(cat.id) ? "#0ABFBC" : c.border(theme)}`, background: form.categories.includes(cat.id) ? "#0ABFBC10" : c.bgCard(theme), cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: "1.5rem" }}>{cat.icon}</span>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: c.text(theme), marginTop: "0.4rem" }}>{cat.name}</p>
                </button>
              ))}
            </div>
            {/* Service areas */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.25rem" }}>Areas Served</label>
              <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), marginBottom: "0.75rem" }}>Which specific areas, districts or communities do you serve? Clients search by area.</p>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <input
                  id="area-input"
                  placeholder="e.g. Port of Spain, Westmoorings, Chaguanas…"
                  style={{ ...inp, flex: 1 }}
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value.trim().replace(/,$/, "");
                      if (val && !form.serviceAreas.includes(val)) {
                        setForm(f => ({ ...f, serviceAreas: [...f.serviceAreas, val] }));
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
                <button type="button" onClick={() => {
                  const inp2 = document.getElementById("area-input") as HTMLInputElement;
                  const val = inp2?.value.trim();
                  if (val && !form.serviceAreas.includes(val)) {
                    setForm(f => ({ ...f, serviceAreas: [...f.serviceAreas, val] }));
                    inp2.value = "";
                  }
                }} style={{ padding: "0 1rem", borderRadius: "0.75rem", border: "none", background: "#0ABFBC", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", flexShrink: 0 }}>Add</button>
              </div>
              {form.serviceAreas.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  {form.serviceAreas.map(area => (
                    <span key={area} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.3rem 0.75rem", borderRadius: "999px", background: "#0ABFBC18", color: "#0ABFBC", fontSize: "0.85rem", fontWeight: 600, border: "1px solid #0ABFBC40" }}>
                      📍 {area}
                      <button onClick={() => setForm(f => ({ ...f, serviceAreas: f.serviceAreas.filter(a => a !== area) }))} style={{ background: "none", border: "none", cursor: "pointer", color: "#0ABFBC", fontSize: "0.9rem", lineHeight: 1, padding: 0 }}>×</button>
                    </span>
                  ))}
                </div>
              )}
              <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer" }}>
                <input type="checkbox" checked={form.multiIsland} onChange={e => setForm(f => ({ ...f, multiIsland: e.target.checked }))} style={{ width: "1.1rem", height: "1.1rem", accentColor: "#0ABFBC" }} />
                <span style={{ fontSize: "0.9rem", color: c.text(theme), fontWeight: 500 }}>I serve clients across multiple islands</span>
              </label>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Bio / About you</label>
              <textarea value={form.bio} onChange={e => update("bio", e.target.value)} rows={3} placeholder="Describe your experience..." style={{ ...inp, resize: "none" }} />
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(1)} style={{ ...btn(false), flex: 1 }}><ArrowLeft size={18} /> Back</button>
              <button onClick={() => setStep(3)} style={{ ...btn(), flex: 1 }}>Continue <ArrowRight size={18} /></button>
            </div>
          </div>
        )}

        {/* Step 2 — Client: review */}
        {step === 2 && role === "client" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, color: c.text(theme), marginBottom: "0.5rem" }}>You&apos;re all set!</h1>
            <p style={{ color: c.textMuted(theme), fontSize: "1rem", marginBottom: "1.5rem" }}>Review your details and create your account</p>
            <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), marginBottom: "1.5rem" }}>
              {[{ label: "Name", value: form.name || "Aaliyah Joseph" }, { label: "Email", value: form.email || "aaliyah@email.com" }, { label: "Island", value: form.island || "Trinidad" }, { label: "Role", value: "Client" }].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "0.625rem 0", borderBottom: `1px solid ${c.border(theme)}` }}>
                  <span style={{ color: c.textMuted(theme), fontSize: "0.95rem" }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(1)} style={{ ...btn(false), flex: 1 }}><ArrowLeft size={18} /> Back</button>
              <button onClick={handleSubmit} style={{ ...btn(), flex: 1 }}>Create Account <ArrowRight size={18} /></button>
            </div>
          </div>
        )}

        {/* Step 3 — Provider: verification */}
        {step === 3 && role === "provider" && (
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 900, color: c.text(theme), marginBottom: "0.5rem" }}>Verify your identity</h1>
            <p style={{ color: c.textMuted(theme), fontSize: "1rem", marginBottom: "1.5rem" }}>Upload your ID and proof of skill to get approved</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
              {[{ label: "Government-issued ID", hint: "Passport, driver's licence, or national ID" }, { label: "Proof of skill / certification", hint: "Certificate, licence, or portfolio sample" }].map(doc => (
                <div key={doc.label} style={{ padding: "1.5rem", borderRadius: "1rem", border: `2px dashed ${c.border(theme)}`, textAlign: "center", cursor: "pointer", background: c.bgCard(theme) }}>
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>📎</div>
                  <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.95rem" }}>{doc.label}</p>
                  <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.25rem" }}>{doc.hint}</p>
                  <span style={{ display: "inline-block", marginTop: "0.75rem", padding: "0.3rem 0.875rem", borderRadius: "999px", background: c.bgMuted(theme), color: c.textMuted(theme), fontSize: "0.8rem" }}>Click to upload</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "1rem", borderRadius: "0.875rem", background: "#E6394610", border: "1px solid #E6394625", display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <CheckCircle size={16} style={{ color: "#E63946", flexShrink: 0, marginTop: "0.1rem" }} />
              <p style={{ fontSize: "0.9rem", color: c.text(theme) }}>Your documents are reviewed by the <strong style={{ color: "#E63946" }}>Credii</strong> admin team within 24–48 hours. You&apos;ll be notified by email once approved.</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => setStep(2)} style={{ ...btn(false), flex: 1 }}><ArrowLeft size={18} /> Back</button>
              <button onClick={handleSubmit} style={{ ...btn(), flex: 1 }}>Submit &amp; Finish <ArrowRight size={18} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}