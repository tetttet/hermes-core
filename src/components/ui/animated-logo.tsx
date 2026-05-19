/* ─── Logo letter animation ─────────────────────────────────────── */
const TRAILING_LETTERS = ["e", "r", "m", "e", "s", "/", "A", "I"];

export function AnimatedLogo({ progress }: { progress: number }) {
  /* progress: 0 = full "Hermes/AI", 1 = compact "H/" */
  return (
    <span className="relative inline-flex items-center h-10 overflow-hidden select-none">
      <span style={{ letterSpacing: "0.04em" }}>H</span>

      <span className="relative inline-flex items-center">
        {/* FULL: ermes/AI — letters disappear one by one from the right */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center"
          style={{
            opacity: 1 - progress,
            pointerEvents: "none",
          }}
        >
          {TRAILING_LETTERS.map((letter, i) => {
            const collapseStart = i / TRAILING_LETTERS.length;
            const collapseEnd = collapseStart + 0.15;
            const lp = Math.min(
              1,
              Math.max(
                0,
                (progress - collapseStart) /
                  (collapseEnd - collapseStart + 0.001),
              ),
            );
            const easedLp = 1 - Math.pow(1 - lp, 3);
            const isSlash = letter === "/";

            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: 1 - easedLp,
                  transform: `translateY(${easedLp * -6}px) scaleY(${1 - easedLp * 0.4})`,
                  filter: `blur(${easedLp * 2}px)`,
                  transition: "none",
                  color: isSlash ? "#020e31" : "inherit",
                  letterSpacing: "0.02em",
                }}
              >
                {letter}
              </span>
            );
          })}
        </span>

        {/* COMPACT: slash fades in next to the persistent H */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center"
          style={{
            opacity: progress,
            pointerEvents: "none",
            transform: `translateY(${(1 - progress) * 4}px)`,
            filter: `blur(${(1 - progress) * 1.5}px)`,
          }}
        >
          <span style={{ color: "#020e31", letterSpacing: "0.02em" }}>/</span>
        </span>

        {/* invisible size anchor — always rendered to keep width stable */}
        <span className="invisible" style={{ letterSpacing: "0.02em" }}>
          {TRAILING_LETTERS.join("")}
        </span>
      </span>
    </span>
  );
}
