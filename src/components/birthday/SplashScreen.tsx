import { useState, useMemo } from "react";

interface Props {
  onOpen: () => void;
}

const FLOWERS = [
  "https://img.icons8.com/?size=100&id=D0HLPq7UVMQu&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=Gc75lTR6pLYi&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=jN7BfoNPKPWD&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=53J0O0nIVoC9&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=zEiiqvDBZzWZ&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=QPUndglCTq0M&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=6jgc5DucBQYB&format=png&color=000000",
  "https://img.icons8.com/?size=100&id=trd1mWzHsU9G&format=png&color=000000",
];

export default function SplashScreen({ onOpen }: Props) {
  const [exiting, setExiting] = useState(false);

  // const particles = useMemo(
  //   () =>
  //     Array.from({ length: 24 }, (_, i) => ({
  //       id: i,
  //       left: Math.random() * 100,
  //       top: Math.random() * 100,
  //       size: Math.random() * 10 + 6,
  //       delay: Math.random() * 3,
  //       duration: Math.random() * 2 + 2.5,
  //       color:
  //         i % 4 === 0
  //           ? "#e05c78"
  //           : i % 4 === 1
  //             ? "#d4a843"
  //             : i % 4 === 2
  //               ? "#c17bd4"
  //               : "#f4a0b0",
  //     })),
  //   []
  // );

  const flowers = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 26 + 14,
        delay: Math.random() * 6,
        duration: Math.random() * 8 + 6,
        rotate: Math.random() * 360,
        img: FLOWERS[i % FLOWERS.length],
      })),
    []
  );

  const handleOpen = () => {
    setExiting(true);
    setTimeout(onOpen, 650);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top, #fff7f8 0%, #fdf3d8 40%, #f8eef5 100%)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.04)" : "scale(1)",
        boxShadow: "inset 0 0 140px rgba(224,92,120,0.08)",
      }}
    >
      {/* Floating particles */}
      {/* {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-particle-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0.55,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))} */}

      {/* 🌸 Floating flowers */}
      {flowers.map((f) => (
        <img
          key={f.id}
          src={f.img}
          alt="flower"
          className="absolute animate-flower-float pointer-events-none"
          style={{
            left: `${f.left}%`,
            top: '100%',
            width: f.size,
            height: f.size,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            transform: `rotate(${f.rotate}deg)`,
            opacity: 0.9,
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.08))",
          }}
        />
      ))}

      {/* Main card */}
      <div className="relative z-10 text-center px-8 max-w-lg mx-auto">
        {/* Decorative glow ring */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(224,92,120,0.12) 0%, transparent 70%)",
            transform: "scale(1.5)",
          }}
        />

        <p
          className="font-sans text-xs tracking-[0.35em] uppercase mb-5 animate-fade-in-up"
          style={{
            color: "#e05c78",
            animationDelay: "0.15s",
            letterSpacing: "0.3em",
          }}
        >
          A little surprise from me to you
        </p>

        <h1
          className="font-serif text-5xl md:text-7xl font-bold mb-2 animate-fade-in-up"
          style={{ color: "#2d1a1a", animationDelay: "0.35s" }}
        >
          Happy Birthday
        </h1>

        <h2
          className="font-serif text-3xl md:text-4xl italic mb-10 animate-fade-in-up"
          style={{ color: "#e05c78", animationDelay: "0.55s" }}
        >
          Munsi
        </h2>

        {/* Decorative divider */}
        <div
          className="flex items-center justify-center gap-3 mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.7s" }}
        >
          <div
            className="h-px flex-1 max-w-16"
            style={{ background: "#f4a0b0" }}
          />
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2 L11.8 7.5 H17.6 L12.9 10.9 L14.7 16.4 L10 13 L5.3 16.4 L7.1 10.9 L2.4 7.5 H8.2 Z"
              fill="#d4a843"
            />
          </svg>
          <div
            className="h-px flex-1 max-w-16"
            style={{ background: "#f4a0b0" }}
          />
        </div>

        <button
          onClick={handleOpen}
          className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-sans font-semibold text-base text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 animate-fade-in-up"
          style={{
            background: "linear-gradient(135deg, #e05c78 0%, #d4a843 100%)",
            animationDelay: "0.9s",
            cursor: "pointer",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20 12V22H4V12" />
            <path d="M22 7H2v5h20V7z" />
            <path d="M12 22V7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
          Open Your Surprise
        </button>

        <p
          className="mt-7 font-sans text-sm animate-fade-in-up"
          style={{ color: "#9a7070", animationDelay: "1.1s" }}
        >
          Made with love, just for you my badarni❤️
        </p>
      </div>
    </div>
  );
}
