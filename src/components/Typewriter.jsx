import { useState, useEffect, useRef, useCallback } from "react";

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPING = 2200;
const PAUSE_AFTER_DELETING = 500;

const CURSOR = (
  <span
    style={{
      display: "inline-block",
      width: 2,
      height: "1.1em",
      background: "currentColor",
      marginLeft: 2,
      verticalAlign: "text-bottom",
      animation: "typewriter-blink 0.75s steps(1) infinite",
    }}
  />
);

function jitter() {
  return Math.random() * 50;
}

/**
 * Phases for compound phrases (prefix + cycling sub-phrases):
 *   TYPING_PREFIX  → type the prefix text
 *   TYPING_SUB     → type the current sub-phrase after the prefix
 *   DELETING_SUB   → delete only the sub-phrase, keep prefix
 *   DELETING_PREFIX→ all sub-phrases done, delete the prefix and advance
 */
const Phase = {
  TYPING: "TYPING",
  DELETING: "DELETING",
  TYPING_PREFIX: "TYPING_PREFIX",
  TYPING_SUB: "TYPING_SUB",
  DELETING_SUB: "DELETING_SUB",
  DELETING_PREFIX: "DELETING_PREFIX",
};

export default function Typewriter({ phrases, style = {} }) {
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [subIdx, setSubIdx] = useState(0);
  const [phase, setPhase] = useState(Phase.TYPING);
  const timeoutRef = useRef(null);

  const schedule = useCallback((fn, ms) => {
    timeoutRef.current = setTimeout(fn, ms);
  }, []);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const isCompound = typeof current === "object";

    if (!isCompound) {
      // ── Simple string phrase ──
      const text = current;

      if (phase === Phase.TYPING) {
        if (prefix.length < text.length) {
          schedule(() => setPrefix(text.slice(0, prefix.length + 1)), TYPING_SPEED + jitter());
        } else {
          schedule(() => setPhase(Phase.DELETING), PAUSE_AFTER_TYPING);
        }
      } else if (phase === Phase.DELETING) {
        if (prefix.length > 0) {
          schedule(() => setPrefix(text.slice(0, prefix.length - 1)), DELETING_SPEED);
        } else {
          setPhraseIdx((prev) => (prev + 1) % phrases.length);
          setSubIdx(0);
          setPhase(Phase.TYPING);
          schedule(() => {}, PAUSE_AFTER_DELETING);
        }
      }
    } else {
      // ── Compound phrase: { prefix, subPhrases } ──
      const prefixText = current.prefix;
      const subs = current.subPhrases;
      const currentSub = subs[subIdx];

      if (phase === Phase.TYPING || phase === Phase.TYPING_PREFIX) {
        // Type the prefix first
        if (prefix.length < prefixText.length) {
          setPhase(Phase.TYPING_PREFIX);
          schedule(() => setPrefix(prefixText.slice(0, prefix.length + 1)), TYPING_SPEED + jitter());
        } else {
          setPhase(Phase.TYPING_SUB);
        }
      } else if (phase === Phase.TYPING_SUB) {
        if (suffix.length < currentSub.length) {
          schedule(() => setSuffix(currentSub.slice(0, suffix.length + 1)), TYPING_SPEED + jitter());
        } else {
          schedule(() => setPhase(Phase.DELETING_SUB), PAUSE_AFTER_TYPING);
        }
      } else if (phase === Phase.DELETING_SUB) {
        if (suffix.length > 0) {
          schedule(() => setSuffix(currentSub.slice(0, suffix.length - 1)), DELETING_SPEED);
        } else {
          const nextSubIdx = subIdx + 1;
          if (nextSubIdx < subs.length) {
            setSubIdx(nextSubIdx);
            setPhase(Phase.TYPING_SUB);
            schedule(() => {}, PAUSE_AFTER_DELETING);
          } else {
            setPhase(Phase.DELETING_PREFIX);
            schedule(() => {}, PAUSE_AFTER_DELETING);
          }
        }
      } else if (phase === Phase.DELETING_PREFIX) {
        if (prefix.length > 0) {
          schedule(() => setPrefix(prefixText.slice(0, prefix.length - 1)), DELETING_SPEED);
        } else {
          setPhraseIdx((prev) => (prev + 1) % phrases.length);
          setSubIdx(0);
          setPhase(Phase.TYPING);
          schedule(() => {}, PAUSE_AFTER_DELETING);
        }
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [prefix, suffix, phase, phraseIdx, subIdx, phrases, schedule]);

  return (
    <span style={style}>
      {prefix}
      {suffix}
      {CURSOR}
    </span>
  );
}
