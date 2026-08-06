"use client";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { serviceCategories, providers, users } from "@/lib/data";
import { ratingStars } from "@/lib/utils";
import { ArrowRight, Shield, Zap, Globe, CheckCircle, TrendingUp } from "lucide-react";

const islands = ["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"];

export default function HomePage() {
  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="guest" />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, #0ABFBC18 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #FF6B4A12 0%, transparent 50%)" }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6"
              style={{ background: "#FF6B4A15", color: "#FF6B4A" }}>
              🌴 Caribbean&apos;s #1 Service Marketplace
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ color: "#1A1A2E" }}>
              Get anything done<br />
              <span style={{ color: "#FF6B4A" }}>across the Caribbean</span>
            </h1>
            <p className="text-lg md:text-xl mt-6 max-w-xl" style={{ color: "#8A8070" }}>
              Post your job. Get quotes from verified local providers. Choose the best. It&apos;s that simple — from Trinidad to Jamaica and beyond.
            </p>

            {/* Search bar */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="text"
                placeholder="What service do you need?"
                className="flex-1 px-4 py-3.5 rounded-xl border text-sm outline-none"
                style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }}
              />
              <Link href="/register"
                className="px-6 py-3.5 rounded-xl text-white font-medium text-sm flex items-center gap-2 justify-center hover:opacity-90 transition"
                style={{ background: "#FF6B4A" }}>
                Get Quotes <ArrowRight size={16} />
              </Link>
            </div>

            {/* Islands */}
            <div className="flex flex-wrap gap-2 mt-6">
              {islands.map(island => (
                <span key={island} className="text-xs px-3 py-1 rounded-full border font-medium"
                  style={{ borderColor: "#E8E2D9", color: "#8A8070" }}>📍 {island}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: "#1A1A2E" }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "2,400+", label: "Verified Providers" },
              { value: "6 Islands", label: "Caribbean Coverage" },
              { value: "12,000+", label: "Jobs Completed" },
              { value: "4.8★", label: "Average Rating" },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-sm mt-1" style={{ color: "#8A8070" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: "#1A1A2E" }}>How Spatch works</h2>
            <p className="mt-3 text-base" style={{ color: "#8A8070" }}>Three steps to get your job done</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: "📝", title: "Post your request", desc: "Describe what you need, your island, and your budget. Takes 2 minutes." },
              { step: "02", icon: "📬", title: "Receive quotes", desc: "Up to 5 verified providers respond with their best price and message." },
              { step: "03", icon: "✅", title: "Hire & review", desc: "Choose your provider, get the job done, and leave a review." },
            ].map(s => (
              <div key={s.step} className="relative p-6 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                <span className="text-5xl font-black opacity-10 absolute top-4 right-4" style={{ color: "#FF6B4A" }}>{s.step}</span>
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="font-semibold text-lg" style={{ color: "#1A1A2E" }}>{s.title}</h3>
                <p className="text-sm mt-2" style={{ color: "#8A8070" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16" style={{ background: "#F7F4EF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Browse by category</h2>
            <Link href="/register" className="text-sm font-medium flex items-center gap-1 hover:opacity-70"
              style={{ color: "#FF6B4A" }}>View all <ArrowRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {serviceCategories.map(cat => (
              <Link key={cat.id} href="/register"
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border hover:shadow-md transition-all hover:-translate-y-0.5"
                style={{ background: "#FFFDF9", borderColor: "#E8E2D9" }}>
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-medium text-center" style={{ color: "#1A1A2E" }}>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Top rated providers</h2>
            <Link href="/register" className="text-sm font-medium flex items-center gap-1 hover:opacity-70"
              style={{ color: "#FF6B4A" }}>See all <ArrowRight size={14} /></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {providers.filter(p => p.verification_status === "approved").slice(0, 3).map(p => {
              const user = users.find(u => u.id === p.user_id);
              if (!user) return null;
              return (
                <div key={p.id} className="rounded-2xl border p-5 hover:shadow-md transition"
                  style={{ background: "#FFFDF9", borderColor: "#E8E2D9" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>{user.avatar}</div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{user.name}</p>
                      <p className="text-xs" style={{ color: "#8A8070" }}>📍 {p.island}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "#2ECC7115", color: "#2ECC71" }}>✓ Verified</span>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2" style={{ color: "#8A8070" }}>{p.bio}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: "#E8E2D9" }}>
                    <span className="text-sm font-medium" style={{ color: "#FFB347" }}>
                      {ratingStars(p.rating)} {p.rating.toFixed(1)}
                    </span>
                    <span className="text-xs" style={{ color: "#8A8070" }}>{p.completed_jobs} jobs</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Spatch */}
      <section className="py-16" style={{ background: "#F7F4EF" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold" style={{ color: "#1A1A2E" }}>Why Spatch?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Shield size={24} />, color: "#0ABFBC", title: "Verified Providers", desc: "Every provider is ID-verified and skill-checked by our Credii admin team before going live." },
              { icon: <Zap size={24} />, color: "#FF6B4A", title: "Fast Matching", desc: "Our engine matches your request to the top 5 providers on your island within minutes." },
              { icon: <Globe size={24} />, color: "#FFB347", title: "Caribbean-First", desc: "Built for the region. Multi-island, multi-currency, and designed for Caribbean service culture." },
            ].map(f => (
              <div key={f.title} className="p-6 rounded-2xl border" style={{ background: "#FFFDF9", borderColor: "#E8E2D9" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18`, color: f.color }}>{f.icon}</div>
                <h3 className="font-semibold text-base mb-2" style={{ color: "#1A1A2E" }}>{f.title}</h3>
                <p className="text-sm" style={{ color: "#8A8070" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Providers CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
            style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)" }}>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ background: "#FF6B4A20", color: "#FF6B4A" }}>
                <TrendingUp size={12} /> For Service Providers
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Grow your business<br />across the Caribbean</h2>
              <p className="mt-3 text-sm" style={{ color: "#8A8070" }}>
                Join 2,400+ verified providers earning TT$50k–TT$200k/year through Spatch leads.
              </p>
              <ul className="mt-4 space-y-2">
                {["Get matched to clients on your island", "Set your own prices and availability", "Build your reputation with verified reviews", "Subscription from TT$50/month"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle size={14} style={{ color: "#2ECC71" }} /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/register?role=provider"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-medium text-sm hover:opacity-90 transition"
                style={{ background: "#FF6B4A", color: "#fff" }}>
                Join as a Provider <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3 w-full max-w-sm">
              {[
                { label: "Avg monthly earnings", value: "TT$8,400" },
                { label: "Leads per month", value: "12–18" },
                { label: "Subscription cost", value: "TT$50/mo" },
                { label: "Islands covered", value: "6 & growing" },
              ].map(s => (
                <div key={s.label} className="p-4 rounded-2xl" style={{ background: "#ffffff10" }}>
                  <p className="text-xl font-bold text-white">{s.value}</p>
                  <p className="text-xs mt-1" style={{ color: "#8A8070" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>S</div>
              <span className="font-bold" style={{ color: "#1A1A2E" }}>Spatch</span>
              <span className="text-xs ml-2" style={{ color: "#8A8070" }}>Powered by Credii</span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-xs hover:opacity-70" style={{ color: "#8A8070" }}>About</Link>
              <Link href="/pricing" className="text-xs hover:opacity-70" style={{ color: "#8A8070" }}>Pricing</Link>
              <Link href="/register?role=provider" className="text-xs hover:opacity-70" style={{ color: "#8A8070" }}>For Providers</Link>
              <Link href="#" className="text-xs hover:opacity-70" style={{ color: "#8A8070" }}>Privacy</Link>
              <Link href="#" className="text-xs hover:opacity-70" style={{ color: "#8A8070" }}>Terms</Link>
              <Link href="#" className="text-xs hover:opacity-70" style={{ color: "#8A8070" }}>Contact</Link>
            </div>
            <p className="text-xs" style={{ color: "#8A8070" }}>© 2026 Spatch / Credii. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}