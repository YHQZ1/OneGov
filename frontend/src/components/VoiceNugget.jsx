// frontend/src/components/VoiceNugget.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// NOTE: use your backend URL here — absolute URL avoids proxy confusion
const API_URL = 'http://localhost:5000/api/chat';

export default function VoiceNugget() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [status, setStatus] = useState('Idle');
  const [actions, setActions] = useState([]);
  const recognitionRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const navigate = useNavigate();

  const wantRecognitionRef = useRef(false);
  const isStartingRef = useRef(false);
  const restartAttemptsRef = useRef(0);

  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRecognition) {
      recognitionRef.current = null;
      setStatus('SpeechRecognition not supported. Use Chrome/Edge.');
      console.warn('[VoiceNugget] SpeechRecognition API not found');
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-IN';
    rec.interimResults = true;
    rec.maxAlternatives = 1;
    rec.continuous = true;

    wantRecognitionRef.current = false;
    isStartingRef.current = false;
    restartAttemptsRef.current = 0;

    rec.onstart = () => {
      console.log('[VoiceNugget] rec.onstart');
      setListening(true);
      setStatus('Listening...');
      isStartingRef.current = false;
    };

    rec.onresult = async (ev) => {
      try {
        const interim = [];
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          interim.push(ev.results[i][0].transcript);
        }
        const interimText = interim.join(' ');
        setTranscript(interimText);

        const last = ev.results[ev.results.length - 1];
        if (last.isFinal) {
          const text = last[0].transcript.trim();
          console.log('[VoiceNugget] final transcript:', text);
          setTranscript(text);
          setStatus('Thinking...');

          const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
          const pageContext = `Path: ${window.location.pathname}. Short desc: ${metaDesc}`;

          console.log('[VoiceNugget] sending to API:', API_URL, { message: text, context: pageContext });
          try {
            const res = await fetch(API_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message: text, context: pageContext })
            });
            console.log('[VoiceNugget] fetch status:', res.status, res.statusText);
            let data;
            try {
              data = await res.json();
              console.log('[VoiceNugget] fetch json response:', data);
            } catch (parseErr) {
              const raw = await res.text();
              console.error('[VoiceNugget] failed to parse JSON, raw text:', raw);
              data = { error: 'invalid_json', raw };
            }
            if (data?.error) {
              setReply(`Error: ${data.error}`);
              setActions([]);
            } else {
              setReply(data?.reply || '(no reply)');
              setActions(data?.actions || []);
              speak(data?.reply || '');
            }
          } catch (err) {
            console.error('[VoiceNugget] backend error', err);
            setReply('Error contacting server');
            setActions([]);
          }
          setStatus('Idle');
        }
      } catch (err) {
        console.error('[VoiceNugget] onresult error', err);
      }
    };

    rec.onerror = (e) => {
      console.error('[VoiceNugget] rec.onerror', e);
      setStatus(`Error: ${e.error || e.message || 'speech error'}`);
      setListening(false);
    };

    rec.onend = () => {
      console.log('[VoiceNugget] rec.onend — wantRecognition=', wantRecognitionRef.current, 'restarts=', restartAttemptsRef.current);
      setListening(false);
      isStartingRef.current = false;

      if (wantRecognitionRef.current) {
        if (restartAttemptsRef.current < 1) {
          restartAttemptsRef.current += 1;
          console.log('[VoiceNugget] auto-restart attempt', restartAttemptsRef.current);
          setTimeout(() => {
            try {
              rec.start();
            } catch (e) {
              console.warn('[VoiceNugget] auto-restart failed', e);
              wantRecognitionRef.current = false;
              setStatus('Idle');
            }
          }, 300);
          return;
        } else {
          wantRecognitionRef.current = false;
          setStatus('Idle');
          console.warn('[VoiceNugget] gave up restarting recognition after 1 attempt');
          return;
        }
      }

      setStatus('Idle');
    };

    recognitionRef.current = {
      raw: rec,
      _markManualStop: () => { wantRecognitionRef.current = false; isStartingRef.current = false; }
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
      console.log('[VoiceNugget] start already in progress — ignoring duplicate click');
      return;
    }
    isStartingRef.current = true;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setStatus('getUserMedia not supported');
      isStartingRef.current = false;
      wantRecognitionRef.current = false;
      return;
    }

    try {
      setStatus('Requesting mic permission...');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatus('Permission granted — starting recognition');

      const recObj = recognitionRef.current;
      if (!recObj || !recObj.raw) {
        setStatus('SpeechRecognition unavailable after permission');
        isStartingRef.current = false;
        wantRecognitionRef.current = false;
        return;
      }

      setTimeout(() => {
        try {
          recObj.raw.start();
        } catch (e) {
          console.warn('[VoiceNugget] start() error', e);
          isStartingRef.current = false;
        }
      }, 100);
    } catch (permErr) {
      console.error('[VoiceNugget] mic permission denied', permErr);
      setStatus('Microphone permission denied.');
      isStartingRef.current = false;
      wantRecognitionRef.current = false;
    }
  }

  function stopListening() {
    wantRecognitionRef.current = false;
    const recObj = recognitionRef.current;
    if (!recObj || !recObj.raw) {
      setListening(false);
      setStatus('Idle');
      return;
    }
    try {
      if (typeof recObj._markManualStop === 'function') recObj._markManualStop();
      recObj.raw.stop();
    } catch (e) {
      console.warn('[VoiceNugget] recognition.stop() issue', e);
    }
    isStartingRef.current = false;
    setListening(false);
    setStatus('Idle');
  }

  function speak(text) {
    if (!synthRef.current || !('speechSynthesis' in window)) {
      console.warn('[VoiceNugget] speechSynthesis not available');
      return;
    }
    if (!text || typeof text !== 'string' || text.trim() === '') return;
    if (synthRef.current.speaking) synthRef.current.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-IN';
    u.rate = 1;
    u.onend = () => console.log('[VoiceNugget] TTS ended');
    u.onerror = (e) => console.error('[VoiceNugget] TTS error', e);
    synthRef.current.speak(u);
  }

  async function sendTextFallback() {
    if (!transcript || transcript.trim() === '') return;
    setStatus('Thinking...');
    const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
    const pageContext = `Path: ${window.location.pathname}. Short desc: ${metaDesc}`;
    console.log('[VoiceNugget] sendTextFallback ->', { message: transcript, context: pageContext });
    try {
      const res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: transcript, context: pageContext }) });
      console.log('[VoiceNugget] sendTextFallback status', res.status);
      let d;
      try { d = await res.json(); console.log('[VoiceNugget] sendTextFallback json', d); }
      catch (e) { const raw = await res.text(); console.error('[VoiceNugget] sendTextFallback raw', raw); d = { error: 'invalid_json', raw }; }
      if (d?.error) setReply(`Error: ${d.error}`); else { setReply(d?.reply || ''); setActions(d?.actions || []); speak(d?.reply || ''); }
    } catch (err) {
      console.error('[VoiceNugget] sendTextFallback error', err);
      setReply('Error contacting server');
    }
    setStatus('Idle');
  }

  function clearAll() { setTranscript(''); setReply(''); setActions([]); setStatus('Idle'); }

  function handleAction(a) {
    if (!a) return;
    if (a.type === 'navigate' && a.url) {
      try { navigate(a.url); } catch (e) { window.location.href = a.url; }
      setOpen(false);
    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setOpen(true)} aria-label="Open voice assistant" className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white hover:scale-105 transform transition" title="Talk to assistant">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
            <path d="M5 10a5 5 0 0010 0h-2a3 3 0 11-6 0H5z" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-100 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a2 2 0 00-2 2v6a2 2 0 104 0V4a2 2 0 00-2-2z" />
                    <path d="M5 10a5 5 0 0010 0h-2a3 3 0 11-6 0H5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">SiteVoice Assistant</h3>
                  <p className="text-sm text-gray-500">Tap Start and speak — short answers, quick steps.</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button onClick={() => { setOpen(false); stopListening(); }} className="text-sm text-gray-500 hover:text-gray-700">Close</button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <button onClick={() => { if (!listening) startListening(); else stopListening(); }} className={`px-4 py-2 rounded-md font-medium shadow-sm ${listening ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
                  {listening ? 'Stop' : 'Start'}
                </button>

                <button onClick={clearAll} className="px-4 py-2 rounded-md border">Clear</button>

                <div className="text-sm text-gray-500">Status: <span className="font-medium">{status}</span></div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md min-h-[80px]">
                <div className="text-xs text-gray-400">You said</div>
                <div className="mt-1 text-gray-800">{transcript || <span className="text-gray-400">(nothing yet)</span>}</div>
              </div>

              <div className="bg-white p-3 rounded-md border min-h-[80px]">
                <div className="text-xs text-gray-400">Assistant</div>
                <div className="mt-1 text-gray-800 whitespace-pre-wrap">{reply || <span className="text-gray-400">(assistant will reply here)</span>}</div>
              </div>

              <div className="mt-2">
                <input value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Type here if mic fails..." className="w-full border rounded p-2" />
                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={sendTextFallback} className="px-3 py-2 bg-blue-600 text-white rounded">Send</button>
                </div>
              </div>

              {actions && actions.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  {actions.map((a, idx) => (
                    <button key={idx} onClick={() => handleAction(a)} className="px-3 py-2 bg-green-600 text-white rounded">{a.label || 'Action'}</button>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <button onClick={() => { if (reply) speak(reply); }} className="px-4 py-2 rounded-md bg-gray-100">Replay</button>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-400">Tip: Keep queries short. If you denied mic permission earlier, allow it in site settings.</div>
          </div>
        </div>
      )}
    </>
  );
}