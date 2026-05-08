import { useState, useCallback } from "react";
import SplashScreen from "./components/birthday/SplashScreen";
import MainContent from "./components/birthday/MainContent";

export default function App() {
  const [showMain, setShowMain] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);

  const handleOpen = useCallback(() => {
    setShowMain(true);
    setConfettiKey((k) => k + 1);
  }, []);

  const handleCelebrate = useCallback(() => {
    setConfettiKey((k) => k + 1);
  }, []);

  return (
    <>
      {!showMain && <SplashScreen onOpen={handleOpen} />}
      {showMain && (
        <MainContent confettiKey={confettiKey} onCelebrate={handleCelebrate} />
      )}
    </>
  );
}
