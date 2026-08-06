"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import { messages, users, quotes } from "@/lib/data";
import { Send, Phone, Video, MoreVertical } from "lucide-react";

const conversations = [
  { id: "conv1", quoteId: "q2", providerId: "u3", providerName: "Priya Ramkissoon", providerAvatar: "PR", service: "Photography", lastMessage: "Perfect, I'm available! Shall I confirm?", time: "10:12", unread: 1 },
  { id: "conv2", quoteId: "q1", providerId: "u2", providerName: "Marcus Williams", providerAvatar: "MW", service: "Electrical", lastMessage: "I can handle the ceiling fans and breaker.", time: "Yesterday", unread: 0 },
];

const chatMessages = [
  { id: "m1", senderId: "u1", text: "Hi Priya! Your portfolio looks amazing. Can we discuss the timeline?", time: "10:00" },
  { id: "m2", senderId: "u3", text: "Thank you so much! Of course. What date is the party?", time: "10:05" },
  { id: "m3", senderId: "u1", text: "August 20th, starting at 6pm. Venue is in Westmoorings.", time: "10:08" },
  { id: "m4", senderId: "u3", text: "Perfect, I'm available! I'll arrive at 5:30 to set up. Shall I confirm the booking?", time: "10:12" },
];

export default function ChatPage() {
  const [activeConv, setActiveConv] = useState("conv1");
  const [input, setInput] = useState("");
  const [localMessages, setLocalMessages] = useState(chatMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const currentUserId = "u1";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [localMessages]);

  function sendMessage() {
    if (!input.trim()) return;
    setLocalMessages(prev => [...prev, {
      id: `m${Date.now()}`, senderId: currentUserId, text: input.trim(), time: "Now",
    }]);
    setInput("");
  }

  const activeConvData = conversations.find(c => c.id === activeConv);

  return (
    <div style={{ background: "#FFFDF9", minHeight: "100vh" }}>
      <Navbar role="client" userName="Aaliyah Joseph" userAvatar="AJ" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#1A1A2E" }}>Messages</h1>

        <div className="flex rounded-2xl border overflow-hidden" style={{ borderColor: "#E8E2D9", height: "calc(100vh - 220px)", minHeight: 500 }}>
          {/* Conversation list */}
          <div className="w-72 flex-shrink-0 border-r" style={{ borderColor: "#E8E2D9", background: "#F7F4EF" }}>
            <div className="p-4 border-b" style={{ borderColor: "#E8E2D9" }}>
              <input placeholder="Search conversations…" className="w-full px-3 py-2 rounded-xl border text-xs outline-none"
                style={{ borderColor: "#E8E2D9", background: "#fff", color: "#1A1A2E" }} />
            </div>
            <div className="overflow-y-auto h-full">
              {conversations.map(conv => (
                <button key={conv.id} onClick={() => setActiveConv(conv.id)}
                  className="w-full text-left p-4 border-b hover:bg-white transition"
                  style={{
                    borderColor: "#E8E2D9",
                    background: activeConv === conv.id ? "#fff" : "transparent",
                  }}>
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                        {conv.providerAvatar}
                      </div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                        style={{ background: "#2ECC71" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate" style={{ color: "#1A1A2E" }}>{conv.providerName}</p>
                        <span className="text-xs flex-shrink-0 ml-1" style={{ color: "#8A8070" }}>{conv.time}</span>
                      </div>
                      <p className="text-xs" style={{ color: "#0ABFBC" }}>{conv.service}</p>
                      <p className="text-xs truncate mt-0.5" style={{ color: "#8A8070" }}>{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                        style={{ background: "#FF6B4A" }}>{conv.unread}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            {activeConvData && (
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "#E8E2D9" }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                    {activeConvData.providerAvatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#1A1A2E" }}>{activeConvData.providerName}</p>
                    <p className="text-xs" style={{ color: "#2ECC71" }}>● Online · {activeConvData.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition" style={{ color: "#8A8070" }}>
                    <Phone size={16} />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition" style={{ color: "#8A8070" }}>
                    <Video size={16} />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-gray-100 transition" style={{ color: "#8A8070" }}>
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Date divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "#E8E2D9" }} />
                <span className="text-xs px-2" style={{ color: "#8A8070" }}>Today</span>
                <div className="flex-1 h-px" style={{ background: "#E8E2D9" }} />
              </div>

              {localMessages.map(msg => {
                const isMe = msg.senderId === currentUserId;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} gap-2`}>
                    {!isMe && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1"
                        style={{ background: "linear-gradient(135deg, #FF6B4A, #0ABFBC)" }}>
                        {activeConvData?.providerAvatar}
                      </div>
                    )}
                    <div className={`max-w-xs lg:max-w-md`}>
                      <div className="px-4 py-2.5 rounded-2xl text-sm"
                        style={{
                          background: isMe ? "#FF6B4A" : "#F7F4EF",
                          color: isMe ? "#fff" : "#1A1A2E",
                          borderBottomRightRadius: isMe ? 4 : undefined,
                          borderBottomLeftRadius: !isMe ? 4 : undefined,
                        }}>
                        {msg.text}
                      </div>
                      <p className={`text-xs mt-1 ${isMe ? "text-right" : ""}`} style={{ color: "#8A8070" }}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t" style={{ borderColor: "#E8E2D9" }}>
              <div className="flex items-center gap-3">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message…"
                  className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none"
                  style={{ borderColor: "#E8E2D9", background: "#F7F4EF", color: "#1A1A2E" }}
                />
                <button onClick={sendMessage}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:opacity-90 transition flex-shrink-0"
                  style={{ background: "#FF6B4A" }}>
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}