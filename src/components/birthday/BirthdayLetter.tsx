import { useState, useEffect, useRef } from "react";

const LETTER = `My dearest Munsi,

Happy Birthdayyyy 🤍

It still feels funny to me how we grew up from fighting over random things and annoying each other 24/7 to now having those late-night talks and you becoming my best friend.

You being far away from home sometimes makes things feel a little emptier here, but no matter how far you are, you'll always be my best friend, my person and my sister. I'm genuinely so proud of everything you're doing and how strong you've become. Life ko jati pressure aaye pani, you still manage to smile, care for everyone, and keep going. That's something I truly admire about you. And no matter what happens in life, always remember that I'll always be by your side.

I hope this year brings you peace, happiness, good health, lots of laughter, and little moments that make you feel truly loved.

And yes, I still miss annoying you in person.

I love you ❤️ my runchi,

Your favorite sibling 🤍`;

export default function BirthdayLetter() {
  const [opened, setOpened] = useState(false);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const indexRef = useRef(0);

  const startTyping = () => {
    setOpened(true);
    indexRef.current = 0;
    setTyped("");
    setDone(false);
    setSkipped(false);

    // small delay before text starts appearing
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        indexRef.current += 1;
        setTyped(LETTER.slice(0, indexRef.current));
        if (indexRef.current >= LETTER.length) {
          clearInterval(intervalRef.current!);
          setDone(true);
        }
      }, 22);
    }, 600);
  };

  const skip = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTyped(LETTER);
    setDone(true);
    setSkipped(true);
  };

  const seal = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setOpened(false);
    setTyped("");
    setDone(false);
    indexRef.current = 0;
  };

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <section
      id="letter"
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #fdf3d8 0%, #fdf8f8 100%)" }}
    >
      <div className="text-center mb-12">
        <p className="font-sans text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#d4a843" }}>
          From the heart
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: "#2d1a1a" }}>
          A Letter for You
        </h2>
      </div>

      <div className="max-w-xl mx-auto flex flex-col items-center gap-8">
        {/* Envelope */}
        {!opened && (
          <div className="flex flex-col items-center gap-6 animate-fade-in-up">
            <div className="relative group">
              {/* Envelope SVG */}
              <svg
                width="200"
                height="140"
                viewBox="0 0 200 140"
                className="drop-shadow-xl cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={startTyping}
                role="button"
                aria-label="Open birthday letter"
              >
                {/* Body */}
                <rect x="2" y="30" width="196" height="108" rx="8" fill="#fdf3d8" stroke="#f4d0a0" strokeWidth="2" />
                {/* Flap (closed) */}
                <path d="M2 30 L100 85 L198 30 Z" fill="#fce4c0" stroke="#f4d0a0" strokeWidth="1.5" />
                {/* Bottom folds */}
                <path d="M2 138 L70 85 M198 138 L130 85" stroke="#f4c090" strokeWidth="1.5" />
                {/* Seal */}
                <circle cx="100" cy="75" r="18" fill="#e05c78" />
                <path
                  d="M100 62 L103 71 H112 L105 76 L108 85 L100 80 L92 85 L95 76 L88 71 H97 Z"
                  fill="white"
                />
              </svg>
            </div>

            <button
              onClick={startTyping}
              className="flex items-center gap-2 px-8 py-3 rounded-full font-sans font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #d4a843, #e05c78)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              Read Your Letter
            </button>
          </div>
        )}

        {/* Open letter */}
        {opened && (
          <div
            className="w-full rounded-2xl shadow-2xl p-8 animate-letter-reveal"
            style={{
              background: "linear-gradient(145deg, #fffef8, #fdf8ee)",
              border: "1.5px solid #f4d0a0",
              animation: "letter-reveal 0.6s ease both",
            }}
          >
            {/* Letter header */}
            <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: "1px dashed #f4d0a0" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center animate-heart-beat"
                  style={{ background: "#fce4e8" }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      fill="#e05c78"
                    />
                  </svg>
                </div>
                <p className="font-serif italic text-base" style={{ color: "#d4a843" }}>
                  A personal note
                </p>
              </div>
              {!done && (
                <button
                  onClick={skip}
                  className="font-sans text-xs px-3 py-1 rounded-full transition-colors"
                  style={{ color: "#9a7070", background: "#f5eef0" }}
                >
                  Skip
                </button>
              )}
            </div>

            {/* Letter text */}
            <div
              className="font-sans text-sm leading-relaxed whitespace-pre-wrap min-h-32"
              style={{ color: "#4a3030", lineHeight: "1.85" }}
            >
              {typed}
              {!done && (
                <span
                  className="animate-cursor-blink inline-block w-0.5 h-4 ml-0.5 align-middle"
                  style={{ background: "#e05c78" }}
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Done state */}
            {done && (
              <div
                className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4"
                style={{ borderTop: "1px dashed #f4d0a0" }}
              >
                <p
                  className="font-serif italic text-sm"
                  style={{ color: "#d4a843" }}
                  aria-live="polite"
                >
                  {skipped ? "With all my love" : "...written with love"}
                </p>
                <button
                  onClick={seal}
                  className="flex items-center gap-1.5 font-sans text-xs px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                  style={{ color: "#e05c78", background: "#fce4e8", border: "1px solid #f4a0b0" }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Seal letter
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
