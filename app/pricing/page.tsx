"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import { useTheme, colors } from "@/lib/theme";
import { CheckCircle, XCircle, Zap, ArrowRight, TrendingUp, Shield, Globe } from "lucide-react";

const ANNUAL_DISCOUNT = 0.20;

const providerTiers = [
  { id: "starter", name: "Starter", icon: "🌱", monthlyPrice: 50, color: "#0ABFBC",
    description: "Perfect for new providers getting started on RIVVA.", badge: null, cta: "Get Started",
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
    ]},
  { id: "pro", name: "Pro", icon: "⚡", monthlyPrice: 100, color: "#1A7FBF",
    description: "For established providers ready to grow their client base.", badge: "Most Popular", cta: "Start Pro",
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
    ]},
  { id: "elite", name: "Elite", icon: "👑", monthlyPrice: 200, color: "#1DB87A",
    description: "Maximum visibility for top-performing Caribbean professionals.", badge: null, cta: "Go Elite",
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
    ]},
];

const orgTiers = [
  { id: "corporate", name: "Corporate", icon: "🏢", price: "TT$50k", period: "/year", color: "#0ABFBC",
    description: "For businesses needing reliable, verified service providers at scale.", badge: null,
    features: ["Dedicated provider pool", "Bulk booking management", "SLA guarantees", "Priority support", "Custom reporting", "Up to 50 bookings/month"],
    cta: "Contact Sales" },
  { id: "government", name: "Government & NGO", icon: "🏛️", price: "TT$150k", period: "/contract", color: "#E63946",
    description: "Workforce data, impact metrics, and reporting for development agencies.", badge: "Credii Flagship",
    features: ["Full platform data access", "Workforce impact reports", "Provider verification pipeline", "Grant reporting exports", "Custom onboarding programs", "Dedicated account manager", "API access", "Multi-island coverage"],
    cta: "Talk to Credii" },
  { id: "development", name: "Development Partners", icon: "🌍", price: "Custom", period: "", color: "#F4A623",
    description: "Bespoke partnerships for regional economic development agencies and institutions.", badge: null,
    features: ["Everything in Government", "Micro-loan eligibility data", "Co-branded programs", "Research data licensing", "Board-level reporting", "White-label options", "Multi-region deployment"],
    cta: "Partner with Us" },
];

