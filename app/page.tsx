"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { useTheme, colors } from "@/lib/theme";
import { serviceCategories } from "@/lib/data";
import { ArrowRight, CheckCircle, TrendingUp, Star } from "lucide-react";

const activityFeed = [
  { icon: "⚡", text: "Electrician verified in Jamaica", time: "2m ago", color: "#FFB347" },
  { icon: "📸", text: "Photographer booked in Trinidad", time: "5m ago", color: "#FF6B4A" },
  { icon: "🔧", text: "Plumber hired in Barbados", time: "8m ago", color: "#0ABFBC" },
  { icon: "🍽️", text: "Caterer matched in St. Lucia", time: "12m ago", color: "#2ECC71" },
  { icon: "💻", text: "Web developer verified in Grenada", time: "15m ago", color: "#FF6B4A" },
  { icon: "🌿", text: "Landscaper booked in Antigua", time: "18m ago", color: "#0ABFBC" },
  { icon: "❄️", text: "AC technician hired in Trinidad", time: "22m ago", color: "#FFB347" },
  { icon: "📚", text: "Tutor matched in Jamaica", time: "25m ago", color: "#2ECC71" },
];

const islands = [
  { name: "Trinidad & Tobago", flag: "🇹🇹", providers: 842, color: "#FF6B4A" },
  { name: "Jamaica", flag: "🇯🇲", providers: 634, color: "#FFB347" },
  { name: "Barbados", flag: "🇧🇧", providers: 421, color: "#0ABFBC" },
  { name: "St. Lucia", flag: "🇱🇨", providers: 287, color: "#2ECC71" },
  { name: "Grenada", flag: "🇬🇩", providers: 156, color: "#FF6B4A" },
  { name: "Antigua", flag: "🇦🇬", providers: 98, color: "#FFB347" },
];

