"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import { serviceCategories } from "@/lib/data";
import { CheckCircle, ArrowRight, ArrowLeft, Zap } from "lucide-react";

const islands = ["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"];
const budgetRanges = [
  "TT$0–TT$500", "TT$500–TT$1,000", "TT$1,000–TT$2,500",
  "TT$2,500–TT$5,000", "TT$5,000–TT$10,000", "TT$10,000+",
];

export default function PostRequestPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    category: "", island: "Trinidad", description: "", budget: "", urgency: "normal",
  });
  const [submitted, setSubmitted] = useState(false);

  function update(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  function handleSubmit() {
    setSubmitted(true);
    setTimeout(() => router.push("/quotes"), 2500);
  }

  if (submitted) {
    return (
      <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
        <Navbar role="client" userName="Aaliyah Joseph" userAvatar="AJ" />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "#2ECC7115" }}>
            <CheckCircle size={40} style={{ color: "#2ECC71" }} />
          </div>
          <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Request posted!</h1>
          <p className="text-sm mt-2" style={{ color: "#8A8070" }}>
            Your request has been sent to the top 5 matching providers on {form.island}. You&apos;ll receive quotes shortly.
          </p>
          <div className="mt-6 p-4 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
            <div className="flex items-center gap-2 justify-center">
              <Zap size={16} style={{ color: "#FFB347" }} />
              <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>Matching engine running…</span>
            </div>
            <p className="text-xs mt-1" style={{ color: "#8A8070" }}>Providers typically respond within 1–3 hours</p>
          </div>
          <p className="text-xs mt-4" style={{ color: "#8A8070" }}>Redirecting to your quotes…</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="client" userName="Aaliyah Joseph" userAvatar="AJ" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Post a Request</h1>
            <span className="text-xs" style={{ color: "#8A8070" }}>Step {step} of 3</span>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: "#E8E2D9" }}>
            <div className="h-full rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%`, background: "#FF6B4A" }} />
          </div>
        </div>

        {/* Step 1 — Category */}
        {step === 1 && (
          <div>
            <h2 className="font-semibold text-base mb-1" style={{ color: "#1A1A2E" }}>What do you need?</h2>
            <p className="text-sm mb-5" style={{ color: "#8A8070" }}>Select the service category</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {serviceCategories.map(cat => (
                <button key={cat.id} onClick={() => update("category", cat.id)}
                  className="p-4 rounded-2xl border text-left transition hover:shadow-sm"
                  style={{
                    borderColor: form.category === cat.id ? "#FF6B4A" : "#E8E2D9",
                    background: form.category === cat.id ? "#FF6B4A08" : "#fff",
                  }}>
                  <span className="text-2xl">{cat.icon}</span>
                  <p className="text-xs font-medium mt-2" style={{ color: "#1A1A2E" }}>{cat.name}</p>
                  <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "#8A8070" }}>{cat.description}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} disabled={!form.category}
              className="w-full mt-6 py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-40"
              style={{ background: "#FF6B4A" }}>
              Continue <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Step 2 — Details */}
        {step === 2 && (
          <div>
            <h2 className="font-semibold text-base mb-1" style={{ color: "#1A1A2E" }}>Describe your job</h2>
            <p className="text-sm mb-5" style={{ color: "#8A8070" }}>The more detail you give, the better quotes you&apos;ll get</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Island</label>
                <select value={form.island} onChange={e => update("island", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }}>
                  {islands.map(i => <option key={i}>{i}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>
                  Description <span style={{ color: "#8A8070" }}>(min. 30 characters)</span>
                </label>
                <textarea value={form.description} onChange={e => update("description", e.target.value)}
                  rows={5} placeholder="e.g. I need a licensed electrician to install 3 ceiling fans and fix a tripping breaker in my home in Maraval, Trinidad. The house is a 3-bedroom single storey."
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
                <p className="text-xs mt-1 text-right" style={{ color: form.description.length >= 30 ? "#2ECC71" : "#8A8070" }}>
                  {form.description.length} / 30 min
                </p>
              </div>

              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Budget range</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {budgetRanges.map(b => (
                    <button key={b} onClick={() => update("budget", b)}
                      className="py-2 px-3 rounded-xl border text-xs font-medium transition"
                      style={{
                        borderColor: form.budget === b ? "#0ABFBC" : "#E8E2D9",
                        background: form.budget === b ? "#0ABFBC10" : "#fff",
                        color: form.budget === b ? "#0ABFBC" : "#1A1A2E",
                      }}>{b}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Urgency</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: "urgent", label: "🔴 Urgent", hint: "Today" },
                    { v: "normal", label: "🟡 Normal", hint: "This week" },
                    { v: "flexible", label: "🟢 Flexible", hint: "Anytime" },
                  ].map(u => (
                    <button key={u.v} onClick={() => update("urgency", u.v)}
                      className="py-2 px-3 rounded-xl border text-xs font-medium transition"
                      style={{
                        borderColor: form.urgency === u.v ? "#FF6B4A" : "#E8E2D9",
                        background: form.urgency === u.v ? "#FF6B4A10" : "#fff",
                        color: form.urgency === u.v ? "#FF6B4A" : "#1A1A2E",
                      }}>
                      <div>{u.label}</div>
                      <div className="font-normal mt-0.5" style={{ color: "#8A8070" }}>{u.hint}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border text-sm font-medium flex items-center justify-center gap-2"
                style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
                <ArrowLeft size={16} /> Back
              </button>
              <button onClick={() => setStep(3)} disabled={form.description.length < 30 || !form.budget}
                className="flex-1 py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-40"
                style={{ background: "#FF6B4A" }}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Review & Submit */}
        {step === 3 && (
          <div>
            <h2 className="font-semibold text-base mb-1" style={{ color: "#1A1A2E" }}>Review your request</h2>
            <p className="text-sm mb-5" style={{ color: "#8A8070" }}>Confirm the details before posting</p>

            <div className="p-5 rounded-2xl border space-y-4" style={{ borderColor: "#E8E2D9" }}>
              {[
                { label: "Category", value: serviceCategories.find(c => c.id === form.category)?.name ?? "" },
                { label: "Island", value: form.island },
                { label: "Budget", value: form.budget },
                { label: "Urgency", value: form.urgency.charAt(0).toUpperCase() + form.urgency.slice(1) },
              ].map(item => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span style={{ color: "#8A8070" }}>{item.label}</span>
                  <span className="font-medium" style={{ color: "#1A1A2E" }}>{item.value}</span>
                </div>
              ))}
              <div className="pt-3 border-t" style={{ borderColor: "#E8E2D9" }}>
                <p className="text-xs font-medium mb-1" style={{ color: "#8A8070" }}>Description</p>
                <p className="text-sm" style={{ color: "#1A1A2E" }}>{form.description}</p>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl flex items-start gap-2"
              style={{ background: "#FF6B4A10", border: "1px solid #FF6B4A30" }}>
              <Zap size={15} style={{ color: "#FF6B4A", flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs" style={{ color: "#1A1A2E" }}>
                Your request will be matched to up to <strong>5 verified providers</strong> on {form.island}. They&apos;ll respond with quotes within 1–3 hours.
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
                Post Request <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}