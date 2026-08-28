"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { serviceCategories } from "@/lib/data";

const islands = ["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"client" | "provider">("client");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "",
    island: "", bio: "", skills: [] as string[], categories: [] as string[],
  });

  function update(k: string, v: string | string[]) {
    setForm(f => ({ ...f, [k]: v }));
  }

  function toggleCategory(id: string) {
    setForm(f => ({
      ...f,
      categories: f.categories.includes(id)
        ? f.categories.filter(c => c !== id)
        : [...f.categories, id],
    }));
  }

  function handleSubmit() {
    if (role === "client") router.push("/dashboard");
    else router.push("/provider/verification");
  }

  const totalSteps = role === "provider" ? 3 : 2;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "#FFFDF9" }}>
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>S</div>
            <span className="font-bold text-lg" style={{ color: "#1A1A2E" }}>Rivva</span>
          </Link>
          <span className="text-xs" style={{ color: "#8A8070" }}>Step {step} of {totalSteps}</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full mb-8" style={{ background: "#E8E2D9" }}>
          <div className="h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%`, background: "#FF6B4A" }} />
        </div>

        {/* Step 1 — Role + Basic Info */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Create your account</h1>
            <p className="text-sm mt-1 mb-6" style={{ color: "#8A8070" }}>Join the Caribbean&apos;s service marketplace</p>

            {/* Role toggle */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {(["client", "provider"] as const).map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className="p-4 rounded-2xl border text-left transition"
                  style={{
                    borderColor: role === r ? "#FF6B4A" : "#E8E2D9",
                    background: role === r ? "#FF6B4A08" : "#fff",
                  }}>
                  <div className="text-2xl mb-2">{r === "client" ? "🙋" : "🔧"}</div>
                  <p className="font-semibold text-sm capitalize" style={{ color: "#1A1A2E" }}>{r}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>
                    {r === "client" ? "I need services done" : "I provide services"}
                  </p>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Full Name</label>
                <input value={form.name} onChange={e => update("name", e.target.value)}
                  placeholder="e.g. Aaliyah Joseph" className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Email</label>
                <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
                  placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Phone</label>
                <input value={form.phone} onChange={e => update("phone", e.target.value)}
                  placeholder="+1-868-555-0000" className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Island</label>
                <select value={form.island} onChange={e => update("island", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }}>
                  <option value="">Select your island</option>
                  {islands.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Password</label>
                <input type="password" value={form.password} onChange={e => update("password", e.target.value)}
                  placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
              </div>
            </div>

            <button onClick={() => setStep(2)}
              className="w-full mt-6 py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
              style={{ background: "#FF6B4A" }}>
              Continue <ArrowRight size={16} />
            </button>
            <p className="text-center text-sm mt-4" style={{ color: "#8A8070" }}>
              Already have an account?{" "}
              <Link href="/login" className="font-medium" style={{ color: "#FF6B4A" }}>Log in</Link>
            </p>
          </div>
        )}

        {/* Step 2 — Provider: Skills & Categories / Client: Done */}
        {step === 2 && role === "provider" && (
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Your services</h1>
            <p className="text-sm mt-1 mb-6" style={{ color: "#8A8070" }}>Select the categories you work in</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
              {serviceCategories.map(cat => (
                <button key={cat.id} onClick={() => toggleCategory(cat.id)}
                  className="p-3 rounded-xl border text-left transition"
                  style={{
                    borderColor: form.categories.includes(cat.id) ? "#0ABFBC" : "#E8E2D9",
                    background: form.categories.includes(cat.id) ? "#0ABFBC10" : "#fff",
                  }}>
                  <span className="text-xl">{cat.icon}</span>
                  <p className="text-xs font-medium mt-1" style={{ color: "#1A1A2E" }}>{cat.name}</p>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Bio / About you</label>
              <textarea value={form.bio} onChange={e => update("bio", e.target.value)}
                rows={3} placeholder="Describe your experience and what makes you great..."
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2"
                style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(3)}
                className="flex-1 py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
                style={{ background: "#FF6B4A" }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Client: Review & Submit */}
        {step === 2 && role === "client" && (
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>You&apos;re all set!</h1>
            <p className="text-sm mt-1 mb-6" style={{ color: "#8A8070" }}>Review your details and create your account</p>
            <div className="p-5 rounded-2xl border space-y-3" style={{ borderColor: "#E8E2D9" }}>
              {[
                { label: "Name", value: form.name || "Aaliyah Joseph" },
                { label: "Email", value: form.email || "aaliyah@email.com" },
                { label: "Island", value: form.island || "Trinidad" },
                { label: "Role", value: "Client" },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span style={{ color: "#8A8070" }}>{item.label}</span>
                  <span className="font-medium" style={{ color: "#1A1A2E" }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2"
                style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
                style={{ background: "#FF6B4A" }}>
                Create Account <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Provider: Verification upload */}
        {step === 3 && role === "provider" && (
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Verify your identity</h1>
            <p className="text-sm mt-1 mb-6" style={{ color: "#8A8070" }}>Upload your ID and proof of skill to get approved</p>

            <div className="space-y-4">
              {[
                { label: "Government-issued ID", hint: "Passport, driver's licence, or national ID" },
                { label: "Proof of skill / certification", hint: "Certificate, licence, or portfolio sample" },
              ].map(doc => (
                <div key={doc.label} className="p-4 rounded-2xl border-2 border-dashed text-center cursor-pointer hover:border-teal-400 transition"
                  style={{ borderColor: "#E8E2D9" }}>
                  <div className="text-2xl mb-2">📎</div>
                  <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{doc.label}</p>
                  <p className="text-xs mt-1" style={{ color: "#8A8070" }}>{doc.hint}</p>
                  <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full"
                    style={{ background: "#F7F4EF", color: "#8A8070" }}>Click to upload</span>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl flex items-start gap-2"
              style={{ background: "#0ABFBC10", border: "1px solid #0ABFBC30" }}>
              <CheckCircle size={16} style={{ color: "#0ABFBC", flexShrink: 0, marginTop: 2 }} />
              <p className="text-xs" style={{ color: "#1A1A2E" }}>
                Your documents are reviewed by the Credii admin team within 24–48 hours. You&apos;ll be notified by email once approved.
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2"
                style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
                style={{ background: "#FF6B4A" }}>
                Submit & Finish <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}