const testimonials = [
  { name: "Karen Baptiste", role: "Photographer", island: "Trinidad", avatar: "KB", quote: "Rivva helped me find three new clients in Barbados without leaving my studio. The Credii badge made them trust me instantly.", rating: 5, color: "#FF6B4A", jobs: 47, score: 94 },
  { name: "Marcus Williams", role: "Electrician", island: "Jamaica", avatar: "MW", quote: "Before Rivva I was hustling for work every week. Now leads come to me. Made TT$18,000 last month alone.", rating: 5, color: "#FFB347", jobs: 127, score: 96 },
  { name: "Simone Alexis", role: "Event Caterer", island: "St. Lucia", avatar: "SA", quote: "The verification process gave my business credibility I couldn't buy. Clients see my Credii Trust Score and book immediately.", rating: 5, color: "#2ECC71", jobs: 63, score: 91 },
];

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (2000 / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const { theme } = useTheme();
  const c = colors;
  const isDark = theme === "dark";

  const [feedIndex, setFeedIndex] = useState(0);
  const [activeIsland, setActiveIsland] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFeedIndex(i => (i + 1) % activityFeed.length), 3000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(i => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const activity = activityFeed[feedIndex];

  const sectionPad = { padding: "6rem 2.5rem" };
  const altSectionPad = { padding: "6rem 2.5rem", background: isDark ? "#0D0D1A" : "#FFFFFF" };

  return (
    <div style={{ width: "100%" }}>
      <Navbar role="guest" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.pexels.com/photos/18602858/pexels-photo-18602858/free-photo-of-an-aerial-view-of-the-beach-and-town.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Caribbean aerial" style={{ width: "100%", height: "100%", objectFit: "cover", filter: isDark ? "brightness(0.22) saturate(1.5)" : "brightness(0.45) saturate(1.3)" }} />
          <div style={{ position: "absolute", inset: 0, background: isDark ? "linear-gradient(135deg, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.55) 55%, rgba(8,8,16,0.9) 100%)" : "linear-gradient(135deg, rgba(248,246,242,0.97) 0%, rgba(248,246,242,0.6) 55%, rgba(248,246,242,0.92) 100%)" }} />
          <div style={{ position: "absolute", top: "30%", right: "20%", width: "500px", height: "500px", borderRadius: "50%", filter: "blur(80px)", background: "rgba(255,107,74,0.12)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "25%", left: "20%", width: "400px", height: "400px", borderRadius: "50%", filter: "blur(80px)", background: "rgba(230,57,70,0.08)", pointerEvents: "none" }} />
        </div>

        <div style={{ position: "relative", width: "100%", padding: "6rem 2.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-hero">

            {/* LEFT */}
            <div>
              {/* Live pill */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 1.2rem", borderRadius: "999px", marginBottom: "2rem", border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`, background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
                <div style={{ width: "0.6rem", height: "0.6rem", borderRadius: "50%", background: "#2ECC71", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: "1rem", color: activity.color }}>{activity.icon}</span>
                <span style={{ fontSize: "1rem", color: c.text(theme), fontWeight: 500 }}>{activity.text}</span>
                <span style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>{activity.time}</span>
              </div>

              {/* Headline */}
              <h1 style={{ fontWeight: 900, lineHeight: 1.0, marginBottom: "1.5rem", letterSpacing: "-0.03em", fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
                <span style={{ display: "block", color: c.text(theme) }}>The Caribbean&apos;s</span>
                <span style={{ display: "block", background: "linear-gradient(90deg, #FF6B4A 0%, #FFB347 50%, #E63946 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Trust &amp; Opportunity</span>
                <span style={{ display: "block", color: c.text(theme) }}>Network</span>
              </h1>

              <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: c.textMuted(theme), lineHeight: 1.7, marginBottom: "2rem", maxWidth: "36rem" }}>
                Verified Caribbean professionals. Real opportunities. Powered by <strong style={{ color: "#E63946" }}>Credii</strong> — the region&apos;s trust infrastructure.
              </p>

              {/* Search */}
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "200px", display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.25rem", borderRadius: "0.875rem", border: `1px solid ${c.border(theme)}`, background: isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)" }}>
                  <span style={{ fontSize: "1.2rem" }}>🔍</span>
                  <input type="text" placeholder="What do you need done?" style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "1rem", color: c.text(theme) }} />
                </div>
                <Link href="/register" style={{ padding: "1rem 2rem", borderRadius: "0.875rem", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap" }}>
                  Get Quotes Free <ArrowRight size={18} />
                </Link>
              </div>

              {/* Badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {[
                  { icon: "🛡️", label: "Credii Verified", color: "#E63946" },
                  { icon: "⚡", label: "Instant Matching", color: "#FFB347" },
                  { icon: "🌴", label: "6 Islands", color: "#2ECC71" },
                  { icon: "💰", label: "Free for Clients", color: "#FF6B4A" },
                ].map(b => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", borderRadius: "999px", border: `1px solid ${b.color}40`, background: `${b.color}12`, color: b.color, fontSize: "0.9rem", fontWeight: 600 }}>
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Live card */}
            <div className="hidden lg:block">
              <div style={{ borderRadius: "1.5rem", padding: "2rem", border: `1px solid ${c.border(theme)}`, background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.92)", backdropFilter: "blur(24px)", boxShadow: c.shadow(theme) }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1.1rem" }}>R</div>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem", color: c.text(theme) }}>Rivva Live</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#2ECC71", fontSize: "0.9rem" }}>
                    <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#2ECC71" }} />
                    247 active now
                  </div>
                </div>

                <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: c.textFaint(theme), marginBottom: "0.75rem", textTransform: "uppercase" }}>Top Verified Providers</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {[
                    { name: "Marcus W. · Electrician · JM", score: 96, avatar: "MW", color: "#FFB347" },
                    { name: "Priya R. · Photographer · TT", score: 94, avatar: "PR", color: "#FF6B4A" },
                    { name: "Devon C. · Plumber · BB", score: 91, avatar: "DC", color: "#0ABFBC" },
                  ].map(p => (
                    <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem", borderRadius: "0.875rem", background: c.bgMuted(theme) }}>
                      <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: `${p.color}25`, color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>{p.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
                          <div style={{ flex: 1, height: "0.35rem", borderRadius: "999px", background: c.border(theme) }}>
                            <div style={{ width: `${p.score}%`, height: "100%", borderRadius: "999px", background: p.color }} />
                          </div>
                          <span style={{ fontWeight: 800, color: p.color, fontSize: "0.85rem" }}>{p.score}</span>
                        </div>
                      </div>
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: "999px", background: "#2ECC7118", color: "#2ECC71", fontSize: "0.75rem", fontWeight: 600, flexShrink: 0 }}>✓ Live</span>
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", color: c.textFaint(theme), marginBottom: "0.75rem", textTransform: "uppercase" }}>Live Activity</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
                  {activityFeed.slice(0, 4).map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{a.icon}</span>
                      <span style={{ color: c.textMuted(theme), flex: 1 }}>{a.text}</span>
                      <span style={{ color: c.textFaint(theme), fontSize: "0.8rem" }}>{a.time}</span>
                    </div>
                  ))}
                </div>

                <Link href="/register?role=provider" style={{ display: "block", width: "100%", padding: "1rem", borderRadius: "0.875rem", textAlign: "center", fontWeight: 700, fontSize: "1rem", background: "linear-gradient(135deg, #FF6B4A, #FFB347)", color: "#fff", textDecoration: "none" }}>
                  Join as a Provider — From TT$50/mo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section style={{ ...altSectionPad, padding: "4rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", textAlign: "center" }} className="stats-grid">
          {[
            { value: 2438, suffix: "+", label: "Verified Providers", color: "#FF6B4A" },
            { value: 6, suffix: " Islands", label: "Caribbean Coverage", color: "#FFB347" },
            { value: 12847, suffix: "+", label: "Jobs Completed", color: "#0ABFBC" },
            { value: 98, suffix: "%", label: "Client Satisfaction", color: "#E63946" },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontWeight: 900, color: s.color, lineHeight: 1, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                <Counter end={s.value} suffix={s.suffix} />
              </p>
              <p style={{ marginTop: "0.75rem", color: c.textMuted(theme), fontSize: "1rem" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CREDII TRUST ──────────────────────────────────────────────────── */}
      <section style={{ ...sectionPad }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2col">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "999px", marginBottom: "1.5rem", background: "#E6394612", color: "#E63946", border: "1px solid #E6394630", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em" }}>
              🛡️ CREDII TRUST INFRASTRUCTURE
            </div>
            <h2 style={{ fontWeight: 900, lineHeight: 1.1, marginBottom: "1.5rem", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", color: c.text(theme) }}>
              Not just verified.<br />
              <span style={{ color: "#E63946" }}>Trust-scored.</span>
            </h2>
            <p style={{ fontSize: "1.1rem", color: c.textMuted(theme), lineHeight: 1.8, marginBottom: "2rem" }}>
              Every Rivva provider gets a <strong style={{ color: "#E63946" }}>Credii Trust Score</strong> — built from identity verification, skill proof, response speed, completion rate, and client reviews.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { label: "Identity Verified", desc: "Government ID + biometric check", color: "#E63946" },
                { label: "Skill Certified", desc: "Licence or portfolio reviewed by Credii", color: "#FFB347" },
                { label: "Performance Tracked", desc: "Response time, completion rate, reviews", color: "#2ECC71" },
                { label: "Continuously Monitored", desc: "Annual re-verification, real-time flags", color: "#FF6B4A" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                  <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: `${item.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    <CheckCircle size={13} style={{ color: item.color }} />
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, color: c.text(theme), fontSize: "1rem" }}>{item.label}</span>
                    <span style={{ color: c.textMuted(theme), fontSize: "1rem", marginLeft: "0.5rem" }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", background: c.bgMuted(theme), border: `1px solid ${c.border(theme)}`, fontSize: "0.95rem" }}>
              <span style={{ color: c.textMuted(theme) }}>Thumbtack shows:</span>
              <span style={{ fontWeight: 600, color: c.text(theme) }}>✓ Verified</span>
              <span style={{ color: c.textMuted(theme) }}>· Rivva shows:</span>
              <span style={{ fontWeight: 800, color: "#E63946" }}>Credii Score: 94</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {[
              { name: "Marcus W.", role: "Electrician", island: "Jamaica 🇯🇲", score: 96, avatar: "MW", color: "#FFB347", jobs: 127, response: "1.2h" },
              { name: "Priya R.", role: "Photographer", island: "Trinidad 🇹🇹", score: 94, avatar: "PR", color: "#FF6B4A", jobs: 89, response: "0.8h" },
              { name: "Devon C.", role: "Plumber", island: "Barbados 🇧🇧", score: 91, avatar: "DC", color: "#0ABFBC", jobs: 203, response: "2.1h" },
              { name: "Kezia T.", role: "Caterer", island: "Grenada 🇬🇩", score: 88, avatar: "KT", color: "#2ECC71", jobs: 54, response: "1.5h" },
            ].map(p => (
              <div key={p.name} style={{ padding: "1.5rem", borderRadius: "1.25rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", background: `${p.color}22`, color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>{p.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                    <p style={{ color: c.textMuted(theme), fontSize: "0.85rem" }}>{p.role}</p>
                  </div>
                </div>
                <p style={{ color: c.textFaint(theme), fontSize: "0.85rem", marginBottom: "0.75rem" }}>{p.island}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#E63946", fontSize: "0.85rem", fontWeight: 700 }}>Credii Score</span>
                  <span style={{ fontWeight: 900, color: p.color, fontSize: "1.1rem" }}>{p.score}</span>
                </div>
                <div style={{ width: "100%", height: "0.4rem", borderRadius: "999px", background: c.border(theme), marginBottom: "0.875rem" }}>
                  <div style={{ width: `${p.score}%`, height: "100%", borderRadius: "999px", background: `linear-gradient(90deg, ${p.color}80, ${p.color})` }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: c.textFaint(theme), fontSize: "0.85rem" }}>
                  <span>{p.jobs} jobs</span>
                  <span>~{p.response} avg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section style={{ ...altSectionPad }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontWeight: 900, color: c.text(theme), marginBottom: "1rem", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>How Rivva works</h2>
          <p style={{ color: c.textMuted(theme), fontSize: "1.15rem" }}>Three steps. Zero hassle. Caribbean-fast.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }} className="grid-3col">
          {[
            { step: "01", icon: "📝", title: "Post your request", desc: "Describe what you need, your island, and budget. Takes 90 seconds. No account needed to browse.", color: "#FF6B4A" },
            { step: "02", icon: "⚡", title: "Get matched instantly", desc: "Our engine sends your request to the top 5 Credii-verified providers on your island within minutes.", color: "#FFB347" },
            { step: "03", icon: "✅", title: "Hire with confidence", desc: "Compare Trust Scores, read verified reviews, chat directly, and hire. Leave a review when done.", color: "#0ABFBC" },
          ].map(s => (
            <div key={s.step} style={{ position: "relative", padding: "2.5rem", borderRadius: "1.25rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontWeight: 900, opacity: 0.08, color: s.color, fontSize: "4rem", lineHeight: 1 }}>{s.step}</div>
              <div style={{ width: "4rem", height: "4rem", borderRadius: "1rem", background: `${s.color}18`, border: `1px solid ${s.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", marginBottom: "1.5rem" }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, color: c.text(theme), marginBottom: "0.875rem", fontSize: "1.3rem" }}>{s.title}</h3>
              <p style={{ color: c.textMuted(theme), fontSize: "1rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section style={{ ...sectionPad }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontWeight: 900, color: c.text(theme), fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
            Every service.<br />Every island.
          </h2>
          <Link href="/register" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 600, color: "#FF6B4A", textDecoration: "none", fontSize: "1rem" }}>
            Browse all <ArrowRight size={16} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}>
          {serviceCategories.map((cat, i) => {
            const catColors = ["#FF6B4A", "#FFB347", "#0ABFBC", "#2ECC71", "#E63946", "#FF6B4A", "#FFB347", "#0ABFBC", "#2ECC71", "#E63946", "#FF6B4A", "#FFB347"];
            const col = catColors[i % catColors.length];
            return (
              <Link key={cat.id} href="/register" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "1.5rem 1rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), textDecoration: "none", transition: "transform 0.2s", boxShadow: c.shadow(theme) }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "0.875rem", background: `${col}15`, border: `1px solid ${col}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>{cat.icon}</div>
                <span style={{ fontWeight: 600, textAlign: "center", color: c.text(theme), fontSize: "0.9rem" }}>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── ISLAND MAP ────────────────────────────────────────────────────── */}
      <section style={{ ...altSectionPad }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "999px", marginBottom: "1.25rem", background: "#FFB34712", color: "#E6900A", border: "1px solid #FFB34730", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em" }}>
            🌍 RIVVA ACROSS THE CARIBBEAN
          </div>
          <h2 style={{ fontWeight: 900, color: c.text(theme), marginBottom: "0.75rem", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Your island. Your network.</h2>
          <p style={{ color: c.textMuted(theme), fontSize: "1.1rem" }}>Click an island to explore</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem", marginBottom: "1.5rem" }} className="grid-3col">
          {islands.map((island, i) => (
            <button key={island.name} onClick={() => setActiveIsland(i)} style={{
              padding: "2rem", borderRadius: "1.25rem", textAlign: "left", cursor: "pointer",
              border: `2px solid ${activeIsland === i ? island.color : c.border(theme)}`,
              background: activeIsland === i ? `${island.color}10` : c.bgCard(theme),
              boxShadow: activeIsland === i ? `0 0 30px ${island.color}20` : c.shadow(theme),
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "2.5rem" }}>{island.flag}</span>
                <div>
                  <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "1rem" }}>{island.name}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginTop: "0.25rem" }}>
                    <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#2ECC71" }} />
                    <span style={{ color: "#2ECC71", fontSize: "0.85rem" }}>Active</span>
                  </div>
                </div>
              </div>
              <p style={{ fontWeight: 900, color: island.color, fontSize: "2rem", lineHeight: 1 }}>{island.providers}</p>
              <p style={{ color: c.textFaint(theme), fontSize: "0.85rem", marginTop: "0.25rem" }}>verified providers</p>
            </button>
          ))}
        </div>
        <div style={{ padding: "2rem", borderRadius: "1.25rem", border: `2px dashed ${c.border(theme)}`, textAlign: "center", background: c.bgCard(theme) }}>
          <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🌍</p>
          <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "1.2rem", marginBottom: "0.5rem" }}>Africa Expansion — 2027</p>
          <p style={{ color: c.textMuted(theme), fontSize: "1rem" }}>The same Credii trust infrastructure. 54 countries. Starting with Nigeria, Ghana, and Kenya.</p>
        </div>
      </section>

      {/* ── PHOTOS + TESTIMONIALS ─────────────────────────────────────────── */}
      <section style={{ ...sectionPad }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontWeight: 900, color: c.text(theme), fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Real people.<br />Real results.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", height: "400px", marginBottom: "4rem" }} className="photo-grid">
          <div style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
            <img src="https://our.today/wp-content/uploads/2023/10/electrician-jamaica-our-today-feature-1024x683.jpg" alt="Electrician Jamaica" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.3)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "1rem" }}>
            <div style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
              <img src="https://s7d1.scene7.com/is/image/wbcollab/Woman-selling-fruits-Gaudaloupe?qlt=90&hei=630&wid=1200&fit=hfit" alt="Caribbean woman" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.2)" }} />
            </div>
            <div style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
              <img src="https://looktt.com/wp-content/uploads/2024/11/Electrician-Picture-2.jpg" alt="Trinidad electrician" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.2)" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "1rem" }}>
            <div style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
              <img src="https://wallpapers.com/images/hd/barbados-houses-j22gdi6vknriecoz.jpg" alt="Barbados" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.3)" }} />
            </div>
            <div style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
              <img src="https://fooddrinklife.com/wp-content/uploads/2024/07/Iconic-view-of-Piton-mountains-on-St-Lucia-island-1024x681.jpg" alt="St Lucia" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.3)" }} />
            </div>
          </div>
        </div>

        {/* Testimonials */}
        {testimonials.map((t, i) => (
          <div key={t.name} style={{ display: activeTestimonial === i ? "block" : "none" }}>
            <div style={{ padding: "3rem", borderRadius: "1.5rem", border: `2px solid ${t.color}30`, background: c.bgCard(theme), boxShadow: c.shadow(theme), textAlign: "center" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginBottom: "1.5rem" }}>
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={22} fill={t.color} style={{ color: t.color }} />)}
              </div>
              <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: c.text(theme), lineHeight: 1.7, marginBottom: "2rem" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: `${t.color}25`, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem" }}>{t.avatar}</div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "1.1rem" }}>{t.name}</p>
                  <p style={{ color: c.textMuted(theme), fontSize: "0.95rem" }}>{t.role} · {t.island} · {t.jobs} jobs</p>
                </div>
                <div style={{ padding: "0.75rem 1.25rem", borderRadius: "0.875rem", background: "#E6394612", border: "1px solid #E6394630" }}>
                  <p style={{ fontSize: "0.75rem", color: "#E63946", fontWeight: 700, marginBottom: "0.2rem" }}>Credii Score</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 900, color: t.color, lineHeight: 1 }}>{t.score}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActiveTestimonial(i)} style={{ height: "0.5rem", borderRadius: "999px", border: "none", cursor: "pointer", transition: "all 0.3s", width: activeTestimonial === i ? "2rem" : "0.5rem", background: activeTestimonial === i ? "#FF6B4A" : c.border(theme) }} />
          ))}
        </div>
      </section>

      {/* ── FOR PROVIDERS ─────────────────────────────────────────────────── */}
      <section style={{ ...altSectionPad }}>
        <div style={{ borderRadius: "1.5rem", overflow: "hidden", position: "relative", minHeight: "480px" }}>
          <img src="https://images.pexels.com/photos/31010712/pexels-photo-31010712/free-photo-of-aerial-view-of-coastal-town-and-blue-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Caribbean coast" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: isDark ? "brightness(0.18) saturate(1.5)" : "brightness(0.35) saturate(1.3)" }} />
          <div style={{ position: "absolute", inset: 0, background: isDark ? "linear-gradient(135deg, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.65) 100%)" : "linear-gradient(135deg, rgba(248,246,242,0.97) 0%, rgba(248,246,242,0.7) 100%)" }} />
          <div style={{ position: "relative", padding: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-2col">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "999px", marginBottom: "1.5rem", background: "#FF6B4A18", color: "#FF6B4A", border: "1px solid #FF6B4A35", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                <TrendingUp size={14} /> FOR SERVICE PROVIDERS
              </div>
              <h2 style={{ fontWeight: 900, color: c.text(theme), marginBottom: "1.25rem", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}>
                Stop chasing work.<br /><span style={{ color: "#FF6B4A" }}>Let work find you.</span>
              </h2>
              <p style={{ color: c.textMuted(theme), fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Join 2,400+ verified Caribbean professionals earning more with Rivva. Your Credii Trust Score does the selling for you.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
                {["Get matched to clients on your island automatically", "Your Credii Trust Score builds client confidence", "Subscription from TT$50/mo — no surprise lead fees", "Expand across islands as you grow"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: c.text(theme), fontSize: "1rem" }}>
                    <CheckCircle size={18} style={{ color: "#2ECC71", flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/register?role=provider" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRadius: "0.875rem", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, fontSize: "1.1rem", textDecoration: "none" }}>
                Join as a Provider <ArrowRight size={20} />
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {[
                { label: "Avg monthly earnings", value: "TT$8,400", color: "#FF6B4A" },
                { label: "Leads per month (Pro)", value: "Unlimited", color: "#FFB347" },
                { label: "Subscription cost", value: "TT$50/mo", color: "#0ABFBC" },
                { label: "Islands covered", value: "6 & growing", color: "#2ECC71" },
              ].map(s => (
                <div key={s.label} style={{ padding: "1.75rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.85)" }}>
                  <p style={{ fontWeight: 900, color: s.color, fontSize: "1.6rem", marginBottom: "0.5rem" }}>{s.value}</p>
                  <p style={{ color: c.textMuted(theme), fontSize: "0.9rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section style={{ ...sectionPad, padding: "8rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "25%", width: "600px", height: "600px", borderRadius: "50%", filter: "blur(100px)", background: "rgba(255,107,74,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: "25%", width: "500px", height: "500px", borderRadius: "50%", filter: "blur(100px)", background: "rgba(230,57,70,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ fontWeight: 900, color: c.text(theme), marginBottom: "1.5rem", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Ready to join the<br />
            <span style={{ background: "linear-gradient(90deg, #FF6B4A 0%, #FFB347 50%, #E63946 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Caribbean&apos;s trust network?</span>
          </h2>
          <p style={{ color: c.textMuted(theme), fontSize: "1.25rem", marginBottom: "3rem" }}>
            Clients post free. Providers start from TT$50/mo. No hidden fees.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" style={{ padding: "1.1rem 3rem", borderRadius: "0.875rem", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, fontSize: "1.1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              Post a Request — It&apos;s Free <ArrowRight size={20} />
            </Link>
            <Link href="/register?role=provider" style={{ padding: "1.1rem 3rem", borderRadius: "0.875rem", border: `2px solid ${c.border(theme)}`, color: c.text(theme), fontWeight: 700, fontSize: "1.1rem", textDecoration: "none" }}>
              Join as a Provider
            </Link>
          </div>
          <p style={{ color: c.textFaint(theme), fontSize: "0.95rem", marginTop: "2rem" }}>
            Powered by <strong style={{ color: "#E63946" }}>Credii</strong> · Caribbean&apos;s Trust Infrastructure · Expanding to Africa 2027
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${c.border(theme)}`, padding: "2.5rem 2.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "0.6rem", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1rem" }}>R</div>
            <span style={{ fontWeight: 800, fontSize: "1.2rem", color: c.text(theme) }}>Rivva</span>
            <span style={{ color: "#E63946", fontSize: "0.9rem", fontWeight: 600 }}>Powered by Credii</span>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[["About", "#"], ["Pricing", "/pricing"], ["For Providers", "/register?role=provider"], ["Privacy", "#"], ["Terms", "#"], ["Contact", "#"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ color: c.textMuted(theme), fontSize: "0.9rem", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
          <p style={{ color: c.textFaint(theme), fontSize: "0.85rem" }}>© 2026 Rivva / Credii. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 1024px) {
          .grid-hero { grid-template-columns: 1fr !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-3col { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .photo-grid { height: 280px !important; }
        }
        @media (max-width: 640px) {
          .grid-3col { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .photo-grid { display: none !important; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}