"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { serviceCategories, providers, users } from "@/lib/data";
import { ArrowRight, CheckCircle, TrendingUp, Star } from "lucide-react";

const activityFeed = [
  { icon: "⚡", text: "Electrician verified in Jamaica", time: "2m ago", color: "#FFD700" },
  { icon: "📸", text: "Photographer booked in Trinidad", time: "5m ago", color: "#FF6B4A" },
  { icon: "🔧", text: "Plumber hired in Barbados", time: "8m ago", color: "#0ABFBC" },
  { icon: "🍽️", text: "Caterer matched in St. Lucia", time: "12m ago", color: "#2ECC71" },
  { icon: "💻", text: "Web developer verified in Grenada", time: "15m ago", color: "#FF6B4A" },
  { icon: "🌿", text: "Landscaper booked in Antigua", time: "18m ago", color: "#0ABFBC" },
  { icon: "❄️", text: "AC technician hired in Trinidad", time: "22m ago", color: "#FFD700" },
  { icon: "📚", text: "Tutor matched in Jamaica", time: "25m ago", color: "#2ECC71" },
];

const islands = [
  { name: "Trinidad & Tobago", flag: "🇹🇹", providers: 842, color: "#FF6B4A" },
  { name: "Jamaica", flag: "🇯🇲", providers: 634, color: "#FFD700" },
  { name: "Barbados", flag: "🇧🇧", providers: 421, color: "#0ABFBC" },
  { name: "St. Lucia", flag: "🇱🇨", providers: 287, color: "#2ECC71" },
  { name: "Grenada", flag: "🇬🇩", providers: 156, color: "#FF6B4A" },
  { name: "Antigua", flag: "🇦🇬", providers: 98, color: "#FFD700" },
];

