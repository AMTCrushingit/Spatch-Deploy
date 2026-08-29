"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { useTheme, colors } from "@/lib/theme";
import { Send, Phone, MoreVertical } from "lucide-react";

const conversations = [
  { id: "conv1", clientName: "Aaliyah Joseph", clientAvatar: "AJ", service: "Electrical Quote", lastMessage: "August 20th, starting at 6pm.", time: "10:08", unread: 1 },
  { id: "conv2", clientName: "Simone Baptiste", clientAvatar: "SB", service: "Electrical Quote", lastMessage: "Can you come this Saturday?", time: "Yesterday", unread: 0 },
];

const initMessages = [
  { id: "m1", senderId: "u1", text: "Hi Marcus! I saw your quote for the ceiling fans. Are you available this weekend?", time: "09:45" },
  { id: "m2", senderId: "u2", text: "Hi Aaliyah! Yes, I'm available Saturday morning. I can be there by 9am.", time: "09:50" },
  { id: "m3", senderId: "u1", text: "Perfect. The address is 14 Maraval Road, Port of Spain.", time: "09:52" },
  { id: "m4", senderId: "u2", text: "Got it. I'll bring all the tools needed. The job should take about 3 hours.", time: "09:55" },
];

export default function ProviderChatPage() {
  const { theme } = useTheme();
  const c = colors;
  const [activeConv, setActiveConv] = useState("conv1");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(initMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentUserId = "u2";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  function send() {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { id: `m${Date.now()}`, senderId: currentUserId, text: input.trim(), time: "Now" }]);
    setInput("");
  }

  const activeConvData = conversations.find(conv => conv.id === activeConv);

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="provider" userName="Marcus Williams" userAvatar="MW" />
      <div style={{ padding: "2rem 2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme), marginBottom: "1.5rem" }}>Messages</h1>
        <div style={{ display: "flex", borderRadius: "1.25rem", border: `1px solid ${c.border(theme)}`, overflow: "hidden", height: "calc(100vh - 220px)", minHeight: "500px", boxShadow: c.shadow(theme) }}>
          {/* Sidebar */}
          <div style={{ width: "280px", flexShrink: 0, borderRight: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "0.875rem 1rem", borderBottom: `1px solid ${c.border(theme)}` }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 700, color: c.textFaint(theme), letterSpacing: "0.08em", textTransform: "uppercase" }}>CLIENT CONVERSATIONS</p>
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {conversations.map(conv => (
                <button key={conv.id} onClick={() => setActiveConv(conv.id)} style={{ width: "100%", textAlign: "left", padding: "1rem", borderBottom: `1px solid ${c.border(theme)}`, background: activeConv === conv.id ? c.bgMuted(theme) : "transparent", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "linear-gradient(135deg, #0ABFBC, #FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>{conv.clientAvatar}</div>
                      <div style={{ position: "absolute", bottom: 0, right: 0, width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: "#2ECC71", border: `2px solid ${c.bgCard(theme)}` }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.9rem" }}>{conv.clientName}</p>
                        <span style={{ fontSize: "0.75rem", color: c.textFaint(theme) }}>{conv.time}</span>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#FF6B4A", marginTop: "0.1rem" }}>{conv.service}</p>
                      <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && <div style={{ width: "1.25rem", height: "1.25rem", borderRadius: "50%", background: "#0ABFBC", color: "#fff", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{conv.unread}</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: c.bg(theme) }}>
            {activeConvData && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "linear-gradient(135deg, #0ABFBC, #FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>{activeConvData.clientAvatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{activeConvData.clientName}</p>
                    <p style={{ fontSize: "0.8rem", color: "#2ECC71" }}>● Online · {activeConvData.service}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[<Phone size={17} />, <MoreVertical size={17} />].map((icon, i) => (
                    <button key={i} style={{ padding: "0.5rem", borderRadius: "0.625rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), cursor: "pointer", color: c.textMuted(theme) }}>{icon}</button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div style={{ flex: 1, height: "1px", background: c.border(theme) }} />
                <span style={{ fontSize: "0.8rem", color: c.textFaint(theme) }}>Today</span>
                <div style={{ flex: 1, height: "1px", background: c.border(theme) }} />
              </div>
              {msgs.map(msg => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div key={msg.id} style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start", gap: "0.5rem" }}>
                    {!isMe && <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "50%", background: "linear-gradient(135deg, #0ABFBC, #FF6B4A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0, marginTop: "0.25rem" }}>{activeConvData?.clientAvatar}</div>}
                    <div style={{ maxWidth: "70%" }}>
                      <div style={{ padding: "0.75rem 1rem", borderRadius: "1rem", fontSize: "0.95rem", background: isMe ? "linear-gradient(135deg, #0ABFBC, #0ABFBC)" : c.bgCard(theme), color: isMe ? "#fff" : c.text(theme), borderBottomRightRadius: isMe ? "0.25rem" : undefined, borderBottomLeftRadius: !isMe ? "0.25rem" : undefined, border: isMe ? "none" : `1px solid ${c.border(theme)}` }}>{msg.text}</div>
                      <p style={{ fontSize: "0.75rem", color: c.textFaint(theme), marginTop: "0.25rem", textAlign: isMe ? "right" : "left" }}>{msg.time}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <div style={{ padding: "1rem 1.5rem", borderTop: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message…" style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "0.875rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), color: c.text(theme), fontSize: "0.95rem", outline: "none" }} />
                <button onClick={send} style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #0ABFBC, #0ABFBC)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Send size={17} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}