import { useState } from "react";
import { Image } from "lucide-react";
import SectionTitle from "./SectionTitle";
import SlideshowModal from "./SlideshowModal";
import { GALLERY_ITEMS, CATEGORIES } from "../data/galleryData";


export default function Gallery({ galRef, galVis }) {
  const [filter,   setFilter]   = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((g) => g.category === filter);

  return (
    <section
      id="gallery"
      ref={galRef}
      className="section-pad"
      style={{ background: "rgba(var(--bg-rgb),0.5)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionTitle label="Gallery" number={7} />

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 36,
            flexWrap: "wrap",
            opacity: galVis ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-label={`Filter by ${cat}`}
              aria-pressed={filter === cat}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "7px 16px",
                borderRadius: 20,
                border: `1px solid ${filter === cat ? "var(--accent)" : "rgba(var(--accent-rgb),0.2)"}`,
                background: filter === cat ? "rgba(var(--accent-rgb),0.12)" : "transparent",
                color: filter === cat ? "var(--accent)" : "var(--text-dim)",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {filtered.map((item, i) => (
            <div
              key={item.label}
              onClick={() => item.src && setLightbox(item)}
              style={{
                borderRadius: 10,
                overflow: "hidden",
                border: "1px solid rgba(var(--accent-rgb),0.1)",
                cursor: item.src ? "pointer" : "default",
                opacity: galVis ? 1 : 0,
                transform: galVis ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                position: "relative",
                background: "rgba(var(--bg-rgb),0.9)",
              }}
              onMouseEnter={(e) => {
                if (!item.src) return;
                e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(var(--accent-rgb),0.1)";
              }}
              onMouseLeave={(e) => {
                if (!item.src) return;
                e.currentTarget.style.borderColor = "rgba(var(--accent-rgb),0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Image / placeholder */}
              <div
                style={{
                  height: 200,
                  background: "linear-gradient(135deg, rgba(var(--bg-rgb),0.9), rgba(var(--bg-rgb),0.95))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <>
                    <span style={{ filter: "grayscale(0.3)", opacity: 0.6 }}>{item.placeholder}</span>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(var(--accent-rgb),0.03), transparent)" }} />
                    <div style={{ position: "absolute", bottom: 8, right: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: "rgba(var(--accent-rgb),0.3)", letterSpacing: 1 }}>
                      ADD PHOTO
                    </div>
                  </>
                )}

                {/* Category tag */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    background: "rgba(var(--bg-rgb),0.85)",
                    border: "1px solid rgba(var(--accent-rgb),0.25)",
                    padding: "3px 8px",
                    borderRadius: 4,
                  }}
                >
                  {item.category}
                </div>

                {/* Multi-photo badge */}
                {item.images && item.images.length > 1 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: "var(--accent)",
                      background: "rgba(var(--bg-rgb),0.85)",
                      border: "1px solid rgba(var(--accent-rgb),0.25)",
                      padding: "3px 8px",
                      borderRadius: 4,
                    }}
                  >
                    <Image size={9} strokeWidth={2.5} />
                    {item.images.length}
                  </div>
                )}
              </div>

              <div style={{ padding: "16px 18px 18px" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6 }}>
                  {item.caption}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slideshow modal */}
      {lightbox && (
        <SlideshowModal item={lightbox} onClose={() => setLightbox(null)} />
      )}
    </section>
  );
}
