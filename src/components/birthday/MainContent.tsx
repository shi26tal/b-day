import ConfettiCanvas from "./ConfettiCanvas";
import MusicToggle from "./MusicToggle";
import HeroSection from "./HeroSection";
import FlowerBouquet from "./FlowerBouquet";
import BirthdayCake from "./BirthdayCake";
import BirthdayLetter from "./BirthdayLetter";
import PhotoMemories from "./PhotoMemories";
import BirthdayFooter from "./BirthdayFooter";

/* ── Sticky Navigation ─────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Flowers", href: "#flowers" },
  { label: "Cake", href: "#cake" },
  { label: "Letter", href: "#letter" },
  { label: "Memories", href: "#memories" },
];

function StickyNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-1 px-4 py-3"
      style={{
        background: "rgba(253,248,248,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #f0d0d5",
      }}
      aria-label="Birthday site navigation"
    >
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="font-sans text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            color: "#e05c78",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#fce4e8";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              "transparent";
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

/* ── Main Content ───────────────────────────────────────────────── */
interface Props {
  confettiKey: number;
  onCelebrate: () => void;
}

export default function MainContent({ confettiKey, onCelebrate }: Props) {
  return (
    <div className="relative min-h-screen" style={{ background: "#fdf8f8" }}>
      {/* Confetti layer — re-mounts on each key change to re-trigger animation */}
      <ConfettiCanvas key={confettiKey} triggerKey={confettiKey} />

      {/* Fixed UI */}
      <StickyNav />
      <MusicToggle />

      {/* Page sections */}
      <main>
        <HeroSection onCelebrate={onCelebrate} />
        <FlowerBouquet />
        <BirthdayCake />
        <BirthdayLetter />
        <PhotoMemories />
      </main>

      <BirthdayFooter onCelebrate={onCelebrate} />
    </div>
  );
}
