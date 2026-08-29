"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useTheme, colors } from "@/lib/theme";

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors;
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<"client" | "provider" | "admin">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoAccounts = [
    { role: "client" as const, email: "aaliyah@email.com", label: "Client Demo", color: "#0ABFBC" },
    { role: "provider" as const, email: "marcus@email.com", label: "Provider Demo", color: "#FF6B4A" },
    { role: "admin" as const, email: "admin@credii.co", label: "Admin Demo", color: "#E63946" },
  ];

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (role === "client") router.push("/dashboard");
    else if (role === "provider") router.push("/provider/dashboard");
    else router.push("/admin/dashboard");
  }

  function handleDemo(d: typeof demoAccounts[0]) {
    setRole(d.role); setEmail(d.email); setPassword("demo1234");
    setTimeout(() => {
      if (d.role === "client") router.push("/dashboard");
      else if (d.role === "provider") router.push("/provider/dashboard");
      else router.push("/admin/dashboard");
    }, 300);
  }

  const inp = { width: "100%", padding: "0.875rem 1rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.inputBg(theme), color: c.text(theme), fontSize: "1rem", outline: "none" };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Left panel */}
      <div className="hidden lg:flex" style={{ width: "45%", flexDirection: "column", justifyContent: "space-between", padding: "3rem", background: "linear-gradient(135deg, #1A0A05 0%, #2D1510 100%)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "0.6rem", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1rem" }}>R</div>
          <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>Rivva</span>
        </Link>
        <div>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: "1rem" }}>
            The Caribbean&apos;s<br />service economy,<br /><span style={{ color: "#FF6B4A" }}>digitised.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", marginBottom: "2rem" }}>
            Connecting clients and providers across 6 islands. Powered by <strong style={{ color: "#E63946" }}>Credii</strong>.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            {[{ v: "2,400+", l: "Providers" }, { v: "6", l: "Islands" }, { v: "12k+", l: "Jobs done" }, { v: "4.8★", l: "Avg rating" }].map(s => (
              <div key={s.l} style={{ padding: "1rem", borderRadius: "0.875rem", background: "rgba(255,255,255,0.06)" }}>
                <p style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff" }}>{s.v}</p>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.25)" }}>© 2026 Rivva / Credii</p>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 2rem", background: c.bg(theme) }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", marginBottom: "2.5rem" }} className="lg:hidden">
            <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900 }}>R</div>
            <span style={{ fontWeight: 800, fontSize: "1.2rem", color: c.text(theme) }}>Rivva</span>
          </Link>

          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: c.text(theme), marginBottom: "0.5rem" }}>Welcome back</h1>
          <p style={{ color: c.textMuted(theme), fontSize: "1rem", marginBottom: "2rem" }}>Log in to your Rivva account</p>

          {/* Demo buttons */}
          <div style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: c.textMuted(theme), marginBottom: "0.875rem" }}>🚀 Quick demo access</p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {demoAccounts.map(d => (
                <button key={d.role} onClick={() => handleDemo(d)} style={{ flex: 1, padding: "0.625rem", borderRadius: "0.75rem", border: "none", background: d.color, color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: c.border(theme) }} />
            <span style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>or log in manually</span>
            <div style={{ flex: 1, height: "1px", background: c.border(theme) }} />
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>I am a</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                {(["client", "provider", "admin"] as const).map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)} style={{ padding: "0.625rem", borderRadius: "0.75rem", border: `2px solid ${role === r ? "#FF6B4A" : c.border(theme)}`, background: role === r ? "#FF6B4A12" : c.inputBg(theme), color: role === r ? "#FF6B4A" : c.textMuted(theme), fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
                    {r === "admin" ? "Admin" : r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={inp} />
            </div>
            <div>
              <label style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ ...inp, paddingRight: "3rem" }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: c.textMuted(theme) }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button type="submit" style={{ width: "100%", padding: "1rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              Log in <ArrowRight size={18} />
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.95rem", color: c.textMuted(theme), marginTop: "1.5rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ fontWeight: 700, color: "#FF6B4A", textDecoration: "none" }}>Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}