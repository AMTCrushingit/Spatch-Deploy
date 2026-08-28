"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { CheckCircle, XCircle, Zap, ArrowRight, Building2, Globe, Shield, TrendingUp, Star } from "lucide-react";

const ANNUAL_DISCOUNT = 0.20; // 20% off annual

const providerTiers = [
  {
    id: "starter",
    name: "Starter",
    icon: "🌱",
    monthlyPrice: 50,
    color: "#0ABFBC",
    colorLight: "#0ABFBC15",
    description: "Perfect for new providers getting started on Rivva.",
    badge: null,
    cta: "Get Started",
    features: [
      { label: "Profile listing", included: true },
      { label: "Up to 5 leads/month", included: true },
      { label: "Basic verification badge", included: true },
      { label: "Client messaging", included: true },
      { label: "Review collection", included: true },
      { label: "1 service category", included: true },
      { label: "Priority matching", included: false },
      { label: "Pro badge", included: false },
      { label: "Response analytics", included: false },
      { label: "Featured placement", included: false },
      { label: "Multi-category listing", included: false },
      { label: "Dedicated support", included: false },
      { label: "Homepage feature", included: false },
      { label: "Early island access", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: "⚡",
    monthlyPrice: 100,
    color: "#FF6B4A",
    colorLight: "#FF6B4A15",
    description: "For established providers ready to grow their client base.",
    badge: "Most Popular",
    cta: "Start Pro",
    features: [
      { label: "Profile listing", included: true },
      { label: "Unlimited leads/month", included: true },
      { label: "Verified Pro badge", included: true },
      { label: "Client messaging", included: true },
      { label: "Review collection", included: true },
      { label: "Up to 3 service categories", included: true },
      { label: "Priority matching", included: true },
      { label: "Pro badge", included: true },
      { label: "Response analytics", included: true },
      { label: "Featured placement", included: false },
      { label: "Multi-category listing", included: false },
      { label: "Dedicated support", included: false },
      { label: "Homepage feature", included: false },
      { label: "Early island access", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    icon: "👑",
    monthlyPrice: 200,
    color: "#FFB347",
    colorLight: "#FFB34715",
    description: "Maximum visibility for top-performing Caribbean professionals.",
    badge: null,
    cta: "Go Elite",
    features: [
      { label: "Profile listing", included: true },
      { label: "Unlimited leads/month", included: true },
      { label: "Elite verified badge", included: true },
      { label: "Client messaging", included: true },
      { label: "Review collection", included: true },
      { label: "Unlimited service categories", included: true },
      { label: "Priority matching", included: true },
      { label: "Pro badge", included: true },
      { label: "Response analytics", included: true },
      { label: "Featured placement", included: true },
      { label: "Multi-category listing", included: true },
      { label: "Dedicated support", included: true },
      { label: "Homepage feature", included: true },
      { label: "Early island access", included: true },
    ],
  },
];

const orgTiers = [
  {
    id: "corporate",
    name: "Corporate",
    icon: "🏢",
    price: "TT$50k",
    period: "/year",
    color: "#0ABFBC",
    description: "For businesses needing reliable, verified service providers at scale.",
    features: [
      "Dedicated provider pool",
      "Bulk booking management",
      "SLA guarantees",
      "Priority support",
      "Custom reporting",
      "Up to 50 bookings/month",
    ],
    cta: "Contact Sales",
  },
  {
    id: "government",
    name: "Government & NGO",
    icon: "🏛️",
    price: "TT$150k",
    period: "/contract",
    color: "#FF6B4A",
    description: "Workforce data, impact metrics, and grant reporting for development agencies.",
    badge: "Credii Flagship",
    features: [
      "Full platform data access",
      "Workforce impact reports",
      "Provider verification pipeline",
      "Grant reporting exports",
      "Custom onboarding programs",
      "Dedicated account manager",
      "API access",
      "Multi-island coverage",
    ],
    cta: "Talk to Credii",
  },
  {
    id: "development",
    name: "Development Bank",
    icon: "🌍",
    price: "Custom",
    period: "",
    color: "#FFB347",
    description: "IDB, CDB, USAID — bespoke partnerships for regional economic development.",
    features: [
      "Everything in Government",
      "Micro-loan eligibility data",
      "Africa expansion access",
      "Co-branded programs",
      "Research data licensing",
      "Board-level reporting",
      "White-label options",
      "Multi-region deployment",
    ],
    cta: "Partner with Us",
  },
];

const allFeatures = [
  "Profile listing",
  "Leads per month",
  "Verification badge",
  "Client messaging",
  "Review collection",
  "Service categories",
  "Priority matching",
  "Pro badge",
  "Response analytics",
  "Featured placement",
  "Multi-category listing",
  "Dedicated support",
  "Homepage feature",
  "Early island access",
];

const featureValues: Record<string, Record<string, string | boolean>> = {
  "Profile listing":       { starter: true,  pro: true,        elite: true },
  "Leads per month":       { starter: "5",   pro: "Unlimited", elite: "Unlimited" },
  "Verification badge":    { starter: "Basic", pro: "Pro",     elite: "Elite" },
  "Client messaging":      { starter: true,  pro: true,        elite: true },
  "Review collection":     { starter: true,  pro: true,        elite: true },
  "Service categories":    { starter: "1",   pro: "3",         elite: "Unlimited" },
  "Priority matching":     { starter: false, pro: true,        elite: true },
  "Pro badge":             { starter: false, pro: true,        elite: true },
  "Response analytics":    { starter: false, pro: true,        elite: true },
  "Featured placement":    { starter: false, pro: false,       elite: true },
  "Multi-category listing":{ starter: false, pro: false,       elite: true },
  "Dedicated support":     { starter: false, pro: false,       elite: true },
  "Homepage feature":      { starter: false, pro: false,       elite: true },
  "Early island access":   { starter: false, pro: false,       elite: true },
};

function FeatureCell({ value }: { value: string | boolean }) {
  if (value === true) return <CheckCircle size={18} style={{ color: "#2ECC71" }} className="mx-auto" />;
  if (value === false) return <XCircle size={16} style={{ color: "#E8E2D9" }} className="mx-auto" />;
  return <span className="text-xs font-semibold" style={{ color: "#1A1A2E" }}>{value}</span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState<"providers" | "orgs">("providers");

  function getPrice(monthly: number) {
    if (annual) return Math.round(monthly * 12 * (1 - ANNUAL_DISCOUNT));
    return monthly;
  }

  function getPriceLabel(monthly: number) {
    if (annual) return `TT$${getPrice(monthly).toLocaleString()}/yr`;
    return `TT$${monthly}/mo`;
  }

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="guest" />

      {/* Hero */}
      <section className="py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 40%, #FF6B4A10 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, #0ABFBC10 0%, transparent 50%)" }} />
        <div className="max-w-3xl mx-auto px-4 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4"
            style={{ background: "#FF6B4A15", color: "#FF6B4A" }}>
            🌴 Simple, transparent pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold" style={{ color: "#1A1A2E" }}>
            Grow your business<br />
            <span style={{ color: "#FF6B4A" }}>across the Caribbean</span>
          </h1>
          <p className="text-lg mt-4" style={{ color: "#8A8070" }}>
            Join 2,400+ verified providers earning more with Rivva. No hidden fees. Cancel anytime.
          </p>

          {/* Tab switcher */}
          <div className="flex justify-center mt-8 mb-2">
            <div className="flex rounded-2xl p-1 border" style={{ borderColor: "#E8E2D9", background: "#F7F4EF" }}>
              <button onClick={() => setActiveTab("providers")}
                className="px-6 py-2.5 rounded-xl text-sm font-medium transition"
                style={{
                  background: activeTab === "providers" ? "#FF6B4A" : "transparent",
                  color: activeTab === "providers" ? "#fff" : "#8A8070",
                }}>
                For Providers
              </button>
              <button onClick={() => setActiveTab("orgs")}
                className="px-6 py-2.5 rounded-xl text-sm font-medium transition"
                style={{
                  background: activeTab === "orgs" ? "#FF6B4A" : "transparent",
                  color: activeTab === "orgs" ? "#fff" : "#8A8070",
                }}>
                For Organisations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROVIDER PRICING ── */}
      {activeTab === "providers" && (
        <>
          {/* Billing toggle */}
          <div className="flex justify-center items-center gap-4 mb-10">
            <span className="text-sm font-medium" style={{ color: annual ? "#8A8070" : "#1A1A2E" }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors"
              style={{ background: annual ? "#FF6B4A" : "#E8E2D9" }}>
              <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
                style={{ left: annual ? "calc(100% - 20px)" : "4px" }} />
            </button>
            <span className="text-sm font-medium" style={{ color: annual ? "#1A1A2E" : "#8A8070" }}>
              Annual
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                style={{ background: "#2ECC7120", color: "#2ECC71" }}>Save 20%</span>
            </span>
          </div>

          {/* Pricing cards */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {providerTiers.map(tier => (
                <div key={tier.id}
                  className="relative rounded-3xl border p-7 flex flex-col transition-shadow hover:shadow-xl"
                  style={{
                    borderColor: tier.badge ? tier.color : "#E8E2D9",
                    background: tier.badge ? `linear-gradient(160deg, ${tier.colorLight}, #FFFDF9)` : "#fff",
                    boxShadow: tier.badge ? `0 0 0 2px ${tier.color}` : undefined,
                  }}>

                  {/* Most Popular badge */}
                  {tier.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full text-xs font-bold text-white shadow-md"
                        style={{ background: `linear-gradient(90deg, ${tier.color}, #FFB347)` }}>
                        ⭐ {tier.badge}
                      </span>
                    </div>
                  )}

                  {/* Tier header */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: tier.colorLight }}>
                        {tier.icon}
                      </div>
                      <h3 className="text-xl font-bold" style={{ color: "#1A1A2E" }}>{tier.name}</h3>
                    </div>
                    <p className="text-sm" style={{ color: "#8A8070" }}>{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black" style={{ color: tier.color }}>
                        TT${annual ? Math.round(tier.monthlyPrice * (1 - ANNUAL_DISCOUNT)) : tier.monthlyPrice}
                      </span>
                      <span className="text-sm mb-1.5" style={{ color: "#8A8070" }}>
                        /mo{annual ? " · billed annually" : ""}
                      </span>
                    </div>
                    {annual && (
                      <p className="text-xs mt-1" style={{ color: "#2ECC71" }}>
                        TT${Math.round(tier.monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT)).toLocaleString()}/yr · Save TT${Math.round(tier.monthlyPrice * 12 * ANNUAL_DISCOUNT).toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link href="/register?role=provider"
                    className="w-full py-3 rounded-xl text-sm font-bold text-center mb-6 transition hover:opacity-90 flex items-center justify-center gap-2"
                    style={{
                      background: tier.badge ? tier.color : "transparent",
                      color: tier.badge ? "#fff" : tier.color,
                      border: tier.badge ? "none" : `2px solid ${tier.color}`,
                    }}>
                    {tier.cta} <ArrowRight size={15} />
                  </Link>

                  {/* Features */}
                  <div className="space-y-2.5 flex-1">
                    {tier.features.map(f => (
                      <div key={f.label} className="flex items-center gap-2.5">
                        {f.included
                          ? <CheckCircle size={15} style={{ color: tier.color, flexShrink: 0 }} />
                          : <XCircle size={15} style={{ color: "#E8E2D9", flexShrink: 0 }} />}
                        <span className="text-sm" style={{ color: f.included ? "#1A1A2E" : "#C0B8B0" }}>
                          {f.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lead fee add-ons */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="p-6 rounded-3xl border" style={{ borderColor: "#E8E2D9", background: "#F7F4EF" }}>
              <div className="flex items-center gap-2 mb-5">
                <Zap size={18} style={{ color: "#FFB347" }} />
                <h3 className="font-bold text-base" style={{ color: "#1A1A2E" }}>Lead Fee Add-ons</h3>
                <span className="text-xs px-2 py-0.5 rounded-full ml-1"
                  style={{ background: "#FFB34720", color: "#FFB347" }}>Optional</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { type: "Standard Lead", price: "TT$15", desc: "Client posted a matching request", icon: "📋", color: "#0ABFBC" },
                  { type: "Verified Lead", price: "TT$25", desc: "Client has hired before (high intent)", icon: "✅", color: "#2ECC71" },
                  { type: "Urgent Lead", price: "TT$35", desc: "Client needs same-day service", icon: "🔴", color: "#FF6B4A" },
                ].map(l => (
                  <div key={l.type} className="p-4 rounded-2xl border bg-white flex items-start gap-3"
                    style={{ borderColor: "#E8E2D9" }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `${l.color}15` }}>{l.icon}</div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{l.type}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>{l.desc}</p>
                      <p className="text-base font-black mt-1" style={{ color: l.color }}>{l.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4" style={{ color: "#8A8070" }}>
                💡 Lead fees are optional. Starter plan includes 5 free leads/mo. Pro and Elite get unlimited leads included in subscription.
              </p>
            </div>
          </div>

          {/* Visibility boosts */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <div className="flex items-center gap-2 mb-5">
              <Star size={18} style={{ color: "#FF6B4A" }} />
              <h3 className="font-bold text-base" style={{ color: "#1A1A2E" }}>Visibility Boosts</h3>
              <span className="text-xs px-2 py-0.5 rounded-full ml-1"
                style={{ background: "#FF6B4A15", color: "#FF6B4A" }}>Available on all plans</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "Homepage Feature", price: "TT$300/mo", desc: "Your card on the Rivva homepage", icon: "🏠" },
                { name: "Category Spotlight", price: "TT$150/mo", desc: "Top of results for one category", icon: "🔦" },
                { name: "Island Boost", price: "TT$200/mo", desc: "Priority matching island-wide for 30 days", icon: "📍" },
                { name: "Launch Boost", price: "TT$75 once", desc: "First 10 leads guaranteed for new providers", icon: "🚀" },
              ].map(b => (
                <div key={b.name} className="p-4 rounded-2xl border hover:shadow-md transition"
                  style={{ borderColor: "#E8E2D9", background: "#fff" }}>
                  <div className="text-2xl mb-2">{b.icon}</div>
                  <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{b.name}</p>
                  <p className="text-xs mt-0.5 mb-2" style={{ color: "#8A8070" }}>{b.desc}</p>
                  <p className="font-black text-sm" style={{ color: "#FF6B4A" }}>{b.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Full comparison table */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "#1A1A2E" }}>Full Feature Comparison</h2>
            <div className="rounded-3xl border overflow-hidden" style={{ borderColor: "#E8E2D9" }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: "#F7F4EF" }}>
                    <th className="text-left px-6 py-4 text-sm font-semibold" style={{ color: "#8A8070", width: "40%" }}>Feature</th>
                    {providerTiers.map(tier => (
                      <th key={tier.id} className="px-4 py-4 text-center" style={{ width: "20%" }}>
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-lg">{tier.icon}</span>
                          <span className="text-sm font-bold" style={{ color: tier.color }}>{tier.name}</span>
                          <span className="text-xs" style={{ color: "#8A8070" }}>
                            TT${annual ? Math.round(tier.monthlyPrice * (1 - ANNUAL_DISCOUNT)) : tier.monthlyPrice}/mo
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allFeatures.map((feature, i) => (
                    <tr key={feature}
                      style={{ background: i % 2 === 0 ? "#fff" : "#FAFAF8", borderTop: "1px solid #F0EDE8" }}>
                      <td className="px-6 py-3.5 text-sm" style={{ color: "#1A1A2E" }}>{feature}</td>
                      {(["starter", "pro", "elite"] as const).map(tier => (
                        <td key={tier} className="px-4 py-3.5 text-center">
                          <FeatureCell value={featureValues[feature][tier]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ background: "#F7F4EF", borderTop: "1px solid #E8E2D9" }}>
                    <td className="px-6 py-4" />
                    {providerTiers.map(tier => (
                      <td key={tier.id} className="px-4 py-4 text-center">
                        <Link href="/register?role=provider"
                          className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-xs font-bold transition hover:opacity-90"
                          style={{
                            background: tier.badge ? tier.color : "transparent",
                            color: tier.badge ? "#fff" : tier.color,
                            border: tier.badge ? "none" : `1.5px solid ${tier.color}`,
                          }}>
                          {tier.cta} <ArrowRight size={12} />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ── ORG PRICING ── */}
      {activeTab === "orgs" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-10">
            <p className="text-base" style={{ color: "#8A8070" }}>
              Institutional partnerships that generate TT$150k–600k per contract.<br />
              This is Rivva&apos;s advantage over every US marketplace.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {orgTiers.map(tier => (
              <div key={tier.id}
                className="relative rounded-3xl border p-7 flex flex-col hover:shadow-xl transition-shadow"
                style={{
                  borderColor: tier.badge ? tier.color : "#E8E2D9",
                  background: tier.badge ? `linear-gradient(160deg, ${tier.color}10, #FFFDF9)` : "#fff",
                  boxShadow: tier.badge ? `0 0 0 2px ${tier.color}` : undefined,
                }}>

                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold text-white shadow-md"
                      style={{ background: `linear-gradient(90deg, ${tier.color}, #FFB347)` }}>
                      🌍 {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: `${tier.color}15` }}>{tier.icon}</div>
                    <h3 className="text-lg font-bold" style={{ color: "#1A1A2E" }}>{tier.name}</h3>
                  </div>
                  <p className="text-sm" style={{ color: "#8A8070" }}>{tier.description}</p>
                </div>

                <div className="mb-5">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-black" style={{ color: tier.color }}>{tier.price}</span>
                    {tier.period && <span className="text-sm mb-1" style={{ color: "#8A8070" }}>{tier.period}</span>}
                  </div>
                  {tier.id === "development" && (
                    <p className="text-xs mt-1" style={{ color: "#8A8070" }}>Negotiated directly with Credii</p>
                  )}
                </div>

                <Link href="/register"
                  className="w-full py-3 rounded-xl text-sm font-bold text-center mb-6 transition hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    background: tier.badge ? tier.color : "transparent",
                    color: tier.badge ? "#fff" : tier.color,
                    border: tier.badge ? "none" : `2px solid ${tier.color}`,
                  }}>
                  {tier.cta} <ArrowRight size={15} />
                </Link>

                <div className="space-y-2.5 flex-1">
                  {tier.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle size={15} style={{ color: tier.color, flexShrink: 0 }} />
                      <span className="text-sm" style={{ color: "#1A1A2E" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Org value props */}
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              { icon: <TrendingUp size={22} />, color: "#FF6B4A", title: "Grant-Ready Data", desc: "Every request, provider, and job completion is tracked and exportable for development agency reporting and grant applications." },
              { icon: <Shield size={22} />, color: "#0ABFBC", title: "Verified Workforce", desc: "All providers are ID-verified and skill-checked by Credii. Organisations get a trusted, auditable pool of Caribbean professionals." },
              { icon: <Globe size={22} />, color: "#FFB347", title: "Africa Expansion", desc: "Development bank partners get early access to Rivva's Africa rollout — the same model, applied to 54 countries." },
            ].map(v => (
              <div key={v.title} className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${v.color}15`, color: v.color }}>{v.icon}</div>
                <h4 className="font-bold text-sm mb-1" style={{ color: "#1A1A2E" }}>{v.title}</h4>
                <p className="text-xs" style={{ color: "#8A8070" }}>{v.desc}</p>
              </div>
            ))}
          </div>

          {/* Partner logos placeholder */}
          <div className="p-6 rounded-3xl border text-center" style={{ borderColor: "#E8E2D9", background: "#F7F4EF" }}>
            <p className="text-xs font-semibold mb-4" style={{ color: "#8A8070" }}>TRUSTED BY REGIONAL INSTITUTIONS</p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              {["IDB", "CDB", "USAID", "UN Women", "CARICOM", "Min. of Labour TT"].map(org => (
                <div key={org} className="px-4 py-2 rounded-xl border text-sm font-semibold"
                  style={{ borderColor: "#E8E2D9", color: "#8A8070", background: "#fff" }}>
                  {org}
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: "#8A8070" }}>
              * Partnership logos shown upon contract execution
            </p>
          </div>
        </div>
      )}

      {/* FAQ */}
      <section className="py-16" style={{ background: "#F7F4EF" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "#1A1A2E" }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is it free for clients?", a: "Yes. Clients always use Rivva for free. They post requests, receive quotes, and hire providers at no cost. Providers pay to access leads." },
              { q: "Can I change my plan anytime?", a: "Yes. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle. No cancellation fees." },
              { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards, Linx, and WiPay across the Caribbean. Bank transfer available for annual plans." },
              { q: "Do I need to be verified before I can subscribe?", a: "Yes. All providers must complete basic verification (ID + skill proof) before their profile goes live, regardless of plan." },
              { q: "What's the difference between a lead fee and a subscription?", a: "Your subscription gives you a monthly lead allowance. Lead fees are optional top-ups if you want more leads than your plan includes. Pro and Elite plans include unlimited leads." },
              { q: "How do institutional contracts work?", a: "Org partnerships are negotiated directly with the Credii team. Contact us and we'll schedule a call to discuss your specific needs, data requirements, and contract terms." },
            ].map(faq => (
              <div key={faq.q} className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9", background: "#fff" }}>
                <p className="font-semibold text-sm mb-2" style={{ color: "#1A1A2E" }}>Q: {faq.q}</p>
                <p className="text-sm" style={{ color: "#8A8070" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="rounded-3xl p-10"
            style={{ background: "linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)" }}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to grow across the Caribbean?
            </h2>
            <p className="text-sm mb-6" style={{ color: "#8A8070" }}>
              Join 2,400+ verified providers. Start free, upgrade when you&apos;re ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register?role=provider"
                className="px-8 py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
                style={{ background: "#FF6B4A" }}>
                Start as a Provider <ArrowRight size={16} />
              </Link>
              <Link href="/register"
                className="px-8 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition border"
                style={{ borderColor: "#ffffff30", color: "#fff" }}>
                Post a Request Free
              </Link>
            </div>
            <p className="text-xs mt-4" style={{ color: "#8A8070" }}>
              No credit card required for clients · Providers start from TT$50/mo
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: "#E8E2D9" }}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>S</div>
            <span className="font-bold" style={{ color: "#1A1A2E" }}>Rivva</span>
            <span className="text-xs ml-2" style={{ color: "#8A8070" }}>Powered by Credii</span>
          </div>
          <p className="text-xs" style={{ color: "#8A8070" }}>© 2026 Rivva / Credii. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}