import { useEffect, useState } from "react";

interface Props {
  onCelebrate: () => void;
}

const HEADING = "Happy Munsi Day!";

const IMAGES = ["mun.jpg", "pp.jpg"];

const BALLOONS = [
  { color: "#e05c78", delay: 0, duration: 12, left: 8 },
  { color: "#d4a843", delay: 0.5, duration: 14, left: 22 },
  { color: "#c17bd4", delay: 0.2, duration: 11, left: 40 },
  { color: "#6ee7b7", delay: 0.8, duration: 13, left: 58 },
  { color: "#93c5fd", delay: 0.3, duration: 15, left: 75 },
  { color: "#fca5a5", delay: 0.6, duration: 12, left: 90 },
];

const FLOWERS = [
  // pink flower
  { left: 10, delay: 0, duration: 14, size: 26, color: "#f4a0b0" },
  { left: 18, delay: 0.4, duration: 16, size: 22, color: "#e05c78" },

  // yellow flower
  { left: 30, delay: 0.5, duration: 15, size: 28, color: "#d4a843" },
  { left: 38, delay: 0.8, duration: 17, size: 24, color: "#facc15" },

  // purple flower
  { left: 50, delay: 0.9, duration: 13, size: 30, color: "#c17bd4" },
  { left: 58, delay: 0.3, duration: 18, size: 20, color: "#a855f7" },

  // blue flower
  { left: 68, delay: 1.4, duration: 16, size: 26, color: "#93c5fd" },
  { left: 76, delay: 0.7, duration: 14, size: 22, color: "#60a5fa" },

  // green flower
  { left: 85, delay: 1.0, duration: 17, size: 28, color: "#6ee7b7" },
];

const SPARKLE_POSITIONS = [
  { top: "12%", left: "5%", delay: 0 },
  { top: "20%", left: "88%", delay: 0.6 },
  { top: "55%", left: "3%", delay: 1.2 },
  { top: "70%", left: "92%", delay: 0.3 },
  { top: "8%", left: "50%", delay: 0.9 },
  { top: "80%", left: "45%", delay: 1.5 },
];

