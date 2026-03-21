import { useState, useEffect } from "react";
import { SECTIONS } from "./constants";
import { useReveal } from "./hooks/useReveal";
import { ThemeProvider } from "./context/ThemeContext";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Research from "./components/Research";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import FloatingCTA from "./components/FloatingCTA";
import BackToTop from "./components/BackToTop";
import ThemePalette from "./components/ThemePalette";
import Cursor from "./components/Cursor";
import Toast from "./components/Toast";

function PortfolioInner() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "" });

  const [aboutRef, aboutVis] = useReveal();
  const [resRef, resVis] = useReveal();
  const [skillRef, skillVis] = useReveal();
  const [expRef, expVis] = useReveal();
  const [achRef, achVis] = useReveal();
  const [tesRef, tesVis] = useReveal();
  const [galRef, galVis] = useReveal();
  const [conRef, conVis] = useReveal();

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => setHeroVisible(true), 200);
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = SECTIONS.map((id) => document.getElementById(id));
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].getBoundingClientRect().top < 300) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, [loading]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const showToast = (message) => {
    setToast({ visible: true, message });
  };

  const hideToast = () => setToast((t) => ({ ...t, visible: false }));

  return (
    <div
      style={{
        background: "var(--bg)",
        color: "var(--text-primary)",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Cursor />
      <ScrollProgress />
      <Nav activeSection={activeSection} scrolled={scrolled} scrollTo={scrollTo} />
      <Hero heroVisible={heroVisible} scrollTo={scrollTo} onCvDownload={() => showToast("CV download started!")} />
      <About aboutRef={aboutRef} aboutVis={aboutVis} />
      <Research resRef={resRef} resVis={resVis} />
      <Skills skillRef={skillRef} skillVis={skillVis} />
      <Experience expRef={expRef} expVis={expVis} />
      <Achievements achRef={achRef} achVis={achVis} />
      <Testimonials tesRef={tesRef} tesVis={tesVis} />
      <Gallery galRef={galRef} galVis={galVis} />
      <Contact conRef={conRef} conVis={conVis} />
      <Footer />
      <FloatingCTA scrollTo={scrollTo} />
      <ThemePalette />
      <BackToTop />
      <Toast message={toast.message} visible={toast.visible} onHide={hideToast} />
    </div>
  );
}

export default function Portfolio() {
  return (
    <ThemeProvider>
      <PortfolioInner />
    </ThemeProvider>
  );
}
