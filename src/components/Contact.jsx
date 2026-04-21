import { useState } from "react";
import { Mail, GraduationCap, Globe, Zap, Calendar, BookOpen } from "lucide-react";
import SectionTitle from "./SectionTitle";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "../constants";

// ─────────────────────────────────────────────────────────────
// HOW TO ACTIVATE LIVE BOOKING (John does this once):
//
// 1. Open Google Calendar → gear icon → Settings
// 2. Left sidebar → "Appointment schedules" → Create new
// 3. Set title, availability, duration
// 4. Under "Conferencing" → select Google Meet
// 5. Save → Open booking page → copy the URL from browser
// 6. Paste it below as BOOKING_URL
//
// When a visitor books:
//  ✅ They pick a free slot from your live calendar
//  ✅ Both parties get a confirmation email automatically
//  ✅ The email contains a Google Meet link
// ─────────────────────────────────────────────────────────────
const BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3SY1ttiMRC_OWU7uUPHmn5CLz941JK5_SThCm_OQsY8J2ymJDS1nKe369G2R7L-9p9mxxlObRy";
const BOOKING_SHORT_URL = "https://calendar.app.google/vPXArEiX3sX5NmaL6";

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const CONTACT_ITEMS = [
  {
    Icon: Mail,
    label: "Email",
    value: "johnkorfeh2017@gmail.com",
    href: "mailto:johnkorfeh2017@gmail.com",
  },
  {
    Icon: WhatsAppIcon,
    label: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    accent: "#25D366",
  },
];

const CALL_TYPES = [
  {
    Icon: GraduationCap,
    title: "Research Collaboration",
    desc: "Discuss joint research in thermal engineering, CFD, or energy systems.",
    duration: "45 min",
  },
  {
    Icon: Globe,
    title: "Study Abroad Advising",
    desc: "Guidance on MS/PhD applications, scholarships, and KDARC programs.",
    duration: "30 min",
  },
  {
    Icon: Zap,
    title: "Engineering Consultation",
    desc: "Technical discussion on sustainable energy projects or ANSYS simulation.",
    duration: "60 min",
  },
  {
    Icon: BookOpen,
    title: "Research Statement Review",
    desc: "Feedback on your SOP or personal statement for MS/PhD applications.",
    duration: "30 min",
  },
];

const CTA_TAGS = ["ASME", "IEEE", "ESL"];
const isPlaceholder = BOOKING_URL.includes("REPLACE_WITH");

