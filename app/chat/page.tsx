"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { useTheme, colors } from "@/lib/theme";
import { Send, Phone, Video, MoreVertical } from "lucide-react";

const conversations = [
  { id: "conv1", quoteId: "q2", providerName: "Priya Ramkissoon", providerAvatar: "PR", service: "Photography", lastMessage: "Perfect, I'm available! Shall I confirm?", time: "10:12", unread: 1 },
  { id: "conv2", quoteId: "q1", providerName: "Marcus Williams", providerAvatar: "MW", service: "Electrical", lastMessage: "I can handle the ceiling fans and breaker.", time: "Yesterday", unread: 0 },
];

const initMessages = [
  { id: "m1", senderId: "u1", text: "Hi Priya! Your portfolio looks amazing. Can we discuss the timeline?", time: "10:00" },
  { id: "m2", senderId: "u3", text: "Thank you so much! Of course. What date is the party?", time: "10:05" },
  { id: "m3", senderId: "u1", text: "August 20th, starting at 6pm. Venue is in Westmoorings.", time: "10:08" },
  { id: "m4", senderId: "u3", text: "Perfect, I'm available! I'll arrive at 5:30 to set up. Shall I confirm the booking?", time: "10:12" },
];

export default function ChatPage() {
  const { theme } = useTheme();
  const c = colors;
  const [activeConv, setActiveConv] = useState("conv1");
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(initMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentUserId = "u1";

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  function send() {
    if (!input.trim()) return;
    setMsgs(prev => [...prev, { id: `m${Date.now()}`, senderId: currentUserId, text: input.trim(), time: "Now" }]);
    setInput("");
  }

  const activeConvData = conversations.find(c => c.id === activeConv);

  return (
    <div style={{ minHeight: "100vh", background: c.bg(theme) }}>
      <Navbar role="client" userName="Aaliyah Joseph" userAvatar="AJ" />
      <div style={{ padding: "2rem 2.5rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, color: c.text(theme), marginBottom: "1.5rem" }}>Messages</h1>
        <div style={{ display: "flex", borderRadius: "1.25rem", border: `1px solid ${c.border(theme)}`, overflow: "hidden", height: "calc(100vh - 220px)", minHeight: "500px", boxShadow: c.shadow(theme) }}>
          {/* Sidebar */}
          <div style={{ width: "280px", flexShrink: 0, borderRight: `1px solid ${c.border(theme)}`, background: c.bgCard(theme), display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "1rem", borderBottom: `1px solid ${c.border(theme)}` }}>
              <input placeholder="Search conversations…" style={{ width: "100%", padding: "0.625rem 0.875rem", borderRadius: "0.75rem", border: `1px solid ${c.border(theme)}`, background: c.bgMuted(theme), color: c.text(theme), fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ flex: 1, overflowY: "auto" }}>
              {conversations.map(conv => (
                <button key={conv.id} onClick={() => setActiveConv(conv.id)} style={{ width: "100%", textAlign: "left", padding: "1rem", borderBottom: `1px solid ${c.border(theme)}`, background: activeConv === conv.id ? c.bgMuted(theme) : "transparent", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>{conv.providerAvatar}</div>
                      <div style={{ position: "absolute", bottom: 0, right: 0, width: "0.625rem", height: "0.625rem", borderRadius: "50%", background: "#2ECC71", border: `2px solid ${c.bgCard(theme)}` }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <p style={{ fontWeight: 600, color: c.text(theme), fontSize: "0.9rem" }}>{conv.providerName}</p>
                        <span style={{ fontSize: "0.75rem", color: c.textFaint(theme) }}>{conv.time}</span>
                      </div>
                      <p style={{ fontSize: "0.8rem", color: "#0ABFBC", marginTop: "0.1rem" }}>{conv.service}</p>
                      <p style={{ fontSize: "0.8rem", color: c.textMuted(theme), overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginTop: "0.1rem" }}>{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && <div style={{ width: "1.25rem", height: "1.25rem", borderRadius: "50%", background: "#FF6B4A", color: "#fff", fontSize: "0.7rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{conv.unread}</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", background: c.bg(theme) }}>
            {activeConvData && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.5rem", borderBottom: `1px solid ${c.border(theme)}`, background: c.bgCard(theme) }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
                  <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>{activeConvData.providerAvatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: c.text(theme), fontSize: "0.95rem" }}>{activeConvData.providerName}</p>
                    <p style={{ fontSize: "0.8rem", color: "#2ECC71" }}>● Online · {activeConvData.service}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {[<Phone size={17} />, <Video size={17} />, <MoreVertical size={17} />].map((icon, i) => (
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
                    {!isMe && <div style={{ width: "1.75rem", height: "1.75rem", borderRadius: "50%", background: "linear-gradient(135deg, #FF6B4A, #E63946)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.65rem", fontWeight: 700, flexShrink: 0, marginTop: "0.25rem" }}>{activeConvData?.providerAvatar}</div>}
                    <div style={{ maxWidth: "70%" }}>
                      <div style={{ padding: "0.75rem 1rem", borderRadius: "1rem", fontSize: "0.95rem", background: isMe ? "linear-gradient(135deg, #FF6B4A, #FF8C42)" : c.bgCard(theme), color: isMe ? "#fff" : c.text(theme), borderBottomRightRadius: isMe ? "0.25rem" : undefined, borderBottomLeftRadius: !isMe ? "0.25rem" : undefined, border: isMe ? "none" : `1px solid ${c.border(theme)}` }}>{msg.text}</div>
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
                <button onClick={send} style={{ width: "2.75rem", height: "2.75rem", borderRadius: "0.875rem", border: "none", background: "linear-gradient(135deg, #FF6B4A, #FF8C42)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Send size={17} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}