export default function PricingPage() {
  const { theme } = useTheme();
  const c = colors;
  const [annual, setAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState<"providers" | "orgs">("providers");

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="guest" />

      {/* Hero */}
      <section style={{ padding: "5rem 2.5rem 3rem", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "999px", marginBottom: "1.5rem", background: "#0ABFBC15", color: "#0ABFBC", border: "1px solid #0ABFBC30", fontSize: "0.85rem", fontWeight: 700 }}>
          🌴 Simple, transparent pricing
        </div>
        <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: c.text(theme), marginBottom: "1rem", lineHeight: 1.1 }}>
          Grow your business<br /><span style={{ color: "#0ABFBC" }}>across the Caribbean</span>
        </h1>
        <p style={{ fontSize: "1.15rem", color: c.textMuted(theme), marginBottom: "2.5rem" }}>
          Join 2,400+ verified providers. No hidden fees. Cancel anytime.
        </p>
        <div style={{ display: "inline-flex", padding: "0.3rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme) }}>
          {(["providers", "orgs"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "0.625rem 1.5rem", borderRadius: "0.75rem", border: "none", background: activeTab === tab ? "#0ABFBC" : "transparent", color: activeTab === tab ? "#fff" : c.textMuted(theme), fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>
              {tab === "providers" ? "For Providers" : "For Organisations"}
            </button>
          ))}
        </div>
      </section>

      {/* Provider pricing */}
      {activeTab === "providers" && (
        <div style={{ padding: "0 2.5rem 5rem" }}>
          {/* Billing toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: annual ? c.textMuted(theme) : c.text(theme) }}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} style={{ position: "relative", width: "3rem", height: "1.5rem", borderRadius: "999px", border: "none", background: annual ? "#0ABFBC" : c.border(theme), cursor: "pointer" }}>
              <div style={{ position: "absolute", top: "0.2rem", width: "1.1rem", height: "1.1rem", borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.2s", left: annual ? "calc(100% - 1.3rem)" : "0.2rem" }} />
            </button>
            <span style={{ fontSize: "0.95rem", fontWeight: 600, color: annual ? c.text(theme) : c.textMuted(theme) }}>
              Annual <span style={{ padding: "0.15rem 0.5rem", borderRadius: "999px", background: "#1DB87A20", color: "#1DB87A", fontSize: "0.8rem", fontWeight: 700, marginLeft: "0.3rem" }}>Save 20%</span>
            </span>
          </div>

          {/* Tier cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "3rem" }} className="grid-3col">
            {providerTiers.map(tier => (
              <div key={tier.id} style={{ position: "relative", padding: "2rem", borderRadius: "1.5rem", border: `2px solid ${tier.badge ? tier.color : c.border(theme)}`, background: tier.badge ? `${tier.color}08` : c.bgCard(theme), boxShadow: tier.badge ? `0 0 40px ${tier.color}20` : c.shadow(theme), display: "flex", flexDirection: "column" }}>
                {tier.badge && (
                  <div style={{ position: "absolute", top: "-1rem", left: "50%", transform: "translateX(-50%)", padding: "0.3rem 1rem", borderRadius: "999px", background: `linear-gradient(90deg, ${tier.color}, #1DB87A)`, color: "#fff", fontSize: "0.8rem", fontWeight: 800, whiteSpace: "nowrap" }}>⭐ {tier.badge}</div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.875rem", background: `${tier.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{tier.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.2rem", color: c.text(theme) }}>{tier.name}</h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginBottom: "1.5rem" }}>{tier.description}</p>
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.3rem" }}>
                    <span style={{ fontSize: "2.5rem", fontWeight: 900, color: tier.color, lineHeight: 1 }}>TT${annual ? Math.round(tier.monthlyPrice * (1 - ANNUAL_DISCOUNT)) : tier.monthlyPrice}</span>
                    <span style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginBottom: "0.3rem" }}>/mo{annual ? " · billed annually" : ""}</span>
                  </div>
                  {annual && <p style={{ fontSize: "0.8rem", color: "#1DB87A", marginTop: "0.3rem" }}>Save TT${Math.round(tier.monthlyPrice * 12 * ANNUAL_DISCOUNT).toLocaleString()}/yr</p>}
                </div>
                <Link href="/register?role=provider" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.875rem", borderRadius: "0.875rem", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", background: tier.badge ? tier.color : "transparent", color: tier.badge ? "#fff" : tier.color, border: tier.badge ? "none" : `2px solid ${tier.color}` }}>
                  {tier.cta} <ArrowRight size={16} />
                </Link>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  {tier.features.map(f => (
                    <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      {f.included ? <CheckCircle size={15} style={{ color: tier.color, flexShrink: 0 }} /> : <XCircle size={15} style={{ color: c.border(theme), flexShrink: 0 }} />}
                      <span style={{ fontSize: "0.9rem", color: f.included ? c.text(theme) : c.textFaint(theme) }}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lead fee add-ons */}
          <div style={{ padding: "2rem", borderRadius: "1.25rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), marginBottom: "2rem", boxShadow: c.shadow(theme) }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.5rem" }}>
              <Zap size={18} style={{ color: "#F4A623" }} />
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Lead Fee Add-ons</h3>
              <span style={{ padding: "0.15rem 0.625rem", borderRadius: "999px", background: "#F4A62320", color: "#E6900A", fontSize: "0.8rem", fontWeight: 700 }}>Optional</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }} className="grid-3col">
              {[
                { type: "Standard Lead", price: "TT$15", desc: "Client posted a matching request", icon: "📋", color: "#0ABFBC" },
                { type: "Verified Lead", price: "TT$25", desc: "Client has hired before (high intent)", icon: "✅", color: "#1DB87A" },
                { type: "Urgent Lead", price: "TT$35", desc: "Client needs same-day service", icon: "🔴", color: "#E63946" },
              ].map(l => (
                <div key={l.type} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bg(theme), display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.75rem", background: `${l.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{l.icon}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.9rem" }}>{l.type}</p>
                    <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>{l.desc}</p>
                    <p style={{ fontSize: "1.2rem", fontWeight: 900, color: l.color, marginTop: "0.5rem" }}>{l.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visibility boosts */}
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1.25rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Visibility Boosts</h3>
              <span style={{ padding: "0.15rem 0.625rem", borderRadius: "999px", background: "#0ABFBC15", color: "#0ABFBC", fontSize: "0.8rem", fontWeight: 700 }}>Available on all plans</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }} className="grid-4col">
              {[
                { name: "Homepage Feature", price: "TT$300/mo", desc: "Your card on the RIVVA homepage", icon: "🏠" },
                { name: "Category Spotlight", price: "TT$150/mo", desc: "Top of results for one category", icon: "🔦" },
                { name: "Island Boost", price: "TT$200/mo", desc: "Priority matching island-wide for 30 days", icon: "📍" },
                { name: "Launch Boost", price: "TT$75 once", desc: "First 10 leads guaranteed for new providers", icon: "🚀" },
              ].map(b => (
                <div key={b.name} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>{b.icon}</div>
                  <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.9rem" }}>{b.name}</p>
                  <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), marginTop: "0.2rem", marginBottom: "0.75rem" }}>{b.desc}</p>
                  <p style={{ fontWeight: 900, color: "#0ABFBC", fontSize: "0.95rem" }}>{b.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment methods */}
          <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), marginBottom: "3rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem", marginBottom: "0.25rem" }}>Accepted payment methods</p>
              <p style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>Secure payments processed via Stripe and PayPal</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", marginLeft: "auto" }}>
              {["💳 Stripe", "🅿️ PayPal"].map(p => (
                <span key={p} style={{ padding: "0.5rem 1rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, color: c.text(theme), fontSize: "0.9rem", fontWeight: 600, background: c.bg(theme) }}>{p}</span>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ padding: "2.5rem", borderRadius: "1.5rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: c.text(theme), marginBottom: "2rem", textAlign: "center" }}>Frequently Asked Questions</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="grid-2col">
              {[
                { q: "Is it free for clients?", a: "Yes. Clients always use RIVVA for free. They post requests, receive quotes, and hire providers at no cost." },
                { q: "Can I change my plan anytime?", a: "Yes. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle." },
                { q: "What payment methods are accepted?", a: "We accept Stripe and PayPal. All transactions are secure and encrypted." },
                { q: "Do I need to be verified before subscribing?", a: "Yes. All providers must complete basic verification (ID + skill proof) before their profile goes live." },
                { q: "What's the difference between a lead fee and a subscription?", a: "Your subscription gives you a monthly lead allowance. Lead fees are optional top-ups for more leads." },
                { q: "How do institutional contracts work?", a: "Org partnerships are negotiated directly with the Credii team. Contact us to schedule a call." },
              ].map(faq => (
                <div key={faq.q} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bg(theme) }}>
                  <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem", marginBottom: "0.5rem" }}>Q: {faq.q}</p>
                  <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), lineHeight: 1.6 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Org pricing */}
      {activeTab === "orgs" && (
        <div style={{ padding: "0 2.5rem 5rem" }}>
          <p style={{ textAlign: "center", color: c.textMuted(theme), fontSize: "1.05rem", marginBottom: "3rem" }}>
            Institutional partnerships that generate TT$150k–600k per contract.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "3rem" }} className="grid-3col">
            {orgTiers.map(tier => (
              <div key={tier.id} style={{ position: "relative", padding: "2rem", borderRadius: "1.5rem", border: `2px solid ${tier.badge ? tier.color : c.border(theme)}`, background: tier.badge ? `${tier.color}08` : c.bgCard(theme), boxShadow: tier.badge ? `0 0 40px ${tier.color}20` : c.shadow(theme), display: "flex", flexDirection: "column" }}>
                {tier.badge && <div style={{ position: "absolute", top: "-1rem", left: "50%", transform: "translateX(-50%)", padding: "0.3rem 1rem", borderRadius: "999px", background: `linear-gradient(90deg, ${tier.color}, #F4A623)`, color: "#fff", fontSize: "0.8rem", fontWeight: 800, whiteSpace: "nowrap" }}>🌍 {tier.badge}</div>}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.875rem", background: `${tier.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{tier.icon}</div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: c.text(theme) }}>{tier.name}</h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginBottom: "1.25rem" }}>{tier.description}</p>
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.3rem" }}>
                    <span style={{ fontSize: "2rem", fontWeight: 900, color: tier.color, lineHeight: 1 }}>{tier.price}</span>
                    {tier.period && <span style={{ fontSize: "0.9rem", color: c.textMuted(theme), marginBottom: "0.2rem" }}>{tier.period}</span>}
                  </div>
                </div>
                <Link href="/register" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.875rem", borderRadius: "0.875rem", marginBottom: "1.5rem", fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", background: tier.badge ? tier.color : "transparent", color: tier.badge ? "#fff" : tier.color, border: tier.badge ? "none" : `2px solid ${tier.color}` }}>
                  {tier.cta} <ArrowRight size={16} />
                </Link>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
                  {tier.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                      <CheckCircle size={15} style={{ color: tier.color, flexShrink: 0 }} />
                      <span style={{ fontSize: "0.9rem", color: c.text(theme) }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Value props */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }} className="grid-3col">
            {[
              { icon: <TrendingUp size={22} />, color: "#0ABFBC", title: "Grant-Ready Data", desc: "Every request, provider, and job completion is tracked and exportable for development agency reporting." },
              { icon: <Shield size={22} />, color: "#E63946", title: "Credii Verified Workforce", desc: "All providers are ID-verified and skill-checked by Credii. Organisations get a trusted, auditable pool." },
              { icon: <Globe size={22} />, color: "#F4A623", title: "Multi-Island Coverage", desc: "RIVVA operates across 6 Caribbean islands with a single platform, single dashboard, and unified reporting." },
            ].map(v => (
              <div key={v.title} style={{ padding: "1.5rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                <div style={{ width: "3rem", height: "3rem", borderRadius: "0.875rem", background: `${v.color}18`, color: v.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>{v.icon}</div>
                <h4 style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem", marginBottom: "0.5rem" }}>{v.title}</h4>
                <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section style={{ padding: "5rem 2.5rem", textAlign: "center", background: c.bgCard(theme), borderTop: `1px solid ${c.border(theme)}` }}>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: c.text(theme), marginBottom: "1rem" }}>Ready to grow across the Caribbean?</h2>
        <p style={{ color: c.textMuted(theme), fontSize: "1.1rem", marginBottom: "2.5rem" }}>Join 2,400+ verified providers. Start free, upgrade when you&apos;re ready.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/register?role=provider" style={{ padding: "1rem 2.5rem", borderRadius: "0.875rem", background: "linear-gradient(135deg, #0ABFBC, #1A7FBF)", color: "#fff", fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Start as a Provider <ArrowRight size={18} />
          </Link>
          <Link href="/register" style={{ padding: "1rem 2.5rem", borderRadius: "0.875rem", border: `2px solid ${c.border(theme)}`, color: c.text(theme), fontWeight: 700, fontSize: "1rem", textDecoration: "none" }}>
            Post a Request Free
          </Link>
        </div>
        <p style={{ fontSize: "0.9rem", color: c.textFaint(theme), marginTop: "1.5rem" }}>No credit card required for clients · Providers start from TT$50/mo</p>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${c.border(theme)}`, padding: "2rem 2.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontWeight: 900, color: c.text(theme), letterSpacing: "-0.02em", fontSize: "1.1rem" }}>RIVVA</span>
            <span style={{ color: "#E63946", fontSize: "0.85rem", fontWeight: 600 }}>Powered by Credii</span>
          </div>
          <p style={{ fontSize: "0.85rem", color: c.textFaint(theme) }}>© 2026 Rivva / Credii. All rights reserved.</p>
        </div>
      </footer>
      <style>{`.grid-3col{grid-template-columns:repeat(3,1fr);} .grid-4col{grid-template-columns:repeat(4,1fr);} .grid-2col{grid-template-columns:1fr 1fr;} @media(max-width:1024px){.grid-3col{grid-template-columns:1fr 1fr!important;} .grid-4col{grid-template-columns:1fr 1fr!important;}} @media(max-width:640px){.grid-3col{grid-template-columns:1fr!important;} .grid-4col{grid-template-columns:1fr!important;} .grid-2col{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}