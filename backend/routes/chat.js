// backend/routes/chat.js
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Load FAQ map
let FAQ_MAP = {};
try {
  const raw = fs.readFileSync(path.join(__dirname, '..', 'faq.json'), 'utf8');
  FAQ_MAP = JSON.parse(raw);
  console.log('[chat] FAQ map loaded, entries:', Object.keys(FAQ_MAP).length);
} catch (e) {
  console.warn('[chat] Could not load faq.json — continuing without FAQ map', e.message);
}

function findFaqSnippet(message) {
  if (!message) return null;
  const lower = message.toLowerCase();
  for (const key of Object.keys(FAQ_MAP)) {
    const entry = FAQ_MAP[key];
    if (!entry || !entry.keywords) continue;
    for (const kw of entry.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return { key, snippet: entry.snippet, action: entry.action || null };
      }
    }
  }
  return null;
}

// Robust extractor for Gemini response shapes
function extractGeminiText(data) {
  try {
    if (!data) return null;
    if (data.outputs && Array.isArray(data.outputs) && data.outputs[0]) {
      const contents = data.outputs[0].content;
      if (Array.isArray(contents)) {
        for (const c of contents) {
          if (typeof c === 'string' && c.trim()) return c;
          if (c?.text) return c.text;
          if (c?.parts && Array.isArray(c.parts)) {
            const joined = c.parts.map(p => p.text || '').join('');
            if (joined.trim()) return joined;
          }
        }
      } else if (typeof contents === 'string' && contents.trim()) return contents;
    }
    if (data.candidates && Array.isArray(data.candidates) && data.candidates[0]) {
      const cand = data.candidates[0].content;
      if (!cand) { /* continue */ }
      else if (typeof cand === 'string' && cand.trim()) return cand;
      else if (Array.isArray(cand)) {
        for (const p of cand) {
          if (typeof p === 'string' && p.trim()) return p;
          if (p?.text) return p.text;
        }
      } else if (typeof cand === 'object') {
        if (cand.parts && Array.isArray(cand.parts)) {
          const joined = cand.parts.map(p => p.text || '').join('');
          if (joined.trim()) return joined;
        }
        if (cand.text) return cand.text;
      }
    }
    if (typeof data.text === 'string' && data.text.trim()) return data.text;
    if (data.outputs && data.outputs[0] && typeof data.outputs[0].text === 'string') return data.outputs[0].text;
  } catch (e) {
    console.warn('extractGeminiText fallback error', e);
  }
  return null;
}

router.post('/chat', async (req, res) => {
  console.log('[chat] incoming request body:', JSON.stringify(req.body).slice(0, 2000));
  try {
    const { message, context } = req.body;
    if (!message || !message.trim()) return res.status(400).json({ error: 'No message provided' });

    // Strong but concise system prompt
    const systemPrompt = `You are SiteGuide, a concise website assistant. Prefer authoritative site snippets when provided. Start with one-sentence direct answer, then 1-2 short steps. If the snippet or page context clearly answers the question, use it verbatim. If you truly cannot answer, say "I don't know that — please check your account or contact support." Keep responses short and actionable.`;

    // Try FAQ
    const faqMatch = findFaqSnippet(message);
    let faqSnippet = null;
    let faqAction = null;
    if (faqMatch) {
      faqSnippet = faqMatch.snippet;
      faqAction = faqMatch.action;
      console.log('[chat] FAQ matched key:', faqMatch.key);
    }

    // Build combined prompt
    const promptParts = [systemPrompt];
    if (faqSnippet) promptParts.push(`Authoritative site snippet: ${faqSnippet}`);
    if (context) promptParts.push(`Page context: ${context}`);
    promptParts.push(`User question: ${message}`);
    const combinedPrompt = promptParts.join('\n\n');

    // GEMINI branch
    if (process.env.USE_GEMINI === 'true') {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) return res.status(500).json({ error: 'Gemini key not configured' });

      const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
      const contents = [{ role: 'user', parts: [{ text: combinedPrompt }] }];
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

      try {
        console.log('[chat] calling Gemini model:', model);
        const r = await axios.post(url, { contents }, { headers: { 'Content-Type': 'application/json' }, timeout: 45000 });
        const replyText = extractGeminiText(r.data) || JSON.stringify(r.data).slice(0, 2000);
        const actions = [];
        if (faqAction) actions.push(faqAction);
        return res.json({ reply: replyText, actions });
      } catch (gerr) {
        console.error('[chat] Gemini error:', gerr?.response?.data || gerr.message || gerr);
        const details = gerr?.response?.data || gerr?.message;
        return res.status(500).json({ error: 'Gemini error', details });
      }
    }

    // OpenAI fallback (optional)
    const OPENAI_KEY = process.env.OPENAI_KEY;
    if (!OPENAI_KEY) return res.status(500).json({ error: 'No AI key configured' });

    const messages = [{ role: 'system', content: systemPrompt }];
    if (faqSnippet) messages.push({ role: 'system', content: `Authoritative site snippet: ${faqSnippet}` });
    if (context) messages.push({ role: 'system', content: `Page context: ${context}` });
    messages.push({ role: 'user', content: message });

    const payload = { model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo', messages, max_tokens: 300, temperature: 0.15 };

    const openaiResp = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${OPENAI_KEY}` },
      timeout: 20000
    });

    const openaiReply = openaiResp.data?.choices?.[0]?.message?.content || 'Sorry, no reply.';
    const actions = [];
    if (faqAction) actions.push(faqAction);
    return res.json({ reply: openaiReply, actions });
  } catch (err) {
    console.error('[chat] Server error:', err?.response?.data || err?.message || err);
    const maybeErr = err?.response?.data;
    if (maybeErr) return res.status(500).json({ error: 'AI error', details: maybeErr });
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;