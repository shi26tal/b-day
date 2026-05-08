interface Props {
  onCelebrate: () => void;
}

export default function BirthdayFooter({ onCelebrate }: Props) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  return (
    <footer
      className="relative py-16 px-4 overflow-hidden text-center"
      style={{
        background: "linear-gradient(135deg, #2d1a1a 0%, #4a2a30 100%)",
        color: "white",
      }}
    >
      {/* Background ring decorations */}
      {[80, 180, 320].map((size, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            border: "1px solid rgba(244,160,176,0.12)",
            transform: "translate(-50%, -50%)",
            animation: `ring-pulse ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.8}s`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center gap-6">
        {/* Heart */}
        <div className="animate-heart-beat" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 24 24">
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="#e05c78"
            />
          </svg>
        </div>

        <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "#fce4e8" }}>
          This One's For You ✨
        </h2>

        <p
          className="font-sans text-base leading-relaxed"
          style={{ color: "rgba(252,228,232,0.75)" }}
        >
          I hope this year brings you more laughter, calmer days, and little moments that feel like magic. You are so loved, always.
        </p>

        {/* Stars row */}
        <div className="flex gap-2" aria-hidden="true">
          {["#e05c78", "#d4a843", "#fce4e8", "#d4a843", "#e05c78"].map((c, i) => (
            <svg
              key={i}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              className="animate-sparkle"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              <path
                d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z"
                fill={c}
              />
            </svg>
          ))}
        </div>

        <button
          onClick={onCelebrate}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-sans font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #e05c78, #d4a843)",
            color: "white",
          }}
        >
          {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M8.56 2.9A7 7 0 0 1 19 9v1h2a3 3 0 0 1 0 6h-2a7 7 0 0 1-7 7H9A7 7 0 0 1 2 16V9a7 7 0 0 1 6.56-6.1Z" />
          </svg> */}
          Let’s celebrate again 🥂
        </button>

        <p className="font-sans text-xs mt-4" style={{ color: "rgba(252,228,232,0.4)" }}>
          A small gift of love © 2026-05-09
        </p>
      </div>
    </footer>
  );
}
