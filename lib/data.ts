// ─── Rivva Mock Data Store ───────────────────────────────────────────────────
// Simulates PostgreSQL + Prisma schema from the spec

export type Island = "Trinidad" | "Barbados" | "Jamaica" | "St. Lucia" | "Grenada" | "Antigua";
export type Role = "client" | "provider" | "admin";
export type VerificationStatus = "pending" | "approved" | "rejected";
export type RequestStatus = "open" | "matched" | "closed";
export type QuoteStatus = "sent" | "accepted" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  island: Island;
  avatar: string;
  created_at: string;
}

export interface Provider {
  id: string;
  user_id: string;
  bio: string;
  skills: string[];
  verification_status: VerificationStatus;
  rating: number;
  completed_jobs: number;
  island: Island;
  category_ids: string[];
  response_speed: number; // hours avg
  created_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  island: Island;
  created_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  client_id: string;
  category_id: string;
  description: string;
  island: Island;
  status: RequestStatus;
  budget: string;
  created_at: string;
}

export interface Quote {
  id: string;
  provider_id: string;
  request_id: string;
  price: number;
  message: string;
  status: QuoteStatus;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  quote_id: string;
  message: string;
  created_at: string;
}

export interface Review {
  id: string;
  provider_id: string;
  client_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const users: User[] = [
  { id: "u1", name: "Aaliyah Joseph", email: "aaliyah@email.com", phone: "+1-868-555-0101", role: "client", island: "Trinidad", avatar: "AJ", created_at: "2026-01-15" },
  { id: "u2", name: "Marcus Williams", email: "marcus@email.com", phone: "+1-876-555-0202", role: "provider", island: "Jamaica", avatar: "MW", created_at: "2026-01-20" },
  { id: "u3", name: "Priya Ramkissoon", email: "priya@email.com", phone: "+1-868-555-0303", role: "provider", island: "Trinidad", avatar: "PR", created_at: "2026-02-01" },
  { id: "u4", name: "Devon Clarke", email: "devon@email.com", phone: "+1-246-555-0404", role: "provider", island: "Barbados", avatar: "DC", created_at: "2026-02-10" },
  { id: "u5", name: "Simone Baptiste", email: "simone@email.com", phone: "+1-758-555-0505", role: "client", island: "St. Lucia", avatar: "SB", created_at: "2026-02-15" },
  { id: "u6", name: "Credii Admin", email: "admin@credii.co", phone: "+1-868-555-0000", role: "admin", island: "Trinidad", avatar: "CA", created_at: "2026-01-01" },
  { id: "u7", name: "Kezia Thomas", email: "kezia@email.com", phone: "+1-473-555-0606", role: "provider", island: "Grenada", avatar: "KT", created_at: "2026-03-01" },
  { id: "u8", name: "Andre Phillip", email: "andre@email.com", phone: "+1-868-555-0707", role: "provider", island: "Trinidad", avatar: "AP", created_at: "2026-03-05" },
];

export const serviceCategories: ServiceCategory[] = [
  { id: "c1", name: "Plumbing", description: "Pipe repairs, installations, leak fixes", icon: "🔧", created_at: "2026-01-01" },
  { id: "c2", name: "Electrical", description: "Wiring, installations, fault finding", icon: "⚡", created_at: "2026-01-01" },
  { id: "c3", name: "Cleaning", description: "Residential and commercial cleaning", icon: "🧹", created_at: "2026-01-01" },
  { id: "c4", name: "Photography", description: "Events, portraits, commercial shoots", icon: "📸", created_at: "2026-01-01" },
  { id: "c5", name: "Catering", description: "Events, corporate, private dining", icon: "🍽️", created_at: "2026-01-01" },
  { id: "c6", name: "DJ & Music", description: "Events, weddings, corporate functions", icon: "🎵", created_at: "2026-01-01" },
  { id: "c7", name: "Landscaping", description: "Garden design, maintenance, tree work", icon: "🌿", created_at: "2026-01-01" },
  { id: "c8", name: "Tutoring", description: "Academic support, CXC, CAPE prep", icon: "📚", created_at: "2026-01-01" },
  { id: "c9", name: "AC & Appliances", description: "Repairs, servicing, installations", icon: "❄️", created_at: "2026-01-01" },
  { id: "c10", name: "Construction", description: "Renovations, masonry, carpentry", icon: "🏗️", created_at: "2026-01-01" },
  { id: "c11", name: "Web & Tech", description: "Websites, apps, IT support", icon: "💻", created_at: "2026-01-01" },
  { id: "c12", name: "Beauty & Wellness", description: "Hair, nails, massage, makeup", icon: "💆", created_at: "2026-01-01" },
];

export const providers: Provider[] = [
  { id: "p1", user_id: "u2", bio: "Licensed electrician with 8 years experience across Jamaica and Barbados.", skills: ["Wiring", "Solar Installation", "Fault Finding"], verification_status: "approved", rating: 4.8, completed_jobs: 127, island: "Jamaica", category_ids: ["c2"], response_speed: 2, created_at: "2026-01-20" },
  { id: "p2", user_id: "u3", bio: "Professional photographer specialising in weddings, events and corporate shoots.", skills: ["Wedding Photography", "Event Coverage", "Drone Shots"], verification_status: "approved", rating: 4.9, completed_jobs: 89, island: "Trinidad", category_ids: ["c4"], response_speed: 1, created_at: "2026-02-01" },
  { id: "p3", user_id: "u4", bio: "Master plumber, fully certified. Fast response across Barbados.", skills: ["Pipe Repair", "Bathroom Fit-out", "Leak Detection"], verification_status: "approved", rating: 4.6, completed_jobs: 203, island: "Barbados", category_ids: ["c1"], response_speed: 3, created_at: "2026-02-10" },
  { id: "p4", user_id: "u7", bio: "Catering specialist for weddings, corporate events and private dining.", skills: ["Caribbean Cuisine", "Event Catering", "Pastry"], verification_status: "pending", rating: 0, completed_jobs: 0, island: "Grenada", category_ids: ["c5"], response_speed: 4, created_at: "2026-03-01" },
  { id: "p5", user_id: "u8", bio: "Full-stack developer and IT consultant. Websites, apps, and tech support.", skills: ["React", "Node.js", "WordPress", "IT Support"], verification_status: "approved", rating: 4.7, completed_jobs: 54, island: "Trinidad", category_ids: ["c11"], response_speed: 1, created_at: "2026-03-05" },
];

export const clients: Client[] = [
  { id: "cl1", user_id: "u1", island: "Trinidad", created_at: "2026-01-15" },
  { id: "cl2", user_id: "u5", island: "St. Lucia", created_at: "2026-02-15" },
];

export const serviceRequests: ServiceRequest[] = [
  { id: "r1", client_id: "cl1", category_id: "c2", description: "Need a licensed electrician to install 3 ceiling fans and fix a tripping breaker in my home in Maraval.", island: "Trinidad", status: "open", budget: "TT$800–TT$1,500", created_at: "2026-08-05" },
  { id: "r2", client_id: "cl1", category_id: "c4", description: "Looking for a photographer for my daughter's 18th birthday party. About 80 guests, 4 hours coverage.", island: "Trinidad", status: "matched", budget: "TT$2,000–TT$3,500", created_at: "2026-08-03" },
  { id: "r3", client_id: "cl2", category_id: "c5", description: "Need catering for a corporate lunch, 50 people, Caribbean menu preferred.", island: "St. Lucia", status: "open", budget: "TT$4,000–TT$6,000", created_at: "2026-08-04" },
  { id: "r4", client_id: "cl1", category_id: "c1", description: "Burst pipe under kitchen sink, need urgent repair today.", island: "Trinidad", status: "closed", budget: "TT$300–TT$600", created_at: "2026-07-28" },
  { id: "r5", client_id: "cl2", category_id: "c11", description: "Need a simple 5-page website for my small bakery business.", island: "St. Lucia", status: "open", budget: "TT$1,500–TT$3,000", created_at: "2026-08-06" },
];

export const quotes: Quote[] = [
  { id: "q1", provider_id: "p1", request_id: "r1", price: 1200, message: "Hi! I can handle the ceiling fans and breaker issue. I'm available this weekend. Price includes labour and minor parts.", status: "sent", created_at: "2026-08-05" },
  { id: "q2", provider_id: "p2", request_id: "r2", price: 2800, message: "Congratulations on your daughter's birthday! I'd love to cover this event. My package includes edited digital gallery within 5 days.", status: "accepted", created_at: "2026-08-03" },
  { id: "q3", provider_id: "p5", request_id: "r5", price: 2200, message: "I can build a clean, mobile-friendly 5-page site. Includes hosting setup and 1 month of support.", status: "sent", created_at: "2026-08-06" },
];

export const messages: Message[] = [
  { id: "m1", sender_id: "u1", receiver_id: "u3", quote_id: "q2", message: "Hi Priya! Your portfolio looks amazing. Can we discuss the timeline?", created_at: "2026-08-03T10:00:00" },
  { id: "m2", sender_id: "u3", receiver_id: "u1", quote_id: "q2", message: "Thank you so much! Of course. What date is the party?", created_at: "2026-08-03T10:05:00" },
  { id: "m3", sender_id: "u1", receiver_id: "u3", quote_id: "q2", message: "August 20th, starting at 6pm. Venue is in Westmoorings.", created_at: "2026-08-03T10:08:00" },
  { id: "m4", sender_id: "u3", receiver_id: "u1", quote_id: "q2", message: "Perfect, I'm available! I'll arrive at 5:30 to set up. Shall I confirm the booking?", created_at: "2026-08-03T10:12:00" },
];

export const reviews: Review[] = [
  { id: "rv1", provider_id: "p1", client_id: "cl1", rating: 5, comment: "Marcus was on time, professional and fixed everything quickly. Highly recommend!", created_at: "2026-07-15" },
  { id: "rv2", provider_id: "p2", client_id: "cl1", rating: 5, comment: "Priya's photos were absolutely stunning. She captured every moment perfectly.", created_at: "2026-07-20" },
  { id: "rv3", provider_id: "p3", client_id: "cl2", rating: 4, comment: "Devon did a great job on the pipe repair. Arrived within 2 hours of booking.", created_at: "2026-07-28" },
];

// ─── Analytics Data ───────────────────────────────────────────────────────────
export const analyticsData = {
  totalProviders: 5,
  approvedProviders: 3,
  pendingProviders: 1,
  totalClients: 2,
  totalRequests: 5,
  openRequests: 3,
  matchedRequests: 1,
  closedRequests: 1,
  totalQuotes: 3,
  acceptedQuotes: 1,
  totalRevenue: 0, // Phase 2
  islandBreakdown: [
    { island: "Trinidad", providers: 2, clients: 1, requests: 3 },
    { island: "Jamaica", providers: 1, clients: 0, requests: 0 },
    { island: "Barbados", providers: 1, clients: 0, requests: 0 },
    { island: "St. Lucia", providers: 0, clients: 1, requests: 2 },
    { island: "Grenada", providers: 1, clients: 0, requests: 0 },
  ],
  monthlyRequests: [
    { month: "Mar", requests: 12 },
    { month: "Apr", requests: 19 },
    { month: "May", requests: 28 },
    { month: "Jun", requests: 35 },
    { month: "Jul", requests: 41 },
    { month: "Aug", requests: 5 },
  ],
  categoryBreakdown: [
    { category: "Electrical", count: 1 },
    { category: "Photography", count: 1 },
    { category: "Catering", count: 1 },
    { category: "Plumbing", count: 1 },
    { category: "Web & Tech", count: 1 },
  ],
};

// ─── Helper Functions ─────────────────────────────────────────────────────────
export function getUserById(id: string) { return users.find(u => u.id === id); }
export function getProviderByUserId(uid: string) { return providers.find(p => p.user_id === uid); }
export function getClientByUserId(uid: string) { return clients.find(c => c.user_id === uid); }
export function getCategoryById(id: string) { return serviceCategories.find(c => c.id === id); }
export function getRequestById(id: string) { return serviceRequests.find(r => r.id === id); }
export function getQuotesByRequestId(rid: string) { return quotes.filter(q => q.request_id === rid); }
export function getQuotesByProviderId(pid: string) { return quotes.filter(q => q.provider_id === pid); }
export function getRequestsByClientId(cid: string) { return serviceRequests.filter(r => r.client_id === cid); }
export function getReviewsByProviderId(pid: string) { return reviews.filter(r => r.provider_id === pid); }
export function getMessagesByQuoteId(qid: string) { return messages.filter(m => m.quote_id === qid); }

// Matching Engine — MVP version
export function matchProviders(request: ServiceRequest): Provider[] {
  return providers
    .filter(p =>
      p.island === request.island &&
      p.category_ids.includes(request.category_id) &&
      p.verification_status === "approved"
    )
    .sort((a, b) => {
      const scoreA = a.rating * 10 + a.completed_jobs * 0.1 - a.response_speed;
      const scoreB = b.rating * 10 + b.completed_jobs * 0.1 - b.response_speed;
      return scoreB - scoreA;
    })
    .slice(0, 5);
}