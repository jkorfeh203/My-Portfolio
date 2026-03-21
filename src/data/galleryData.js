// ── Conference: FMFP ─────────────────────────────────────────────────────────
import fmfp1 from "../assets/conferences/fmfp/fmfp-1.jpeg";
import fmfp2 from "../assets/conferences/fmfp/fmfp-2.jpeg";
import fmfp3 from "../assets/conferences/fmfp/fmfp-3.jpeg";

// ── Conference: TFGET ────────────────────────────────────────────────────────
import tfget1  from "../assets/conferences/tfget/tfget-1.jpeg";
import tfget2  from "../assets/conferences/tfget/tfget-2.jpeg";
import tfget3  from "../assets/conferences/tfget/tfget-3.jpeg";
import tfget4  from "../assets/conferences/tfget/tfget-4.jpeg";
import tfget5  from "../assets/conferences/tfget/tfget-5.jpeg";
import tfget6  from "../assets/conferences/tfget/tfget-6.jpeg";
import tfget7  from "../assets/conferences/tfget/tfget-7.jpeg";
import tfget8  from "../assets/conferences/tfget/tfget-8.jpeg";
import tfget9  from "../assets/conferences/tfget/tfget-9.jpeg";
import tfget10 from "../assets/conferences/tfget/tfget-10.jpeg";
import tfget11 from "../assets/conferences/tfget/tfget-11.jpeg";
import tfget12 from "../assets/conferences/tfget/tfget-12.jpeg";
import tfget13 from "../assets/conferences/tfget/tfget-13.jpeg";
import tfget14 from "../assets/conferences/tfget/tfget-14.jpeg";
import tfget15 from "../assets/conferences/tfget/tfget-15.mp4";
import tfget16 from "../assets/conferences/tfget/tfget-16.jpeg";

// ── Lab: Prototypes ──────────────────────────────────────────────────────────
import pr1 from "../assets/lab/prototypes/pr-1.jpeg";
import pr2 from "../assets/lab/prototypes/pr-2.jpeg";
import pr3 from "../assets/lab/prototypes/pr-3.jpeg";
import pr4 from "../assets/lab/prototypes/pr-4.jpeg";
import pr5 from "../assets/lab/prototypes/pr-5.jpeg";
import pr6 from "../assets/lab/prototypes/pr-6.jpeg";

// ── Lab: CFD ─────────────────────────────────────────────────────────────────
import cfd1 from "../assets/lab/cfd/cfd-1.mp4";
import cfd2 from "../assets/lab/cfd/cfd-2.jpeg";
import cfd3 from "../assets/lab/cfd/cfd-3.jpeg";
import cfd4 from "../assets/lab/cfd/cfd-4.jpeg";
import cfd5 from "../assets/lab/cfd/cfd-5.jpeg";
import cfd6 from "../assets/lab/cfd/cfd-6.jpeg";
import cfd7 from "../assets/lab/cfd/cfd-7.jpeg";
import cfd8 from "../assets/lab/cfd/cfd-8.jpeg";
import cfd9 from "../assets/lab/cfd/cfd-9.jpeg";

// ── Community: Y-LEAD ────────────────────────────────────────────────────────
import ylead1  from "../assets/community/y-lead/ylead-1.jpeg";
import ylead2  from "../assets/community/y-lead/ylead-2.jpeg";
import ylead3  from "../assets/community/y-lead/ylead-3.jpeg";
import ylead4  from "../assets/community/y-lead/ylead-4.jpeg";
import ylead5  from "../assets/community/y-lead/ylead-5.jpeg";
import ylead6  from "../assets/community/y-lead/ylead-6.jpeg";
import ylead7  from "../assets/community/y-lead/ylead-7.jpeg";
import ylead8  from "../assets/community/y-lead/ylead-8.jpeg";
import ylead9  from "../assets/community/y-lead/ylead-9.jpeg";
import ylead10 from "../assets/community/y-lead/ylead-10.jpeg";
import ylead11 from "../assets/community/y-lead/ylead-11.jpeg";

// ── Community: KDARC ─────────────────────────────────────────────────────────
import kdarc1  from "../assets/community/kdarc/kdarc-1.jpeg";
import kdarc2  from "../assets/community/kdarc/kdarc-2.jpeg";
import kdarc3  from "../assets/community/kdarc/kdarc-3.jpeg";
import kdarc4  from "../assets/community/kdarc/kdarc-4.jpeg";
import kdarc5  from "../assets/community/kdarc/kdarc-5.jpeg";
import kdarc6  from "../assets/community/kdarc/kdarc-6.jpeg";
import kdarc7  from "../assets/community/kdarc/kdarc-7.jpeg";
import kdarc8  from "../assets/community/kdarc/kdarc-8.jpeg";
import kdarc9  from "../assets/community/kdarc/kdarc-9.jpeg";
import kdarc10 from "../assets/community/kdarc/kdarc-10.jpeg";
import kdarc11 from "../assets/community/kdarc/kdarc-11.jpeg";
import kdarc12 from "../assets/community/kdarc/kdarc-12.jpeg";
import kdarc13 from "../assets/community/kdarc/kdarc-13.jpeg";

// ── Gallery items ─────────────────────────────────────────────────────────────
export const GALLERY_ITEMS = [
  {
    label: "FMFP Conference 2025",
    caption: "Presenting hybrid geothermal solar chimney research to 100+ engineers and researchers.",
    category: "Conference",
    src: fmfp1,
    images: [fmfp1, fmfp2, fmfp3],
    placeholder: "🎤",
  },
  {
    label: "TFGET Conference 2026",
    caption: "CFD quadcopter aerodynamics paper presentation.",
    category: "Conference",
    src: tfget1,
    images: [tfget1, tfget2, tfget3, tfget4, tfget5, tfget6, tfget7, tfget8, tfget9, tfget10, tfget11, tfget12, tfget13, tfget14, tfget15, tfget16],
    placeholder: "✈️",
  },
  {
    label: "Prototype Fabrication",
    caption: "Geothermal-assisted hybrid solar chimney prototype build — lab work.",
    category: "Lab",
    src: pr1,
    images: [pr1, pr2, pr3, pr4, pr5, pr6],
    placeholder: "⚙️",
  },
  {
    label: "CFD Simulation",
    caption: "ANSYS Fluent mesh and flow visualization for chimney prototype validation.",
    category: "Lab",
    src: cfd2,
    images: [cfd2, cfd1, cfd3, cfd4, cfd5, cfd6, cfd7, cfd8, cfd9],
    placeholder: "💻",
  },
  {
    label: "Y-LEAD Liberia",
    caption: "Community mentorship and youth leadership development sessions.",
    category: "Community",
    src: ylead1,
    images: [ylead1, ylead2, ylead3, ylead4, ylead5, ylead6, ylead7, ylead8, ylead9, ylead10, ylead11],
    placeholder: "🌍",
  },
  {
    label: "KDARC Study Abroad",
    caption: "Facilitating international academic and research exchange programs.",
    category: "Community",
    src: kdarc1,
    images: [kdarc1, kdarc2, kdarc3, kdarc4, kdarc5, kdarc6, kdarc7, kdarc8, kdarc9, kdarc10, kdarc11, kdarc12, kdarc13],
    placeholder: "🎓",
  },
];

export const CATEGORIES = ["All", "Conference", "Lab", "Community"];
