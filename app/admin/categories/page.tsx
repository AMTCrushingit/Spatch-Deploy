"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { serviceCategories, serviceRequests } from "@/lib/data";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import type { ServiceCategory } from "@/lib/data";

const iconOptions = ["🔧", "⚡", "🧹", "📸", "🍽️", "🎵", "🌿", "📚", "❄️", "🏗️", "💻", "💆", "🚗", "🐾", "🎨", "🏋️"];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ServiceCategory[]>(serviceCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", description: "", icon: "" });
  const [newForm, setNewForm] = useState({ name: "", description: "", icon: "🔧" });

  function startEdit(cat: ServiceCategory) {
    setEditingId(cat.id);
    setEditForm({ name: cat.name, description: cat.description, icon: cat.icon });
  }

  function saveEdit(id: string) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...editForm } : c));
    setEditingId(null);
  }

  function deleteCategory(id: string) {
    setCategories(prev => prev.filter(c => c.id !== id));
  }

  function addCategory() {
    if (!newForm.name) return;
    const newCat: ServiceCategory = {
      id: `c${Date.now()}`,
      name: newForm.name,
      description: newForm.description,
      icon: newForm.icon,
      created_at: new Date().toISOString().split("T")[0],
    };
    setCategories(prev => [...prev, newCat]);
    setNewForm({ name: "", description: "", icon: "🔧" });
    setShowAdd(false);
  }

  function getRequestCount(catId: string) {
    return serviceRequests.filter(r => r.category_id === catId).length;
  }

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="admin" userName="Credii Admin" userAvatar="CA" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>Service Categories</h1>
            <p className="text-sm mt-1" style={{ color: "#8A8070" }}>
              Manage the categories available on Rivva
            </p>
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
            style={{ background: "#FF6B4A" }}>
            <Plus size={16} /> Add Category
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Categories", value: categories.length, color: "#0ABFBC" },
            { label: "Active (with requests)", value: categories.filter(c => getRequestCount(c.id) > 0).length, color: "#2ECC71" },
            { label: "Total Requests", value: serviceRequests.length, color: "#FF6B4A" },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-2xl border" style={{ borderColor: "#E8E2D9" }}>
              <p className="text-xs" style={{ color: "#8A8070" }}>{s.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Add category form */}
        {showAdd && (
          <div className="mb-6 p-5 rounded-2xl border" style={{ borderColor: "#FF6B4A40", background: "#FF6B4A05" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>Add New Category</h3>
              <button onClick={() => setShowAdd(false)} style={{ color: "#8A8070" }}><X size={18} /></button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#1A1A2E" }}>Icon</label>
                <div className="flex flex-wrap gap-1.5 p-2 rounded-xl border" style={{ borderColor: "#E8E2D9", background: "#fff" }}>
                  {iconOptions.map(icon => (
                    <button key={icon} onClick={() => setNewForm(f => ({ ...f, icon }))}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-base transition"
                      style={{ background: newForm.icon === icon ? "#FF6B4A20" : "transparent" }}>
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#1A1A2E" }}>Name</label>
                <input value={newForm.name} onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Roofing"
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#1A1A2E" }}>Description</label>
                <input value={newForm.description} onChange={e => setNewForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Short description"
                  className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded-xl border text-sm font-medium"
                style={{ borderColor: "#E8E2D9", color: "#8A8070" }}>Cancel</button>
              <button onClick={addCategory} disabled={!newForm.name}
                className="px-4 py-2 rounded-xl text-white text-sm font-medium disabled:opacity-40 hover:opacity-90 transition"
                style={{ background: "#FF6B4A" }}>
                Add Category
              </button>
            </div>
          </div>
        )}

        {/* Categories grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {categories.map(cat => {
            const reqCount = getRequestCount(cat.id);
            const isEditing = editingId === cat.id;
            return (
              <div key={cat.id} className="p-4 rounded-2xl border hover:shadow-sm transition"
                style={{ borderColor: "#E8E2D9", background: "#fff" }}>
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {iconOptions.map(icon => (
                        <button key={icon} onClick={() => setEditForm(f => ({ ...f, icon }))}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-base"
                          style={{ background: editForm.icon === icon ? "#0ABFBC20" : "#F7F4EF" }}>
                          {icon}
                        </button>
                      ))}
                    </div>
                    <input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                      style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
                    <input value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl border text-sm outline-none"
                      style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(cat.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white text-xs font-medium"
                        style={{ background: "#2ECC71" }}>
                        <Save size={12} /> Save
                      </button>
                      <button onClick={() => setEditingId(null)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border"
                        style={{ borderColor: "#E8E2D9", color: "#8A8070" }}>
                        <X size={12} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: "#F7F4EF" }}>{cat.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{cat.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#8A8070" }}>{cat.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: reqCount > 0 ? "#2ECC7115" : "#F7F4EF", color: reqCount > 0 ? "#2ECC71" : "#8A8070" }}>
                          {reqCount} request{reqCount !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => startEdit(cat)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                        style={{ color: "#8A8070" }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteCategory(cat.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition"
                        style={{ color: "#FF6B4A" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}