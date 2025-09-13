import { useEffect, useState } from "react";
import API from "./_api";

export default function CommunityEventsForm() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "Festival",
    date: "",
    time: "",
    location: "",
    description: "",
    imageUrl: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);
  const categories = ["Festival", "Workshop", "Educational", "Drive", "Other"];

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API.events}`);
      const data = await r.json().catch(() => ({}));
      setEvents(Array.isArray(data.items) ? data.items : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const submitEvent = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    const res = await fetch(API.events, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return alert("Failed to create event");
    setForm({
      title: "",
      category: "Festival",
      date: "",
      time: "",
      location: "",
      description: "",
      imageUrl: "",
      status: "Active",
    });
    fetchEvents();
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Community Events</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Publish local festivals, workshops, clean-up drives, and more.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <form onSubmit={submitEvent} className="max-w-3xl mx-auto bg-white border rounded-xl p-6 shadow">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="px-4 py-3 rounded-lg border"
              placeholder="Event Title"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
            <select
              className="px-4 py-3 rounded-lg border bg-white"
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="date"
              className="px-4 py-3 rounded-lg border"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            />
            <input
              type="time"
              className="px-4 py-3 rounded-lg border"
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            />
            <input
              className="px-4 py-3 rounded-lg border md:col-span-2"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            />
            <input
              className="px-4 py-3 rounded-lg border md:col-span-2"
              placeholder="Image URL (optional)"
              value={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            />
            <textarea
              className="px-4 py-3 rounded-lg border md:col-span-2"
              rows={3}
              placeholder="Short Description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <select
              className="px-4 py-3 rounded-lg border bg-white"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <button type="submit" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              Create Event
            </button>
            <div className="text-gray-500 text-sm">POST → <code>{API.events}</code></div>
          </div>
        </form>

        {/* Existing events */}
        <div className="max-w-4xl mx-auto mt-8">
          <h3 className="text-lg font-semibold mb-3">Existing Events</h3>
          {loading ? (
            <div className="text-gray-500">Loading…</div>
          ) : events.length === 0 ? (
            <div className="text-gray-500">No events yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {events.map((e) => (
                <div key={e.id || e.title} className="bg-white border rounded-xl p-4">
                  <div className="font-medium">{e.title}</div>
                  <div className="text-sm text-gray-600">{e.category}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {e.date} {e.time && `• ${e.time}`} • {e.location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
