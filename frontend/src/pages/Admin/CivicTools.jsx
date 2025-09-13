import { useEffect, useState } from "react";
import { X } from "lucide-react";
import API from "./_api";

export default function CivicTools() {
  // Polls
  const [polls, setPolls] = useState([]);
  const [pollForm, setPollForm] = useState({ question: "", options: ["", ""], status: "Active" });

  const fetchPolls = async () => {
    const r = await fetch(API.polls);
    const data = await r.json().catch(() => ({}));
    setPolls(Array.isArray(data.items) ? data.items : []);
  };
  useEffect(() => {
    fetchPolls();
  }, []);

  const addPollOption = () => setPollForm((f) => ({ ...f, options: [...f.options, ""] }));
  const setPollOption = (i, v) =>
    setPollForm((f) => {
      const next = [...f.options];
      next[i] = v;
      return { ...f, options: next };
    });
  const removePollOption = (i) => setPollForm((f) => ({ ...f, options: f.options.filter((_, idx) => idx !== i) }));

  const submitPoll = async (e) => {
    e.preventDefault();
    const opts = pollForm.options.map((o) => o.trim()).filter(Boolean);
    if (!pollForm.question.trim() || opts.length < 2) return alert("Enter a question and at least 2 options");
    const payload = { question: pollForm.question, options: opts, status: pollForm.status };
    const res = await fetch(API.polls, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) return alert("Failed to create poll");
    setPollForm({ question: "", options: ["", ""], status: "Active" });
    fetchPolls();
  };

  // Grievances
  const [grievances, setGrievances] = useState([]);
  const fetchGrievances = async () => {
    const r = await fetch(`${API.grievances}?status=pending`);
    const data = await r.json().catch(() => ({}));
    setGrievances(Array.isArray(data.items) ? data.items : []);
  };
  const updateGrievance = async (id, nextStatus) => {
    const res = await fetch(`${API.grievances}/${id}/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    if (!res.ok) return alert("Update failed");
    fetchGrievances();
  };

  // Feedback
  const [feedback, setFeedback] = useState([]);
  const fetchFeedback = async () => {
    const r = await fetch(`${API.feedback}?status=new`);
    const data = await r.json().catch(() => ({}));
    setFeedback(Array.isArray(data.items) ? data.items : []);
  };

  useEffect(() => {
    fetchGrievances();
    fetchFeedback();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Civic Engagement Tools</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Create polls and manage citizen grievances and feedback.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 space-y-10">
        {/* Polls */}
        <div className="bg-white border rounded-xl p-6 shadow">
          <h2 className="text-xl font-bold mb-3">Create Poll</h2>
          <form onSubmit={submitPoll} className="space-y-3">
            <input
              className="w-full px-4 py-3 rounded-lg border"
              placeholder="Poll Question"
              value={pollForm.question}
              onChange={(e) => setPollForm((f) => ({ ...f, question: e.target.value }))}
            />
            <div className="space-y-2">
              {pollForm.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    className="flex-1 px-4 py-3 rounded-lg border"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => setPollOption(idx, e.target.value)}
                  />
                  {pollForm.options.length > 2 && (
                    <button type="button" className="p-2 rounded-lg border hover:bg-gray-50" onClick={() => removePollOption(idx)}>
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <select
                className="px-4 py-3 rounded-lg border bg-white"
                value={pollForm.status}
                onChange={(e) => setPollForm((f) => ({ ...f, status: e.target.value }))}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <button type="button" onClick={addPollOption} className="px-3 py-2 rounded-lg border hover:bg-gray-50">
                + Add Option
              </button>
              <button type="submit" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                Create Poll
              </button>
              <div className="text-gray-500 text-sm">POST → <code>{API.polls}</code></div>
            </div>
          </form>

          {/* Existing polls */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Existing Polls</h3>
            {polls.length === 0 ? (
              <div className="text-gray-500">No polls yet.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {polls.map((p) => (
                  <div key={p.id || p.question} className="border rounded-xl p-4">
                    <div className="font-medium">{p.question}</div>
                    <div className="text-xs text-gray-500 mt-1">{(p.options || []).join(", ")}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grievances */}
        <div className="bg-white border rounded-xl p-6 shadow">
          <h2 className="text-xl font-bold mb-3">Grievances (Pending)</h2>
          {grievances.length === 0 ? (
            <div className="text-gray-500">No pending grievances.</div>
          ) : (
            <div className="space-y-3">
              {grievances.map((g) => (
                <div key={g.id} className="border rounded-xl p-4">
                  <div className="font-medium">{g.subject}</div>
                  <div className="text-sm text-gray-600">{g.category}</div>
                  <div className="text-xs text-gray-500 mt-1">{g.created_at}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateGrievance(g.id, "in_progress")}
                      className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white"
                    >
                      Mark In-Progress
                    </button>
                    <button
                      onClick={() => updateGrievance(g.id, "resolved")}
                      className="px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                    >
                      Resolve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Feedback */}
        <div className="bg-white border rounded-xl p-6 shadow">
          <h2 className="text-xl font-bold mb-3">Feedback (New)</h2>
          {feedback.length === 0 ? (
            <div className="text-gray-500">No new feedback.</div>
          ) : (
            <div className="space-y-3">
              {feedback.map((f) => (
                <div key={f.id} className="border rounded-xl p-4">
                  <div className="font-medium">{f.topic}</div>
                  <div className="text-sm text-gray-600">{f.message}</div>
                  <div className="text-xs text-gray-500 mt-1">By {f.user_name || "Anonymous"}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
