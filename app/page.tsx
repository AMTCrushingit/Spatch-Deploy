"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { useTheme, colors } from "@/lib/theme";
import { serviceCategories } from "@/lib/data";
import { ArrowRight, CheckCircle, Star, TrendingUp, Users, Briefcase, Shield } from "lucide-react";

// ── Palette — River / Caribbean ──────────────────────────────────────────────
const P = {
  teal:     "#0ABFBC",
  tealDk:   "#089A97",
  blue:     "#1A7FBF",
  blueLt:   "#4FB3E8",
  green:    "#1DB87A",
  greenLt:  "#4DD9A0",
  turq:     "#00C9C8",
  credii:   "#E63946",
  gold:     "#F4A623",
  white:    "#FFFFFF",
  lime:     "#AAFF00",
  elecBlue: "#00BFFF",
  neonGrn:  "#39FF14",
};

const FEED = [
  { icon: "⚡", text: "Electrician verified in Jamaica", time: "2m ago", color: P.blue },
  { icon: "📸", text: "Photographer booked in Trinidad", time: "5m ago", color: P.teal },
  { icon: "🔧", text: "Plumber hired in Barbados", time: "8m ago", color: P.green },
  { icon: "🍽️", text: "Caterer matched in St. Lucia", time: "11m ago", color: P.turq },
  { icon: "💻", text: "Web developer verified in Grenada", time: "14m ago", color: P.blue },
  { icon: "🌿", text: "Landscaper booked in Antigua", time: "17m ago", color: P.green },
  { icon: "❄️", text: "AC technician hired in Trinidad", time: "20m ago", color: P.teal },
  { icon: "📚", text: "Tutor matched in Jamaica", time: "23m ago", color: P.turq },
  { icon: "🎵", text: "DJ booked in Barbados", time: "26m ago", color: P.blue },
  { icon: "🏗️", text: "Contractor verified in St. Lucia", time: "29m ago", color: P.green },
];

// ── 24h job feed ─────────────────────────────────────────────────────────────
const JOBS_24H = [
  { service: "AC Repair", island: "Trinidad 🇹🇹", budget: "TT$800", time: "12m ago" },
  { service: "Wedding Photography", island: "Jamaica 🇯🇲", budget: "TT$3,500", time: "28m ago" },
  { service: "House Cleaning", island: "Barbados 🇧🇧", budget: "TT$400", time: "41m ago" },
  { service: "Website Design", island: "Grenada 🇬🇩", budget: "TT$2,200", time: "55m ago" },
  { service: "Electrical Wiring", island: "St. Lucia 🇱🇨", budget: "TT$1,500", time: "1h ago" },
  { service: "Catering (50 pax)", island: "Trinidad 🇹🇹", budget: "TT$5,000", time: "1h ago" },
  { service: "Plumbing Repair", island: "Antigua 🇦🇬", budget: "TT$600", time: "2h ago" },
  { service: "Math Tutoring", island: "Jamaica 🇯🇲", budget: "TT$300", time: "2h ago" },
];

