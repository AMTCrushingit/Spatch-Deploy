"use client";
import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { serviceCategories, serviceRequests } from "@/lib/data";
import { useTheme, colors } from "@/lib/theme";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import type { ServiceCategory } from "@/lib/data";

const iconOptions = ["🔧","⚡","🧹","📸","🍽️","🎵","🌿","📚","❄️","🏗️","💻","💆","🚗","🐾","🎨","🏋️"];

export default function CategoriesPage() {
  const { theme } = useTheme();
  const c = colors;
  const [categories, setCategories] = useState<ServiceCategory[]>(serviceCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", description: "", icon: "" });
  const [newForm, setNewForm] = useState({ name: "", description: "", icon: "🔧" });

  function startEdit(cat: ServiceCategory) { setEditingId(cat.id); setEditForm({ name: cat.name, description: cat.description, icon: cat.icon }); }
  function saveEdit(id: string) { setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, ...editForm } : cat)); setEditingId(null); }
  function deleteCategory(id: string) { setCategories(prev => prev.filter(cat => cat.id !== id)); }
  function addCategory() {
    if (!newForm.name) return;
    setCategories(prev => [...prev, { id: `c${Date.now()}`, name: newForm.name, description: newForm.description, icon: newForm.icon, created_at: new Date().toISOString().split("T")[0] }]);
    setNewForm({ name: "", description: "", icon: "🔧" });
    setShowAdd(false);
  }
  function getRequestCount(catId: string) { return serviceRequests.filter(r => r.category_id === catId).length; }

  const inp = { width: "100%", padding: "0.75rem 0.875rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.inputBg(theme), color: c.text(theme), fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="admin" userName="Credii Admin" userAvatar="CA" />
      <div style={{ padding: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme) }}>Service Categories</h1>
            <p style={{ color: c.textMuted(theme), marginTop: "0.25rem" }}>Manage the categories available on Rivva</p>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", fontWeight: 700, cursor: "pointer" }}>
            <Plus size={16} /> Add Category
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem", marginBottom: "2rem" }} className="stats-grid">
          {[
            { label: "Total Categories", value: categories.length, color: "#0ABFBC" },
            { label: "Active (with requests)", value: categories.filter(cat => getRequestCount(cat.id) > 0).length, color: "#2ECC71" },
            { label: "Total Requests", value: serviceRequests.length, color: "#FF6B4A" },
          ].map(s => (
            <div key={s.label} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
              <p style={{ fontSize: "0.85rem", color: c.textMuted(theme) }}>{s.label}</p>
              <p style={{ fontSize: "2rem", fontWeight: 900, color: s.color, marginTop: "0.25rem" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Add form */}
        {showAdd && (
          <div style={{ padding: "1.5rem", borderRadius: "1rem", border: `2px solid #FF6B4A40`, background: "#FF6B4A05", marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: c.text(theme) }}>Add New Category</h3>
              <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", cursor: "pointer", color: c.textMuted(theme) }}><X size={18} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1rem" }} className="grid-3col">
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.4rem" }}>Icon</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", padding: "0.625rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.inputBg(theme) }}>
                  {iconOptions.map(icon => (
                    <button key={icon} onClick={() => setNewForm(f => ({ ...f, icon }))} style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.4rem", border: "none", background: newForm.icon === icon ? "#FF6B4A20" : "transparent", cursor: "pointer", fontSize: "1rem" }}>{icon}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.4rem" }}>Name</label>
                <input value={newForm.name} onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Roofing" style={inp} />
              </div>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: c.text(theme), display: "block", marginBottom: "0.4rem" }}>Description</label>
                <input value={newForm.description} onChange={e => setNewForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description" style={inp} />
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              <button onClick={() => setShowAdd(false)} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), color: c.textMuted(theme), cursor: "pointer", fontWeight: 600 }}>Cancel</button>
              <button onClick={addCategory} disabled={!newForm.name} style={{ padding: "0.625rem 1.25rem", borderRadius: "0.75rem", border: "none", background: newForm.name ? "linear-gradient(135deg, #FF6B4A, #FF8C42)" : c.border(theme), color: "#fff", cursor: newForm.name ? "pointer" : "not-allowed", fontWeight: 700 }}>Add Category</button>
            </div>
          </div>
        )}

        {/* Categories grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1rem" }} className="grid-2col">
          {categories.map(cat => {
            const reqCount = getRequestCount(cat.id);
            const isEditing = editingId === cat.id;
            return (
              <div key={cat.id} style={{ padding: "1.25rem", borderRadius: "1rem", border: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), boxShadow: c.shadow(theme) }}>
                {isEditing ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {iconOptions.map(icon => (
                        <button key={icon} onClick={() => setEditForm(f => ({ ...f, icon }))} style={{ width: "1.75rem", height: "1.75rem", borderRadius: "0.4rem", border: "none", background: editForm.icon === icon ? "#0ABFBC20" : c.bgMuted(theme), cursor: "pointer", fontSize: "1rem" }}>{icon}</button>
                      ))}
                    </div>
                    <input value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={inp} />
                    <input value={editForm.description} onChange={e => setEditForm(f => ({ ...f, description: e.target.value }))} style={inp} />
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => saveEdit(cat.id)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.5rem 0.875rem", borderRadius: "0.625rem", border: "none", background: "#2ECC71", color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer" }}><Save size={13} /> Save</button>
                      <button onClick={() => setEditingId(null)} style={{ display: "flex", alignItems: "center", gap: "0.3rem", padding: "0.5rem 0.875rem", borderRadius: "0.625rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), color: c.textMuted(theme), fontSize: "0.85rem", cursor: "pointer" }}><X size={13} /> Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>
                    <div style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.875rem", background: c.bgMuted(theme), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>{cat.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{cat.name}</p>
                      <p style={{ fontSize: "0.85rem", color: c.textMuted(theme), marginTop: "0.2rem" }}>{cat.description}</p>
                      <span style={{ display: "inline-block", marginTop: "0.5rem", padding: "0.15rem 0.625rem", borderRadius: "999px", background: reqCount > 0 ? "#2ECC7115" : c.bgMuted(theme), color: reqCount > 0 ? "#2ECC71" : c.textMuted(theme), fontSize: "0.75rem", fontWeight: 600 }}>
                        {reqCount} request{reqCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                      <button onClick={() => startEdit(cat)} style={{ padding: "0.4rem", borderRadius: "0.5rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), cursor: "pointer", color: c.textMuted(theme) }}><Edit2 size={14} /></button>
                      <button onClick={() => deleteCategory(cat.id)} style={{ padding: "0.4rem", borderRadius: "0.5rem", border: "none", background: "#E6394615", cursor: "pointer", color: "#E63946" }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style>{`.stats-grid{grid-template-columns:repeat(3,1fr);} .grid-2col{grid-template-columns:repeat(2,1fr);} .grid-3col{grid-template-columns:repeat(3,1fr);} @media(max-width:768px){.stats-grid{grid-template-columns:1fr!important;} .grid-2col{grid-template-columns:1fr!important;} .grid-3col{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}