"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useTheme, colors } from "@/lib/theme";

// Caribbean palette
const C = {
  teal:   "#0ABFBC",
  blue:   "#1A7FBF",
  green:  "#1DB87A",
  credii: "#E63946",
  gold:   "#F4A623",
  lime:   "#AAFF00",
};

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const c = colors;
  const isDark = theme === "dark";
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<"client" | "provider" | "admin">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const demoAccounts = [
    { role: "client"   as const, email: "aaliyah@email.com", label: "Client Demo",   color: C.teal   },
    { role: "provider" as const, email: "marcus@email.com",  label: "Provider Demo", color: C.blue   },
    { role: "admin"    as const, email: "admin@credii.co",   label: "Admin Demo",    color: C.credii },
  ];

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (role === "client")   router.push("/dashboard");
    else if (role === "provider") router.push("/provider/dashboard");
    else router.push("/admin/dashboard");
  }

  function handleDemo(d: typeof demoAccounts[0]) {
    setRole(d.role); setEmail(d.email); setPassword("demo1234");
    setTimeout(() => {
      if (d.role === "client")        router.push("/dashboard");
      else if (d.role === "provider") router.push("/provider/dashboard");
      else                            router.push("/admin/dashboard");
    }, 300);
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.9rem 1rem", borderRadius: "0.875rem",
    border: `1.5px solid ${isDark ? "rgba(255,255,255,0.12)" : "#C8E8E8"}`,
    background: isDark ? "rgba(255,255,255,0.06)" : "#F0FAFA",
    color: isDark ? "#fff" : "#0A2A2A", fontSize: "1rem", outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "system-ui, sans-serif" }}>

      {/* ── LEFT — Caribbean hero panel ─────────────────────────────────── */}
      <div className="hidden lg:flex" style={{
        width: "48%", flexDirection: "column", position: "relative", overflow: "hidden",
      }}>
        {/* Full-bleed Caribbean water photo */}
        <img
          src="https://images.pexels.com/photos/13820403/pexels-photo-13820403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Caribbean turquoise water"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.5) brightness(0.55)" }}
        />
        {/* Gradient overlay — dark at top/bottom, clear in middle */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,20,20,0.92) 0%, rgba(6,20,20,0.45) 40%, rgba(6,20,20,0.55) 70%, rgba(6,20,20,0.95) 100%)" }} />
        {/* Teal glow blob */}
        <div style={{ position: "absolute", top: "30%", left: "20%", width: "400px", height: "400px", borderRadius: "50%", filter: "blur(80px)", background: `${C.teal}25`, pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", padding: "2.5rem" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
            <div style={{ width: "2.4rem", height: "2.4rem", borderRadius: "0.7rem", background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1.1rem" }}>R</div>
            <span style={{ fontWeight: 800, fontSize: "1.4rem", color: "#fff" }}>Rivva</span>
          </Link>

          {/* Hero text */}
          <div>
            {/* Live activity pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "999px", marginBottom: "1.75rem", border: `1px solid ${C.lime}50`, background: `${C.lime}10` }}>
              <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: C.lime, boxShadow: `0 0 8px ${C.lime}` }} />
              <span style={{ fontSize: "0.85rem", color: C.lime, fontWeight: 600 }}>247 providers active right now</span>
            </div>

            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
              Where Caribbean<br />
              <span style={{ background: `linear-gradient(90deg, ${C.teal}, ${C.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>talent flows</span><br />
              to opportunity
            </h2>

            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Trusted talent. Real opportunity.
            </p>

            {/* Island flags */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
              {["🇹🇹 Trinidad", "🇯🇲 Jamaica", "🇧🇧 Barbados", "🇱🇨 St. Lucia", "🇬🇩 Grenada", "🇦🇬 Antigua"].map(island => (
                <span key={island} style={{ padding: "0.3rem 0.75rem", borderRadius: "999px", background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", fontSize: "0.8rem", fontWeight: 500, border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                  {island}
                </span>
              ))}
            </div>

            {/* Stats row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
              {[
                { v: "2,400+", l: "Verified Providers", color: C.teal },
                { v: "6",      l: "Caribbean Islands",  color: C.blue },
                { v: "12k+",   l: "Jobs Completed",     color: C.green },
                { v: "4.8★",   l: "Average Rating",     color: C.gold },
              ].map(s => (
                <div key={s.l} style={{ padding: "1rem", borderRadius: "1rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                  <p style={{ fontSize: "1.4rem", fontWeight: 900, color: s.color, lineHeight: 1 }}>{s.v}</p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>© 2026 Rivva / Credii · Caribbean&apos;s Trust Network</p>
        </div>
      </div>

      {/* ── RIGHT — Login form ───────────────────────────────────────────── */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "3rem 2rem",
        background: isDark
          ? "linear-gradient(160deg, #060D12 0%, #0A1A20 100%)"
          : "linear-gradient(160deg, #F0FAFA 0%, #E0F5F5 100%)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Subtle background blobs */}
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "400px", height: "400px", borderRadius: "50%", filter: "blur(80px)", background: `${C.teal}12`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: "300px", height: "300px", borderRadius: "50%", filter: "blur(80px)", background: `${C.blue}10`, pointerEvents: "none" }} />

        <div style={{ width: "100%", maxWidth: "420px", position: "relative" }}>
          {/* Mobile logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", marginBottom: "2.5rem" }} className="lg:hidden">
            <div style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900 }}>R</div>
            <span style={{ fontWeight: 800, fontSize: "1.2rem", color: c.text(theme) }}>Rivva</span>
          </Link>

          {/* Greeting */}
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2.2rem", fontWeight: 900, color: c.text(theme), marginBottom: "0.4rem", letterSpacing: "-0.02em" }}>
              Welcome back 👋
            </h1>
            <p style={{ color: c.textMuted(theme), fontSize: "1rem" }}>
              Log in to your Rivva account
            </p>
          </div>

          {/* Demo buttons */}
          <div style={{ padding: "1.25rem", borderRadius: "1.25rem", border: `1.5px solid ${C.teal}30`, background: isDark ? `${C.teal}08` : `${C.teal}10`, marginBottom: "1.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.875rem" }}>
              <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: C.lime, boxShadow: `0 0 6px ${C.lime}` }} />
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: c.textMuted(theme) }}>Quick demo access</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {demoAccounts.map(d => (
                <button key={d.role} onClick={() => handleDemo(d)} style={{
                  flex: 1, padding: "0.625rem 0.5rem", borderRadius: "0.75rem", border: "none",
                  background: d.color, color: "#fff", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                  boxShadow: `0 2px 12px ${d.color}40`,
                }}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ flex: 1, height: "1px", background: isDark ? "rgba(255,255,255,0.1)" : "#C8E8E8" }} />
            <span style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>or log in manually</span>
            <div style={{ flex: 1, height: "1px", background: isDark ? "rgba(255,255,255,0.1)" : "#C8E8E8" }} />
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {/* Role selector */}
            <div>
              <label style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>I am a</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                {(["client", "provider", "admin"] as const).map(r => (
                  <button key={r} type="button" onClick={() => setRole(r)} style={{
                    padding: "0.625rem", borderRadius: "0.875rem",
                    border: `2px solid ${role === r ? C.teal : (isDark ? "rgba(255,255,255,0.1)" : "#C8E8E8")}`,
                    background: role === r ? `${C.teal}18` : "transparent",
                    color: role === r ? C.teal : c.textMuted(theme),
                    fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", textTransform: "capitalize",
                    transition: "all 0.15s",
                  }}>
                    {r === "admin" ? "Admin" : r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" required style={inp} />
            </div>

            {/* Password */}
            <div>
              <label style={{ fontSize: "0.88rem", fontWeight: 700, color: c.text(theme), display: "block", marginBottom: "0.5rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required style={{ ...inp, paddingRight: "3rem" }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{
                  position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", color: c.textMuted(theme),
                }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" style={{
              width: "100%", padding: "1rem", borderRadius: "0.875rem", border: "none",
              background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
              color: "#fff", fontWeight: 800, fontSize: "1rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
              boxShadow: `0 4px 20px ${C.teal}40`, marginTop: "0.25rem",
            }}>
              Log in <ArrowRight size={18} />
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: "0.95rem", color: c.textMuted(theme), marginTop: "1.5rem" }}>
            Don&apos;t have an account?{" "}
            <Link href="/register" style={{ fontWeight: 800, color: C.teal, textDecoration: "none" }}>Sign up free</Link>
          </p>

          {/* Founding provider nudge */}
          <div style={{ marginTop: "2rem", padding: "1rem 1.25rem", borderRadius: "1rem", border: `1.5px solid ${C.lime}40`, background: isDark ? `${C.lime}06` : `${C.lime}08`, display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <span style={{ fontSize: "1.5rem" }}>🌟</span>
            <div>
              <p style={{ fontWeight: 700, color: isDark ? C.lime : "#3A6A00", fontSize: "0.88rem" }}>Founding Provider spots open</p>
              <Link href="/register?role=provider&founding=true" style={{ fontSize: "0.82rem", color: C.teal, textDecoration: "none", fontWeight: 600 }}>
                Join now — limited availability →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){ .lg\\:hidden{ display:flex!important; } }
        @keyframes pulse{ 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}