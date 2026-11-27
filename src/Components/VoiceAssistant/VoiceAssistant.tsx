
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mic, Volume2 } from "lucide-react";
import { matchVoiceCommand } from "./voiceCommands";
import "./VoiceAssistant.css";

type RecognitionResult = {
    transcript: string;
};

type RecognitionEvent = {
    resultIndex: number;
    results: ArrayLike<
        ArrayLike<RecognitionResult> & { isFinal?: boolean }
    >;
};

type RecognitionErrorEvent = {
    error: string;
};

type Recognition = {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    onresult: ((event: RecognitionEvent) => void) | null;
    onerror: ((event: RecognitionErrorEvent) => void) | null;
    onend: (() => void) | null;
    start: () => void;
    stop: () => void;
    abort?: () => void;
};

type RecognitionWindow = Window & {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
};

type VoiceAssistantProps = {
    enabledAfterStart?: boolean;
};

export default function VoiceAssistant({
}: VoiceAssistantProps) {
    const navigate = useNavigate();
    const location = useLocation();

    const recognitionRef = useRef<Recognition | null>(null);
    const enabledRef = useRef(false);
    const listeningRef = useRef(false);
    const restartingRef = useRef(false);
    const restartTimerRef = useRef<number | null>(null);
    const frameRef = useRef<number | null>(null);
    const speedRef = useRef(180);
    const directionRef = useRef(0);
    const lastCommandRef = useRef("");
    const lastCommandTimeRef = useRef(0);
    const lastSpokenRef = useRef("");
    // const speechQueueRef = useRef<string[]>([]);
    const locationRef = useRef(location.pathname);

    const [enabled, setEnabled] = useState(false);
    const [activated, setActivated] = useState(false);
    const [status, setStatus] = useState("Voice experience ready");
    const [lastHeard, setLastHeard] = useState("");
    const [speed, setSpeed] = useState(180);

    useEffect(() => {
        locationRef.current = location.pathname;
    }, [location.pathname]);

    const speak = useCallback((message: string) => {
        if (!("speechSynthesis" in window)) return;

        lastSpokenRef.current = message;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = "en-IN";
        utterance.rate = 1;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);
    }, []);

    const stopScroll = useCallback(() => {
        directionRef.current = 0;

        if (frameRef.current !== null) {
            cancelAnimationFrame(frameRef.current);
            frameRef.current = null;
        }

        // Cancel any native smooth-scroll animation too.
        window.scrollTo({
            top: window.scrollY,
            left: window.scrollX,
            behavior: "instant",
        });
    }, []);

    const scrollContinuously = useCallback(
        (direction: number) => {
            stopScroll();
            directionRef.current = direction;
            let previousTime = 0;

            const step = (time: number) => {
                if (
                    !enabledRef.current ||
                    directionRef.current === 0
                ) {
                    frameRef.current = null;
                    return;
                }

                if (previousTime === 0) previousTime = time;

                // Use elapsed time so scrolling speed stays consistent.
                const elapsed = Math.min(time - previousTime, 40);
                previousTime = time;

                window.scrollBy(
                    0,
                    directionRef.current * speedRef.current * elapsed / 1000
                );

                const atBottom =
                    window.innerHeight + window.scrollY >=
                    document.documentElement.scrollHeight - 2;

                if (
                    (directionRef.current > 0 && atBottom) ||
                    (directionRef.current < 0 && window.scrollY <= 0)
                ) {
                    stopScroll();
                    setStatus("Reached the end of the scroll range");
                    return;
                }

                frameRef.current = requestAnimationFrame(step);
            };

            frameRef.current = requestAnimationFrame(step);
        },
        [stopScroll]
    );

    const goToSection = useCallback(
        (ids: string[], label: string) => {
            stopScroll();

            const findSection = () => {
                for (const id of ids) {
                    const element =
                        document.getElementById(id) ??
                        document.querySelector(
                            `[data-section="${id}"]`
                        );

                    if (element) {
                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                        setStatus(`Going to ${label}`);
                        return true;
                    }
                }

                return false;
            };

            if (findSection()) return;

            // If a section is on Home, navigate there first.
            if (locationRef.current !== "/") {
                navigate("/");
                window.setTimeout(() => {
                    if (!findSection()) {
                        setStatus(`${label} section was not found`);
                        speak(`I could not find the ${label} section.`);
                    }
                }, 500);
                return;
            }

            setStatus(`${label} section was not found`);
            speak(`I could not find the ${label} section.`);
        },
        [navigate, speak, stopScroll]
    );

    const execute = useCallback(
        (rawCommand: string) => {
            const text = rawCommand
                .toLowerCase()
                .replace(/[.,!?]/g, " ")
                .replace(/\s+/g, " ")
                .trim();

            if (!text) return;

            // Avoid duplicate processing of the same final result.
            const now = Date.now();
            if (
                text === lastCommandRef.current &&
                now - lastCommandTimeRef.current < 1500
            ) {
                return;
            }

            lastCommandRef.current = text;
            lastCommandTimeRef.current = now;

            // Global commands do not depend on the command matcher.
            if (
                /\b(refresh|reload|refresh portfolio|website refresh)\b/.test(text) ||
                text.includes("portfolio refresh") ||
                text.includes("website reload") ||
                text.includes("page refresh")
            ) {
                stopScroll();
                setStatus("Refreshing portfolio...");
                window.location.reload();
                return;
            }

            if (
                /\b(home|homepage|go home|back to home|home page)\b/.test(text) ||
                text.includes("home pe") ||
                text.includes("home par") ||
                text.includes("ghar chalo") ||
                text.includes("wapas home")
            ) {
                stopScroll();
                navigate("/");
                window.scrollTo({ top: 0, behavior: "instant" });
                setStatus("Going to Home");
                return;
            }

            const command = matchVoiceCommand(text);

            switch (command) {
                case "stop":
                    stopScroll();
                    setStatus("Journey stopped");
                    break;

                case "scroll-down":
                    scrollContinuously(1);
                    setStatus("Scrolling down");
                    break;

                case "scroll-up":
                    scrollContinuously(-1);
                    setStatus("Scrolling up");
                    break;

                case "faster": {
                    const next = Math.min(
                        1400,
                        Math.round(speedRef.current * 1.6)
                    );
                    speedRef.current = next;
                    setSpeed(next);
                    setStatus(`Scroll speed: ${next} pixels per second`);
                    break;
                }

                case "slower": {
                    const next = Math.max(
                        35,
                        Math.round(speedRef.current / 1.8)
                    );
                    speedRef.current = next;
                    setSpeed(next);
                    setStatus(`Scroll speed: ${next} pixels per second`);
                    break;
                }

                case "top":
                    stopScroll();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setStatus("Going to the top");
                    break;

                case "projects":
                    goToSection(["projects", "Projects"], "Projects");
                    break;

                case "skills":
                    goToSection(["skills", "Skills"], "Skills");
                    break;



                case "experience":
                    goToSection(["about"], "Experience");
                    break;


                case "footer":
                    goToSection(
                        ["footer", "Footer", "site-footer"],
                        "Footer"
                    );
                    break;



                case "contact":
                    goToSection(["contact", "Contact", "footer"], "Contact");
                    break;

                case "resume":
                    stopScroll();

                    if (locationRef.current !== "/resume") {
                        navigate("/resume");
                    }

                    setStatus("Opening Resume");
                    break;

                case "back":
                    stopScroll();
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "instant" });
                    setStatus("Going back to Home");
                    break;

                default:
                    setStatus(`Command not recognized: "${text}"`);
            }
        },
        [
            goToSection,
            navigate,
            scrollContinuously,
            speak,
            stopScroll,
        ]
    );

    const disableVoice = useCallback(() => {
        enabledRef.current = false;
        listeningRef.current = false;
        restartingRef.current = false;

        if (restartTimerRef.current !== null) {
            window.clearTimeout(restartTimerRef.current);
            restartTimerRef.current = null;
        }

        stopScroll();
        window.speechSynthesis?.cancel();

        try {
            recognitionRef.current?.abort?.();
            recognitionRef.current?.stop();
        } catch {
            // Recognition may already be stopped.
        }

        recognitionRef.current = null;
        setEnabled(false);
        setStatus("Voice mode is off");
    }, [stopScroll]);

    const enableVoice = useCallback(() => {
        if (enabledRef.current) return;

        const browserWindow = window as RecognitionWindow;
        const RecognitionAPI =
            browserWindow.SpeechRecognition ??
            browserWindow.webkitSpeechRecognition;

        if (!RecognitionAPI) {
            setStatus(
                "Speech recognition is unsupported. Try a supported version of Chrome."
            );
            return;
        }

        enabledRef.current = true;
        setEnabled(true);
        setStatus("Starting microphone...");

        const recognition = new RecognitionAPI();
        recognition.lang = "en-IN";
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            for (
                let index = event.resultIndex;
                index < event.results.length;
                index++
            ) {
                const result = event.results[index];
                if (result.isFinal === false) continue;

                const transcript =
                    result[0]?.transcript?.trim() ?? "";

                if (!transcript) continue;

                setLastHeard(transcript);

                window.dispatchEvent(
                    new CustomEvent("portfolio-voice-command", {
                        detail: { text: transcript },
                    })
                );

                execute(transcript);
            }
        };

        recognition.onerror = (event) => {
            if (!enabledRef.current) return;

            if (
                event.error === "not-allowed" ||
                event.error === "service-not-allowed"
            ) {
                setStatus("Microphone access denied. Allow it in browser settings.");
                disableVoice();
                return;
            }

            if (event.error === "audio-capture") {
                setStatus("No microphone detected.");
                return;
            }

            if (event.error === "network") {
                setStatus("Speech service network error. Retrying...");
                return;
            }

            if (event.error !== "no-speech" && event.error !== "aborted") {
                setStatus(`Speech recognition issue: ${event.error}`);
            }
        };

        recognition.onend = () => {
            listeningRef.current = false;

            if (!enabledRef.current || restartingRef.current) return;

            restartingRef.current = true;

            restartTimerRef.current = window.setTimeout(() => {
                restartingRef.current = false;

                if (!enabledRef.current) return;

                try {
                    recognition.start();
                    listeningRef.current = true;
                    setStatus("Listening for commands");


                } catch {
                    setStatus(
                        "Microphone paused. Toggle Voice Off and On to reconnect."
                    );
                }
            }, 800);
        };

        recognitionRef.current = recognition;

        try {
            recognition.start();
            listeningRef.current = true;
            setStatus("Listening for commands");
        } catch {
            enabledRef.current = false;
            recognitionRef.current = null;
            setEnabled(false);
            setStatus("Could not start microphone. Please try again.");
        }
    }, [disableVoice, execute]);

    useEffect(() => {
        const handleEnable = () => {
            setActivated(true);
            enableVoice();
        };

        const handleDisable = () => {
            disableVoice();
            setActivated(false);
        };

        window.addEventListener("portfolio-voice-enable", handleEnable);
        window.addEventListener("portfolio-manual-mode", handleDisable);
        window.addEventListener("portfolio-tour-stop", handleDisable);

        return () => {
            window.removeEventListener("portfolio-voice-enable", handleEnable);
            window.removeEventListener("portfolio-manual-mode", handleDisable);
            window.removeEventListener("portfolio-tour-stop", handleDisable);
        };
    }, [enableVoice, disableVoice]);

    useEffect(() => {
        return () => {
            enabledRef.current = false;

            if (restartTimerRef.current !== null) {
                window.clearTimeout(restartTimerRef.current);
            }

            if (frameRef.current !== null) {
                cancelAnimationFrame(frameRef.current);
            }

            try {
                recognitionRef.current?.abort?.();
                recognitionRef.current?.stop();
            } catch {
                // Ignore cleanup errors.
            }
        };
    }, []);

    if (!activated) return null;

    return (
        <div className="voice-assistant">
            <div className="voice-status" aria-live="polite">
                <Volume2 size={16} />
                <span>{status}</span>
                {enabled && (
                    <small>
                        <Mic size={13} /> Microphone active · Scroll speed: {speed} px/s
                    </small>
                )}
                {lastHeard && <small>Heard: {lastHeard}</small>}
            </div>
        </div>
    );
}