// ── Contact illustration — person at desk ─────────────────────────────────────
function ContactIllustration() {
  const a = "rgba(var(--accent-rgb),";
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"
         style={{ width: "100%", height: "100%" }} aria-hidden="true">

      {/* Corner brackets */}
      <path d="M10 10 L10 26 M10 10 L26 10"     stroke={`${a}0.25)`} strokeWidth="1.2" strokeLinecap="square"/>
      <path d="M390 10 L390 26 M390 10 L374 10"  stroke={`${a}0.25)`} strokeWidth="1.2" strokeLinecap="square"/>
      <path d="M10 290 L10 274 M10 290 L26 290"  stroke={`${a}0.25)`} strokeWidth="1.2" strokeLinecap="square"/>
      <path d="M390 290 L390 274 M390 290 L374 290" stroke={`${a}0.25)`} strokeWidth="1.2" strokeLinecap="square"/>

      {/* Dot grid */}
      {Array.from({length: 5}).map((_, row) =>
        Array.from({length: 9}).map((_, col) => (
          <circle key={`${row}-${col}`} cx={40 + col*40} cy={30 + row*52} r={1.2} fill={`${a}0.1)`}/>
        ))
      )}

      {/* ── CHAIR BACK ── */}
      <rect x="168" y="148" width="64" height="72" rx="12"
            fill={`${a}0.05)`} stroke={`${a}0.18)`} strokeWidth="1"/>

      {/* ── PERSON ── */}
      {/* Shoulders / torso */}
      <path d="M158 165 C158 148 174 140 200 140 C226 140 242 148 242 165 L242 178 L158 178 Z"
            fill={`${a}0.1)`} stroke={`${a}0.38)`} strokeWidth="1.3"/>
      {/* Neck */}
      <rect x="193" y="128" width="14" height="16" rx="4"
            fill={`${a}0.1)`} stroke={`${a}0.3)`} strokeWidth="1"/>
      {/* Head */}
      <circle cx="200" cy="106" r="26"
              fill={`${a}0.1)`} stroke={`${a}0.45)`} strokeWidth="1.4"/>
      {/* Hair */}
      <path d="M174 102 C174 82 186 70 200 70 C214 70 226 82 226 102"
            fill={`${a}0.18)`} stroke={`${a}0.38)`} strokeWidth="1" strokeLinejoin="round"/>
      {/* Eyes */}
      <circle cx="191" cy="108" r="2.5" fill={`${a}0.55)`}/>
      <circle cx="209" cy="108" r="2.5" fill={`${a}0.55)`}/>
      {/* Smile */}
      <path d="M193 118 Q200 124 207 118" stroke={`${a}0.45)`} strokeWidth="1.3"
            fill="none" strokeLinecap="round"/>

      {/* Left arm on desk */}
      <path d="M163 170 Q148 188 136 220" stroke={`${a}0.3)`} strokeWidth="9"
            strokeLinecap="round" fill="none"/>
      {/* Right arm on desk */}
      <path d="M237 170 Q252 188 264 220" stroke={`${a}0.3)`} strokeWidth="9"
            strokeLinecap="round" fill="none"/>

      {/* ── LAPTOP ── */}
      {/* Screen */}
      <rect x="130" y="138" width="140" height="84" rx="7"
            fill={`${a}0.08)`} stroke={`${a}0.42)`} strokeWidth="1.3"/>
      {/* Screen bezel */}
      <rect x="138" y="146" width="124" height="68" rx="4"
            fill={`${a}0.06)`} stroke={`${a}0.15)`} strokeWidth="0.8"/>
      {/* Screen content lines */}
      <rect x="148" y="158" width="55" height="5" rx="2.5" fill={`${a}0.45)`}/>
      <rect x="148" y="168" width="88" height="4" rx="2"   fill={`${a}0.22)`}/>
      <rect x="148" y="177" width="70" height="4" rx="2"   fill={`${a}0.18)`}/>
      <rect x="148" y="186" width="48" height="4" rx="2"   fill={`${a}0.14)`}/>
      {/* Cursor */}
      <rect x="220" y="158" width="2" height="11" rx="1"   fill={`${a}0.75)`}/>
      {/* Base */}
      <rect x="124" y="222" width="152" height="8" rx="3"
            fill={`${a}0.12)`} stroke={`${a}0.38)`} strokeWidth="1.2"/>
      {/* Hinge dot */}
      <circle cx="200" cy="222" r="3" fill={`${a}0.3)`}/>

      {/* ── DESK ── */}
      <rect x="28" y="230" width="344" height="12" rx="3"
            fill={`${a}0.08)`} stroke={`${a}0.35)`} strokeWidth="1.2"/>
      <rect x="54"  y="242" width="10" height="44" rx="2"
            fill={`${a}0.06)`} stroke={`${a}0.22)`} strokeWidth="1"/>
      <rect x="336" y="242" width="10" height="44" rx="2"
            fill={`${a}0.06)`} stroke={`${a}0.22)`} strokeWidth="1"/>

      {/* ── COFFEE MUG (left of desk) ── */}
      <rect x="58" y="212" width="26" height="18" rx="3"
            fill={`${a}0.1)`} stroke={`${a}0.35)`} strokeWidth="1.1"/>
      <path d="M84 217 Q93 217 93 221 Q93 225 84 225"
            stroke={`${a}0.35)`} strokeWidth="1.1" fill="none"/>
      {/* Steam wisps */}
      <path d="M67 208 Q69 202 67 196" stroke={`${a}0.22)`} strokeWidth="1"
            fill="none" strokeLinecap="round"/>
      <path d="M74 208 Q76 201 74 195" stroke={`${a}0.22)`} strokeWidth="1"
            fill="none" strokeLinecap="round"/>

      {/* ── PLANT (right of desk) ── */}
      <path d="M314 228 L322 230 L306 230 Z"
            fill={`${a}0.22)`} stroke={`${a}0.35)`} strokeWidth="1"/>
      <line x1="314" y1="228" x2="314" y2="205"
            stroke={`${a}0.35)`} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M314 216 Q304 208 300 197 Q311 200 314 216"
            fill={`${a}0.15)`} stroke={`${a}0.28)`} strokeWidth="1"/>
      <path d="M314 210 Q324 202 328 191 Q317 194 314 210"
            fill={`${a}0.15)`} stroke={`${a}0.28)`} strokeWidth="1"/>

      {/* ── FLOATING ENVELOPE (top right) ── */}
      <rect x="302" y="48" width="60" height="44" rx="6"
            fill={`${a}0.08)`} stroke={`${a}0.42)`} strokeWidth="1.3"/>
      <path d="M302 54 L332 76 L362 54"
            stroke={`${a}0.48)`} strokeWidth="1.3" fill="none"
            strokeLinecap="round" strokeLinejoin="round"/>
      {/* Floating dots above envelope */}
      <circle cx="332" cy="34" r="3.5" fill={`${a}0.28)`}/>
      <circle cx="343" cy="26" r="2.5" fill={`${a}0.18)`}/>
      <circle cx="352" cy="19" r="1.8" fill={`${a}0.12)`}/>

      {/* ── CHAT BUBBLE (top left) ── */}
      <rect x="38" y="44" width="76" height="48" rx="11"
            fill={`${a}0.08)`} stroke={`${a}0.38)`} strokeWidth="1.3"/>
      <path d="M62 92 L54 106 L76 92"
            fill={`${a}0.08)`} stroke={`${a}0.38)`} strokeWidth="1.3"
            strokeLinejoin="round"/>
      {/* Lines in bubble */}
      <rect x="50" y="57" width="52" height="4" rx="2" fill={`${a}0.35)`}/>
      <rect x="50" y="66" width="38" height="4" rx="2" fill={`${a}0.22)`}/>
      <rect x="50" y="75" width="45" height="4" rx="2" fill={`${a}0.18)`}/>
    </svg>
  );
}

