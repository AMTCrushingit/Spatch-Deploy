"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bell, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme, colors } from "@/lib/theme";

interface NavbarProps {
  role?: "client" | "provider" | "admin" | "guest";
  userName?: string;
  userAvatar?: string;
}

export default function Navbar({ role = "guest", userName = "", userAvatar = "" }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const c = colors;
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const clientLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/request", label: "Post a Request" },
    { href: "/quotes", label: "My Quotes" },
    { href: "/chat", label: "Messages" },
    { href: "/pricing", label: "Pricing" },
  ];
  const providerLinks = [
    { href: "/provider/dashboard", label: "Dashboard" },
    { href: "/provider/leads", label: "Leads" },
    { href: "/provider/quotes", label: "My Quotes" },
    { href: "/provider/chat", label: "Messages" },
  ];
  const adminLinks = [
    { href: "/admin/dashboard", label: "Overview" },
    { href: "/admin/approvals", label: "Approvals" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/analytics", label: "Analytics" },
  ];
  const links =
    role === "client" ? clientLinks :
    role === "provider" ? providerLinks :
    role === "admin" ? adminLinks : [];

  const toggleBtn = (
    <button onClick={toggle} style={{
      width: "2.2rem", height: "2.2rem", borderRadius: "0.6rem",
      border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme),
      display: "flex", alignItems: "center", justifyContent: "center",
      cursor: "pointer", color: c.textMuted(theme), flexShrink: 0,
    }}>
      {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );

  return (
    <nav style={{
      background: c.navBg(theme),
      borderBottom: `1px solid ${c.navBorder(theme)}`,
      backdropFilter: "blur(20px)",
      position: "sticky", top: 0, zIndex: 50, width: "100%",
    }}>
      <div style={{ width: "100%", padding: "0 2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <img src="/rivva-logo.svg" alt="RIVVA" style={{ width: "2.4rem", height: "2.4rem" }} />
            <span style={{ fontWeight: 900, fontSize: "1.3rem", color: c.text(theme), letterSpacing: "-0.02em" }}>RIVVA</span>
            {role === "admin" && (
              <span style={{ fontSize: "0.7rem", padding: "0.2rem 0.6rem", borderRadius: "999px", background: "#E6394615", color: "#E63946", fontWeight: 700, marginLeft: "0.3rem" }}>
                Credii Admin
              </span>
            )}
          </Link>

          {/* Desktop Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
            {links.map(l => (
              <Link key={l.href} href={l.href} style={{ fontSize: "0.95rem", fontWeight: 500, color: c.textMuted(theme), textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#0ABFBC")}
                onMouseLeave={e => (e.currentTarget.style.color = c.textMuted(theme))}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }} className="hidden md:flex">
            {toggleBtn}
            {role === "guest" ? (
              <>
                <Link href="/login" style={{ fontSize: "0.9rem", fontWeight: 600, padding: "0.5rem 1.2rem", borderRadius: "0.6rem", color: c.textMuted(theme), textDecoration: "none", border: `1px solid ${c.border(theme)}` }}>
                  Log in
                </Link>
                <Link href="/register" style={{ fontSize: "0.9rem", fontWeight: 700, padding: "0.5rem 1.4rem", borderRadius: "0.6rem", color: "#fff", textDecoration: "none", background: "linear-gradient(135deg, #0ABFBC, #1A7FBF)" }}>
                  Get Started
                </Link>
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button style={{ position: "relative", padding: "0.5rem", borderRadius: "0.6rem", border: "none", background: "transparent", cursor: "pointer", color: c.textMuted(theme) }}>
                  <Bell size={18} />
                  <span style={{ position: "absolute", top: "0.3rem", right: "0.3rem", width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#FF6B4A" }} />
                </button>
                <div style={{ position: "relative" }}>
                  <button onClick={() => setDropOpen(!dropOpen)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.6rem", borderRadius: "0.6rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), cursor: "pointer" }}>
                    <div style={{ width: "2rem", height: "2rem", borderRadius: "50%", background: "linear-gradient(135deg, #0ABFBC, #1A7FBF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>{userAvatar}</div>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600, color: c.text(theme) }}>{userName.split(" ")[0]}</span>
                    <ChevronDown size={14} style={{ color: c.textMuted(theme) }} />
                  </button>
                  {dropOpen && (
                    <div style={{ position: "absolute", right: 0, top: "calc(100% + 0.5rem)", width: "12rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme), padding: "0.4rem 0", zIndex: 100 }}>
                      <Link href="/profile" style={{ display: "block", padding: "0.6rem 1rem", fontSize: "0.9rem", color: c.text(theme), textDecoration: "none" }}>Profile</Link>
                      <Link href="/settings" style={{ display: "block", padding: "0.6rem 1rem", fontSize: "0.9rem", color: c.text(theme), textDecoration: "none" }}>Settings</Link>
                      <hr style={{ border: "none", borderTop: `1px solid ${c.border(theme)}`, margin: "0.3rem 0" }} />
                      <Link href="/" style={{ display: "block", padding: "0.6rem 1rem", fontSize: "0.9rem", color: "#E63946", textDecoration: "none" }}>Log out</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile: toggle + hamburger only */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="md:hidden">
            {toggleBtn}
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ padding: "0.5rem", background: "transparent", border: "none", cursor: "pointer", color: c.text(theme) }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ borderTop: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), padding: "1rem 2.5rem" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ display: "block", padding: "0.75rem 0", fontSize: "1rem", fontWeight: 500, color: c.text(theme), textDecoration: "none", borderBottom: `1px solid ${c.border(theme)}` }}>
              {l.label}
            </Link>
          ))}
          {role === "guest" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", paddingTop: "1rem" }}>
              <Link href="/login" style={{ textAlign: "center", padding: "0.75rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, color: c.text(theme), textDecoration: "none", fontWeight: 600 }}>Log in</Link>
              <Link href="/register" style={{ textAlign: "center", padding: "0.75rem", borderRadius: "0.75rem", background: "linear-gradient(135deg, #0ABFBC, #1A7FBF)", color: "#fff", textDecoration: "none", fontWeight: 700 }}>Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}