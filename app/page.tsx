"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { serviceCategories, providers, users } from "@/lib/data";
import { ratingStars } from "@/lib/utils";
import { ArrowRight, CheckCircle, TrendingUp, Zap, Shield, Star, MapPin } from "lucide-react";

// ── Live Activity Feed Data ──────────────────────────────────────────────────
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

// ── Island Data ──────────────────────────────────────────────────────────────
const islands = [
  { name: "Trinidad & Tobago", flag: "🇹🇹", providers: 842, color: "#FF6B4A", active: true },
  { name: "Jamaica", flag: "🇯🇲", providers: 634, color: "#FFD700", active: true },
  { name: "Barbados", flag: "🇧🇧", providers: 421, color: "#0ABFBC", active: true },
  { name: "St. Lucia", flag: "🇱🇨", providers: 287, color: "#2ECC71", active: true },
  { name: "Grenada", flag: "🇬🇩", providers: 156, color: "#FF6B4A", active: true },
  { name: "Antigua", flag: "🇦🇬", providers: 98, color: "#FFD700", active: false },
];

// ── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { name: "Karen Baptiste", role: "Photographer", island: "Trinidad", avatar: "KB", quote: "Rivva helped me find three new clients in Barbados without leaving my studio. The Credii badge made them trust me instantly.", rating: 5, color: "#FF6B4A", jobs: 47 },
  { name: "Marcus Williams", role: "Electrician", island: "Jamaica", avatar: "MW", quote: "Before Rivva I was hustling for work every week. Now leads come to me. Made TT$18,000 last month alone.", rating: 5, color: "#0ABFBC", jobs: 127 },
  { name: "Simone Alexis", role: "Event Caterer", island: "St. Lucia", avatar: "SA", quote: "The verification process gave my business credibility I couldn't buy. Clients see my Credii Trust Score and book immediately.", rating: 5, color: "#2ECC71", jobs: 63 },
];

// ── Trust Score Component ────────────────────────────────────────────────────
function TrustScore({ score, name }: { score: number; name: string }) {
  const color = score >= 90 ? "#2ECC71" : score >= 75 ? "#FFD700" : "#FF6B4A";
  const circumference = 2 * Math.PI * 20;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="20" fill="none" stroke="#E8E2D9" strokeWidth="4" />
          <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-black" style={{ color }}>{score}</span>
      </div>
      <div>
        <p className="text-xs font-bold" style={{ color: "#1A1A2E" }}>Credii Trust Score</p>
        <p className="text-xs" style={{ color: "#8A8070" }}>{name}</p>
      </div>
    </div>
  );
}

// ── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
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

  const currentActivity = activityFeed[feedIndex];

  return (
    <div style={{ background: "#0A0A0F", minHeight: "100vh", color: "#fff" }}>
      <Navbar role="guest" />

      {/* ── HERO — Full Screen ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/18602858/pexels-photo-18602858/free-photo-of-an-aerial-view-of-the-beach-and-town.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Caribbean aerial view"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.25) saturate(1.4)" }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.6) 50%, rgba(10,10,15,0.85) 100%)"
          }} />
          {/* Colour accent blobs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: "#FF6B4A" }} />
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{ background: "#0ABFBC" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ background: "#FFD700" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Hero copy */}
            <div>
              {/* Live activity pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#2ECC71" }} />
                <span className="text-sm" style={{ color: currentActivity.color }}>{currentActivity.icon}</span>
                <span className="text-sm text-white">{currentActivity.text}</span>
                <span className="text-xs" style={{ color: "#8A8070" }}>{currentActivity.time}</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-none mb-6">
                <span className="block text-white">The Caribbean's</span>
                <span className="block" style={{
                  background: "linear-gradient(90deg, #FF6B4A, #FFD700, #0ABFBC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Trust & Opportunity</span>
                <span className="block text-white">Network</span>
              </h1>

              <p className="text-xl mb-8 max-w-lg" style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                Verified Caribbean professionals. Real opportunities. Powered by Credii — the region's trust infrastructure.
              </p>

              {/* Search */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-xl">
                <div className="flex-1 flex items-center gap-3 px-4 py-3.5 rounded-2xl border"
                  style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}>
                  <span className="text-lg">🔍</span>
                  <input type="text" placeholder="What do you need done?"
                    className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500" />
                </div>
                <Link href="/register"
                  className="px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 justify-center hover:opacity-90 transition whitespace-nowrap"
                  style={{ background: "linear-gradient(135deg, #FF6B4A, #FF8C42)" }}>
                  Get Quotes Free <ArrowRight size={16} />
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
                  <div key={b.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                    style={{ borderColor: `${b.color}40`, background: `${b.color}15`, color: b.color }}>
                    {b.icon} {b.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Live dashboard card */}
            <div className="hidden lg:block">
              <div className="rounded-3xl p-6 border"
                style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
                      style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>R</div>
                    <span className="font-bold text-white">Rivva Live</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs" style={{ color: "#2ECC71" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    247 active now
                  </div>
                </div>

                {/* Trust scores */}
                <div className="space-y-3 mb-5">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#8A8070" }}>Top Verified Providers</p>
                  {[
                    { name: "Marcus W. · Electrician · JM", score: 96, avatar: "MW", color: "#FFD700" },
                    { name: "Priya R. · Photographer · TT", score: 94, avatar: "PR", color: "#FF6B4A" },
                    { name: "Devon C. · Plumber · BB", score: 91, avatar: "DC", color: "#0ABFBC" },
                  ].map(p => (
                    <div key={p.name} className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${p.color}80, ${p.color}40)`, color: p.color }}>
                        {p.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white truncate">{p.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                            <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: p.color }} />
                          </div>
                          <span className="text-xs font-bold" style={{ color: p.color }}>{p.score}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "#2ECC7120", color: "#2ECC71" }}>✓ Live</span>
                    </div>
                  ))}
                </div>

                {/* Live activity */}
                <div className="p-3 rounded-2xl mb-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#8A8070" }}>Live Activity</p>
                  <div className="space-y-2">
                    {activityFeed.slice(0, 4).map((a, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span>{a.icon}</span>
                        <span style={{ color: "rgba(255,255,255,0.7)" }}>{a.text}</span>
                        <span className="ml-auto" style={{ color: "#8A8070" }}>{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link href="/register?role=provider"
                  className="block w-full py-3 rounded-2xl text-center text-sm font-bold hover:opacity-90 transition"
                  style={{ background: "linear-gradient(135deg, #FF6B4A, #FFD700)", color: "#0A0A0F" }}>
                  Join as a Provider — From TT$50/mo
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.3))" }} />
          <div className="w-1 h-1 rounded-full bg-white opacity-50" />
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="py-10 border-y" style={{ background: "#0F0F18", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 2438, suffix: "+", label: "Verified Providers", color: "#FF6B4A" },
              { value: 6, suffix: " Islands", label: "Caribbean Coverage", color: "#FFD700" },
              { value: 12847, suffix: "+", label: "Jobs Completed", color: "#0ABFBC" },
              { value: 98, suffix: "%", label: "Client Satisfaction", color: "#2ECC71" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-black" style={{ color: s.color }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </p>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDII TRUST SCORE ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(10,191,188,0.08) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
                style={{ background: "rgba(10,191,188,0.15)", color: "#0ABFBC", border: "1px solid rgba(10,191,188,0.3)" }}>
                🛡️ CREDII TRUST INFRASTRUCTURE
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                <span className="text-white">Not just verified.</span><br />
                <span style={{ color: "#0ABFBC" }}>Trust-scored.</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                Every Rivva provider gets a <strong style={{ color: "#0ABFBC" }}>Credii Trust Score</strong> — a live rating built from identity verification, skill proof, response speed, job completion rate, and client reviews. Not just a background check. A real measure of professional reliability.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { label: "Identity Verified", desc: "Government ID + biometric check", color: "#0ABFBC" },
                  { label: "Skill Certified", desc: "Licence or portfolio reviewed by Credii", color: "#FFD700" },
                  { label: "Performance Tracked", desc: "Response time, completion rate, reviews", color: "#2ECC71" },
                  { label: "Continuously Monitored", desc: "Annual re-verification, real-time flags", color: "#FF6B4A" },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${item.color}20` }}>
                      <CheckCircle size={12} style={{ color: item.color }} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-white">{item.label}</span>
                      <span className="text-sm ml-2" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ color: "#8A8070" }}>Thumbtack shows:</span>
                <span className="font-medium text-white">✓ Verified</span>
                <span style={{ color: "#8A8070" }}>· Rivva shows:</span>
                <span className="font-bold" style={{ color: "#0ABFBC" }}>Credii Score: 94</span>
              </div>
            </div>

            {/* Trust score cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "Marcus W.", role: "Electrician", island: "Jamaica 🇯🇲", score: 96, avatar: "MW", color: "#FFD700", jobs: 127, response: "1.2h" },
                { name: "Priya R.", role: "Photographer", island: "Trinidad 🇹🇹", score: 94, avatar: "PR", color: "#FF6B4A", jobs: 89, response: "0.8h" },
                { name: "Devon C.", role: "Plumber", island: "Barbados 🇧🇧", score: 91, avatar: "DC", color: "#0ABFBC", jobs: 203, response: "2.1h" },
                { name: "Kezia T.", role: "Caterer", island: "Grenada 🇬🇩", score: 88, avatar: "KT", color: "#2ECC71", jobs: 54, response: "1.5h" },
              ].map(p => (
                <div key={p.name} className="p-4 rounded-2xl border"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `linear-gradient(135deg, ${p.color}60, ${p.color}30)`, color: p.color }}>
                      {p.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{p.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{p.role}</p>
                    </div>
                  </div>
                  <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>{p.island}</p>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: "#8A8070" }}>Credii Score</span>
                    <span className="text-sm font-black" style={{ color: p.color }}>{p.score}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: `linear-gradient(90deg, ${p.color}80, ${p.color})` }} />
                  </div>
                  <div className="flex justify-between text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <span>{p.jobs} jobs</span>
                    <span>~{p.response} response</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0F0F18" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-3">How Rivva works</h2>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Three steps. Zero hassle. Caribbean-fast.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px"
              style={{ background: "linear-gradient(90deg, #FF6B4A, #0ABFBC)" }} />
            {[
              { step: "01", icon: "📝", title: "Post your request", desc: "Describe what you need, your island, and budget. Takes 90 seconds.", color: "#FF6B4A" },
              { step: "02", icon: "⚡", title: "Get matched instantly", desc: "Our engine sends your request to the top 5 Credii-verified providers on your island.", color: "#FFD700" },
              { step: "03", icon: "✅", title: "Hire with confidence", desc: "Compare Trust Scores, read verified reviews, chat, and hire. Leave a review when done.", color: "#0ABFBC" },
            ].map(s => (
              <div key={s.step} className="relative p-7 rounded-3xl border text-center"
                style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
                  style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                  {s.icon}
                </div>
                <div className="absolute top-4 right-4 text-5xl font-black opacity-10" style={{ color: s.color }}>{s.step}</div>
                <h3 className="font-bold text-lg text-white mb-2">{s.title}</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,107,74,0.06) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl font-black text-white">Every service.<br />Every island.</h2>
            </div>
            <Link href="/register" className="text-sm font-medium flex items-center gap-1 hover:opacity-70"
              style={{ color: "#FF6B4A" }}>Browse all <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {serviceCategories.map((cat, i) => {
              const colors = ["#FF6B4A", "#FFD700", "#0ABFBC", "#2ECC71", "#FF6B4A", "#FFD700", "#0ABFBC", "#2ECC71", "#FF6B4A", "#FFD700", "#0ABFBC", "#2ECC71"];
              const c = colors[i % colors.length];
              return (
                <Link key={cat.id} href="/register"
                  className="group flex flex-col items-center gap-2 p-4 rounded-2xl border hover:scale-105 transition-all duration-200"
                  style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all"
                    style={{ background: `${c}15`, border: `1px solid ${c}30` }}>
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-center" style={{ color: "rgba(255,255,255,0.7)" }}>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ISLAND MAP ────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0F0F18" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
              style={{ background: "rgba(255,215,0,0.15)", color: "#FFD700", border: "1px solid rgba(255,215,0,0.3)" }}>
              🌍 RIVVA ACROSS THE CARIBBEAN
            </div>
            <h2 className="text-4xl font-black text-white">Your island. Your network.</h2>
            <p className="mt-3" style={{ color: "rgba(255,255,255,0.5)" }}>Click an island to see what's happening right now</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {islands.map((island, i) => (
              <button key={island.name} onClick={() => setActiveIsland(i)}
                className="p-5 rounded-3xl border text-left transition-all duration-200 hover:scale-102"
                style={{
                  background: activeIsland === i ? `${island.color}15` : "rgba(255,255,255,0.03)",
                  borderColor: activeIsland === i ? `${island.color}60` : "rgba(255,255,255,0.08)",
                  boxShadow: activeIsland === i ? `0 0 30px ${island.color}20` : "none",
                }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{island.flag}</span>
                  <div>
                    <p className="font-bold text-white text-sm">{island.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: island.active ? "#2ECC71" : "#8A8070" }} />
                      <span className="text-xs" style={{ color: island.active ? "#2ECC71" : "#8A8070" }}>
                        {island.active ? "Active" : "Coming soon"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black" style={{ color: island.color }}>{island.providers}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>verified providers</p>
                  </div>
                  {activeIsland === i && (
                    <ArrowRight size={16} style={{ color: island.color }} />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Africa expansion teaser */}
          <div className="p-6 rounded-3xl border text-center"
            style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)", borderStyle: "dashed" }}>
            <p className="text-2xl mb-2">🌍</p>
            <p className="font-bold text-white">Africa Expansion — 2027</p>
            <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
              The same Credii trust infrastructure. 54 countries. Starting with Nigeria, Ghana, and Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* ── REAL PHOTOS + TESTIMONIALS ────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(10,191,188,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white">Real people.<br />Real results.</h2>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-3 gap-3 mb-12 h-64 md:h-80">
            <div className="rounded-2xl overflow-hidden col-span-1 row-span-2">
              <img src="https://our.today/wp-content/uploads/2023/10/electrician-jamaica-our-today-feature-1024x683.jpg"
                alt="Electrician Jamaica" className="w-full h-full object-cover"
                style={{ filter: "saturate(1.3) brightness(0.9)" }} />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://s7d1.scene7.com/is/image/wbcollab/Woman-selling-fruits-Gaudaloupe?qlt=90&hei=630&wid=1200&fit=hfit"
                alt="Caribbean woman business" className="w-full h-full object-cover"
                style={{ filter: "saturate(1.3) brightness(0.9)" }} />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://wallpapers.com/images/hd/barbados-houses-j22gdi6vknriecoz.jpg"
                alt="Barbados" className="w-full h-full object-cover"
                style={{ filter: "saturate(1.4) brightness(0.85)" }} />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://fooddrinklife.com/wp-content/uploads/2024/07/Iconic-view-of-Piton-mountains-on-St-Lucia-island-1024x681.jpg"
                alt="St Lucia Pitons" className="w-full h-full object-cover"
                style={{ filter: "saturate(1.3) brightness(0.85)" }} />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img src="https://looktt.com/wp-content/uploads/2024/11/Electrician-Picture-2.jpg"
                alt="Trinidad electrician" className="w-full h-full object-cover"
                style={{ filter: "saturate(1.2) brightness(0.9)" }} />
            </div>
          </div>

          {/* Testimonial carousel */}
          <div className="max-w-3xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={t.name}
                className="transition-all duration-500"
                style={{ display: activeTestimonial === i ? "block" : "none" }}>
                <div className="p-8 rounded-3xl border text-center"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: `${t.color}30` }}>
                  <div className="flex justify-center mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={18} fill={t.color} style={{ color: t.color }} />
                    ))}
                  </div>
                  <p className="text-xl font-medium text-white mb-6 leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
                      style={{ background: `linear-gradient(135deg, ${t.color}60, ${t.color}30)`, color: t.color }}>
                      {t.avatar}
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{t.role} · {t.island} · {t.jobs} jobs</p>
                    </div>
                    <div className="ml-4">
                      <TrustScore score={t.rating * 18 + 4} name={t.name.split(" ")[0]} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-5">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: activeTestimonial === i ? "#FF6B4A" : "rgba(255,255,255,0.2)" }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR PROVIDERS ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#0F0F18" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden relative">
            <img src="https://images.pexels.com/photos/31010712/pexels-photo-31010712/free-photo-of-aerial-view-of-coastal-town-and-blue-ocean.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Caribbean coast" className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.2) saturate(1.5)" }} />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.7) 100%)" }} />
            <div className="relative p-10 md:p-16">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-6"
                    style={{ background: "rgba(255,107,74,0.2)", color: "#FF6B4A", border: "1px solid rgba(255,107,74,0.4)" }}>
                    <TrendingUp size={12} /> FOR SERVICE PROVIDERS
                  </div>
                  <h2 className="text-4xl font-black text-white mb-4">
                    Stop chasing work.<br />
                    <span style={{ color: "#FF6B4A" }}>Let work find you.</span>
                  </h2>
                  <p className="mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                    Join 2,400+ verified Caribbean professionals earning more with Rivva. Your Credii Trust Score does the selling for you.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Get matched to clients on your island automatically",
                      "Your Credii Trust Score builds client confidence",
                      "Subscription from TT$50/mo — no surprise lead fees",
                      "Expand across islands as you grow",
                    ].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-white">
                        <CheckCircle size={15} style={{ color: "#2ECC71", flexShrink: 0 }} /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register?role=provider"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold hover:opacity-90 transition"
                    style={{ background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff" }}>
                    Join as a Provider <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Avg monthly earnings", value: "TT$8,400", color: "#FF6B4A" },
                    { label: "Leads per month (Pro)", value: "Unlimited", color: "#FFD700" },
                    { label: "Subscription cost", value: "TT$50/mo", color: "#0ABFBC" },
                    { label: "Islands covered", value: "6 & growing", color: "#2ECC71" },
                  ].map(s => (
                    <div key={s.label} className="p-5 rounded-2xl border"
                      style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                      <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15"
            style={{ background: "#FF6B4A" }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10"
            style={{ background: "#0ABFBC" }} />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Ready to join the<br />
            <span style={{
              background: "linear-gradient(90deg, #FF6B4A, #FFD700, #0ABFBC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Caribbean's trust network?</span>
          </h2>
          <p className="text-xl mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
            Clients post free. Providers start from TT$50/mo. No hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register"
              className="px-10 py-4 rounded-2xl font-bold text-base flex items-center gap-2 justify-center hover:opacity-90 transition"
              style={{ background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff" }}>
              Post a Request — It&apos;s Free <ArrowRight size={18} />
            </Link>
            <Link href="/register?role=provider"
              className="px-10 py-4 rounded-2xl font-bold text-base flex items-center gap-2 justify-center hover:opacity-90 transition border"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
              Join as a Provider
            </Link>
          </div>
          <p className="text-sm mt-6" style={{ color: "rgba(255,255,255,0.3)" }}>
            Powered by Credii · Caribbean&apos;s Trust Infrastructure · Expanding to Africa 2027
          </p>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="border-t py-10" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>R</div>
              <span className="font-bold text-white text-lg">Rivva</span>
              <span className="text-xs ml-2" style={{ color: "rgba(255,255,255,0.3)" }}>Powered by Credii</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-xs hover:opacity-70" style={{ color: "rgba(255,255,255,0.4)" }}>About</Link>
              <Link href="/pricing" className="text-xs hover:opacity-70" style={{ color: "rgba(255,255,255,0.4)" }}>Pricing</Link>
              <Link href="/register?role=provider" className="text-xs hover:opacity-70" style={{ color: "rgba(255,255,255,0.4)" }}>For Providers</Link>
              <Link href="#" className="text-xs hover:opacity-70" style={{ color: "rgba(255,255,255,0.4)" }}>Privacy</Link>
              <Link href="#" className="text-xs hover:opacity-70" style={{ color: "rgba(255,255,255,0.4)" }}>Terms</Link>
              <Link href="#" className="text-xs hover:opacity-70" style={{ color: "rgba(255,255,255,0.4)" }}>Contact</Link>
            </div>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>© 2026 Rivva / Credii. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}