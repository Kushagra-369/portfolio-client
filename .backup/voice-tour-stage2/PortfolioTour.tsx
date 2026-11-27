import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Play, RotateCcw, X } from "lucide-react";
import "./PortfolioTour.css";

const tourSteps = [
  { id: "home", label: "Home", message: "Welcome to the Home section." },
  { id: "skills", label: "Skills", message: "Here are the skills and technologies I work with." },
  { id: "projects", label: "Projects", message: "Let's explore some of my projects." },
  { id: "about", label: "Experience", message: "Here is my experience and background." },
  { id: "contact", label: "Contact", message: "You can connect with me here." },
  { id: "footer", label: "Footer", message: "And that brings us to the end of the page." },
];

export default function PortfolioTour() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"choice" | "manual" | "automatic">("choice");
  const [visible, setVisible] = useState(false);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [minimized, setMinimized] = useState(false);

  const timerRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const stepRef = useRef(-1);

  const cancelTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const speak = useCallback((message: string): Promise<void> => {
    if (!("speechSynthesis" in window)) return Promise.resolve();

    window.speechSynthesis.cancel();

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "en-IN";
      utterance.rate = 1;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const stopJourney = useCallback(() => {
    activeRef.current = false;
    cancelTimer();
    window.speechSynthesis?.cancel();
    setRunning(false);
    stepRef.current = -1;
    setStep(-1);
    setMinimized(true);
    window.dispatchEvent(new Event("portfolio-tour-stop"));
    window.dispatchEvent(new Event("portfolio-manual-mode"));
  }, [cancelTimer]);

  const goToStep = useCallback((index: number) => {
    if (!activeRef.current) return;

    if (index >= tourSteps.length) {
      setRunning(false);
      stepRef.current = -1;
      setStep(-1);
      speak("That completes the portfolio tour. Which section would you like to explore?");
      return;
    }

    const current = tourSteps[index];
    stepRef.current = index;
    setStep(index);

    if (window.location.pathname !== "/") {
      navigate("/");
      timerRef.current = window.setTimeout(() => {
        if (!activeRef.current) return;
        document.getElementById(current.id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 1500);
    } else {
      document.getElementById(current.id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    void speak(current.message).then(() => {
      if (!activeRef.current) return;

      timerRef.current = window.setTimeout(() => {
        if (activeRef.current) goToStep(index + 1);
      }, 3500);
    });
  }, [navigate, speak]);

  const startJourney = useCallback(async () => {
    cancelTimer();
    window.speechSynthesis?.cancel();
    activeRef.current = true;
    setMode("automatic");
    setVisible(false);
    setMinimized(false);
    setRunning(true);
    setStep(-1);

    window.dispatchEvent(new Event("portfolio-voice-enable"));

    await speak(
      "Hello, I'm Kushagra's portfolio guide. Wrap your arms around the experience, sit back, relax, and enjoy the journey."
    );

    if (!activeRef.current) return;

    window.dispatchEvent(new Event("portfolio-start-request"));

    timerRef.current = window.setTimeout(() => {
      if (activeRef.current) goToStep(0);
    }, 2200);
  }, [cancelTimer, goToStep, speak]);

  const selectManual = () => {
    cancelTimer();
    activeRef.current = false;
    setMode("manual");
    setVisible(false);
    window.dispatchEvent(new Event("portfolio-manual-mode"));
  };

  const resumeJourney = useCallback(() => {
    activeRef.current = true;
    setRunning(true);
    setMinimized(false);
    goToStep(stepRef.current >= 0 ? stepRef.current : 0);
  }, [goToStep]);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleStop = () => {
      activeRef.current = false;
      cancelTimer();
      window.speechSynthesis?.cancel();
      setRunning(false);
      stepRef.current = -1;
      setStep(-1);
      setMinimized(true);
    };

    const handleCommand = (event: Event) => {
      const custom = event as CustomEvent<{ text: string }>;
      const command = custom.detail?.text?.toLowerCase() ?? "";

      if (/\b(stop|end tour|cancel tour)\b/.test(command)) {
        stopJourney();
      } else if (/\b(resume journey|start journey again)\b/.test(command)) {
        resumeJourney();
      } else if (/\b(manual mode|browse myself)\b/.test(command)) {
        stopJourney();
      }
    };

    window.addEventListener("portfolio-tour-stop", handleStop);
    window.addEventListener("portfolio-voice-command", handleCommand);

    return () => {
      window.removeEventListener("portfolio-tour-stop", handleStop);
      window.removeEventListener("portfolio-voice-command", handleCommand);
      cancelTimer();
    };
  }, [cancelTimer, resumeJourney, stopJourney]);

  return (
    <>
      {visible && mode === "choice" && (
        <div className="tour-overlay">
          <div className="tour-choice">
            <button className="tour-close" onClick={selectManual} aria-label="Close">
              <X size={20} />
            </button>
            <div className="tour-icon"><Mic size={27} /></div>
            <p className="tour-eyebrow">WELCOME TO THE EXPERIENCE</p>
            <h2>How would you like to explore?</h2>
            <p className="tour-description">
              Explore independently or let the portfolio guide take you through the journey.
            </p>
            <button className="tour-primary" onClick={startJourney}>
              <Play size={17} /> Automatic Mode
            </button>
            <button className="tour-secondary" onClick={selectManual}>
              Manual Mode
            </button>
            <p className="tour-note">Microphone access is requested only in Automatic Mode.</p>
          </div>
        </div>
      )}

      {mode === "automatic" && (
        <div className={`tour-widget ${minimized ? "tour-minimized" : ""}`}>
          {minimized ? (
            <button className="tour-mini-button" onClick={() => setMinimized(false)} aria-label="Open tour controls">
              <Mic size={22} />
            </button>
          ) : (
            <div className="tour-widget-panel">
              <div className="tour-widget-heading">
                <span><Mic size={16} /> Portfolio Guide</span>
                <button onClick={() => setMinimized(true)} aria-label="Minimize">−</button>
              </div>
              <p>{running && step >= 0 ? `Exploring: ${tourSteps[step]?.label}` : "Your journey is paused or complete."}</p>
              <div className="tour-widget-actions">
                <button onClick={resumeJourney}><RotateCcw size={15} /> Resume Journey</button>
                <button onClick={stopJourney}><X size={15} /> Stop</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
