import { useState, useRef, useEffect, useCallback } from "react";

const SCC_RED = "#ED1C24";
const SCC_BLACK = "#000000";
const SCC_GREY = "#A9A3A1";
const BG_LIGHT = "#F4F4F5";

const EVENTS = [
  { name: "Total Cost of Ownership & Negotiations", subtitle: "Go beyond sticker price and master negotiation tactics that create lasting value", date: "March 16, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1692&request_locale=en", topics: ["negotiation","total cost of ownership","procurement","cost analysis","value analysis","purchasing"], level: "All Levels" },
  { name: "Unlock Your Pathway into Canada's Supply Chain Profession", date: "March 18, 2026", location: "Virtual via Zoom", type: "Career", region: "Alberta", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1707&request_locale=en", topics: ["career","entry level","newcomer","immigration","career change","getting started"], level: "Entry" },
  { name: "Edmonton International Airport Tour", date: "March 19, 2026", location: "Edmonton International Airport", type: "Networking", region: "Alberta", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1704&request_locale=en", topics: ["networking","logistics","transportation","aviation","facility tour"], level: "All Levels" },
  { name: "Balancing Automation, AI, and Tariffs - Strategies for Canadian Supply Chain Leaders", date: "March 25, 2026", location: "Online", type: "Webinar", region: "National", url: "https://mbportal.supplychaincanada.com/mpower/event/loadevent.action?e=738&request_locale=en", topics: ["AI","automation","tariffs","trade","technology","strategy"], level: "All Levels" },
  { name: "Indigenous Procurement Strategies: Building Meaningful Partnerships & Economic Reconciliation", date: "April 02, 2026", location: "Online National", type: "Webinar", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1702&request_locale=en", topics: ["indigenous procurement","supplier diversity","reconciliation","partnerships","public sector"], level: "All Levels" },
  { name: "Planning & Forecasting Fundamentals", subtitle: "Build demand plans that drive smarter purchasing decisions", date: "April 07, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1697&request_locale=en", topics: ["planning","forecasting","demand planning","purchasing","operations","S&OP"], level: "Foundational to Intermediate" },
  { name: "Spend Analytics Mastery with Power BI", subtitle: "Transform raw spend data into compelling visual stories and interactive dashboards", date: "April 08, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1694&request_locale=en", topics: ["data analytics","Power BI","spend analysis","dashboards","reporting","procurement analytics","technology"], level: "Intermediate" },
  { name: "Indigenous Procurement Micro Credential - REGINA", date: "April 08, 2026", location: "The Atlas Hotel, Regina", type: "PD Workshop", region: "Saskatchewan", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=959&request_locale=en", topics: ["indigenous procurement","supplier diversity","reconciliation","micro credential"], level: "All Levels" },
  { name: "Dine and Connect Edmonton", date: "April 16, 2026", location: "Edmonton", type: "Networking", region: "Alberta", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1712&request_locale=en", topics: ["networking","connections","community","Edmonton"], level: "All Levels" },
  { name: "Construction Fundamentals for Supply Chain Professionals", date: "April 17, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1695&request_locale=en", topics: ["construction","contracts","warranty","capital projects","project management"], level: "Intermediate" },
  { name: "Power Automate and Co-Pilot for Supply Chain Professionals", date: "April 20, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1696&request_locale=en", topics: ["AI","automation","Power Automate","Microsoft","Co-Pilot","technology","productivity"], level: "All Levels" },
  { name: "The Buy-In Blueprint: Turning Supply Chain Results Into Resources, Capital & Influence", date: "April 28, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1706&request_locale=en", topics: ["leadership","influence","stakeholder management","communication","executive presence","business case"], level: "Intermediate to Advanced" },
  { name: "Capital Projects Contracting", date: "May 05, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1715&request_locale=en", topics: ["capital projects","contracting","construction","contracts"], level: "Intermediate" },
  { name: "Driving Forward: Transforming a Fleet Program", date: "May 13, 2026", location: "Online National", type: "Webinar", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1714&request_locale=en", topics: ["fleet management","transportation","logistics","vehicle management"], level: "All Levels" },
  { name: "Inventory Intelligence & Warehouse Excellence", date: "May 19, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1716&request_locale=en", topics: ["inventory management","warehouse","operations","efficiency","stock management"], level: "All Levels" },
  { name: "2026 Supply Chain Canada National Conference", date: "May 27, 2026", location: "Chateau Frontenac, Quebec City", type: "Conference", region: "National", url: "https://portal.supplychaincanada.com/mpower/event/loadevent.action?e=477&request_locale=en", topics: ["conference","networking","national","leadership","industry trends"], level: "All Levels" },
  { name: "Strategic Sourcing", date: "June 02, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1718&request_locale=en", topics: ["strategic sourcing","procurement","supplier management","sourcing strategy"], level: "Intermediate" },
  { name: "2nd Annual Supply Chain Canada Golf Tournament", date: "June 02, 2026", location: "Wintergreen Way, Bragg Creek", type: "Networking", region: "Alberta", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1689&request_locale=en", topics: ["networking","golf","community","social"], level: "All Levels" },
  { name: "Indigenous Procurement Micro Credential - SASKATOON", date: "June 04, 2026", location: "Saskatoon", type: "PD Workshop", region: "Saskatchewan", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=958&request_locale=en", topics: ["indigenous procurement","supplier diversity","reconciliation"], level: "All Levels" },
  { name: "Shipping Terms of Sale in Domestic and International Purchasing", date: "June 18, 2026", location: "Online National", type: "PD Workshop", region: "National", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1717&request_locale=en", topics: ["shipping","incoterms","international trade","purchasing","logistics"], level: "All Levels" },
  { name: "Supply Chain Canada - West Futures Conference 2026", date: "October 02, 2026", location: "River Cree Resort and Casino, Edmonton", type: "Conference", region: "Alberta", url: "https://abportal.supplychaincanada.com/mpower/event/loadevent.action?e=1710&request_locale=en", topics: ["conference","networking","Alberta","leadership","innovation"], level: "All Levels" },
  { name: "2026 Leadership Residency", date: "May 09, 2026", location: "Online", type: "Online Learning", region: "National", url: "https://portal.supplychaincanada.com/mpower/event/loadevent.action?e=480&request_locale=en", topics: ["leadership","SCMP","designation","management"], level: "Advanced" },
  { name: "SCMP Module 1: Supply Chain Management", date: "April 13, 2026", location: "Online", type: "SCMP Module", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=926&request_locale=en", topics: ["SCMP","certification","supply chain management"], level: "Certification" },
  { name: "SCMP Module 2: Procurement and Supply Management", date: "April 13, 2026", location: "Online", type: "SCMP Module", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=928&request_locale=en", topics: ["SCMP","certification","procurement","supply management"], level: "Certification" },
  { name: "SCMP Module 3: Logistics and Transportation", date: "April 13, 2026", location: "Online", type: "SCMP Module", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=930&request_locale=en", topics: ["SCMP","certification","logistics","transportation"], level: "Certification" },
  { name: "SCMP Module 4: Operations and Process Management", date: "April 13, 2026", location: "Online", type: "SCMP Module", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=932&request_locale=en", topics: ["SCMP","certification","operations","process management"], level: "Certification" },
  { name: "SCMP Module 5: Knowledge Management", date: "April 27, 2026", location: "Online", type: "SCMP Module", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=934&request_locale=en", topics: ["SCMP","certification","knowledge management"], level: "Certification" },
  { name: "SCMP Module 6: Global Sourcing", date: "April 27, 2026", location: "Online", type: "SCMP Module", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=936&request_locale=en", topics: ["SCMP","certification","global sourcing","international"], level: "Certification" },
  { name: "SCMP Module 7: SCM for the Public Sector", date: "April 27, 2026", location: "Online", type: "SCMP Module", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=938&request_locale=en", topics: ["SCMP","certification","public sector","government"], level: "Certification" },
  { name: "SCMP Module 8: SCM for Services, Capital Goods, & Major Projects", date: "April 27, 2026", location: "Online", type: "SCMP Module", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=940&request_locale=en", topics: ["SCMP","certification","services","capital goods","major projects"], level: "Certification" },
  { name: "IW1: Leadership and Professionalism", date: "April 16, 2026", location: "Online", type: "SCMP Workshop", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=947&request_locale=en", topics: ["SCMP","leadership","professionalism"], level: "Certification" },
  { name: "IW2: Negotiation Skills", date: "April 28, 2026", location: "Online", type: "SCMP Workshop", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=948&request_locale=en", topics: ["SCMP","negotiation","skills"], level: "Certification" },
  { name: "IW3: Communication and Relational Skills", date: "April 22, 2026", location: "Online", type: "SCMP Workshop", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=949&request_locale=en", topics: ["SCMP","communication","relationships","soft skills"], level: "Certification" },
  { name: "IW4: Competitive Bidding, Contract Preparation, & Contract Management", date: "May 28, 2026", location: "Online", type: "SCMP Workshop", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=950&request_locale=en", topics: ["SCMP","bidding","contracts","contract management"], level: "Certification" },
  { name: "IW5: Risk Management", date: "May 21, 2026", location: "Online", type: "SCMP Workshop", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=951&request_locale=en", topics: ["SCMP","risk management"], level: "Certification" },
  { name: "IW6: Ethical Behaviour and Social Responsibility", date: "June 04, 2026", location: "Online", type: "SCMP Workshop", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=952&request_locale=en", topics: ["SCMP","ethics","social responsibility"], level: "Certification" },
  { name: "SMT Course 1: Procurement", date: "April 13, 2026", location: "Online", type: "SMT Course", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=942&request_locale=en", topics: ["SMT","procurement","entry level","foundational"], level: "Entry" },
  { name: "SMT Course 2: Logistics", date: "April 13, 2026", location: "Online", type: "SMT Course", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=943&request_locale=en", topics: ["SMT","logistics","entry level","foundational"], level: "Entry" },
  { name: "SMT Course 3: Transportation", date: "April 13, 2026", location: "Online", type: "SMT Course", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=944&request_locale=en", topics: ["SMT","transportation","entry level","foundational"], level: "Entry" },
  { name: "SMT Course 4: Operations Management", date: "April 13, 2026", location: "Online", type: "SMT Course", region: "National", url: "https://skportal.supplychaincanada.com/mpower/event/loadevent.action?e=945&request_locale=en", topics: ["SMT","operations","entry level","foundational"], level: "Entry" },
];

const BASE_PROMPT = `You are SCC Advisor, the friendly and knowledgeable professional development guide for Supply Chain Canada. Your ONLY job is to help supply chain and procurement professionals find the right SCC program.

PERSONALITY:
- Warm, professional, conversational — like a knowledgeable colleague
- Ask focused follow-up questions (one at a time, max 2 per message)
- Keep responses concise (3-5 sentences unless recommending programs)
- Use "you" language

CONVERSATION FLOW:
1. Understand what the member needs (1-2 exchanges)
2. Ask about their region/province if relevant
3. Ask about experience level if it helps
4. Recommend 1-3 SPECIFIC programs from the catalog with personalized reasoning
5. For SCMP certification, explain the pathway and recommend modules
6. For entry-level/career-changers, recommend SMT courses and the career pathway event
7. For networking, recommend networking events in their region
8. For job searching, recommend networking events AND career pathway event

WHEN RECOMMENDING: For each program, include the EXACT event name, date, location, type, and why it's relevant. Format each recommendation like this:

**[Event Name]**
Date: [date] | Location: [location] | Type: [type]
[2-3 sentences about why this is relevant to the member's situation]
Registration: [url]

WHEN NO MATCH EXISTS: Say something like:
"That's a great area to focus on. We don't have a specific program on [topic] scheduled right now, but our professional development team actively plans new offerings based on member interest. If you share your email, I'll make sure they know about your interest and reach out when something relevant comes up."

Then add this exact text at the end: [INTEREST_CAPTURE]

RULES:
- NEVER recommend programs not in the catalog
- NEVER make up dates, prices, or details
- NEVER provide specific pricing — say "visit the registration page for current pricing"
- If asked about non-PD topics, gently redirect
- Always include the direct registration link

HERE IS THE CURRENT SCC EVENTS CATALOG:
`;

function EventCard({ event }) {
  return (
    <div style={{ background: "#fff", borderLeft: `4px solid ${SCC_RED}`, borderRadius: 8, padding: "14px 16px", marginTop: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
      <div style={{ fontWeight: 700, fontSize: 15, color: SCC_BLACK, marginBottom: 4 }}>{event.name}</div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 12, color: SCC_GREY, marginBottom: 8 }}>
        <span>{event.date}</span>
        <span style={{ color: "#ccc" }}>|</span>
        <span>{event.location}</span>
        <span style={{ color: "#ccc" }}>|</span>
        <span style={{ color: SCC_RED, fontWeight: 600 }}>{event.type}</span>
      </div>
      {event.reason && <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5, marginBottom: 8 }}>{event.reason}</div>}
      <a href={event.url} target="_blank" rel="noopener noreferrer" style={{ color: SCC_RED, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>
        View Details & Register &rarr;
      </a>
    </div>
  );
}

function parseResponse(text) {
  const parts = [];
  const hasInterestCapture = text.includes("[INTEREST_CAPTURE]");
  const cleanText = text.replace("[INTEREST_CAPTURE]", "").trim();

  // Try to find event recommendations and match them to our catalog
  const matchedEvents = [];
  for (const evt of EVENTS) {
    if (cleanText.includes(evt.name) || cleanText.includes(evt.name.substring(0, 30))) {
      const reasonMatch = cleanText.match(new RegExp(evt.name + "[\\s\\S]*?(?=\\*\\*|Registration:|$)", "i"));
      matchedEvents.push({ ...evt, reason: null });
    }
  }

  parts.push({ type: "text", content: cleanText.replace(/Registration:\s*https?:\/\/\S+/g, "").trim() });

  if (matchedEvents.length > 0) {
    parts.push({ type: "events", events: matchedEvents });
  }

  if (hasInterestCapture) {
    parts.push({ type: "interest_capture" });
  }

  return parts;
}

function InterestForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    onSubmit({ email: email.trim(), name: name.trim() });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 16, marginTop: 8 }}>
        <div style={{ fontWeight: 600, color: "#166534", marginBottom: 4 }}>Thank you!</div>
        <div style={{ fontSize: 13, color: "#166534" }}>Your interest has been recorded. Our professional development team will reach out when a relevant program is available.</div>
      </div>
    );
  }

  return (
    <div style={{ background: "#fff", border: `1px solid #e5e7eb`, borderRadius: 8, padding: 16, marginTop: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: SCC_BLACK }}>Share your interest with our team:</div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your.email@company.com" type="email"
        style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 13, marginBottom: 8, boxSizing: "border-box", outline: "none" }}
      />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (optional)"
        style={{ width: "100%", padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 13, marginBottom: 10, boxSizing: "border-box", outline: "none" }}
      />
      <button onClick={handleSubmit}
        style={{ background: SCC_RED, color: "#fff", border: "none", borderRadius: 6, padding: "8px 20px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
        Submit Interest
      </button>
    </div>
  );
}

function MessageBubble({ msg, onInterestSubmit }) {
  if (msg.role === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <div style={{ background: SCC_BLACK, color: "#fff", padding: "10px 16px", borderRadius: "16px 16px 4px 16px", maxWidth: "75%", fontSize: 14, lineHeight: 1.5 }}>
          {msg.content}
        </div>
      </div>
    );
  }

  const parsed = parseResponse(msg.content);

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
      <div style={{ maxWidth: "85%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: SCC_RED, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>SC</div>
          <span style={{ fontSize: 12, color: SCC_GREY, fontWeight: 500 }}>SCC Advisor</span>
        </div>
        {parsed.map((part, i) => {
          if (part.type === "text") {
            return (
              <div key={i} style={{ background: "#fff", padding: "12px 16px", borderRadius: "4px 16px 16px 16px", fontSize: 14, lineHeight: 1.6, color: "#1f2937", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", whiteSpace: "pre-wrap" }}>
                {part.content.split(/\*\*(.*?)\*\*/g).map((seg, j) =>
                  j % 2 === 1 ? <strong key={j}>{seg}</strong> : <span key={j}>{seg}</span>
                )}
              </div>
            );
          }
          if (part.type === "events") {
            return part.events.map((evt, j) => <EventCard key={`evt-${j}`} event={evt} />);
          }
          if (part.type === "interest_capture") {
            return <InterestForm key={i} onSubmit={onInterestSubmit} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

function LoadingBubble() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 12 }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: SCC_RED, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }}>SC</div>
          <span style={{ fontSize: 12, color: SCC_GREY, fontWeight: 500 }}>SCC Advisor</span>
        </div>
        <div style={{ background: "#fff", padding: "14px 20px", borderRadius: "4px 16px 16px 16px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: "50%", background: SCC_RED, opacity: 0.4,
                animation: `pulse 1.2s infinite ${i * 0.2}s`
              }} />
            ))}
            <span style={{ fontSize: 13, color: SCC_GREY, marginLeft: 8 }}>Finding the best programs for you...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsModal({ apiKey, setApiKey, onClose }) {
  const [tempKey, setTempKey] = useState(apiKey);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background: "#fff", borderRadius: 12, padding: 28, width: "90%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <h3 style={{ margin: "0 0 4px", fontSize: 18, color: SCC_BLACK }}>Settings</h3>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: SCC_GREY }}>Enter your Google Gemini API key from aistudio.google.com</p>
        <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>GEMINI API KEY</label>
        <input value={tempKey} onChange={e => setTempKey(e.target.value)} placeholder="AIzaSy..."
          style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, boxSizing: "border-box", outline: "none", fontFamily: "monospace" }}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "flex-end" }}>
          <button onClick={onClose}
            style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid #d1d5db", background: "#fff", cursor: "pointer", fontSize: 13 }}>Cancel</button>
          <button onClick={() => { setApiKey(tempKey); onClose(); }}
            style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: SCC_RED, color: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ interactions, interests, onBack }) {
  const recCounts = {};
  interactions.forEach(ix => {
    (ix.eventsRecommended || []).forEach(name => {
      recCounts[name] = (recCounts[name] || 0) + 1;
    });
  });
  const sorted = Object.entries(recCounts).sort((a, b) => b[1] - a[1]);
  const maxCount = sorted.length > 0 ? sorted[0][1] : 1;

  return (
    <div style={{ minHeight: "100vh", background: BG_LIGHT }}>
      <div style={{ background: SCC_BLACK, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>SCC Advisor — Admin Dashboard</div>
        <button onClick={onBack} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 6, padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>
          Back to Chat
        </button>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
        {/* Summary Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Total Conversations", value: new Set(interactions.map(i => i.sessionId)).size, color: SCC_BLACK },
            { label: "Programs Recommended", value: interactions.reduce((sum, i) => sum + (i.eventsRecommended?.length || 0), 0), color: "#2563eb" },
            { label: "Interests Captured", value: interests.length, color: "#16a34a" },
            { label: "Unmatched Topics", value: interests.length, color: SCC_RED },
          ].map((card, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 10, padding: 18, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 12, color: SCC_GREY, fontWeight: 500, marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: card.color }}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Most Recommended */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, color: SCC_BLACK }}>Most Recommended Programs</h3>
          {sorted.length === 0 ? (
            <p style={{ color: SCC_GREY, fontSize: 13 }}>No recommendations yet. Start chatting to see data here.</p>
          ) : sorted.slice(0, 8).map(([name, count], i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                <span style={{ color: "#374151", fontWeight: 500 }}>{name.length > 50 ? name.substring(0, 50) + "..." : name}</span>
                <span style={{ color: SCC_GREY }}>{count}</span>
              </div>
              <div style={{ height: 6, background: "#f3f4f6", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(count / maxCount) * 100}%`, background: SCC_RED, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Interest Gaps */}
        <div style={{ background: "#fff", borderRadius: 10, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 15, color: SCC_RED }}>Opportunity Areas — Topics Members Want</h3>
          <p style={{ margin: "0 0 14px", fontSize: 12, color: SCC_GREY }}>Programs members asked about that we don't currently offer</p>
          {interests.length === 0 ? (
            <p style={{ color: SCC_GREY, fontSize: 13 }}>No interests captured yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f3f4f6" }}>
                    <th style={{ textAlign: "left", padding: "8px 10px", color: SCC_GREY, fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>Date</th>
                    <th style={{ textAlign: "left", padding: "8px 10px", color: SCC_GREY, fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>Name</th>
                    <th style={{ textAlign: "left", padding: "8px 10px", color: SCC_GREY, fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>Email</th>
                    <th style={{ textAlign: "left", padding: "8px 10px", color: SCC_GREY, fontWeight: 600, fontSize: 11, textTransform: "uppercase" }}>Topic</th>
                  </tr>
                </thead>
                <tbody>
                  {interests.map((int, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                      <td style={{ padding: "8px 10px" }}>{int.date}</td>
                      <td style={{ padding: "8px 10px" }}>{int.name || "—"}</td>
                      <td style={{ padding: "8px 10px", color: "#2563eb" }}>{int.email}</td>
                      <td style={{ padding: "8px 10px", fontWeight: 500 }}>{int.topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SCCAdvisor() {
  const [apiKey, setApiKey] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [interactions, setInteractions] = useState([]);
  const [interests, setInterests] = useState([]);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2));
  const [lastUserTopic, setLastUserTopic] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  const callGemini = useCallback(async (history) => {
    const systemPrompt = BASE_PROMPT + JSON.stringify(EVENTS);
    const contents = history.map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
        })
      }
    );
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates[0].content.parts[0].text;
  }, [apiKey]);

  const send = async () => {
    if (!input.trim() || loading) return;
    if (!apiKey) { setShowSettings(true); return; }

    const userMsg = { role: "user", content: input.trim() };
    setLastUserTopic(input.trim());
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await callGemini(newMessages);
      const assistantMsg = { role: "assistant", content: reply };
      setMessages(prev => [...prev, assistantMsg]);

      // Track which events were recommended
      const recommended = EVENTS.filter(e => reply.includes(e.name)).map(e => e.name);
      setInteractions(prev => [...prev, {
        sessionId,
        userMessage: userMsg.content,
        assistantMessage: reply,
        eventsRecommended: recommended,
        timestamp: new Date().toISOString()
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", content: `I'm sorry, I encountered an error: ${err.message}. Please try again.` }]);
    }
    setLoading(false);
  };

  const handleInterestSubmit = ({ email, name }) => {
    setInterests(prev => [...prev, {
      email, name, topic: lastUserTopic,
      date: new Date().toLocaleDateString()
    }]);
  };

  if (showAdmin) {
    return <AdminDashboard interactions={interactions} interests={interests} onBack={() => setShowAdmin(false)} />;
  }

  const showSetup = !apiKey;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: BG_LIGHT, fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        input:focus, textarea:focus { border-color: ${SCC_RED} !important; }
      `}</style>

      {/* Header */}
      <div style={{ background: SCC_BLACK, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#fff", letterSpacing: -0.3 }}>
            Supply Chain Canada
          </div>
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.2)" }} />
          <div style={{ fontSize: 13, color: SCC_GREY }}>SCC Advisor</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setShowAdmin(true)}
            style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: SCC_GREY, borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 11 }}>
            Admin
          </button>
          <button onClick={() => setShowSettings(true)}
            style={{ background: "transparent", border: "none", color: SCC_GREY, cursor: "pointer", fontSize: 18 }}>
            &#9881;
          </button>
          <span style={{ background: "rgba(255,255,255,0.12)", color: SCC_GREY, fontSize: 10, padding: "3px 8px", borderRadius: 4, fontWeight: 600 }}>BETA</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ background: "#FFF9E6", padding: "8px 20px", fontSize: 11, color: "#92400e", lineHeight: 1.4, borderBottom: "1px solid #fde68a", flexShrink: 0 }}>
        <strong>AI-Powered Tool — Experimental Beta.</strong> SCC Advisor uses AI to help guide your professional development journey. Responses are generated by AI and may not always be accurate. Please verify information independently.
      </div>

      {showSettings && <SettingsModal apiKey={apiKey} setApiKey={setApiKey} onClose={() => setShowSettings(false)} />}

      {/* Chat Area */}
      <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "20px 20px 10px" }}>
        {showSetup ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <div style={{ background: "#fff", borderRadius: 14, padding: 32, maxWidth: 400, width: "90%", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: SCC_RED, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 auto 16px" }}>SC</div>
              <h2 style={{ margin: "0 0 8px", fontSize: 20, color: SCC_BLACK }}>Welcome to SCC Advisor</h2>
              <p style={{ margin: "0 0 20px", fontSize: 13, color: SCC_GREY, lineHeight: 1.5 }}>
                To get started, enter your Google Gemini API key. Get a free key at{" "}
                <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer" style={{ color: SCC_RED }}>aistudio.google.com</a>
              </p>
              <input
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 13, boxSizing: "border-box", outline: "none", fontFamily: "monospace", marginBottom: 12 }}
              />
              <button onClick={() => { if (apiKey.trim()) setShowSettings(false); }}
                style={{ width: "100%", background: SCC_RED, color: "#fff", border: "none", borderRadius: 8, padding: "10px 0", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Start Chatting
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.length === 0 && (
              <div style={{ marginBottom: 16 }}>
                <MessageBubble msg={{
                  role: "assistant",
                  content: "Hi! I'm the SCC Advisor — here to help you find the right professional development opportunity at Supply Chain Canada.\n\nTell me a bit about what you're looking for. For example:\n\n- What skills are you trying to develop?\n- What challenges are you facing in your role?\n- Are you looking to get certified, attend a workshop, or expand your network?\n\nI'll match you with the best upcoming programs we offer."
                }} onInterestSubmit={handleInterestSubmit} />
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12, marginLeft: 36 }}>
                  {["I want to improve my negotiation skills", "How do I get my SCMP designation?", "I'm new to supply chain in Alberta", "What AI/tech workshops do you have?"].map((q, i) => (
                    <button key={i} onClick={() => { setInput(q); }}
                      style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: "7px 14px", fontSize: 12, color: "#374151", cursor: "pointer", whiteSpace: "nowrap" }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} onInterestSubmit={handleInterestSubmit} />
            ))}
            {loading && <LoadingBubble />}
          </>
        )}
      </div>

      {/* Input Bar */}
      {!showSetup && (
        <div style={{ borderTop: "1px solid #e5e7eb", background: "#fff", padding: "12px 20px", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: 10, maxWidth: 800, margin: "0 auto" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Tell me about your professional development goals..."
              style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #d1d5db", fontSize: 14, outline: "none" }}
            />
            <button onClick={send} disabled={loading || !input.trim()}
              style={{ background: !input.trim() ? SCC_GREY : SCC_RED, color: "#fff", border: "none", borderRadius: 10, padding: "0 20px", fontWeight: 700, fontSize: 14, cursor: input.trim() ? "pointer" : "default", transition: "background 0.2s" }}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