// ── Islands with map positions ────────────────────────────────────────────────
const ISLANDS = [
  { name: "Trinidad & Tobago", flag: "🇹🇹", providers: 842, jobs: 3241, color: P.teal,  x: "72%", y: "68%" },
  { name: "Jamaica",           flag: "🇯🇲", providers: 634, jobs: 2187, color: P.blue,  x: "28%", y: "32%" },
  { name: "Barbados",          flag: "🇧🇧", providers: 421, jobs: 1654, color: P.green, x: "78%", y: "52%" },
  { name: "St. Lucia",         flag: "🇱🇨", providers: 287, jobs: 943,  color: P.turq,  x: "70%", y: "48%" },
  { name: "Grenada",           flag: "🇬🇩", providers: 156, jobs: 521,  color: P.blue,  x: "73%", y: "60%" },
  { name: "Antigua",           flag: "🇦🇬", providers: 98,  jobs: 312,  color: P.green, x: "65%", y: "38%" },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Karen Baptiste", role: "Photographer", island: "Trinidad", avatar: "KB", quote: "Rivva helped me find three new clients in Barbados without leaving my studio. The Credii badge made them trust me instantly.", rating: 5, color: P.teal, jobs: 47, score: 94 },
  { name: "Marcus Williams", role: "Electrician", island: "Jamaica", avatar: "MW", quote: "Before Rivva I was hustling for work every week. Now leads come to me. Made TT$18,000 last month alone.", rating: 5, color: P.blue, jobs: 127, score: 96 },
  { name: "Simone Alexis", role: "Event Caterer", island: "St. Lucia", avatar: "SA", quote: "The verification process gave my business credibility I couldn't buy. Clients see my Credii Trust Score and book immediately.", rating: 5, color: P.green, jobs: 63, score: 91 },
];

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ end, suffix = "", prefix = "" }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = end / (2000 / 16);
        const t = setInterval(() => {
          start += step;
          if (start >= end) { setCount(end); clearInterval(t); }
          else setCount(Math.floor(start));
        }, 16);
        obs.disconnect();
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export default function HomePage() {
  const { theme } = useTheme();
  const c = colors;
  const isDark = theme === "dark";

  const [feedIdx, setFeedIdx] = useState(0);
  const [activeIsland, setActiveIsland] = useState(0);
  const [activeTesti, setActiveTesti] = useState(0);
  const [jobTick, setJobTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFeedIdx(i => (i + 1) % FEED.length), 2800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveTesti(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setJobTick(i => i + 1), 8000);
    return () => clearInterval(t);
  }, []);

  const activity = FEED[feedIdx];

  // Theme-aware colours
  const bg       = isDark ? "#060D12" : "#F0FAFA";
  const bgAlt    = isDark ? "#0A1520" : "#FFFFFF";
  const bgCard   = isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF";
  const border   = isDark ? "rgba(255,255,255,0.08)" : "#D4EEF0";
  const text     = isDark ? "#FFFFFF" : "#0A2A2A";
  const textMut  = isDark ? "rgba(255,255,255,0.55)" : "#3A6060";
  const textFnt  = isDark ? "rgba(255,255,255,0.3)" : "#7AACAC";
  const shadow   = isDark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 24px rgba(10,191,188,0.12)";

  const sec  = { padding: "6rem 2.5rem" };
  const secA = { ...sec, background: bgAlt };

  return (
    <div style={{ background: bg, minHeight: "100vh", width: "100%" }}>
      <Navbar role="guest" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {/* BG */}
        <div style={{ position: "absolute", inset: 0 }}>
          <img src="https://images.pexels.com/photos/4637293/pexels-photo-4637293.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Caribbean turquoise water" style={{ width: "100%", height: "100%", objectFit: "cover", filter: isDark ? "brightness(0.18) saturate(1.6)" : "brightness(0.55) saturate(1.4)" }} />
          <div style={{ position: "absolute", inset: 0, background: isDark
            ? "linear-gradient(135deg, rgba(6,13,18,0.98) 0%, rgba(6,13,18,0.6) 55%, rgba(6,13,18,0.92) 100%)"
            : "linear-gradient(135deg, rgba(240,250,250,0.97) 0%, rgba(240,250,250,0.55) 55%, rgba(240,250,250,0.92) 100%)" }} />
          {/* River-inspired gradient blobs */}
          <div style={{ position: "absolute", top: "20%", right: "15%", width: "600px", height: "600px", borderRadius: "50%", filter: "blur(100px)", background: `${P.teal}18`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "20%", left: "10%", width: "500px", height: "500px", borderRadius: "50%", filter: "blur(100px)", background: `${P.blue}14`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "40%", width: "400px", height: "400px", borderRadius: "50%", filter: "blur(120px)", background: `${P.green}10`, pointerEvents: "none" }} />
        </div>

        <div style={{ position: "relative", width: "100%", padding: "7rem 2.5rem 5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="hero-grid">
            <div>
              {/* Live pill — electric lime accent */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 1.25rem", borderRadius: "999px", marginBottom: "2rem", border: `1px solid ${P.lime}50`, background: isDark ? `${P.lime}08` : `${P.lime}10`, backdropFilter: "blur(12px)" }}>
                <div style={{ width: "0.6rem", height: "0.6rem", borderRadius: "50%", background: P.lime, animation: "pulse 2s infinite", boxShadow: `0 0 8px ${P.lime}` }} />
                <span style={{ fontSize: "1rem", color: activity.color }}>{activity.icon}</span>
                <span style={{ fontSize: "1rem", color: text, fontWeight: 500 }}>{activity.text}</span>
                <span style={{ fontSize: "0.85rem", color: textMut }}>{activity.time}</span>
              </div>

              {/* Headline */}
              <h1 style={{ fontWeight: 900, lineHeight: 1.0, marginBottom: "1.5rem", letterSpacing: "-0.03em", fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
                <span style={{ display: "block", color: text }}>Where Caribbean</span>
                <span style={{ display: "block", background: `linear-gradient(90deg, ${P.teal} 0%, ${P.blue} 40%, ${P.green} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>talent flows</span>
                <span style={{ display: "block", color: text }}>to opportunity</span>
              </h1>

              <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.3rem)", color: textMut, lineHeight: 1.7, marginBottom: "2rem", maxWidth: "36rem" }}>
                <strong>Trusted talent. Real opportunity.</strong><br /><br />Like a river connecting the islands — Rivva links verified Caribbean professionals with clients who need them. Powered by <strong style={{ color: P.credii }}>Credii</strong>.
              </p>

              {/* Founding Provider CTA */}
              <div style={{ padding: "1.5rem", borderRadius: "1.25rem", border: `2px solid ${P.lime}60`, background: isDark ? `${P.lime}06` : `${P.lime}08`, marginBottom: "1.75rem", backdropFilter: "blur(10px)", boxShadow: isDark ? `0 0 30px ${P.lime}15` : `0 0 20px ${P.lime}20` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>🌟</span>
                  <span style={{ fontWeight: 800, color: isDark ? P.lime : "#4A7A00", fontSize: "1rem" }}>Become a Founding Provider</span>
                  <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", background: P.credii, color: "#fff", fontSize: "0.7rem", fontWeight: 800 }}>LIMITED</span>
                </div>
                <p style={{ fontSize: "0.9rem", color: textMut, marginBottom: "1rem" }}>Early access · Lifetime founding badge · Priority placement · Credii verification</p>
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <Link href="/register?role=provider&founding=true" style={{ padding: "0.875rem 2rem", borderRadius: "0.875rem", background: `linear-gradient(135deg, ${P.gold}, #E8920A)`, color: "#fff", fontWeight: 800, fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    Join as Founding Provider <ArrowRight size={18} />
                  </Link>
                  <Link href="/register" style={{ padding: "0.875rem 1.5rem", borderRadius: "0.875rem", border: `1px solid ${border}`, color: text, fontWeight: 600, fontSize: "0.95rem", textDecoration: "none", backdropFilter: "blur(8px)", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)" }}>
                    Post a Request Free
                  </Link>
                </div>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                {[
                  { icon: "🛡️", label: "Credii Verified", color: P.credii },
                  { icon: "⚡", label: "Instant Matching", color: P.blue },
                  { icon: "🌴", label: "6 Islands", color: P.green },
                  { icon: "💰", label: "Free for Clients", color: P.teal },
                ].map(b => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.45rem 0.875rem", borderRadius: "999px", border: `1px solid ${b.color}40`, background: `${b.color}12`, color: b.color, fontSize: "0.85rem", fontWeight: 600 }}>
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Live dashboard */}
            <div className="hidden lg:block">
              <div style={{ borderRadius: "1.5rem", padding: "2rem", border: `1px solid ${border}`, background: isDark ? "rgba(10,191,188,0.05)" : "rgba(255,255,255,0.88)", backdropFilter: "blur(24px)", boxShadow: shadow }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: `linear-gradient(135deg, ${P.teal}, ${P.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1.1rem" }}>R</div>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem", color: text }}>Rivva Live</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: P.green, fontSize: "0.9rem", fontWeight: 600 }}>
                    <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: P.green }} />
                    247 active now
                  </div>
                </div>

                {/* Top providers */}
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: textFnt, marginBottom: "0.75rem", textTransform: "uppercase" }}>Top Verified Providers</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginBottom: "1.5rem" }}>
                  {[
                    { name: "Marcus W. · Electrician · JM", score: 96, avatar: "MW", color: P.blue },
                    { name: "Priya R. · Photographer · TT", score: 94, avatar: "PR", color: P.teal },
                    { name: "Devon C. · Plumber · BB", score: 91, avatar: "DC", color: P.green },
                  ].map(p => (
                    <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem", borderRadius: "0.875rem", background: isDark ? "rgba(255,255,255,0.05)" : `${P.teal}08` }}>
                      <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%", background: `${p.color}25`, color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0 }}>{p.avatar}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.2rem" }}>
                          <div style={{ flex: 1, height: "0.3rem", borderRadius: "999px", background: isDark ? "rgba(255,255,255,0.1)" : "#D4EEF0" }}>
                            <div style={{ width: `${p.score}%`, height: "100%", borderRadius: "999px", background: `linear-gradient(90deg, ${p.color}80, ${p.color})` }} />
                          </div>
                          <span style={{ fontWeight: 800, color: P.credii, fontSize: "0.8rem" }}>{p.score}</span>
                        </div>
                      </div>
                      <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", background: `${P.green}20`, color: P.green, fontSize: "0.7rem", fontWeight: 700 }}>✓</span>
                    </div>
                  ))}
                </div>

                {/* Live activity */}
                <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: textFnt, marginBottom: "0.75rem", textTransform: "uppercase" }}>Live Activity</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {FEED.slice(0, 4).map((a, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.625rem", fontSize: "0.85rem" }}>
                      <span>{a.icon}</span>
                      <span style={{ color: textMut, flex: 1 }}>{a.text}</span>
                      <span style={{ color: textFnt, fontSize: "0.75rem" }}>{a.time}</span>
                    </div>
                  ))}
                </div>

                <Link href="/register?role=provider&founding=true" style={{ display: "block", width: "100%", padding: "1rem", borderRadius: "0.875rem", textAlign: "center", fontWeight: 800, fontSize: "0.95rem", background: `linear-gradient(135deg, ${P.teal}, ${P.blue})`, color: "#fff", textDecoration: "none" }}>
                  {"🌟 Become a Founding Provider"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMPACT COUNTERS ───────────────────────────────────────────────── */}
      <section style={{ ...secA, padding: "4rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem", textAlign: "center" }} className="stats-grid">
          {[
            { value: 12847, suffix: "+", prefix: "", label: "Jobs Completed", sub: "Across 6 islands", color: P.teal },
            { value: 2438, suffix: "+", prefix: "", label: "Verified Providers", sub: "Credii-approved", color: P.blue },
            { value: 8400, suffix: "", prefix: "TT$", label: "Avg Monthly Earnings", sub: "Per Pro provider", color: P.green },
            { value: 98, suffix: "%", prefix: "", label: "Client Satisfaction", sub: "Verified reviews", color: P.credii },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontWeight: 900, color: s.color, lineHeight: 1, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                <Counter end={s.value} suffix={s.suffix} prefix={s.prefix} />
              </p>
              <p style={{ fontWeight: 700, color: text, fontSize: "1rem", marginTop: "0.5rem" }}>{s.label}</p>
              <p style={{ color: textMut, fontSize: "0.85rem", marginTop: "0.2rem" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── LIVE JOB FEED ─────────────────────────────────────────────────── */}
      <section style={{ ...sec }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2col">
          <div>
            
            <h2 style={{ fontWeight: 900, color: text, marginBottom: "1rem", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
              Jobs posted in the<br /><span style={{ color: P.teal }}>last 24 hours</span>
            </h2>
            <p style={{ color: textMut, fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              Real requests from real clients across the Caribbean. Every job is an opportunity for a verified Rivva provider.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/register" style={{ padding: "0.875rem 2rem", borderRadius: "0.875rem", background: `linear-gradient(135deg, ${P.teal}, ${P.blue})`, color: "#fff", fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Post a Request Free <ArrowRight size={18} />
              </Link>
              <Link href="/register?role=provider" style={{ padding: "0.875rem 1.5rem", borderRadius: "0.875rem", border: `2px solid ${P.teal}`, color: P.teal, fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
                Browse as Provider
              </Link>
            </div>
          </div>

          {/* Job feed cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {JOBS_24H.map((job, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", borderRadius: "1rem", border: `1px solid ${border}`, background: bgCard, boxShadow: shadow, animation: i === jobTick % JOBS_24H.length ? "highlight 0.5s ease" : "none" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: `${[P.teal, P.blue, P.green, P.turq][i % 4]}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                  {serviceCategories[i % serviceCategories.length]?.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: text, fontSize: "0.95rem" }}>{job.service}</p>
                  <p style={{ fontSize: "0.85rem", color: textMut }}>{job.island}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontWeight: 800, color: P.teal, fontSize: "0.95rem" }}>{job.budget}</p>
                  <p style={{ fontSize: "0.75rem", color: textFnt }}>{job.time}</p>
                </div>
                <div style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: P.green, flexShrink: 0 }} />
              </div>
            ))}
            <p style={{ textAlign: "center", fontSize: "0.85rem", color: textMut, marginTop: "0.5rem" }}>
              + 16 more jobs posted today
            </p>
          </div>
        </div>
      </section>

      {/* ── CREDII TRUST SCORE ─────────────────────────────────────────────── */}
      <section style={{ ...secA }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2col">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "999px", marginBottom: "1.5rem", background: `${P.credii}12`, color: P.credii, border: `1px solid ${P.credii}30`, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em" }}>
              🛡️ CREDII TRUST INFRASTRUCTURE
            </div>
            <h2 style={{ fontWeight: 900, color: text, marginBottom: "1rem", fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
              Not just verified.<br /><span style={{ color: P.credii }}>Trust-scored.</span>
            </h2>
            <p style={{ color: textMut, fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              Every Rivva provider gets a <strong style={{ color: P.credii }}>Credii Trust Score</strong> — built from identity verification, skill proof, response speed, completion rate, and client reviews. Nobody else in the Caribbean does this.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { label: "Identity Verified", desc: "Government ID + biometric check", color: P.credii },
                { label: "Skill Certified", desc: "Licence or portfolio reviewed by Credii", color: P.blue },
                { label: "Performance Tracked", desc: "Response time, completion rate, reviews", color: P.green },
                { label: "Continuously Monitored", desc: "Annual re-verification, real-time flags", color: P.teal },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                  <div style={{ width: "1.5rem", height: "1.5rem", borderRadius: "50%", background: `${item.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "0.1rem" }}>
                    <CheckCircle size={13} style={{ color: item.color }} />
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, color: text, fontSize: "1rem" }}>{item.label}</span>
                    <span style={{ color: textMut, fontSize: "1rem", marginLeft: "0.5rem" }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.875rem 1.25rem", borderRadius: "0.875rem", background: bgCard, border: `1px solid ${border}`, fontSize: "0.95rem" }}>
              <span style={{ color: textMut }}>Thumbtack shows:</span>
              <span style={{ fontWeight: 600, color: text }}>✓ Verified</span>
              <span style={{ color: textMut }}>· Rivva shows:</span>
              <span style={{ fontWeight: 800, color: P.credii }}>Credii Score: 94</span>
            </div>
          </div>

          {/* Score cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {[
              { name: "Marcus W.", role: "Electrician", island: "Jamaica 🇯🇲", score: 96, avatar: "MW", color: P.blue, jobs: 127 },
              { name: "Priya R.", role: "Photographer", island: "Trinidad 🇹🇹", score: 94, avatar: "PR", color: P.teal, jobs: 89 },
              { name: "Devon C.", role: "Plumber", island: "Barbados 🇧🇧", score: 91, avatar: "DC", color: P.green, jobs: 203 },
              { name: "Kezia T.", role: "Caterer", island: "Grenada 🇬🇩", score: 88, avatar: "KT", color: P.turq, jobs: 54 },
            ].map(p => (
              <div key={p.name} style={{ padding: "1.5rem", borderRadius: "1.25rem", border: `1px solid ${border}`, background: bgCard, boxShadow: shadow }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "50%", background: `${p.color}22`, color: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>{p.avatar}</div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontWeight: 700, color: text, fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                    <p style={{ color: textMut, fontSize: "0.8rem" }}>{p.role}</p>
                  </div>
                </div>
                <p style={{ color: textFnt, fontSize: "0.8rem", marginBottom: "0.625rem" }}>{p.island}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <span style={{ color: P.credii, fontSize: "0.8rem", fontWeight: 700 }}>Credii Score</span>
                  <span style={{ fontWeight: 900, color: p.color, fontSize: "1.1rem" }}>{p.score}</span>
                </div>
                <div style={{ width: "100%", height: "0.4rem", borderRadius: "999px", background: isDark ? "rgba(255,255,255,0.08)" : "#D4EEF0", marginBottom: "0.75rem" }}>
                  <div style={{ width: `${p.score}%`, height: "100%", borderRadius: "999px", background: `linear-gradient(90deg, ${p.color}70, ${p.color})` }} />
                </div>
                <p style={{ color: textFnt, fontSize: "0.8rem" }}>{p.jobs} jobs completed</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ISLAND MAP ────────────────────────────────────────────────────── */}
      <section style={{ ...sec }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "999px", marginBottom: "1.25rem", background: `${P.blue}15`, color: P.blue, border: `1px solid ${P.blue}30`, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em" }}>
            🌍 RIVVA ACROSS THE CARIBBEAN
          </div>
          <h2 style={{ fontWeight: 900, color: text, marginBottom: "0.75rem", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Your island. Your network.</h2>
          <p style={{ color: textMut, fontSize: "1.1rem" }}>Click an island to explore its provider community</p>
        </div>

        {/* Map with overlaid island cards */}
        <div style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden", border: `1px solid ${border}`, boxShadow: shadow }}>
          {/* Caribbean map image */}
          <img src="https://sailing-blog.nauticed.org/wp-content/uploads/2022/05/Caribbean_Islands_Map.png"
            alt="Caribbean map" style={{ width: "100%", height: "520px", objectFit: "cover", filter: isDark ? "brightness(0.35) saturate(1.4) hue-rotate(10deg)" : "brightness(0.75) saturate(1.3) hue-rotate(5deg)" }} />
          {/* Teal overlay */}
          <div style={{ position: "absolute", inset: 0, background: isDark ? `linear-gradient(135deg, ${P.teal}20, ${P.blue}15)` : `linear-gradient(135deg, ${P.teal}25, ${P.blue}20)` }} />

          {/* Island pins */}
          {ISLANDS.map((island, i) => (
            <button key={island.name} onClick={() => setActiveIsland(i)}
              style={{ position: "absolute", left: island.x, top: island.y, transform: "translate(-50%, -50%)", cursor: "pointer", border: "none", background: "transparent", padding: 0 }}>
              {/* Pulse ring */}
              <div style={{ position: "absolute", inset: "-8px", borderRadius: "50%", border: `2px solid ${island.color}`, opacity: activeIsland === i ? 1 : 0.4, animation: "pulse-ring 2s infinite" }} />
              {/* Pin */}
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: activeIsland === i ? island.color : `${island.color}80`, border: `3px solid ${activeIsland === i ? "#fff" : island.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", boxShadow: activeIsland === i ? `0 0 20px ${island.color}80` : "none", transition: "all 0.2s" }}>
                {island.flag}
              </div>
            </button>
          ))}

          {/* Active island info card */}
          <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", right: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {ISLANDS.map((island, i) => (
              <div key={island.name} onClick={() => setActiveIsland(i)}
                style={{ padding: "1rem 1.25rem", borderRadius: "1rem", border: `2px solid ${activeIsland === i ? island.color : "rgba(255,255,255,0.2)"}`, background: activeIsland === i ? `${island.color}25` : "rgba(0,0,0,0.5)", backdropFilter: "blur(12px)", cursor: "pointer", transition: "all 0.2s", flex: "1 1 140px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <span style={{ fontSize: "1.2rem" }}>{island.flag}</span>
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.85rem" }}>{island.name.split(" ")[0]}</span>
                </div>
                <p style={{ fontWeight: 900, color: island.color, fontSize: "1.2rem", lineHeight: 1 }}>{island.providers}</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>providers</p>
              </div>
            ))}
          </div>
        </div>

        {/* Africa teaser */}
        <div style={{ marginTop: "1.5rem", padding: "1.5rem 2rem", borderRadius: "1.25rem", border: `2px dashed ${border}`, background: bgCard, textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "2rem" }}>🌍</span>
          <div>
            <p style={{ fontWeight: 700, color: text, fontSize: "1.1rem" }}>Africa Expansion — 2027</p>
            <p style={{ color: textMut, fontSize: "0.9rem" }}>The same Credii trust infrastructure. 54 countries. Nigeria, Ghana, Kenya first.</p>
          </div>
          <Link href="/register?role=provider" style={{ padding: "0.625rem 1.5rem", borderRadius: "0.875rem", background: `linear-gradient(135deg, ${P.teal}, ${P.blue})`, color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
            Get Early Access
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section style={{ ...secA }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2 style={{ fontWeight: 900, color: text, marginBottom: "1rem", fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>How Rivva works</h2>
          <p style={{ color: textMut, fontSize: "1.15rem" }}>Three steps. Zero hassle. Caribbean-fast.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem" }} className="grid-3col">
          {[
            { step: "01", icon: "📝", title: "Post your request", desc: "Describe what you need, your island, and budget. Takes 90 seconds. Free for clients.", color: P.teal },
            { step: "02", icon: "⚡", title: "Get matched instantly", desc: "Our engine sends your request to the top 5 Credii-verified providers on your island within minutes.", color: P.blue },
            { step: "03", icon: "✅", title: "Hire with confidence", desc: "Compare Credii Trust Scores, read verified reviews, chat directly, and hire. Leave a review when done.", color: P.green },
          ].map(s => (
            <div key={s.step} style={{ position: "relative", padding: "2.5rem", borderRadius: "1.25rem", border: `1px solid ${border}`, background: bgCard, boxShadow: shadow }}>
              <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontWeight: 900, opacity: 0.07, color: s.color, fontSize: "4rem", lineHeight: 1 }}>{s.step}</div>
              <div style={{ width: "4rem", height: "4rem", borderRadius: "1rem", background: `${s.color}18`, border: `1px solid ${s.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", marginBottom: "1.5rem" }}>{s.icon}</div>
              <h3 style={{ fontWeight: 700, color: text, marginBottom: "0.875rem", fontSize: "1.3rem" }}>{s.title}</h3>
              <p style={{ color: textMut, fontSize: "1rem", lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section style={{ ...sec }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontWeight: 900, color: text, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>Every service.<br />Every island.</h2>
          <Link href="/register" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 600, color: P.teal, textDecoration: "none", fontSize: "1rem" }}>Browse all <ArrowRight size={16} /></Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "1rem" }}>
          {serviceCategories.map((cat, i) => {
            const catColors = [P.teal, P.blue, P.green, P.turq, P.teal, P.blue, P.green, P.turq, P.teal, P.blue, P.green, P.turq];
            const col = catColors[i % catColors.length];
            return (
              <Link key={cat.id} href="/register" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "1.5rem 1rem", borderRadius: "1rem", border: `1px solid ${border}`, background: bgCard, textDecoration: "none", boxShadow: shadow, transition: "transform 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "0.875rem", background: `${col}15`, border: `1px solid ${col}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem" }}>{cat.icon}</div>
                <span style={{ fontWeight: 600, textAlign: "center", color: text, fontSize: "0.85rem" }}>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section style={{ ...secA }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 style={{ fontWeight: 900, color: text, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>Real people.<br />Real results.</h2>
        </div>

        {/* Photo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", height: "380px", marginBottom: "4rem" }} className="photo-grid">
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
              <img src="https://wallpapers.com/images/hd/barbados-houses-j22gdi6vknriecoz.jpg" alt="Barbados" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.4)" }} />
            </div>
            <div style={{ borderRadius: "1.25rem", overflow: "hidden" }}>
              <img src="https://fooddrinklife.com/wp-content/uploads/2024/07/Iconic-view-of-Piton-mountains-on-St-Lucia-island-1024x681.jpg" alt="St Lucia" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.3)" }} />
            </div>
          </div>
        </div>

        {/* Testimonial carousel */}
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} style={{ display: activeTesti === i ? "block" : "none" }}>
            <div style={{ padding: "3rem", borderRadius: "1.5rem", border: `2px solid ${t.color}30`, background: bgCard, boxShadow: shadow, textAlign: "center", maxWidth: "860px", margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginBottom: "1.5rem" }}>
                {[...Array(t.rating)].map((_, j) => <Star key={j} size={22} fill={t.color} style={{ color: t.color }} />)}
              </div>
              <p style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: text, lineHeight: 1.7, marginBottom: "2rem" }}>&ldquo;{t.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: `${t.color}25`, color: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1rem" }}>{t.avatar}</div>
                <div style={{ textAlign: "left" }}>
                  <p style={{ fontWeight: 700, color: text, fontSize: "1.1rem" }}>{t.name}</p>
                  <p style={{ color: textMut, fontSize: "0.95rem" }}>{t.role} · {t.island} · {t.jobs} jobs</p>
                </div>
                <div style={{ padding: "0.75rem 1.25rem", borderRadius: "0.875rem", background: `${P.credii}12`, border: `1px solid ${P.credii}30` }}>
                  <p style={{ fontSize: "0.75rem", color: P.credii, fontWeight: 700, marginBottom: "0.2rem" }}>Credii Score</p>
                  <p style={{ fontSize: "1.5rem", fontWeight: 900, color: t.color, lineHeight: 1 }}>{t.score}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActiveTesti(i)} style={{ height: "0.5rem", borderRadius: "999px", border: "none", cursor: "pointer", transition: "all 0.3s", width: activeTesti === i ? "2rem" : "0.5rem", background: activeTesti === i ? P.teal : border }} />
          ))}
        </div>
      </section>

      {/* ── FOUNDER STORY ─────────────────────────────────────────────────── */}
      <section style={{ ...sec }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }} className="grid-2col">
          <div style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden", height: "420px" }}>
            <img src="https://images.pexels.com/photos/13820403/pexels-photo-13820403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Caribbean turquoise water" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(1.4) brightness(0.85)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${P.teal}40, ${P.blue}30)` }} />
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem" }}>
              <div style={{ padding: "1.5rem", borderRadius: "1rem", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.5rem" }}>🌊 Why Rivva?</p>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", lineHeight: 1.6 }}>Like a river, opportunity should flow freely — connecting every corner of the Caribbean.</p>
              </div>
            </div>
          </div>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "999px", marginBottom: "1.5rem", background: `${P.teal}15`, color: P.teal, border: `1px solid ${P.teal}30`, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em" }}>
              🌊 OUR STORY
            </div>
            <h2 style={{ fontWeight: 900, color: text, marginBottom: "1.5rem", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}>
              Why Rivva exists
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <p style={{ color: textMut, fontSize: "1.05rem", lineHeight: 1.8 }}>
                Across the Caribbean, talented professionals struggle to find clients — not because they lack skill, but because trust is hard to establish in a fragmented, island-by-island economy.
              </p>
              <p style={{ color: textMut, fontSize: "1.05rem", lineHeight: 1.8 }}>
                At the same time, clients waste hours searching for reliable help, with no way to verify who they&apos;re hiring. The result? Billions in economic potential, untapped.
              </p>
              <p style={{ color: text, fontSize: "1.05rem", lineHeight: 1.8, fontWeight: 600 }}>
                Rivva — named for the rivers that connect the Caribbean landscape — was built to change this. Powered by <strong style={{ color: P.credii }}>Credii&apos;s</strong> trust infrastructure, we verify professionals, match them to opportunities, and build the economic network the Caribbean deserves.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2rem" }}>
              {[{ icon: <Users size={18} />, label: "2,400+ providers", sub: "Earning more", color: P.teal }, { icon: <Briefcase size={18} />, label: "12,000+ jobs", sub: "Completed", color: P.blue }, { icon: <Shield size={18} />, label: "Credii verified", sub: "Every provider", color: P.credii }, { icon: <TrendingUp size={18} />, label: "6 islands", sub: "And growing", color: P.green }].map(s => (
                <div key={s.label} style={{ padding: "1rem", borderRadius: "0.875rem", border: `1px solid ${border}`, background: bgCard, display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: `${s.color}18`, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: text, fontSize: "0.9rem" }}>{s.label}</p>
                    <p style={{ color: textMut, fontSize: "0.8rem" }}>{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR PROVIDERS ─────────────────────────────────────────────────── */}
      <section style={{ ...secA }}>
        <div style={{ borderRadius: "1.5rem", overflow: "hidden", position: "relative", minHeight: "480px" }}>
          <img src="https://images.pexels.com/photos/31010712/pexels-photo-31010712/free-photo-of-aerial-view-of-coastal-town-and-blue-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Caribbean coast" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: isDark ? "brightness(0.18) saturate(1.5)" : "brightness(0.35) saturate(1.3)" }} />
          <div style={{ position: "absolute", inset: 0, background: isDark ? "linear-gradient(135deg, rgba(6,13,18,0.97) 0%, rgba(6,13,18,0.65) 100%)" : "linear-gradient(135deg, rgba(240,250,250,0.97) 0%, rgba(240,250,250,0.7) 100%)" }} />
          <div style={{ position: "relative", padding: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid-2col">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "999px", marginBottom: "1.5rem", background: `${P.teal}18`, color: P.teal, border: `1px solid ${P.teal}35`, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                <TrendingUp size={13} /> FOR SERVICE PROVIDERS
              </div>
              <h2 style={{ fontWeight: 900, color: text, marginBottom: "1.25rem", fontSize: "clamp(2rem, 3.5vw, 3rem)", lineHeight: 1.1 }}>
                Stop chasing work.<br /><span style={{ color: P.teal }}>Let work find you.</span>
              </h2>
              <p style={{ color: textMut, fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                Join 2,400+ verified Caribbean professionals earning more with Rivva. Your Credii Trust Score does the selling for you.
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "2.5rem" }}>
                {["Get matched to clients on your island automatically", "Your Credii Trust Score builds client confidence", "Subscription from TT$50/mo — no surprise lead fees", "Expand across islands as you grow"].map(item => (
                  <li key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: text, fontSize: "1rem" }}>
                    <CheckCircle size={18} style={{ color: P.green, flexShrink: 0 }} /> {item}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/register?role=provider&founding=true" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1.1rem 2.5rem", borderRadius: "0.875rem", background: `linear-gradient(135deg, ${P.gold}, #E8920A)`, color: "#fff", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none" }}>
                  🌟 Become a Founding Provider <ArrowRight size={18} />
                </Link>
                <Link href="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1.1rem 1.75rem", borderRadius: "0.875rem", border: `2px solid ${P.teal}`, color: P.teal, fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
                  View Pricing
                </Link>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {[
                { label: "Avg monthly earnings", value: "TT$8,400", color: P.teal },
                { label: "Leads per month (Pro)", value: "Unlimited", color: P.blue },
                { label: "Subscription cost", value: "TT$50/mo", color: P.green },
                { label: "Islands covered", value: "6 & growing", color: P.turq },
              ].map(s => (
                <div key={s.label} style={{ padding: "1.75rem", borderRadius: "1rem", border: `1px solid ${border}`, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.85)" }}>
                  <p style={{ fontWeight: 900, color: s.color, fontSize: "1.6rem", marginBottom: "0.5rem" }}>{s.value}</p>
                  <p style={{ color: textMut, fontSize: "0.9rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section style={{ padding: "8rem 2.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: "20%", width: "700px", height: "700px", borderRadius: "50%", filter: "blur(120px)", background: `${P.teal}10`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 0, right: "20%", width: "600px", height: "600px", borderRadius: "50%", filter: "blur(120px)", background: `${P.blue}08`, pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <h2 style={{ fontWeight: 900, color: text, marginBottom: "1.5rem", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Ready to join the<br />
            <span style={{ background: `linear-gradient(90deg, ${P.teal} 0%, ${P.blue} 50%, ${P.green} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Caribbean&apos;s trust network?</span>
          </h2>
          <p style={{ color: textMut, fontSize: "1.25rem", marginBottom: "3rem" }}>
            Clients post free. Providers start from TT$50/mo. No hidden fees.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register?role=provider&founding=true" style={{ padding: "1.1rem 3rem", borderRadius: "0.875rem", background: `linear-gradient(135deg, ${P.gold}, #E8920A)`, color: "#fff", fontWeight: 800, fontSize: "1.1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              🌟 Become a Founding Provider
            </Link>
            <Link href="/register" style={{ padding: "1.1rem 3rem", borderRadius: "0.875rem", background: `linear-gradient(135deg, ${P.teal}, ${P.blue})`, color: "#fff", fontWeight: 700, fontSize: "1.1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              Post a Request Free <ArrowRight size={20} />
            </Link>
          </div>
          <p style={{ color: textFnt, fontSize: "0.95rem", marginTop: "2rem" }}>
            Powered by <strong style={{ color: P.credii }}>Credii</strong> · Caribbean&apos;s Trust Infrastructure · Expanding to Africa 2027
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "2.5rem 2.5rem", background: bgAlt }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "2.2rem", height: "2.2rem", borderRadius: "0.6rem", background: `linear-gradient(135deg, ${P.teal}, ${P.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "1rem" }}>R</div>
            <span style={{ fontWeight: 800, fontSize: "1.2rem", color: text }}>Rivva</span>
            <span style={{ color: P.credii, fontSize: "0.9rem", fontWeight: 600 }}>Powered by Credii</span>
          </div>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[["About", "#"], ["Pricing", "/pricing"], ["For Providers", "/register?role=provider"], ["Privacy", "#"], ["Terms", "#"], ["Contact", "#"]].map(([l, h]) => (
              <Link key={l} href={h} style={{ color: textMut, fontSize: "0.9rem", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
          <p style={{ color: textFnt, fontSize: "0.85rem" }}>© 2026 Rivva / Credii. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        .hero-grid { grid-template-columns: 1fr 1fr; }
        .grid-2col { grid-template-columns: 1fr 1fr; }
        .grid-3col { grid-template-columns: repeat(3,1fr); }
        .stats-grid { grid-template-columns: repeat(4,1fr); }
        @media(max-width:1024px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-3col { grid-template-columns: 1fr 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .photo-grid { height: 280px !important; }
        }
        @media(max-width:640px) {
          .grid-3col { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .photo-grid { display: none !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes pulse-ring { 0%{transform:translate(-50%,-50%) scale(1);opacity:0.6} 100%{transform:translate(-50%,-50%) scale(1.8);opacity:0} }
        @keyframes highlight { 0%{background:rgba(10,191,188,0.15)} 100%{background:transparent} }
      `}</style>
    </div>
  );
}