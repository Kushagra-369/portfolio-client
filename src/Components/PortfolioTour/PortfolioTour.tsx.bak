import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, Play, RotateCcw, X } from "lucide-react";
import "./PortfolioTour.css";

const tourSteps = [
  { id: "home", label: "Home", message: "Welcome to the Home section." },
  { id: "skills", label: "Skills", message: "Here are the skills and technologies I work with." },
  { id: "projects", label: "Projects", message: "Let's explore Kushagra's projects. Take a look at the different projects and the technologies behind them." },
  { id: "about", label: "Experience", message: "Here is Kushagra's experience and background." },
  { id: "contact", label: "Contact", message: "You can connect with Kushagra here." },
  { id: "footer", label: "Footer", message: "And that brings us to the end of the main portfolio." },
];

export default function PortfolioTour() {
  const navigate = useNavigate();

  const [mode, setMode] = useState<"choice" | "manual" | "automatic">("choice");
  const [visible, setVisible] = useState(false);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [minimized, setMinimized] = useState(false);

  const activeRef = useRef(false);
  const tokenRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const wait = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }, []);

  const speak = useCallback((message: string) => {
    if (!("speechSynthesis" in window)) return Promise.resolve();

    window.speechSynthesis.cancel();

    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = "en-IN";
      utterance.rate = 1;

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  }, []);

  const isCurrent = useCallback((token: number) => {
    return activeRef.current && tokenRef.current === token;
  }, []);

  const clearHighlights = useCallback(() => {
    document
      .querySelectorAll(".portfolio-tour-highlight")
      .forEach((element) => {
        element.classList.remove("portfolio-tour-highlight");
      });
  }, []);

  const stopJourney = useCallback(() => {
    activeRef.current = false;
    tokenRef.current += 1;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    window.speechSynthesis?.cancel();
    clearHighlights();

    setRunning(false);
    setStep(-1);
    setMinimized(true);

    window.dispatchEvent(new Event("portfolio-tour-stop"));
    window.dispatchEvent(new Event("portfolio-tour-chatbot-close"));
    window.dispatchEvent(new Event("portfolio-tour-chatbot-close"));
    window.dispatchEvent(new Event("portfolio-manual-mode"));
  }, [clearHighlights]);

  const scrollToSection = useCallback(async (id: string, token: number) => {
    if (!isCurrent(token)) return;

    if (window.location.pathname !== "/") {
      navigate("/");
      await wait(1100);
    }

    if (!isCurrent(token)) return;

    const section = document.getElementById(id);

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    await wait(900);
  }, [isCurrent, navigate, wait]);

  const scrollThroughProjects = useCallback(async (token: number) => {
    if (!isCurrent(token)) return;

    const section = document.getElementById("projects");
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    await wait(1100);

    if (!isCurrent(token)) return;

    const startY = window.scrollY;
    const targetY = Math.max(
      startY,
      section.offsetTop + section.offsetHeight - window.innerHeight + 30
    );

    const distance = targetY - startY;
    const duration = 9500;
    const startTime = performance.now();

    await new Promise<void>((resolve) => {
      const animate = (now: number) => {
        if (!isCurrent(token)) {
          rafRef.current = null;
          resolve();
          return;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const eased = progress * progress * (3 - 2 * progress);

        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          rafRef.current = null;
          resolve();
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    });
  }, [isCurrent, wait]);

  const highlight = useCallback(async (
    selector: string,
    message: string,
    token: number
  ) => {
    if (!isCurrent(token)) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selector)
    );

    const target = elements.find(
      (element) => element.getClientRects().length > 0
    );

    if (!target) {
      await speak(message);
      return;
    }

    target.classList.add("portfolio-tour-highlight");

    await speak(message);

    if (!isCurrent(token)) {
      clearHighlights();
      return;
    }

    await wait(800);
    target.classList.remove("portfolio-tour-highlight");
  }, [clearHighlights, isCurrent, speak, wait]);


  const demonstrateThemeToggle = useCallback(async (token: number) => {
    if (!isCurrent(token)) return;

    const buttons = Array.from(
      document.querySelectorAll<HTMLElement>('[data-tour="navbar-theme"]')
    );
    const target = buttons.find((element) => element.getClientRects().length > 0);

    if (!target) {
      await speak("This button lets visitors switch between Light and Dark themes.");
      return;
    }

    // First press: actually switch the theme.
    target.click();

    await wait(700);
    if (!isCurrent(token)) return;

    // Second press: visual-only press effect; does not toggle the theme again.
    target.classList.add("portfolio-tour-highlight", "portfolio-tour-press");

    await speak(
      "This is the Light and Dark mode toggle. One click switches the portfolio appearance."
    );

    await wait(700);
    target.classList.remove("portfolio-tour-highlight", "portfolio-tour-press");
  }, [isCurrent, speak, wait]);

  const demonstrateAssistant = useCallback(async (token: number) => {
    if (!isCurrent(token)) return;

    window.dispatchEvent(new Event("portfolio-tour-chatbot-open"));
    await wait(500);

    const target = document.querySelector<HTMLElement>('[data-tour="ai-assistant"]');

    if (target) {
      target.classList.add("portfolio-tour-highlight");
    }

    try {
      if (isCurrent(token)) {
        await speak(
          "Meet KUBOC, the AI assistant. The chat window is now open. You can type your questions here and interact with the assistant."
        );
      }

      if (isCurrent(token)) {
        await wait(1200);
      }
    } finally {
      target?.classList.remove("portfolio-tour-highlight");
      window.dispatchEvent(new Event("portfolio-tour-chatbot-close"));
    }
  }, [isCurrent, speak, wait]);

  const runTour = useCallback(async (token: number) => {
    for (let index = 0; index < tourSteps.length; index += 1) {
      if (!isCurrent(token)) return;

      const current = tourSteps[index];

      setStep(index);

      if (current.id === "projects") {
        await scrollToSection(current.id, token);

        if (!isCurrent(token)) return;

        void speak(current.message);
        await scrollThroughProjects(token);
      } else {
        await scrollToSection(current.id, token);

        if (!isCurrent(token)) return;

        await speak(current.message);
      }

      if (!isCurrent(token)) return;
      await wait(700);
    }

    if (!isCurrent(token)) return;

    // Return to Home before introducing the navbar controls.
    setStep(-1);
    await scrollToSection("home", token);

    if (!isCurrent(token)) return;

    await speak("Let's return to the top. I'll quickly introduce a few more features.");

    await demonstrateThemeToggle(token);

    await highlight(
      '[data-tour="navbar-linkedin"]',
      "You can connect with Kushagra on LinkedIn using this button.",
      token
    );

    await highlight(
      '[data-tour="navbar-github"]',
      "You can also explore his code and repositories on GitHub.",
      token
    );

    await demonstrateAssistant(token);

    if (!isCurrent(token)) return;

    // Resume page visit.
    navigate("/resume");
    await wait(1100);

    if (!isCurrent(token)) return;

    await speak("This is the Resume page, where you can explore Kushagra's professional profile and download his resume.");

    await wait(6000);

    if (!isCurrent(token)) return;

    // Return Home and finish.
    navigate("/");
    await wait(1100);

    if (!isCurrent(token)) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    await speak("That completes the portfolio tour. Which section would you like to explore next? You can say Home, Skills, Projects, Experience, or Contact.");

    if (!isCurrent(token)) return;

    setRunning(false);
    setStep(-1);
  }, [
    highlight,
    isCurrent,
    navigate,
    scrollThroughProjects,
    scrollToSection,
    speak,
    wait,
  ]);

  const startJourney = useCallback(async () => {
    const token = tokenRef.current + 1;
    tokenRef.current = token;
    activeRef.current = true;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    window.speechSynthesis?.cancel();
    clearHighlights();

    setMode("automatic");
    setVisible(false);
    setMinimized(false);
    setRunning(true);
    setStep(-1);

    window.dispatchEvent(new Event("portfolio-voice-enable"));

    await speak(
      "Hello, I'm Kushagra's portfolio guide. Wrap your arms around the experience, sit back, relax, and enjoy the journey."
    );

    if (!isCurrent(token)) return;

    window.dispatchEvent(new Event("portfolio-start-request"));
    await wait(1500);

    if (!isCurrent(token)) return;

    await runTour(token);
  }, [clearHighlights, isCurrent, runTour, speak, wait]);

  const selectManual = useCallback(() => {
    activeRef.current = false;
    tokenRef.current += 1;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    window.speechSynthesis?.cancel();
    clearHighlights();

    setMode("manual");
    setVisible(false);
    setRunning(false);
    setStep(-1);

    window.dispatchEvent(new Event("portfolio-manual-mode"));
  }, [clearHighlights]);

  const resumeJourney = useCallback(() => {
    void startJourney();
  }, [startJourney]);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleCommand = (event: Event) => {
      const custom = event as CustomEvent<{ text: string }>;
      const command = custom.detail?.text?.toLowerCase() ?? "";

      if (/\b(stop|end tour|cancel tour)\b/.test(command)) {
        stopJourney();
        return;
      }

      if (/\b(resume journey|start journey again)\b/.test(command)) {
        void startJourney();
        return;
      }

      if (/\b(manual mode|browse myself)\b/.test(command)) {
        stopJourney();
        return;
      }

      if (!activeRef.current || running) return;

      const sections = [
        { words: /\b(home)\b/, id: "home", label: "Home" },
        { words: /\b(skills|skill)\b/, id: "skills", label: "Skills" },
        { words: /\b(projects|project)\b/, id: "projects", label: "Projects" },
        { words: /\b(experience|about)\b/, id: "about", label: "Experience" },
        { words: /\b(contact)\b/, id: "contact", label: "Contact" },
      ];

      const selected = sections.find((section) => section.words.test(command));

      if (selected) {
        const token = tokenRef.current;
        setStep(-1);

        void (async () => {
          await scrollToSection(selected.id, token);
          if (isCurrent(token)) {
            await speak(`Taking you to ${selected.label}.`);
          }
        })();
      }
    };

    window.addEventListener("portfolio-voice-command", handleCommand);

    return () => {
      window.removeEventListener("portfolio-voice-command", handleCommand);
    };
  }, [isCurrent, running, scrollToSection, speak, startJourney, stopJourney]);

  useEffect(() => {
    return () => {
      activeRef.current = false;
      tokenRef.current += 1;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      window.speechSynthesis?.cancel();
      clearHighlights();
    };
  }, [clearHighlights]);

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

            <p className="tour-note">
              Microphone access is requested only in Automatic Mode.
            </p>
          </div>
        </div>
      )}

      {mode === "automatic" && (
        <div className={`tour-widget ${minimized ? "tour-minimized" : ""}`}>
          {minimized ? (
            <button
              className="tour-mini-button"
              onClick={() => setMinimized(false)}
              aria-label="Open tour controls"
            >
              <Mic size={22} />
            </button>
          ) : (
            <div className="tour-widget-panel">
              <div className="tour-widget-heading">
                <span><Mic size={16} /> Portfolio Guide</span>
                <button onClick={() => setMinimized(true)} aria-label="Minimize">
                  -
                </button>
              </div>

              <p>
                {running && step >= 0
                  ? `Exploring: ${tourSteps[step]?.label}`
                  : "Your journey is paused or complete."}
              </p>

              <div className="tour-widget-actions">
                <button onClick={resumeJourney}>
                  <RotateCcw size={15} /> Restart Journey
                </button>
                <button onClick={stopJourney}>
                  <X size={15} /> Stop
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