// TurbineSchematic moved to ./TurbineSchematic.jsx — import it when needed

export default function Contact({ conRef, conVis }) {
  const [frameLoaded, setFrameLoaded] = useState(false);

  return (
    <section
      id="contact"
      ref={conRef}
      className="section-pad"
      style={{ background: "var(--bg-section)" }}
    >
      <style>{`
        @keyframes avail-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px rgba(34,197,94,0.75); }
          50%       { opacity: 0.6; box-shadow: 0 0 14px rgba(34,197,94,0.4); }
        }
        .contact-illustration { display: flex; }
        .contact-calendar-mobile { display: none; }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .contact-illustration { display: none !important; }
          .contact-calendar-embed { display: none !important; }
          .contact-calendar-mobile { display: flex !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="Contact" number={8} />

        <div
          style={{
            opacity: conVis ? 1 : 0,
            transform: conVis ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 48,
            alignItems: "stretch",
          }}
          className="contact-grid"
        >
          {/* ── LEFT: Let's Talk ── */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Sub-heading */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "var(--accent)",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Let's Talk
            </div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 26,
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Open to Collaborations &amp; Opportunities
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: 28,
              }}
            >
              I am actively seeking funded MS/PhD opportunities in Thermal Engineering, Energy
              Systems, and CFD research. If my work aligns with your research, I would welcome the
              chance to connect.
            </p>

            {/* Contact items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
              {CONTACT_ITEMS.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    textDecoration: "none",
                    padding: "16px 20px",
                    background: "var(--bg-card)",
                    border: "1px solid rgba(var(--accent-rgb),0.1)",
                    borderRadius: 8,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.35)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.1)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span
                    style={{
                      color: c.accent || "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <c.Icon size={20} strokeWidth={1.8} />
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "var(--text-dim)",
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {c.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        color: "var(--text-secondary)",
                      }}
                    >
                      {c.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* JK identity card */}
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid rgba(var(--accent-rgb),0.12)",
                borderRadius: 12,
                padding: "28px 24px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: "2px solid var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: "rgba(var(--accent-rgb),0.06)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "var(--accent)",
                  }}
                >
                  JK
                </span>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: 12,
                  }}
                >
                  Open to research collaborations, graduate supervision, and engineering projects
                  focused on sustainable energy.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {CTA_TAGS.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "var(--accent)",
                        border: "1px solid rgba(var(--accent-rgb),0.25)",
                        padding: "3px 10px",
                        borderRadius: 4,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability status card */}
            <div
              style={{
                marginTop: 12,
                background: "var(--bg-card)",
                border: "1px solid rgba(var(--accent-rgb),0.12)",
                borderRadius: 10,
                padding: "14px 18px",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px rgba(34,197,94,0.75)",
                  marginTop: 5,
                  flexShrink: 0,
                  animation: "avail-pulse 2.2s ease-in-out infinite",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 3,
                  }}
                >
                  Open to Opportunities
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: "var(--text-muted)",
                    lineHeight: 1.6,
                  }}
                >
                  Seeking funded MS/PhD · Available for research collaborations
                </div>
              </div>
            </div>

            {/* Engineering schematic illustration */}
            <div
              className="contact-illustration"
              style={{
                marginTop: 12,
                background: "var(--bg-card)",
                border: "1px solid rgba(var(--accent-rgb),0.1)",
                borderRadius: 12,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                minHeight: 160,
                padding: "12px",
              }}
            >
              <ContactIllustration />
            </div>
          </div>

          {/* ── RIGHT: Book a Call ── */}
          <div>
            {/* Sub-heading */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "var(--accent)",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Book a Call
            </div>
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 26,
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Schedule a Google Meet
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              Pick a free slot from my live calendar. Both of us receive a confirmation email
              with a Google Meet link automatically.
            </p>

            {/* Call type cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {CALL_TYPES.map((type, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid rgba(var(--accent-rgb),0.12)",
                    borderRadius: 10,
                    padding: "20px 18px",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.35)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 8px 28px rgba(var(--accent-rgb),0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.12)";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ color: "var(--accent)", marginBottom: 8 }}>
                    <type.Icon size={24} strokeWidth={1.8} />
                  </div>
                  <div
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: 6,
                    }}
                  >
                    {type.title}
                  </div>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      marginBottom: 12,
                    }}
                  >
                    {type.desc}
                  </p>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: "var(--accent)",
                      border: "1px solid rgba(var(--accent-rgb),0.25)",
                      padding: "2px 8px",
                      borderRadius: 4,
                    }}
                  >
                    {type.duration}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar embed / placeholder */}
            {isPlaceholder ? (
              <div
                style={{
                  background: "var(--bg-card)",
                  border: "1.5px dashed rgba(var(--accent-rgb),0.3)",
                  borderRadius: 12,
                  padding: "40px 28px",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "var(--accent)", marginBottom: 12 }}>
                  <Calendar size={36} strokeWidth={1.5} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}
                >
                  Live Booking Coming Soon
                </h4>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    maxWidth: 360,
                    margin: "0 auto 24px",
                  }}
                >
                  Use email or WhatsApp to request a call in the meantime.
                </p>
                <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                  <a
                    href="mailto:johnkorfeh2017@gmail.com"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                      color: "var(--bg)",
                      textDecoration: "none",
                      padding: "11px 24px",
                      borderRadius: 50,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: 0.5,
                    }}
                  >
                    Email to Schedule
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "transparent",
                      color: "#25D366",
                      textDecoration: "none",
                      padding: "11px 24px",
                      borderRadius: 50,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      border: "1.5px solid #25D366",
                      letterSpacing: 0.5,
                    }}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <>
              {/* Mobile CTA — shown only on small screens */}
              <div
                className="contact-calendar-mobile"
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  background: "var(--bg-card)",
                  border: "1px solid rgba(var(--accent-rgb),0.12)",
                  borderRadius: 12,
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "var(--accent)" }}>
                  <Calendar size={36} strokeWidth={1.5} />
                </div>
                <div>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: 8,
                  }}>
                    Book a Google Meet
                  </p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}>
                    Pick a free slot from John's live calendar. You'll both receive a confirmation with a Meet link.
                  </p>
                </div>
                <a
                  href={BOOKING_SHORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    color: "var(--bg)",
                    textDecoration: "none",
                    padding: "13px 28px",
                    borderRadius: 50,
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                  }}
                >
                  <Calendar size={15} strokeWidth={2} />
                  Open Booking Calendar
                </a>
              </div>

              {/* Desktop iframe — hidden on mobile */}
              <div
                className="contact-calendar-embed"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid rgba(var(--accent-rgb),0.12)",
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {/* Header bar */}
                <div
                  style={{
                    padding: "16px 24px",
                    borderBottom: "1px solid rgba(var(--accent-rgb),0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#34a853",
                        boxShadow: "0 0 6px rgba(52,168,83,0.8)",
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "var(--text-dim)",
                        letterSpacing: 1.5,
                        textTransform: "uppercase",
                      }}
                    >
                      Live Calendar · Google Meet included
                    </span>
                  </div>
                  <a
                    href={BOOKING_SHORT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "var(--accent)",
                      textDecoration: "none",
                      opacity: 0.8,
                    }}
                  >
                    Open in new tab ↗
                  </a>
                </div>

                {/* Loading spinner */}
                {!frameLoaded && (
                  <div
                    style={{
                      position: "absolute",
                      inset: "49px 0 0 0",
                      background: "var(--bg-card)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <style>{`
                      @keyframes cal-spin { to { transform: rotate(360deg); } }
                    `}</style>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "2.5px solid rgba(var(--accent-rgb),0.15)",
                        borderTopColor: "var(--accent)",
                        animation: "cal-spin 0.75s linear infinite",
                      }}
                    />
                  </div>
                )}

                <iframe
                  src={BOOKING_URL}
                  title="Book a call with John T. Korfeh"
                  style={{
                    width: "100%",
                    height: 500,
                    border: "none",
                    display: "block",
                    opacity: frameLoaded ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                  onLoad={() => setFrameLoaded(true)}
                />

                {/* Fallback */}
                <div
                  style={{
                    padding: "14px 24px",
                    borderTop: "1px solid rgba(var(--accent-rgb),0.08)",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "var(--text-dim)",
                    }}
                  >
                    Calendar not loading?{" "}
                    <a
                      href="mailto:johnkorfeh2017@gmail.com"
                      style={{ color: "var(--accent)", textDecoration: "none" }}
                    >
                      Email directly
                    </a>
                  </span>
                </div>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
