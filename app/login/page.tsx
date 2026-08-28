"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<"client" | "provider" | "admin">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoAccounts = [
    { role: "client" as const, email: "aaliyah@email.com", label: "Client Demo", color: "#0ABFBC" },
    { role: "provider" as const, email: "marcus@email.com", label: "Provider Demo", color: "#FF6B4A" },
    { role: "admin" as const, email: "admin@credii.co", label: "Admin Demo", color: "#FFB347" },
  ];

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (role === "client") router.push("/dashboard");
    else if (role === "provider") router.push("/provider/dashboard");
    else router.push("/admin/dashboard");
  }

  function handleDemo(d: typeof demoAccounts[0]) {
    setRole(d.role);
    setEmail(d.email);
    setPassword("demo1234");
    setTimeout(() => {
      if (d.role === "client") router.push("/dashboard");
      else if (d.role === "provider") router.push("/provider/dashboard");
      else router.push("/admin/dashboard");
    }, 300);
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#FFFDF9" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)" }}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>S</div>
          <span className="font-bold text-xl text-white">Rivva</span>
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-white leading-snug">
            The Caribbean&apos;s<br />service economy,<br />
            <span style={{ color: "#FF6B4A" }}>digitised.</span>
          </h2>
          <p className="mt-4 text-sm" style={{ color: "#8A8070" }}>
            Connecting clients and providers across 6 islands. Powered by Credii.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { v: "2,400+", l: "Providers" },
              { v: "6", l: "Islands" },
              { v: "12k+", l: "Jobs done" },
              { v: "4.8★", l: "Avg rating" },
            ].map(s => (
              <div key={s.l} className="p-3 rounded-xl" style={{ background: "#ffffff08" }}>
                <p className="text-lg font-bold text-white">{s.v}</p>
                <p className="text-xs" style={{ color: "#8A8070" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs" style={{ color: "#8A8070" }}>© 2026 Rivva / Credii</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>S</div>
            <span className="font-bold text-lg" style={{ color: "#1A1A2E" }}>Rivva</span>
          </Link>

          <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Welcome back</h1>
          <p className="text-sm mt-1" style={{ color: "#8A8070" }}>Log in to your Rivva account</p>

          {/* Demo buttons */}
          <div className="mt-6 p-4 rounded-2xl border" style={{ borderColor: "#E8E2D9", background: "#F7F4EF" }}>
            <p className="text-xs font-medium mb-3" style={{ color: "#8A8070" }}>🚀 Quick demo access</p>
            <div className="flex gap-2">
              {demoAccounts.map(d => (
                <button key={d.role} onClick={() => handleDemo(d)}
                  className="flex-1 py-2 rounded-xl text-xs font-medium text-white transition hover:opacity-90"
                  style={{ background: d.color }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "#E8E2D9" }} />
            <span className="text-xs" style={{ color: "#8A8070" }}>or log in manually</span>
            <div className="flex-1 h-px" style={{ background: "#E8E2D9" }} />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {(["client", "provider", "admin"] as const).map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)}
                    className="py-2 rounded-xl text-xs font-medium border transition capitalize"
                    style={{
                      borderColor: role === r ? "#FF6B4A" : "#E8E2D9",
                      background: role === r ? "#FF6B4A10" : "#fff",
                      color: role === r ? "#FF6B4A" : "#8A8070",
                    }}>
                    {r === "admin" ? "Admin (Credii)" : r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
            </div>

            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none pr-10"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A8070" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit"
              className="w-full py-3 rounded-xl text-white font-medium text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
              style={{ background: "#FF6B4A" }}>
              Log in <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "#8A8070" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium hover:opacity-70" style={{ color: "#FF6B4A" }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}