"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { providers, users, reviews, serviceCategories, getReviewsByProviderId } from "@/lib/data";
import { formatDate, ratingStars } from "@/lib/utils";
import { Edit2, MapPin, Phone, Mail, Star, Briefcase, Clock, Shield } from "lucide-react";

const currentProvider = providers.find(p => p.user_id === "u2")!;
const currentUser = users.find(u => u.id === "u2")!;
const myReviews = getReviewsByProviderId(currentProvider.id);

export default function ProviderProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    bio: currentProvider.bio,
    skills: currentProvider.skills.join(", "),
  });

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="provider" userName={currentUser.name} userAvatar={currentUser.avatar} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>My Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-5">
            {/* Profile card */}
            <div className="p-6 rounded-2xl border text-center" style={{ borderColor: "#E8E2D9" }}>
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                  {currentUser.avatar}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "#2ECC71", border: "2px solid #FFFDF9" }}>
                  <Shield size={12} color="#fff" />
                </div>
              </div>
              <h2 className="font-bold text-lg" style={{ color: "#1A1A2E" }}>{currentUser.name}</h2>
              <p className="text-sm mt-0.5" style={{ color: "#0ABFBC" }}>⚡ Electrical</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <span style={{ color: "#FFB347" }}>{ratingStars(currentProvider.rating)}</span>
                <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{currentProvider.rating}</span>
                <span className="text-xs" style={{ color: "#8A8070" }}>({myReviews.length} reviews)</span>
              </div>

              <div className="mt-4 space-y-2 text-left">
                {[
                  { icon: <MapPin size={13} />, value: currentProvider.island },
                  { icon: <Mail size={13} />, value: currentUser.email },
                  { icon: <Phone size={13} />, value: currentUser.phone },
                  { icon: <Briefcase size={13} />, value: `${currentProvider.completed_jobs} jobs completed` },
                  { icon: <Clock size={13} />, value: `Responds in ~${currentProvider.response_speed}h` },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs" style={{ color: "#8A8070" }}>
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

            {/* Categories */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>Service Categories</h3>
              <div className="flex flex-wrap gap-2">
                {currentProvider.category_ids.map(cid => {
                  const cat = serviceCategories.find(c => c.id === cid);
                  return cat ? (
                    <span key={cid} className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ background: "#0ABFBC15", color: "#0ABFBC" }}>
                      {cat.icon} {cat.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>

            {/* Subscription */}
            <div className="p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, #1A1A2E, #2D2D4E)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#8A8070" }}>Current Plan</p>
              <p className="text-lg font-bold text-white">Pro · TT$100/mo</p>
              <p className="text-xs mt-1" style={{ color: "#8A8070" }}>Renews Aug 20, 2026</p>
              <div className="mt-3 space-y-1">
                {["Unlimited leads", "Priority matching", "Profile badge"].map(f => (
                  <p key={f} className="text-xs text-white flex items-center gap-1">
                    <span style={{ color: "#2ECC71" }}>✓</span> {f}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="md:col-span-2 space-y-6">
            {/* Edit form */}
            {editing && (
              <div className="p-5 rounded-2xl border" style={{ borderColor: "#FF6B4A40", background: "#FF6B4A05" }}>
                <h3 className="font-semibold text-sm mb-4" style={{ color: "#1A1A2E" }}>Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>Bio</label>
                    <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                      rows={4} className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none"
                      style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
                  </div>
                  <div>
                    <label className="text-xs font-medium block mb-1.5" style={{ color: "#1A1A2E" }}>
                      Skills <span style={{ color: "#8A8070" }}>(comma-separated)</span>
                    </label>
                    <input value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none"
                      style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
                  </div>
                  <button onClick={() => setEditing(false)}
                    className="w-full py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
                    style={{ background: "#FF6B4A" }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Bio */}
            <div className="p-5 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "#1A1A2E" }}>About</h3>
              <p className="text-sm" style={{ color: "#8A8070" }}>{currentProvider.bio}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {currentProvider.skills.map(skill => (
                  <span key={skill} className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "#F7F4EF", color: "#1A1A2E" }}>{skill}</span>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Client Reviews</h3>
                <span className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#FFB34715", color: "#FFB347" }}>
                  {ratingStars(currentProvider.rating)} {currentProvider.rating}
                </span>
              </div>
              {myReviews.length === 0 ? (
                <div className="text-center py-8 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                  <Star size={24} className="mx-auto mb-2" style={{ color: "#E8E2D9" }} />
                  <p className="text-sm" style={{ color: "#8A8070" }}>No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {myReviews.map(rev => (
                    <div key={rev.id} className="p-4 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>C</div>
                          <span className="text-xs font-medium" style={{ color: "#1A1A2E" }}>Verified Client</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span style={{ color: "#FFB347", fontSize: 12 }}>{ratingStars(rev.rating)}</span>
                          <span className="text-xs" style={{ color: "#8A8070" }}>{formatDate(rev.created_at)}</span>
                        </div>
                      </div>
                      <p className="text-sm" style={{ color: "#1A1A2E" }}>&ldquo;{rev.comment}&rdquo;</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}