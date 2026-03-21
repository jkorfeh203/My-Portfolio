import { useState, useEffect, useRef } from "react";

/**
 * Intersection observer hook: sets visible to true when the observed element enters view.
 * @returns {[React.RefObject, boolean]} [ref, visible]
 */
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}
