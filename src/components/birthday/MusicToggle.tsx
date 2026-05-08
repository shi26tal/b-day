import { useState, useRef, useEffect } from "react";

/* Uses a public-domain piano birthday melody via Tone.js CDN fallback.
   If no audio is available the button simply shows a visual-only state.  */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Free public-domain birthday music (pixabay CC0)
    const audio = new Audio(
      "song.mp3"
    );
    audio.loop   = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {/* autoplay blocked */});
    }
    setPlaying((p) => !p);
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      title={playing ? "Pause music" : "Play background music"}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
      style={{
        background: playing
          ? "linear-gradient(135deg, #e05c78, #d4a843)"
          : "rgba(255,255,255,0.9)",
        color: playing ? "#fff" : "#e05c78",
        border: playing ? "none" : "1.5px solid #f4a0b0",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Equalizer icon when playing */}
      {playing ? (
        <span className="flex items-end gap-0.5 h-4" aria-hidden="true">
          {[0.4, 0.7, 1, 0.7, 0.5].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full"
              style={{
                height: `${h * 100}%`,
                background: "rgba(255,255,255,0.9)",
                animation: `eq-bar ${0.6 + i * 0.12}s ease-in-out infinite alternate`,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </span>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      )}
      <span>{playing ? "Playing" : "Music"}</span>
    </button>
  );
}
