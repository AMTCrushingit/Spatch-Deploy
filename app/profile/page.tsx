"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { serviceRequests, reviews, getCategoryById } from "@/lib/data";
import { formatDate, ratingStars } from "@/lib/utils";
import { Edit2, MapPin, Phone, Mail, Calendar, CheckCircle } from "lucide-react";

const currentUser = {
  id: "u1", name: "Aaliyah Joseph", email: "aaliyah@email.com",
  phone: "+1-868-555-0101", island: "Trinidad", avatar: "AJ",
  joined: "January 2026",
};

const myRequests = serviceRequests.filter(r => r.client_id === "cl1");

export default function ClientProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: currentUser.name, phone: currentUser.phone, island: currentUser.island });

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="client" userName={currentUser.name} userAvatar={currentUser.avatar} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>My Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="md:col-span-1">
            <div className="p-6 rounded-2xl border text-center" style={{ borderColor: "#E8E2D9" }}>
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4"
                style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                {currentUser.avatar}
              </div>
              <h2 className="font-bold text-lg" style={{ color: "#1A1A2E" }}>{currentUser.name}</h2>
              <p className="text-sm mt-1" style={{ color: "#8A8070" }}>Client</p>

              <div className="mt-4 space-y-2 text-left">
                {[
                  { icon: <MapPin size={14} />, value: currentUser.island },
                  { icon: <Mail size={14} />, value: currentUser.email },
                  { icon: <Phone size={14} />, value: currentUser.phone },
                  { icon: <Calendar size={14} />, value: `Joined ${currentUser.joined}` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm" style={{ color: "#8A8070" }}>
                    <span style={{ color: "#FF6B4A" }}>{item.icon}</span>
                    {item.value}
                  </div>
                ))}
              </div>

              <button onClick={() => setEditing(!editing)}
                className="mt-5 w-full py-2 rounded-xl border text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                style={{ borderColor: "#E8E2D9", color: "#1A1A2E" }}>
                <Edit2 size={14} /> {editing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* Stats */}
            <div className="mt-4 p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Activity</h3>
              <div className="space-y-3">
                {[
                  { label: "Requests posted", value: myRequests.length },
                  { label: "Jobs completed", value: myRequests.filter(r => r.status === "closed").length },
                  { label: "Reviews given", value: 2 },
                  { label: "Providers hired", value: 3 },
                ].map(s => (
                  <div key={s.label} className="flex justify-between text-sm">
                    <span style={{ color: "#8A8070" }}>{s.label}</span>
                    <span className="font-semibold" style={{ color: "#1A1A2E" }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Edit form */}
            {editing && (
              <div className="p-5 rounded-2xl border" style={{ borderColor: "#FF6B4A40", background: "#FF6B4A05" }}>
                <h3 className="font-semibold text-sm mb-4" style={{ color: "#1A1A2E" }}>Edit Details</h3>
                <div className="space-y-3">
                  {[
                    { label: "Full Name", key: "name", type: "text" },
                    { label: "Phone", key: "phone", type: "tel" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs font-medium block mb-1" style={{ color: "#1A1A2E" }}>{f.label}</label>
                      <input type={f.type} value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                        style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs font-medium block mb-1" style={{ color: "#1A1A2E" }}>Island</label>
                    <select value={form.island} onChange={e => setForm(prev => ({ ...prev, island: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none"
                      style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }}>
                      {["Trinidad", "Barbados", "Jamaica", "St. Lucia", "Grenada", "Antigua"].map(i => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                  <button onClick={() => setEditing(false)}
                    className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
                    style={{ background: "#FF6B4A" }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Request history */}
            <div>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Request History</h3>
              <div className="space-y-3">
                {myRequests.map(req => {
                  const cat = getCategoryById(req.category_id);
                  return (
                    <div key={req.id} className="p-4 rounded-2xl border flex items-center gap-3"
                      style={{ borderColor: "#E8E2D9" }}>
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                        style={{ background: "#F7F4EF" }}>{cat?.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{cat?.name}</p>
                        <p className="text-xs truncate" style={{ color: "#8A8070" }}>{req.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize
                          ${req.status === "open" ? "text-green-700 bg-green-100" :
                            req.status === "matched" ? "text-amber-700 bg-amber-100" :
                            "text-gray-500 bg-gray-100"}`}>
                          {req.status}
                        </span>
                        <p className="text-xs mt-1" style={{ color: "#8A8070" }}>{formatDate(req.created_at)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews given */}
            <div>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Reviews I&apos;ve Given</h3>
              <div className="space-y-3">
                {reviews.filter(r => r.client_id === "cl1").map(rev => (
                  <div key={rev.id} className="p-4 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium" style={{ color: "#FFB347" }}>
                        {ratingStars(rev.rating)}
                      </span>
                      <span className="text-xs" style={{ color: "#8A8070" }}>{formatDate(rev.created_at)}</span>
                      <CheckCircle size={13} className="ml-auto" style={{ color: "#2ECC71" }} />
                    </div>
                    <p className="text-sm" style={{ color: "#1A1A2E" }}>&ldquo;{rev.comment}&rdquo;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}