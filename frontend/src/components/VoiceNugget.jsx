import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, X, Send, Volume2, Trash2 } from "lucide-react";

// NOTE: use your backend URL here — absolute URL avoids proxy confusion
const API_URL = "http://localhost:5001/api/chat";

export default function VoiceNugget() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("Idle");
  const [actions, setActions] = useState([]);
  const recognitionRef = useRef(null);
  const synthRef = useRef(
    typeof window !== "undefined" ? window.speechSynthesis : null
  );
  const navigate = useNavigate();

  const wantRecognitionRef = useRef(false);
  const isStartingRef = useRef(false);
  const restartAttemptsRef = useRef(0);

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== "undefined" &&
      (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRecognition) {
      recognitionRef.current = null;
      setStatus("SpeechRecognition not supported. Use Chrome/Edge.");
      console.warn("[VoiceNugget] SpeechRecognition API not found");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = "en-IN";
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.continuous = true;

    wantRecognitionRef.current = false;
    isStartingRef.current = false;
    restartAttemptsRef.current = 0;

    rec.onstart = () => {
      console.log("[VoiceNugget] rec.onstart");
      setListening(true);
      setStatus("Listening...");
      isStartingRef.current = false;
    };

    rec.onresult = async (ev) => {
      try {
        const interim = [];
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          interim.push(ev.results[i][0].transcript);
        }
        const interimText = interim.join(" ");
        setTranscript(interimText);

        const last = ev.results[ev.results.length - 1];
        if (last.isFinal) {
          const text = last[0].transcript.trim();
          console.log("[VoiceNugget] final transcript:", text);
          setTranscript(text);
          setStatus("Thinking...");

          const metaDesc =
            document.querySelector('meta[name="description"]')?.content || "";
          const pageContext = `Path: ${window.location.pathname}. Short desc: ${metaDesc}`;

          console.log("[VoiceNugget] sending to API:", API_URL, {
            message: text,
            context: pageContext,
          });
          try {
            const res = await fetch(API_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message: text, context: pageContext }),
            });
            console.log(
              "[VoiceNugget] fetch status:",
              res.status,
              res.statusText
            );
            let data;
            try {
              data = await res.json();
              console.log("[VoiceNugget] fetch json response:", data);
            } catch (parseErr) {
              const raw = await res.text();
              console.error(
                "[VoiceNugget] failed to parse JSON, raw text:",
                raw
              );
              data = { error: "invalid_json", raw };
            }
            if (data?.error) {
              setReply(`Error: ${data.error}`);
              setActions([]);
            } else {
              setReply(data?.reply || "(no reply)");
              setActions(data?.actions || []);
              speak(data?.reply || "");
            }
          } catch (err) {
            console.error("[VoiceNugget] backend error", err);
            setReply("Error contacting server");
            setActions([]);
          }
          setStatus("Idle");
        }
      } catch (err) {
        console.error("[VoiceNugget] onresult error", err);
      }
    };

    rec.onerror = (e) => {
      console.error("[VoiceNugget] rec.onerror", e);
      setStatus(`Error: ${e.error || e.message || "speech error"}`);
      setListening(false);
    };

    rec.onend = () => {
      console.log(
        "[VoiceNugget] rec.onend — wantRecognition=",
        wantRecognitionRef.current,
        "restarts=",
        restartAttemptsRef.current
      );
      setListening(false);
      isStartingRef.current = false;

      if (wantRecognitionRef.current) {
        if (restartAttemptsRef.current < 1) {
          restartAttemptsRef.current += 1;
          console.log(
            "[VoiceNugget] auto-restart attempt",
            restartAttemptsRef.current
          );
          setTimeout(() => {
            try {
              rec.start();
            } catch (e) {
              console.warn("[VoiceNugget] auto-restart failed", e);
              wantRecognitionRef.current = false;
              setStatus("Idle");
            }
          }, 300);
          return;
        } else {
          wantRecognitionRef.current = false;
          setStatus("Idle");
          console.warn(
            "[VoiceNugget] gave up restarting recognition after 1 attempt"
          );
          return;
        }
      }

      setStatus("Idle");
    };

    recognitionRef.current = {
      raw: rec,
      _markManualStop: () => {
        wantRecognitionRef.current = false;
        isStartingRef.current = false;
      },
    };

    return () => {
      try {
        if (recognitionRef.current && recognitionRef.current.raw) {
          recognitionRef.current.raw.onresult = null;
          recognitionRef.current.raw.onend = null;
          recognitionRef.current.raw.onerror = null;
        }
      } catch (e) {}
    };
  }, [open]);

  async function startListening() {
    wantRecognitionRef.current = true;
    if (isStartingRef.current) {
      console.log(
        "[VoiceNugget] start already in progress — ignoring duplicate click"
      );
      return;
    }
    isStartingRef.current = true;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus("getUserMedia not supported");
      isStartingRef.current = false;
      wantRecognitionRef.current = false;
      return;
    }

    try {
      setStatus("Requesting mic permission...");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatus("Permission granted — starting recognition");

      const recObj = recognitionRef.current;
      if (!recObj || !recObj.raw) {
        setStatus("SpeechRecognition unavailable after permission");
        isStartingRef.current = false;
        wantRecognitionRef.current = false;
        return;
      }

      setTimeout(() => {
        try {
          recObj.raw.start();
        } catch (e) {
          console.warn("[VoiceNugget] start() error", e);
          isStartingRef.current = false;
        }
      }, 100);
    } catch (permErr) {
      console.error("[VoiceNugget] mic permission denied", permErr);
      setStatus("Microphone permission denied.");
      isStartingRef.current = false;
      wantRecognitionRef.current = false;
    }
  }

  function stopListening() {
    wantRecognitionRef.current = false;
    const recObj = recognitionRef.current;
    if (!recObj || !recObj.raw) {
      setListening(false);
      setStatus("Idle");
      return;
    }
    try {
      if (typeof recObj._markManualStop === "function")
        recObj._markManualStop();
      recObj.raw.stop();
    } catch (e) {
      console.warn("[VoiceNugget] recognition.stop() issue", e);
    }
    isStartingRef.current = false;
    setListening(false);
    setStatus("Idle");
  }

  function speak(text) {
    if (!synthRef.current || !("speechSynthesis" in window)) {
      console.warn("[VoiceNugget] speechSynthesis not available");
      return;
    }
    if (!text || typeof text !== "string" || text.trim() === "") return;
    if (synthRef.current.speaking) synthRef.current.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    u.rate = 1;
    u.onend = () => console.log("[VoiceNugget] TTS ended");
    u.onerror = (e) => console.error("[VoiceNugget] TTS error", e);
    synthRef.current.speak(u);
  }

  async function sendTextFallback() {
    if (!transcript || transcript.trim() === "") return;
    setStatus("Thinking...");
    const metaDesc =
      document.querySelector('meta[name="description"]')?.content || "";
    const pageContext = `Path: ${window.location.pathname}. Short desc: ${metaDesc}`;
    console.log("[VoiceNugget] sendTextFallback ->", {
      message: transcript,
      context: pageContext,
    });
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: transcript, context: pageContext }),
      });
      console.log("[VoiceNugget] sendTextFallback status", res.status);
      let d;
      try {
        d = await res.json();
        console.log("[VoiceNugget] sendTextFallback json", d);
      } catch (e) {
        const raw = await res.text();
        console.error("[VoiceNugget] sendTextFallback raw", raw);
        d = { error: "invalid_json", raw };
      }
      if (d?.error) setReply(`Error: ${d.error}`);
      else {
        setReply(d?.reply || "");
        setActions(d?.actions || []);
        speak(d?.reply || "");
      }
    } catch (err) {
      console.error("[VoiceNugget] sendTextFallback error", err);
      setReply("Error contacting server");
    }
    setStatus("Idle");
  }

  function clearAll() {
    setTranscript("");
    setReply("");
    setActions([]);
    setStatus("Idle");
  }

  function handleAction(a) {
    if (!a) return;
    if (a.type === "navigate" && a.url) {
      try {
        navigate(a.url);
      } catch (e) {
        window.location.href = a.url;
      }
      setOpen(false);
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open voice assistant"
          className="flex items-center justify-center w-20 h-20 rounded-full shadow-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white hover:scale-110 transform transition-all duration-200 hover:shadow-2xl"
          title="Talk to assistant"
        >
          {listening ? (
            <div className="animate-pulse">
              <Mic className="h-10 w-10" />
            </div>
          ) : (
            <Mic className="h-10 w-10" />
          )}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Voice Assistant</h3>
                    <p className="text-blue-100 text-sm">
                      Tap Start and speak — short answers, quick steps.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOpen(false);
                    stopListening();
                  }}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* Status and Controls */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Status:{" "}
                  <span className="font-medium text-blue-700">{status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!listening) startListening();
                      else stopListening();
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all ${
                      listening
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {listening ? (
                      <>
                        <MicOff className="h-4 w-4" /> Stop
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4" /> Start
                      </>
                    )}
                  </button>

                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" /> Clear
                  </button>
                </div>
              </div>

              {/* Transcript Box */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-xs text-blue-700 font-medium mb-1">
                  You said
                </div>
                <div className="mt-1 text-gray-800 min-h-6">
                  {transcript || (
                    <span className="text-gray-400">(nothing yet)</span>
                  )}
                </div>
              </div>

              {/* Assistant Response Box */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="text-xs text-gray-500 font-medium mb-1">
                  Assistant
                </div>
                <div className="mt-1 text-gray-800 whitespace-pre-wrap min-h-6">
                  {reply || (
                    <span className="text-gray-400">
                      (assistant will reply here)
                    </span>
                  )}
                </div>
              </div>

              {/* Text Input Fallback */}
              <div className="mt-2">
                <div className="relative flex">
                  <input
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Type here if mic fails..."
                    className="flex-1 border border-gray-300 rounded-l-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={sendTextFallback}
                    disabled={!transcript.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-r-lg font-medium shadow-sm hover:bg-blue-700 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              {actions && actions.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  <div className="text-xs text-gray-500 font-medium">
                    Quick Actions
                  </div>
                  {actions.map((a, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAction(a)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-left"
                    >
                      {a.label || "Action"}
                    </button>
                  ))}
                </div>
              )}

              {/* Replay Button */}
              {reply && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      if (reply) speak(reply);
                    }}
                    className="flex items-center gap-1 px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <Volume2 className="h-4 w-4" /> Replay
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-3 border-t border-gray-200">
              <div className="text-xs text-gray-500 text-center">
                Tip: Keep queries short. If you denied mic permission earlier,
                allow it in site settings.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
