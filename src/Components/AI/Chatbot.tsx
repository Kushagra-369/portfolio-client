import React, { useState, useRef, useEffect } from "react";


interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

type BotMode = "small" | "normal" | "large";

export default function Chatbot() {
    const [mode, setMode] = useState<BotMode>("small");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "⚡ KUBOC ONLINE // AIML CORE READY...",
            sender: "bot",
        },
    ]);

    const [input, setInput] = useState("");
    const [position, setPosition] = useState({
        x: 20,
        y: window.innerHeight - 120,
    });

    const [dragging, setDragging] = useState(false);

    const dragOffset = useRef({ x: 0, y: 0 });
    const chatbotRef = useRef<HTMLDivElement>(null);

    // =========================
    // AI RESPONSE
    // =========================
    const getAIResponse = async (msg: string) => {

        const response = await fetch(
            "https://portfolio-client-r6b5.onrender.com/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: msg,
                }),
            }
        );

        const data = await response.json();

        return data.response;
    };

    // =========================
    // SEND MESSAGE
    // =========================
    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now(),
            text: input,
            sender: "user",
        };

        const response = await getAIResponse(input);

        const botMessage: Message = {
            id: Date.now() + 1,
            text: response,
            sender: "bot",
        };

        setMessages((prev) => [...prev, userMessage, botMessage]);

        setInput("");
    };

    // =========================
    // DRAGGING
    // =========================
    const handleMouseDown = (e: React.MouseEvent) => {
        if (mode === "small") return;

        setDragging(true);

        const rect = chatbotRef.current?.getBoundingClientRect();

        if (rect) {
            dragOffset.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }
    };

    useEffect(() => {
        const move = (e: MouseEvent) => {
            if (!dragging) return;

            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            });
        };

        const stop = () => {
            setDragging(false);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", stop);

        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseup", stop);
        };
    }, [dragging]);

    // =========================
    // RESET POSITION
    // =========================
    const resetPosition = () => {
        setPosition({
            x: 20,
            y: window.innerHeight - 120,
        });

        setMode("small");
    };

    // =========================
    // SIZE CONFIG
    // =========================
    const sizes = {
        small: {
            width: "90px",
            height: "90px",
        },
        normal: {
            width: "340px",
            height: "500px",
        },
        large: {
            width: "500px",
            height: "700px",
        },
    };

    return (
        <div
            ref={chatbotRef}
            onMouseDown={handleMouseDown}
            style={{
                width: sizes[mode].width,
                height: sizes[mode].height,
                left: `${position.x}px`,
                top: `${position.y}px`,
                transition: dragging ? "none" : "0.25s",
            }}
            className={`fixed z-99999
      rounded-3xl overflow-hidden
      border border-cyan-500/40
      bg-black/90 backdrop-blur-xl
      shadow-[0_0_40px_rgba(0,255,255,0.2)]
      text-white
      select-none
      ${dragging
                    ? "cursor-grabbing"
                    : mode !== "small"
                        ? "cursor-grab"
                        : "cursor-pointer"
                }
      `}
        >
            {/* ========================= */}
            {/* SMALL FACE */}
            {/* ========================= */}

            {mode === "small" && (
                <div
                    onClick={() => {
                        setPosition(prev => ({
                            ...prev,
                            y: prev.y - 410,
                        }));

                        setMode("normal");
                    }}
                    className="
          w-full h-full
          flex flex-col items-center justify-center
          bg-linear-to-br from-cyan-900 to-black
          relative
        "
                >
                    {/* glow */}
                    <div className="absolute inset-0 opacity-30 bg-cyan-500 blur-3xl" />

                    {/* eyes */}
                    <div className="flex gap-3 mb-2 z-10">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    </div>

                    {/* mouth */}
                    <div className="w-6 h-2 border-b-2 border-cyan-400 rounded-full z-10" />

                    {/* logo */}
                    <div className="mt-2 text-cyan-400 text-xs z-10">
                        ⚡ KUBOC
                    </div>
                </div>
            )}

            {/* ========================= */}
            {/* NORMAL + LARGE */}
            {/* ========================= */}

            {mode !== "small" && (
                <div className="flex flex-col h-full">
                    {/* HEADER */}
                    <div
                        className="
            h-16
            border-b border-cyan-500/30
            bg-linear-to-r from-cyan-900/70 to-purple-900/70
            flex items-center justify-between
            px-4
          "
                    >
                        <div>
                            <h1 className="font-bold tracking-widest text-cyan-400">
                                KUBOC
                            </h1>

                            <p className="text-[10px] text-purple-300">
                                AIML // GAMING // HACK CORE
                            </p>
                        </div>

                        <div className="flex gap-2">
                            {/* NORMAL */}
                            <button
                                onClick={() => setMode("normal")}
                                className="w-7 h-7 rounded bg-cyan-900 hover:bg-cyan-700"
                            >
                                —
                            </button>

                            {/* LARGE */}
                            <button
                                onClick={() => setMode("large")}
                                className="w-7 h-7 rounded bg-cyan-900 hover:bg-cyan-700"
                            >
                                □
                            </button>

                            {/* RESET */}
                            <button
                                onClick={resetPosition}
                                className="w-7 h-7 rounded bg-red-900 hover:bg-red-700"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* CHAT AREA */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`
                  max-w-[80%]
                  px-4 py-2 rounded-xl
                  text-sm
                  ${msg.sender === "user"
                                            ? "bg-cyan-600"
                                            : "bg-zinc-900 border border-cyan-500/20 text-cyan-300"
                                        }
                `}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* INPUT */}
                    <div className="p-3 border-t border-cyan-500/20">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                                placeholder="Enter command..."
                                className="
                flex-1
                bg-zinc-900
                border border-cyan-500/20
                rounded-xl
                px-3 py-2
                outline-none
                text-cyan-300
              "
                            />

                            <button
                                onClick={sendMessage}
                                className="
                px-4
                rounded-xl
                bg-cyan-600
                hover:bg-cyan-500
              "
                            >
                                ⚡
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}