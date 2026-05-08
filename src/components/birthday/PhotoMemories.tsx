import { useState } from "react";

const PHOTOS = [
  {
    src: "1.jpg",
    label: "Coolest Since Forever",
    accent: "#e05c78",
    rotation: "-2deg",
  },
  {
    src: "2.jpg",
    label: "Sunshine Days",
    accent: "#d4a843",
    rotation: "1.5deg",
  },
  {
    src: "3.jpg",
    label: "Holding on to forever",
    accent: "#c17bd4",
    rotation: "-1deg",
  },
  {
    src: "4.jpg",
    label: "Little Queens",
    accent: "#6ee7b7",
    rotation: "2deg",
  },
];

export default function PhotoMemories() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="memories"
      className="relative py-20 px-4 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f9eaec 0%, #fce4e8 100%)" }}
    >
      <div className="text-center mb-12">
        <p className="font-sans text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#c17bd4" }}>
          Moments to cherish
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-bold" style={{ color: "#2d1a1a" }}>
          A gallery of us
        </h2>
        <p className="font-sans mt-3 text-base" style={{ color: "#8a5a60" }}>
          Just memories I never want to lose
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PHOTOS.map((photo, i) => (
          <button
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            className="group relative flex flex-col rounded-2xl overflow-hidden shadow-lg transition-all duration-400 text-left"
            style={{
              transform:
                active === i
                  ? "scale(1.05) rotate(0deg)"
                  : `rotate(${photo.rotation})`,
              boxShadow:
                active === i
                  ? `0 20px 50px -10px ${photo.accent}66`
                  : "0 8px 24px rgba(0,0,0,0.12)",
              background: "white",
              outline: "none",
            }}
            aria-label={`View photo: ${photo.label}`}
            aria-pressed={active === i}
          >
            {/* Photo */}
            <div className="relative overflow-hidden" style={{ paddingBottom: "100%" }}>
              <img
                src={photo.src}
                alt={photo.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                style={{ transform: active === i ? "scale(1.06)" : undefined }}
              />
              {/* Overlay on active */}
              {active === i && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `${photo.accent}22` }}
                  aria-hidden="true"
                >
                  <svg width="32" height="32" viewBox="0 0 24 24">
                    <path
                      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      fill={photo.accent}
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="p-4">
              <span
                className="font-sans text-xs tracking-wider uppercase font-semibold"
                style={{ color: photo.accent }}
              >
                {photo.label}
              </span>
              {/* <p
                className="font-serif text-base mt-1 font-medium"
                style={{ color: "#2d1a1a" }}
              >
                {photo.caption}
              </p> */}
            </div>

            {/* Bottom color accent */}
            <div
              className="h-1 w-full"
              style={{ background: photo.accent }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
