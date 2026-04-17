import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Check, Send, Loader, ChevronDown } from "lucide-react";

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const PURPOSES = [
  { value: "ms_phd",       label: "MS / PhD Application" },
  { value: "research",     label: "Research Collaboration" },
  { value: "industry",     label: "Industry / Hiring" },
  { value: "media",        label: "Media / Press" },
  { value: "partnership",  label: "Partnership / Sponsorship" },
  { value: "other",        label: "Other" },
];

const STEPS = [
  { n: 1, label: "Identity" },
  { n: 2, label: "Request"  },
  { n: 3, label: "Review"   },
];

const INIT = {
  firstName: "", lastName: "", email: "",
  title: "", organization: "", purpose: "", message: "",
  honeypot: "", // hidden — bots fill this, humans don't
};

// ── Reusable field wrapper ──────────────────────────────────
function Field({ label, error, required, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: "block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color: error ? "#f87171" : "var(--text-dim)",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        marginBottom: 8,
      }}>
        {label}{required && <span style={{ color: "var(--accent)", marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11,
          color: "#f87171",
          marginTop: 5,
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}>
          {error}
        </div>
      )}
    </div>
  );
}

// ── Input / Textarea / Select base style ───────────────────
function inputStyle(hasError) {
  return {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(var(--bg-rgb),0.5)",
    border: `1px solid ${hasError ? "#f87171" : "rgba(var(--accent-rgb),0.2)"}`,
    borderRadius: 6,
    padding: "11px 14px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.25s ease",
  };
}

