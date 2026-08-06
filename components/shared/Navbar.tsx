"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Bell, ChevronDown } from "lucide-react";

interface NavbarProps {
  role?: "client" | "provider" | "admin" | "guest";
  userName?: string;
  userAvatar?: string;
}

export default function Navbar({ role = "guest", userName = "", userAvatar = "" }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const clientLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/request", label: "Post a Request" },
    { href: "/quotes", label: "My Quotes" },
    { href: "/chat", label: "Messages" },
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

  const links = role === "client" ? clientLinks : role === "provider" ? providerLinks : role === "admin" ? adminLinks : [];

  return (
    <nav style={{ background: "#FFFDF9", borderBottom: "1px solid #E8E2D9" }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>S</div>
            <span className="font-bold text-xl" style={{ color: "#1A1A2E" }}>Spatch</span>
            {role === "admin" && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium ml-1"
                style={{ background: "#FF6B4A20", color: "#FF6B4A" }}>Credii Admin</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: "#1A1A2E" }}>{l.label}</Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {role === "guest" ? (
              <>
                <Link href="/login" className="text-sm font-medium px-4 py-2 rounded-lg transition"
                  style={{ color: "#1A1A2E" }}>Log in</Link>
                <Link href="/register" className="text-sm font-medium px-4 py-2 rounded-lg text-white transition"
                  style={{ background: "#FF6B4A" }}>Get Started</Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button className="relative p-2 rounded-lg hover:bg-gray-100">
                  <Bell size={18} style={{ color: "#8A8070" }} />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "#FF6B4A" }}></span>
                </button>
                <div className="relative">
                  <button onClick={() => setDropOpen(!dropOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>{userAvatar}</div>
                    <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{userName.split(" ")[0]}</span>
                    <ChevronDown size={14} style={{ color: "#8A8070" }} />
                  </button>
                  {dropOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg border py-1"
                      style={{ background: "#FFFDF9", borderColor: "#E8E2D9" }}>
                      <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50" style={{ color: "#1A1A2E" }}>Profile</Link>
                      <Link href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-50" style={{ color: "#1A1A2E" }}>Settings</Link>
                      <hr style={{ borderColor: "#E8E2D9" }} className="my-1" />
                      <Link href="/" className="block px-4 py-2 text-sm hover:bg-gray-50" style={{ color: "#FF6B4A" }}>Log out</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-2" style={{ borderColor: "#E8E2D9", background: "#FFFDF9" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} className="block py-2 text-sm font-medium" style={{ color: "#1A1A2E" }}
              onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
          {role === "guest" && (
            <div className="pt-2 flex flex-col gap-2">
              <Link href="/login" className="text-center py-2 text-sm font-medium rounded-lg border" style={{ borderColor: "#E8E2D9" }}>Log in</Link>
              <Link href="/register" className="text-center py-2 text-sm font-medium rounded-lg text-white" style={{ background: "#FF6B4A" }}>Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}