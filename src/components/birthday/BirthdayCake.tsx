import { useState } from "react";

const CANDLE_COUNT = 4;
const CANDLE_COLORS = ["#e05c78", "#d4a843", "#c17bd4", "#6ee7b7"];
const FLAME_COLORS  = ["#ff9d00", "#ffcc44", "#ff6a00", "#ffaa22"];

export default function BirthdayCake() {
  const [blown, setBlown] = useState<boolean[]>(Array(CANDLE_COUNT).fill(false));
  const [puffing, setPuffing] = useState<boolean[]>(Array(CANDLE_COUNT).fill(false));
  const [wishVisible, setWishVisible] = useState(false);
  const [windBlowing, setWindBlowing] = useState(false);

  const allOut = blown.every(Boolean);

  const blowOne = (i: number) => {
    if (blown[i]) return;
    setPuffing((p) => { const n = [...p]; n[i] = true; return n; });
    setTimeout(() => {
      setBlown((b) => { const n = [...b]; n[i] = true; return n; });
      setPuffing((p) => { const n = [...p]; n[i] = false; return n; });
    }, 400);
  };

  const blowAll = () => {
    setWindBlowing(true);
    CANDLE_COUNT > 0 && blown.forEach((_, i) => {
      setTimeout(() => blowOne(i), i * 140);
    });
    setTimeout(() => {
      setWindBlowing(false);
      setWishVisible(true);
    }, CANDLE_COUNT * 140 + 600);
  };

  const relight = () => {
    setBlown(Array(CANDLE_COUNT).fill(false));
    setWishVisible(false);
  };

  // Candle x positions spread across cake top
  const candleX = (i: number) => 120 + i * 44;

  return (
    <section
      id="cake"
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf8f8 0%, #fce4e8 100%)" }}
    >
      {/* Section header */}
      <div className="text-center mb-12">
        <p
          className="font-sans text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: "#e05c78" }}
        >
          Make a wish
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: "#2d1a1a" }}>
          A cake just for you
        </h2>
        <p className="font-sans mt-3 text-base" style={{ color: "#8a5a60" }}>
          Blow out the candles… I’m wishing with you from here 🤍
          <br /> Tap the candles to blow them out one by one!
        </p>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* SVG Cake */}
        <div className="relative">
          <svg
            width="380"
            height="340"
            viewBox="0 0 380 340"
            className="drop-shadow-xl"
            role="img"
            aria-label="Three-tier birthday cake with candles"
          >
            {/* ── Tier 3 (bottom) ── */}
            <rect x="30"  y="240" width="320" height="80" rx="12" fill="#f9d0da" />
            <rect x="30"  y="240" width="320" height="20" rx="6"  fill="#f4a0b0" />
            {/* Frosting drip bottom */}
            {[60, 110, 160, 210, 260,310].map((x, i) => (
              <ellipse key={i} cx={x} cy={247} rx="14" ry="9" fill="white" opacity="0.7" />
            ))}
            {/* Decoration dots */}
            {[60, 110, 160, 210, 260,310].map((x, i) => (
              <circle key={i} cx={x} cy={278} r="5" fill={CANDLE_COLORS[i % CANDLE_COLORS.length]} opacity="0.7" />
            ))}
            <text x="190" y="300" textAnchor="middle" fontFamily="Playfair Display, serif" fontSize="15" fill="#e05c78" opacity="0.9">
              Happy Birthday
            </text>

            {/* ── Tier 2 (middle) ── */}
            <rect x="70"  y="170" width="240" height="72" rx="10" fill="#fce4e8" />
            <rect x="70"  y="170" width="240" height="18" rx="5"  fill="#f9c0cc" />
            {[95, 140, 190, 235, 280].map((x, i) => (
              <ellipse key={i} cx={x} cy={176} rx="13" ry="8" fill="white" opacity="0.7" />
            ))}
            {[95, 135, 175, 215, 255, 295].map((x, i) => (
              <circle key={i} cx={x} cy={208} r="4" fill={CANDLE_COLORS[(i + 2) % CANDLE_COLORS.length]} opacity="0.75" />
            ))}

            {/* ── Tier 1 (top) ── */}
            <rect x="110" y="105" width="160" height="67" rx="8" fill="#f9eaec" />
            <rect x="110" y="105" width="160" height="16" rx="4" fill="#f4c0c8" />
            {[128, 170, 210, 250].map((x, i) => (
              <ellipse key={i} cx={x} cy={111} rx="11" ry="7" fill="white" opacity="0.7" />
            ))}
            {[128, 168, 208, 248].map((x, i) => (
              <circle key={i} cx={x} cy={142} r="3" fill={CANDLE_COLORS[(i + 1) % CANDLE_COLORS.length]} opacity="0.8" />
            ))}

            {/* ── Candles ── */}
            {Array.from({ length: CANDLE_COUNT }, (_, i) => {
              const cx = candleX(i);
              const isBlown = blown[i];
              const isPuffing = puffing[i];
              return (
                <g
                  key={i}
                  style={{ cursor: isBlown ? "default" : "pointer" }}
                  onClick={() => blowOne(i)}
                  role="button"
                  aria-label={isBlown ? `Candle ${i + 1} blown out` : `Blow out candle ${i + 1}`}
                  aria-pressed={isBlown}
                >
                  {/* Candle body */}
                  <rect
                    x={cx - 7}
                    y={70}
                    width={14}
                    height={36}
                    rx={4}
                    fill={CANDLE_COLORS[i]}
                    opacity={isBlown ? 0.5 : 1}
                  />
                  {/* Wick */}
                  <line
                    x1={cx} y1={70} x2={cx} y2={62}
                    stroke="#4a3020"
                    strokeWidth="1.5"
                  />
                  {/* Flame */}
                  {!isBlown && (
                    <g style={{ transformOrigin: `${cx}px 62px` }} className="animate-flame">
                      <ellipse cx={cx} cy={52} rx="6" ry="10" fill={FLAME_COLORS[i]} opacity="0.95" />
                      <ellipse cx={cx} cy={54} rx="3.5" ry="6" fill="#fff9c0" opacity="0.85" />
                      <ellipse cx={cx} cy={58} rx="2" ry="3" fill="white" opacity="0.6" />
                    </g>
                  )}
                  {/* Blown-out smoke puff */}
                  {isPuffing && (
                    <circle
                      cx={cx}
                      cy={54}
                      r="6"
                      fill="#d0c0c0"
                      opacity="0.5"
                      style={{ animation: "blow-puff 0.4s ease-out forwards" }}
                    />
                  )}
                  {/* Blown indicator */}
                  {isBlown && (
                    <text x={cx} y={50} textAnchor="middle" fontSize="10" opacity="0.5">
                      ~
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Wind animation indicator */}
        {windBlowing && (
          <p
            className="font-serif italic text-lg animate-fade-in-up"
            style={{ color: "#c17bd4" }}
            aria-live="polite"
          >
            phooo...
          </p>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {!allOut ? (
            <button
              onClick={blowAll}
              className="flex items-center gap-2 px-7 py-3 rounded-full font-sans font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #e05c78, #d4a843)" }}
            >
              {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M17 12a5 5 0 0 0-10 0" />
                <path d="M21 12a9 9 0 0 0-18 0" />
                <path d="M5 20a3 3 0 0 1 2-2.83" />
                <path d="M19 20a3 3 0 0 0-2-2.83" />
              </svg> */}
              Make your wish
            </button>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={relight}
                className="flex items-center gap-2 px-6 py-2.5 cursor-pointer rounded-full font-sans font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "white",
                  color: "#e05c78",
                  border: "1.5px solid #f4a0b0",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                </svg>
                Relight candles
              </button>
            </div>
          )}
        </div>

        {/* Wish message */}
        {wishVisible && (
          <div
            className="max-w-sm text-center px-8 py-6 rounded-2xl shadow-xl animate-bouquet-rise"
            style={{
              background: "white",
              border: "1.5px solid #f4a0b0",
            }}
            aria-live="polite"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="mx-auto mb-3 animate-heart-beat"
              aria-hidden="true"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                fill="#e05c78"
              />
            </svg>
            {/* <p className="font-serif text-xl font-semibold mb-2" style={{ color: "#2d1a1a" }}>
              Make Your Wish
            </p> */}
            <p className="font-sans text-sm leading-relaxed" style={{ color: "#8a5a60" }}>
              All the candles are out now…
Close your eyes for a moment and make a wish.
I may be far, but I’m right there with you today.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