// ── Custom themed dropdown ──────────────────────────────────
function CustomSelect({ options, value, onChange, placeholder, hasError }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          ...inputStyle(hasError),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          textAlign: "left",
          color: selected ? "var(--text-primary)" : "rgba(var(--text-dim),0.5)",
          borderColor: open
            ? "rgba(var(--accent-rgb),0.6)"
            : hasError
              ? "#f87171"
              : "rgba(var(--accent-rgb),0.2)",
        }}
      >
        <span style={{ opacity: selected ? 1 : 0.45 }}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          style={{
            flexShrink: 0,
            color: "var(--accent)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {/* Dropdown list */}
      {open && (
        <div style={{
          position: "absolute",
          top: "calc(100% + 6px)",
          left: 0,
          right: 0,
          zIndex: 100,
          background: "var(--bg-card)",
          border: "1px solid rgba(var(--accent-rgb),0.25)",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
        }}>
          {options.map((opt, i) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "11px 16px",
                background: value === opt.value ? "rgba(var(--accent-rgb),0.1)" : "transparent",
                border: "none",
                borderBottom: i < options.length - 1 ? "1px solid rgba(var(--accent-rgb),0.07)" : "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: value === opt.value ? "var(--accent)" : "var(--text-secondary)",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={e => { if (value !== opt.value) e.currentTarget.style.background = "rgba(var(--accent-rgb),0.06)"; }}
              onMouseLeave={e => { if (value !== opt.value) e.currentTarget.style.background = "transparent"; }}
            >
              {opt.label}
              {value === opt.value && <Check size={13} strokeWidth={2.5} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Step progress indicator ─────────────────────────────────
function StepProgress({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 36 }}>
      {STEPS.map((s, i) => (
        <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
          {/* Step circle */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: s.n < current
                ? "var(--accent)"
                : s.n === current
                  ? "rgba(var(--accent-rgb),0.15)"
                  : "transparent",
              border: s.n <= current
                ? "1.5px solid var(--accent)"
                : "1.5px solid rgba(var(--accent-rgb),0.2)",
              transition: "all 0.3s ease",
            }}>
              {s.n < current ? (
                <Check size={14} strokeWidth={2.5} color="var(--bg)" />
              ) : (
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: s.n === current ? "var(--accent)" : "rgba(var(--accent-rgb),0.35)",
                }}>
                  {s.n}
                </span>
              )}
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: s.n === current ? "var(--accent)" : "rgba(var(--accent-rgb),0.3)",
              transition: "color 0.3s ease",
            }}>
              {s.label}
            </span>
          </div>

          {/* Connector line */}
          {i < STEPS.length - 1 && (
            <div style={{
              width: 60,
              height: 1,
              marginBottom: 22,
              background: s.n < current
                ? "var(--accent)"
                : "rgba(var(--accent-rgb),0.15)",
              transition: "background 0.3s ease",
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main component ──────────────────────────────────────────
export default function CVRequestModal({ onClose }) {
  const [step,      setStep]      = useState(1);
  const [form,      setForm]      = useState(INIT);
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [sendError, setSendError] = useState(false);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handle = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  const update = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: "" }));
  };

  // Per-step validation
  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.firstName.trim())    e.firstName    = "First name is required";
      if (!form.lastName.trim())     e.lastName     = "Last name is required";
      if (!form.email.trim())        e.email        = "Email address is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                     e.email        = "Enter a valid email address";
      if (!form.title.trim())        e.title        = "Job title / role is required";
      if (!form.organization.trim()) e.organization = "Organization is required";
    }
    if (s === 2) {
      if (!form.purpose)             e.purpose = "Please select a purpose";
      if (!form.message.trim())      e.message = "A message is required";
      else if (form.message.trim().length < 50)
                                     e.message = `Please write at least 50 characters (${form.message.trim().length}/50)`;
    }
    return e;
  };

  const handleNext = () => {
    const errs = validate(step);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleBack = () => {
    setErrors({});
    setStep(s => s - 1);
  };

  const handleSubmit = async () => {
    if (form.honeypot) return; // bot trap

    setSending(true);
    setSendError(false);

    const purposeLabel = PURPOSES.find(p => p.value === form.purpose)?.label || form.purpose;

    try {
      const { default: emailjs } = await import("@emailjs/browser");
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    `${form.firstName} ${form.lastName}`,
          from_email:   form.email,
          title:        form.title,
          organization: form.organization,
          purpose:      purposeLabel,
          message:      form.message,
          reply_to:     form.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch {
      setSendError(true);
    } finally {
      setSending(false);
    }
  };

  const purposeLabel = PURPOSES.find(p => p.value === form.purpose)?.label || "—";

  // ── Overlay ───────────────────────────────────────────────
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px",
      }}
    >
      <style>{`
        .cv-input:focus { border-color: rgba(var(--accent-rgb),0.6) !important; }
        .cv-select:focus { border-color: rgba(var(--accent-rgb),0.6) !important; }
        .cv-input::placeholder { color: rgba(var(--text-dim)); opacity: 0.5; }
        .cv-textarea::placeholder { color: rgba(var(--text-dim)); opacity: 0.5; }
        .cv-select option { background: var(--bg); color: var(--text-primary); }
      `}</style>

      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "var(--bg-card)",
          border: "1px solid rgba(var(--accent-rgb),0.18)",
          borderRadius: 16,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          borderRadius: "16px 16px 0 0",
        }} />

        <div style={{ padding: "36px 36px 32px" }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: "var(--accent)",
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 6,
              }}>
                CV Request
              </div>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.2,
                margin: 0,
              }}>
                {submitted ? "Request Received" : "Request John's CV"}
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                border: "1px solid rgba(var(--accent-rgb),0.2)",
                background: "transparent",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.2)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>

          {/* ── SUCCESS STATE ── */}
          {submitted ? (
            <div style={{ textAlign: "center", padding: "20px 0 8px" }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(var(--accent-rgb),0.1)",
                border: "1.5px solid var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}>
                <Check size={28} strokeWidth={2} color="var(--accent)" />
              </div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                marginBottom: 8,
              }}>
                John will review your request and send a tailored CV within <strong style={{ color: "var(--text-primary)" }}>48 hours</strong>.
              </p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: 28,
              }}>
                You'll hear from him at{" "}
                <span style={{ color: "var(--accent)", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
                  {form.email}
                </span>
              </p>
              <button
                onClick={onClose}
                style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  color: "var(--bg)",
                  border: "none",
                  padding: "12px 32px",
                  borderRadius: 50,
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: 0.5,
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Step progress */}
              <StepProgress current={step} />

              {/* ── STEP 1: Identity ── */}
              {step === 1 && (
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}>
                    Tell John who you are. This helps him understand your background before responding.
                  </p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                    <Field label="First Name" error={errors.firstName} required>
                      <input
                        className="cv-input"
                        value={form.firstName}
                        onChange={e => update("firstName", e.target.value)}
                        placeholder="e.g. Sarah"
                        style={inputStyle(errors.firstName)}
                      />
                    </Field>
                    <Field label="Last Name" error={errors.lastName} required>
                      <input
                        className="cv-input"
                        value={form.lastName}
                        onChange={e => update("lastName", e.target.value)}
                        placeholder="e.g. Johnson"
                        style={inputStyle(errors.lastName)}
                      />
                    </Field>
                  </div>

                  <Field label="Email Address" error={errors.email} required>
                    <input
                      className="cv-input"
                      type="email"
                      value={form.email}
                      onChange={e => update("email", e.target.value)}
                      placeholder="you@institution.edu"
                      style={inputStyle(errors.email)}
                    />
                  </Field>

                  <Field label="Job Title / Role" error={errors.title} required>
                    <input
                      className="cv-input"
                      value={form.title}
                      onChange={e => update("title", e.target.value)}
                      placeholder="e.g. Associate Professor, PhD Candidate, Hiring Manager"
                      style={inputStyle(errors.title)}
                    />
                  </Field>

                  <Field label="Organization / Institution" error={errors.organization} required>
                    <input
                      className="cv-input"
                      value={form.organization}
                      onChange={e => update("organization", e.target.value)}
                      placeholder="e.g. MIT Energy Initiative, Siemens Energy"
                      style={inputStyle(errors.organization)}
                    />
                  </Field>
                </div>
              )}

              {/* ── STEP 2: Request ── */}
              {step === 2 && (
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}>
                    Describe why you're requesting John's CV. The more context you provide, the better he can tailor his response.
                  </p>

                  <Field label="Purpose of Request" error={errors.purpose} required>
                    <CustomSelect
                      options={PURPOSES}
                      value={form.purpose}
                      onChange={val => update("purpose", val)}
                      placeholder="Select the nature of your request…"
                      hasError={!!errors.purpose}
                    />
                  </Field>

                  <Field
                    label={`Message (${form.message.trim().length}/50 min)`}
                    error={errors.message}
                    required
                  >
                    <textarea
                      className="cv-textarea cv-input"
                      value={form.message}
                      onChange={e => update("message", e.target.value)}
                      rows={5}
                      placeholder="Briefly describe your research group, the opportunity, or why you'd like to connect with John. What specifically caught your attention about his work?"
                      style={{ ...inputStyle(errors.message), resize: "vertical", lineHeight: 1.7 }}
                    />
                  </Field>

                  {/* Honeypot — hidden from humans, bots fill it */}
                  <input
                    type="text"
                    value={form.honeypot}
                    onChange={e => update("honeypot", e.target.value)}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
              )}

              {/* ── STEP 3: Review ── */}
              {step === 3 && (
                <div>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: 24,
                  }}>
                    Review your request before submitting. John will receive these details and reply with a tailored CV.
                  </p>

                  {/* Summary card */}
                  <div style={{
                    background: "rgba(var(--bg-rgb),0.5)",
                    border: "1px solid rgba(var(--accent-rgb),0.12)",
                    borderRadius: 10,
                    overflow: "hidden",
                    marginBottom: 24,
                  }}>
                    {[
                      { label: "Name",         value: `${form.firstName} ${form.lastName}` },
                      { label: "Email",        value: form.email },
                      { label: "Title",        value: form.title },
                      { label: "Organization", value: form.organization },
                      { label: "Purpose",      value: purposeLabel },
                    ].map((row, i) => (
                      <div key={i} style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        padding: "12px 18px",
                        borderBottom: i < 4 ? "1px solid rgba(var(--accent-rgb),0.07)" : "none",
                      }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: "var(--text-dim)",
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          paddingTop: 1,
                        }}>
                          {row.label}
                        </span>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 13,
                          color: "var(--text-secondary)",
                        }}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                    {/* Message — full width */}
                    <div style={{ padding: "12px 18px", borderTop: "1px solid rgba(var(--accent-rgb),0.07)" }}>
                      <div style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 10,
                        color: "var(--text-dim)",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}>
                        Message
                      </div>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "var(--text-secondary)",
                        lineHeight: 1.7,
                        margin: 0,
                      }}>
                        {form.message}
                      </p>
                    </div>
                  </div>

                  {/* Error fallback */}
                  {sendError && (
                    <div style={{
                      background: "rgba(248,113,113,0.08)",
                      border: "1px solid rgba(248,113,113,0.3)",
                      borderRadius: 8,
                      padding: "12px 16px",
                      marginBottom: 16,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: "#f87171",
                      lineHeight: 1.6,
                    }}>
                      Something went wrong sending your request. Please email John directly at{" "}
                      <a href="mailto:johnkorfeh2017@gmail.com" style={{ color: "#f87171" }}>
                        johnkorfeh2017@gmail.com
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* ── Navigation buttons ── */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 8,
                paddingTop: 20,
                borderTop: "1px solid rgba(var(--accent-rgb),0.08)",
              }}>
                {/* Back */}
                <button
                  onClick={step === 1 ? onClose : handleBack}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "transparent",
                    border: "1px solid rgba(var(--accent-rgb),0.2)",
                    borderRadius: 50,
                    padding: "10px 20px",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.4)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.2)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                >
                  <ChevronLeft size={14} strokeWidth={2} />
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                {/* Next / Submit */}
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                      color: "var(--bg)",
                      border: "none",
                      padding: "10px 24px",
                      borderRadius: 50,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: 0.4,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(var(--accent-rgb),0.35)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    Continue
                    <ChevronRight size={14} strokeWidth={2} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={sending}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: sending ? "rgba(var(--accent-rgb),0.5)" : "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                      color: "var(--bg)",
                      border: "none",
                      padding: "10px 24px",
                      borderRadius: 50,
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: sending ? "default" : "pointer",
                      letterSpacing: 0.4,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => { if (!sending) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(var(--accent-rgb),0.35)"; }}}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {sending ? (
                      <>
                        <Loader size={14} strokeWidth={2} style={{ animation: "spin 1s linear infinite" }} />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={14} strokeWidth={2} />
                        Submit Request
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