export default function HeroSection({ onCelebrate }: Props) {
  const [lettersVisible, setLettersVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLettersVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-16"
      style={{ background: "linear-gradient(180deg, #fce4e8 0%, #fdf8f8 60%)" }}
    >
      {/* Floating balloons */}
      {BALLOONS.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-0 pointer-events-none select-none"
          style={{
            left: `${b.left}%`,
            animation: `balloon-float ${b.duration}s linear ${b.delay}s infinite`,
          }}
          //aria-hidden="true"
        >
          {/* Balloon SVG */}
          <svg width="40" height="52" viewBox="0 0 40 52">
            <ellipse
              cx="20"
              cy="20"
              rx="18"
              ry="20"
              fill={b.color}
              opacity="0.85"
            />
            <ellipse
              cx="14"
              cy="12"
              rx="5"
              ry="7"
              fill="rgba(255,255,255,0.25)"
            />
            <line
              x1="20"
              y1="40"
              x2="20"
              y2="52"
              stroke={b.color}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      ))}

      {/* 🌸 Floating Flowers */}
      {FLOWERS.map((f, i) => (
        <div
          key={i}
          className="absolute bottom-0 pointer-events-none"
          style={{
            left: `${f.left}%`,
            animation: `flower-float ${f.duration}s linear ${f.delay}s infinite`,
          }}
        >
          <svg width={f.size} height={f.size} viewBox="0 0 24 24">
            {/* petals */}
            <circle cx="12" cy="5" r="4" fill={f.color} opacity="0.9" />
            <circle cx="19" cy="12" r="4" fill={f.color} opacity="0.9" />
            <circle cx="12" cy="19" r="4" fill={f.color} opacity="0.9" />
            <circle cx="5" cy="12" r="4" fill={f.color} opacity="0.9" />

            {/* center */}
            <circle cx="12" cy="12" r="3" fill="#fbbf24" />
          </svg>

          {/* OPTION 2 (UNCOMMENT TO USE ICONS8 IMAGE) */}
          {/* <img
            src="https://img.icons8.com/?size=100&id=Gc75lTR6pLYi&format=png&color=000000"
            alt="flower"
            style={{ width: f.size, height: f.size }}
          /> */}
        </div>
      ))}

      {/* Sparkles */}
      {SPARKLE_POSITIONS.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-sparkle"
          style={{ top: s.top, left: s.left, animationDelay: `${s.delay}s` }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path
              d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z"
              fill="#d4a843"
            />
          </svg>
        </div>
      ))}

      {/* Hero photo */}
      <div className="relative mb-8">
        <div
          className="w-65  h-65 md:w-73 md:h-73 rounded-full overflow-hidden shadow-2xl border-4"
          style={{ borderColor: "#f4a0b0" }}
        >
          {/* Image Slideshow */}
          {/* {IMAGES.map((img, index) => (
            <img
              key={img}
              src={img}
              alt="Birthday girl"
              className={`absolute top-0 left-0 w-full h-full object-cover rounded-full transition-transform duration-1000 ease-initial ${
                index === currentImage
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-110"
              }`}
            />
          ))} */}

          {/* sliding track */}
          <div
            className="flex w-full h-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${currentImage * 100}%)`,
            }}
          >
            {IMAGES.map((img) => (
              <img
                key={img}
                src={img}
                alt="Birthday girl"
                className="w-full h-full shrink-0 object-cover"
              />
            ))}
          </div>
        </div>

        {/* 🌸 Flower near photo */}
        <div
          className="absolute -top-3 -left-3 animate-float"
          style={{ animationDuration: "4s" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" fill="#d4a843" />
            <circle cx="12" cy="5" r="4" fill="#f4a0b0" />
            <circle cx="19" cy="12" r="4" fill="#f4a0b0" />
            <circle cx="12" cy="19" r="4" fill="#f4a0b0" />
            <circle cx="5" cy="12" r="4" fill="#f4a0b0" />
          </svg>
        </div>

        {/* Ring decoration */}
        <div
          className="absolute -inset-3 rounded-full border-2 border-dashed pointer-events-none"
          style={{
            borderColor: "#f4a0b0",
            animation: "ring-pulse 3s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        {/* Star badge */}
        <div
          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(135deg, #e05c78, #d4a843)" }}
          aria-label="Birthday star"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2 l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6Z" />
          </svg>
        </div>
      </div>

      {/* small text */}

      <p
        className="font-sans text-sm text-center mt-3 animate-fade-in-up"
        style={{ color: "#9a7070", animationDelay: "0.9s" }}
      >
        My favorite person ❤️
      </p>

      {/* Animated heading */}
      <h1
        className="font-serif text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 flex flex-wrap justify-center gap-x-1"
        aria-label={HEADING}
      >
        {HEADING.split("").map((char, i) => (
          <span
            key={i}
            className={char === " " ? "w-3" : "inline-block"}
            style={
              char !== " " && lettersVisible
                ? {
                    color: i % 2 === 0 ? "#e05c78" : "#d4a843",
                    animation: `letter-bounce 0.7s ease both`,
                    animationDelay: `${i * 0.06}s`,
                    display: "inline-block",
                  }
                : { opacity: 0 }
            }
          >
            {char}
          </span>
        ))}
      </h1>

      <p
        className="font-Playfair Display text-xl md:text-xl text-center mb-3 animate-fade-in-up"
        style={{ color: "#c17bd4", animationDelay: "1.2s" }}
      >
        Here’s to 30 beautiful years and many more ahead ❤️
      </p>

      {/* Sparkle row */}
      <div
        className="flex gap-3 mb-10 animate-fade-in-up"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      >
        {["#e05c78", "#d4a843", "#c17bd4", "#d4a843", "#e05c78"].map((c, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            style={{ animationDelay: `${i * 0.2}s` }}
            className="animate-sparkle"
          >
            <path
              d="M12 2 L13.5 10 L22 12 L13.5 14 L12 22 L10.5 14 L2 12 L10.5 10 Z"
              fill={c}
            />
          </svg>
        ))}
      </div>

      {/* Celebrate button */}
      <button
        onClick={onCelebrate}
        className="animate-fade-in-up flex items-center gap-2 px-8 py-3 rounded-full font-sans font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
        style={{
          background: "linear-gradient(135deg, #e05c78, #d4a843)",
          animationDelay: "1.8s",
          cursor: "pointer",
        }}
      >
        {/* <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M8.56 2.9A7 7 0 0 1 19 9v1h2a3 3 0 0 1 0 6h-2a7 7 0 0 1-7 7H9A7 7 0 0 1 2 16V9a7 7 0 0 1 6.56-6.1Z" />
          <path d="M6 12h4" />
          <path d="M10 9v6" />
        </svg> */}
        Let's celebrate🍾
      </button>

      {/* Scroll cue */}
      <div
        className="absolute bottom-6  left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-fade-in-up"
        style={{ animationDelay: "2.2s" }}
        aria-hidden="true"
      >
        <p
          className="font-sans text-xs tracking-widest uppercase"
          style={{ color: "#c09090" }}
        >
          Scroll for more
        </p>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e05c78"
          strokeWidth="2"
          style={{ animation: "card-float 1.8s ease-in-out infinite" }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