const testimonials = [
  { name: "Karen Baptiste", role: "Photographer", island: "Trinidad", avatar: "KB", quote: "Rivva helped me find three new clients in Barbados without leaving my studio. The Credii badge made them trust me instantly.", rating: 5, color: "#FF6B4A", jobs: 47, score: 94 },
  { name: "Marcus Williams", role: "Electrician", island: "Jamaica", avatar: "MW", quote: "Before Rivva I was hustling for work every week. Now leads come to me. Made TT$18,000 last month alone.", rating: 5, color: "#FFD700", jobs: 127, score: 96 },
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

function TrustRing({ score, color }: { score: number; color: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-black text-white leading-none">{score}</span>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>score</span>
      </div>
    </div>
  );
}

export default function HomePage() {
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

  return (
    <div style={{ background: "#080810", minHeight: "100vh", color: "#fff" }}>
      <Navbar role="guest" />

      {/* ── HERO — TRUE FULL VIEWPORT ─────────────────────────────────────── */}
      <section className="relative flex items-center" style={{ minHeight: "100vh" }}>
        {/* BG image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/18602858/pexels-photo-18602858/free-photo-of-an-aerial-view-of-the-beach-and-town.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Caribbean aerial"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.22) saturate(1.5)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.55) 55%, rgba(8,8,16,0.9) 100%)" }} />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "rgba(255,107,74,0.12)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: "rgba(10,191,188,0.10)" }} />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div>
              {/* Live pill */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10 border"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)" }}>
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#2ECC71" }} />
                <span className="text-base" style={{ color: activity.color }}>{activity.icon}</span>
                <span className="text-base text-white">{activity.text}</span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>{activity.time}</span>
              </div>

              {/* Headline */}
              <h1 className="font-black leading-none mb-8" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "-0.03em" }}>
                <span className="block text-white">The Caribbean&apos;s</span>
                <span className="block" style={{
                  background: "linear-gradient(90deg, #FF6B4A 0%, #FFD700 50%, #0ABFBC 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Trust &amp; Opportunity</span>
                <span className="block text-white">Network</span>
              </h1>

              {/* Subheadline */}
              <p className="mb-10 max-w-xl" style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                Verified Caribbean professionals. Real opportunities. Powered by Credii — the region&apos;s trust infrastructure.
              </p>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10 max-w-2xl">
                <div className="flex-1 flex items-center gap-3 px-5 py-4 rounded-2xl border"
                  style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
                  <span className="text-xl">🔍</span>
                  <input type="text" placeholder="What do you need done?"
                    className="flex-1 bg-transparent text-white outline-none"
                    style={{ fontSize: "1rem" }} />
                </div>
                <Link href="/register"
                  className="px-8 py-4 rounded-2xl font-bold flex items-center gap-2 justify-center hover:opacity-90 transition whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", fontSize: "1rem" }}>
                  Get Quotes Free <ArrowRight size={18} />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: "🛡️", label: "Credii Verified", color: "#0ABFBC" },
                  { icon: "⚡", label: "Instant Matching", color: "#FFD700" },
                  { icon: "🌴", label: "6 Islands", color: "#2ECC71" },
                  { icon: "💰", label: "Free for Clients", color: "#FF6B4A" },
                ].map(b => (
                  <div key={b.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border"
                    style={{ borderColor: `${b.color}40`, background: `${b.color}12`, color: b.color, fontSize: "0.9rem", fontWeight: 600 }}>
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Live dashboard */}
            <div className="hidden lg:block">
              <div className="rounded-3xl p-8 border"
                style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(24px)" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base"
                      style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>R</div>
                    <span className="font-bold text-white text-lg">Rivva Live</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: "#2ECC71", fontSize: "0.9rem" }}>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    247 active now
                  </div>
                </div>

                <p className="font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>Top Verified Providers</p>
                <div className="space-y-3 mb-6">
                  {[
                    { name: "Marcus W. · Electrician · JM", score: 96, avatar: "MW", color: "#FFD700" },
                    { name: "Priya R. · Photographer · TT", score: 94, avatar: "PR", color: "#FF6B4A" },
                    { name: "Devon C. · Plumber · BB", score: 91, avatar: "DC", color: "#0ABFBC" },
                  ].map(p => (
                    <div key={p.name} className="flex items-center gap-4 p-4 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                        style={{ background: `${p.color}25`, color: p.color, fontSize: "0.85rem" }}>{p.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate" style={{ fontSize: "0.9rem" }}>{p.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                            <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: p.color }} />
                          </div>
                          <span className="font-black" style={{ color: p.color, fontSize: "0.85rem" }}>{p.score}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
                        style={{ background: "#2ECC7120", color: "#2ECC71", fontSize: "0.75rem" }}>✓ Live</span>
                    </div>
                  ))}
                </div>

                <p className="font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>Live Activity</p>
                <div className="space-y-2.5 mb-6">
                  {activityFeed.slice(0, 4).map((a, i) => (
                    <div key={i} className="flex items-center gap-3" style={{ fontSize: "0.9rem" }}>
                      <span className="text-lg">{a.icon}</span>
                      <span style={{ color: "rgba(255,255,255,0.65)" }}>{a.text}</span>
                      <span className="ml-auto" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>{a.time}</span>
                    </div>
                  ))}
                </div>

                <Link href="/register?role=provider"
                  className="block w-full py-4 rounded-2xl text-center font-bold hover:opacity-90 transition"
                  style={{ background: "linear-gradient(135deg, #FF6B4A, #FFD700)", color: "#080810", fontSize: "1rem" }}>
                  Join as a Provider — From TT$50/mo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, transparent, white)" }} />
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="border-y" style={{ background: "#0D0D1A", borderColor: "rgba(255,255,255,0.06)", padding: "5rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { value: 2438, suffix: "+", label: "Verified Providers", color: "#FF6B4A" },
              { value: 6, suffix: " Islands", label: "Caribbean Coverage", color: "#FFD700" },
              { value: 12847, suffix: "+", label: "Jobs Completed", color: "#0ABFBC" },
              { value: 98, suffix: "%", label: "Client Satisfaction", color: "#2ECC71" },
            ].map(s => (
              <div key={s.label}>
                <p className="font-black" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: s.color, lineHeight: 1 }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3" style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDII TRUST SCORE ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ padding: "8rem 0" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 25% 50%, rgba(10,191,188,0.07) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
                style={{ background: "rgba(10,191,188,0.12)", color: "#0ABFBC", borderColor: "rgba(10,191,188,0.3)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                🛡️ CREDII TRUST INFRASTRUCTURE
              </div>
              <h2 className="font-black mb-8 leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                <span className="text-white">Not just verified.</span><br />
                <span style={{ color: "#0ABFBC" }}>Trust-scored.</span>
              </h2>
              <p className="mb-10" style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}>
                Every Rivva provider gets a <strong style={{ color: "#0ABFBC" }}>Credii Trust Score</strong> — built from identity verification, skill proof, response speed, completion rate, and client reviews. Not just a background check. A real measure of professional reliability.
              </p>
              <div className="space-y-5 mb-10">
                {[
                  { label: "Identity Verified", desc: "Government ID + biometric check", color: "#0ABFBC" },
                  { label: "Skill Certified", desc: "Licence or portfolio reviewed by Credii", color: "#FFD700" },
                  { label: "Performance Tracked", desc: "Response time, completion rate, reviews", color: "#2ECC71" },
                  { label: "Continuously Monitored", desc: "Annual re-verification, real-time flags", color: "#FF6B4A" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${item.color}20` }}>
                      <CheckCircle size={14} style={{ color: item.color }} />
                    </div>
                    <div>
                      <span className="font-bold text-white" style={{ fontSize: "1rem" }}>{item.label}</span>
                      <span className="ml-2" style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem" }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "0.95rem" }}>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>Thumbtack shows:</span>
                <span className="font-semibold text-white">✓ Verified</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>· Rivva shows:</span>
                <span className="font-black" style={{ color: "#0ABFBC" }}>Credii Score: 94</span>
              </div>
            </div>

            {/* Trust score cards */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { name: "Marcus W.", role: "Electrician", island: "Jamaica 🇯🇲", score: 96, avatar: "MW", color: "#FFD700", jobs: 127, response: "1.2h" },
                { name: "Priya R.", role: "Photographer", island: "Trinidad 🇹🇹", score: 94, avatar: "PR", color: "#FF6B4A", jobs: 89, response: "0.8h" },
                { name: "Devon C.", role: "Plumber", island: "Barbados 🇧🇧", score: 91, avatar: "DC", color: "#0ABFBC", jobs: 203, response: "2.1h" },
                { name: "Kezia T.", role: "Caterer", island: "Grenada 🇬🇩", score: 88, avatar: "KT", color: "#2ECC71", jobs: 54, response: "1.5h" },
              ].map(p => (
                <div key={p.name} className="p-6 rounded-3xl border"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                      style={{ background: `${p.color}25`, color: p.color, fontSize: "0.85rem" }}>{p.avatar}</div>
                    <div className="min-w-0">
                      <p className="font-bold text-white truncate" style={{ fontSize: "0.95rem" }}>{p.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>{p.role}</p>
                    </div>
                  </div>
                  <p className="mb-3" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>{p.island}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>Credii Score</span>
                    <span className="font-black" style={{ color: p.color, fontSize: "1.1rem" }}>{p.score}</span>
                  </div>
                  <div className="w-full h-2 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: `linear-gradient(90deg, ${p.color}70, ${p.color})` }} />
                  </div>
                  <div className="flex justify-between" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>
                    <span>{p.jobs} jobs</span>
                    <span>~{p.response} avg</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section style={{ background: "#0D0D1A", padding: "8rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-black text-white mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>How Rivva works</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.2rem" }}>Three steps. Zero hassle. Caribbean-fast.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "📝", title: "Post your request", desc: "Describe what you need, your island, and budget. Takes 90 seconds. No account needed to browse.", color: "#FF6B4A" },
              { step: "02", icon: "⚡", title: "Get matched instantly", desc: "Our engine sends your request to the top 5 Credii-verified providers on your island within minutes.", color: "#FFD700" },
              { step: "03", icon: "✅", title: "Hire with confidence", desc: "Compare Trust Scores, read verified reviews, chat directly, and hire. Leave a review when done.", color: "#0ABFBC" },
            ].map(s => (
              <div key={s.step} className="relative p-10 rounded-3xl border"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                <div className="absolute top-6 right-6 font-black opacity-10" style={{ color: s.color, fontSize: "4rem" }}>{s.step}</div>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}35`, fontSize: "2rem" }}>
                  {s.icon}
                </div>
                <h3 className="font-bold text-white mb-4" style={{ fontSize: "1.4rem" }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ padding: "8rem 0" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,107,74,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-black text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}>
              Every service.<br />Every island.
            </h2>
            <Link href="/register" className="flex items-center gap-2 font-semibold hover:opacity-70"
              style={{ color: "#FF6B4A", fontSize: "1rem" }}>Browse all <ArrowRight size={16} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {serviceCategories.map((cat, i) => {
              const colors = ["#FF6B4A", "#FFD700", "#0ABFBC", "#2ECC71", "#FF6B4A", "#FFD700", "#0ABFBC", "#2ECC71", "#FF6B4A", "#FFD700", "#0ABFBC", "#2ECC71"];
              const c = colors[i % colors.length];
              return (
                <Link key={cat.id} href="/register"
                  className="group flex flex-col items-center gap-3 p-6 rounded-2xl border hover:scale-105 transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${c}15`, border: `1px solid ${c}30`, fontSize: "1.75rem" }}>
                    {cat.icon}
                  </div>
                  <span className="font-medium text-center" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ISLAND MAP ────────────────────────────────────────────────────── */}
      <section style={{ background: "#0D0D1A", padding: "8rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border"
              style={{ background: "rgba(255,215,0,0.12)", color: "#FFD700", borderColor: "rgba(255,215,0,0.3)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em" }}>
              🌍 RIVVA ACROSS THE CARIBBEAN
            </div>
            <h2 className="font-black text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>Your island. Your network.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.1rem" }}>Click an island to explore</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
            {islands.map((island, i) => (
              <button key={island.name} onClick={() => setActiveIsland(i)}
                className="p-7 rounded-3xl border text-left transition-all duration-200 hover:scale-105"
                style={{
                  background: activeIsland === i ? `${island.color}12` : "rgba(255,255,255,0.03)",
                  borderColor: activeIsland === i ? `${island.color}50` : "rgba(255,255,255,0.07)",
                  boxShadow: activeIsland === i ? `0 0 40px ${island.color}18` : "none",
                }}>
                <div className="flex items-center gap-4 mb-4">
                  <span style={{ fontSize: "2.5rem" }}>{island.flag}</span>
                  <div>
                    <p className="font-bold text-white" style={{ fontSize: "1rem" }}>{island.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full" style={{ background: "#2ECC71" }} />
                      <span style={{ color: "#2ECC71", fontSize: "0.85rem" }}>Active</span>
                    </div>
                  </div>
                </div>
                <p className="font-black" style={{ color: island.color, fontSize: "2rem" }}>{island.providers}</p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>verified providers</p>
              </button>
            ))}
          </div>
          <div className="p-8 rounded-3xl border text-center"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", borderStyle: "dashed" }}>
            <p style={{ fontSize: "2rem" }} className="mb-3">🌍</p>
            <p className="font-bold text-white mb-2" style={{ fontSize: "1.3rem" }}>Africa Expansion — 2027</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>
              The same Credii trust infrastructure. 54 countries. Starting with Nigeria, Ghana, and Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* ── PHOTOS + TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ padding: "8rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="font-black text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Real people.<br />Real results.
            </h2>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-3 gap-4 mb-16" style={{ height: "420px" }}>
            <div className="rounded-3xl overflow-hidden">
              <img src="https://our.today/wp-content/uploads/2023/10/electrician-jamaica-our-today-feature-1024x683.jpg"
                alt="Electrician Jamaica" className="w-full h-full object-cover"
                style={{ filter: "saturate(1.4) brightness(0.85)" }} />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="rounded-3xl overflow-hidden">
                <img src="https://s7d1.scene7.com/is/image/wbcollab/Woman-selling-fruits-Gaudaloupe?qlt=90&hei=630&wid=1200&fit=hfit"
                  alt="Caribbean woman" className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.3) brightness(0.85)" }} />
              </div>
              <div className="rounded-3xl overflow-hidden">
                <img src="https://looktt.com/wp-content/uploads/2024/11/Electrician-Picture-2.jpg"
                  alt="Trinidad electrician" className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.2) brightness(0.85)" }} />
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="rounded-3xl overflow-hidden">
                <img src="https://wallpapers.com/images/hd/barbados-houses-j22gdi6vknriecoz.jpg"
                  alt="Barbados" className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.4) brightness(0.8)" }} />
              </div>
              <div className="rounded-3xl overflow-hidden">
                <img src="https://fooddrinklife.com/wp-content/uploads/2024/07/Iconic-view-of-Piton-mountains-on-St-Lucia-island-1024x681.jpg"
                  alt="St Lucia" className="w-full h-full object-cover"
                  style={{ filter: "saturate(1.3) brightness(0.8)" }} />
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={t.name} style={{ display: activeTestimonial === i ? "block" : "none" }}>
                <div className="p-12 rounded-3xl border text-center"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: `${t.color}30` }}>
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={22} fill={t.color} style={{ color: t.color }} />
                    ))}
                  </div>
                  <p className="text-white mb-8" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", lineHeight: 1.7 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold"
                      style={{ background: `${t.color}30`, color: t.color, fontSize: "1rem" }}>{t.avatar}</div>
                    <div className="text-left">
                      <p className="font-bold text-white" style={{ fontSize: "1.1rem" }}>{t.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem" }}>{t.role} · {t.island} · {t.jobs} jobs</p>
                    </div>
                    <TrustRing score={t.score} color={t.color} />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center gap-3 mt-6">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: activeTestimonial === i ? "2rem" : "0.5rem",
                    height: "0.5rem",
                    background: activeTestimonial === i ? "#FF6B4A" : "rgba(255,255,255,0.2)",
                  }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR PROVIDERS ─────────────────────────────────────────────────── */}
      <section style={{ background: "#0D0D1A", padding: "8rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="rounded-3xl overflow-hidden relative" style={{ minHeight: "500px" }}>
            <img src="https://images.pexels.com/photos/31010712/pexels-photo-31010712/free-photo-of-aerial-view-of-coastal-town-and-blue-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Caribbean coast" className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.18) saturate(1.5)" }} />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(8,8,16,0.97) 0%, rgba(8,8,16,0.65) 100%)" }} />
            <div className="relative p-14 md:p-20">
              <div className="grid md:grid-cols-2 gap-14 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
                    style={{ background: "rgba(255,107,74,0.15)", color: "#FF6B4A", borderColor: "rgba(255,107,74,0.35)", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                    <TrendingUp size={14} /> FOR SERVICE PROVIDERS
                  </div>
                  <h2 className="font-black text-white mb-6" style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", lineHeight: 1.1 }}>
                    Stop chasing work.<br />
                    <span style={{ color: "#FF6B4A" }}>Let work find you.</span>
                  </h2>
                  <p className="mb-8" style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", lineHeight: 1.7 }}>
                    Join 2,400+ verified Caribbean professionals earning more with Rivva. Your Credii Trust Score does the selling for you.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "Get matched to clients on your island automatically",
                      "Your Credii Trust Score builds client confidence",
                      "Subscription from TT$50/mo — no surprise lead fees",
                      "Expand across islands as you grow",
                    ].map(item => (
                      <li key={item} className="flex items-center gap-3 text-white" style={{ fontSize: "1rem" }}>
                        <CheckCircle size={18} style={{ color: "#2ECC71", flexShrink: 0 }} /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register?role=provider"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold hover:opacity-90 transition"
                    style={{ background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontSize: "1.1rem" }}>
                    Join as a Provider <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: "Avg monthly earnings", value: "TT$8,400", color: "#FF6B4A" },
                    { label: "Leads per month (Pro)", value: "Unlimited", color: "#FFD700" },
                    { label: "Subscription cost", value: "TT$50/mo", color: "#0ABFBC" },
                    { label: "Islands covered", value: "6 & growing", color: "#2ECC71" },
                  ].map(s => (
                    <div key={s.label} className="p-7 rounded-2xl border"
                      style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                      <p className="font-black mb-2" style={{ color: s.color, fontSize: "1.6rem" }}>{s.value}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ padding: "10rem 0" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "rgba(255,107,74,0.1)" }} />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: "rgba(10,191,188,0.08)" }} />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <h2 className="font-black text-white mb-8" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}>
            Ready to join the<br />
            <span style={{
              background: "linear-gradient(90deg, #FF6B4A 0%, #FFD700 50%, #0ABFBC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Caribbean&apos;s trust network?</span>
          </h2>
          <p className="mb-12" style={{ color: "rgba(255,255,255,0.45)", fontSize: "1.3rem" }}>
            Clients post free. Providers start from TT$50/mo. No hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link href="/register"
              className="px-12 py-5 rounded-2xl font-bold flex items-center gap-3 justify-center hover:opacity-90 transition"
              style={{ background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontSize: "1.1rem" }}>
              Post a Request — It&apos;s Free <ArrowRight size={20} />
            </Link>
            <Link href="/register?role=provider"
              className="px-12 py-5 rounded-2xl font-bold flex items-center gap-3 justify-center hover:opacity-90 transition border"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff", fontSize: "1.1rem" }}>
              Join as a Provider
            </Link>
          </div>
          <p className="mt-8" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.95rem" }}>
            Powered by Credii · Caribbean&apos;s Trust Infrastructure · Expanding to Africa 2027
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)", padding: "3rem 0" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)", fontSize: "1rem" }}>R</div>
              <span className="font-bold text-white" style={{ fontSize: "1.2rem" }}>Rivva</span>
              <span className="ml-2" style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.9rem" }}>Powered by Credii</span>
            </div>
            <div className="flex gap-8">
              {[["About", "#"], ["Pricing", "/pricing"], ["For Providers", "/register?role=provider"], ["Privacy", "#"], ["Terms", "#"], ["Contact", "#"]].map(([l, h]) => (
                <Link key={l} href={h} className="hover:opacity-70" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem" }}>{l}</Link>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>© 2026 Rivva / Credii. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}