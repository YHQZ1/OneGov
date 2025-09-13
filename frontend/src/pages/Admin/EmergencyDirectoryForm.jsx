import { useEffect, useState } from "react";
import API from "./_api";

export default function EmergencyDirectoryForm() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    number: "",
    category: "Police", // Police | Fire | Ambulance | RTO | Disaster | Women | Children | Other
    area: "",
    hours: "24x7",
    notes: "",
    status: "Active",
  });

  const categories = ["Police", "Fire", "Ambulance", "RTO", "Disaster", "Women", "Children", "Other"];

  const fetchItems = async () => {
    const r = await fetch(API.emergency);
    const data = await r.json().catch(() => ({}));
    setItems(Array.isArray(data.items) ? data.items : []);
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    const res = await fetch(API.emergency, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return alert("Failed to add emergency contact");
    setForm({
      title: "",
      number: "",
      category: "Police",
      area: "",
      hours: "24x7",
      notes: "",
      status: "Active",
    });
    fetchItems();
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Emergency Directory</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Add and manage emergency contacts and advisories for citizens.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <form onSubmit={submit} className="max-w-3xl mx-auto bg-white border rounded-xl p-6 shadow">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="px-4 py-3 rounded-lg border"
              placeholder="Title (e.g., Women Helpline)"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
            <input
              className="px-4 py-3 rounded-lg border"
              placeholder="Phone Number"
              value={form.number}
              onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
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
              className="px-4 py-3 rounded-lg border"
              placeholder="Area (Ward/District/City)"
              value={form.area}
              onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
            />
            <input
              className="px-4 py-3 rounded-lg border"
              placeholder="Hours (e.g., 24x7)"
              value={form.hours}
              onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))}
            />
            <select
              className="px-4 py-3 rounded-lg border bg-white"
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <textarea
              className="px-4 py-3 rounded-lg border md:col-span-2"
              rows={3}
              placeholder="Notes / update details (optional)"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              Add Emergency Contact
            </button>
            <div className="text-gray-500 text-sm">POST → <code>{API.emergency}</code></div>
          </div>
        </form>

        {/* Existing directory */}
        <div className="max-w-4xl mx-auto mt-8">
          <h3 className="text-lg font-semibold mb-3">Directory</h3>
          {items.length === 0 ? (
            <div className="text-gray-500">No entries yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((it) => (
                <div key={it.id || it.title} className="bg-white border rounded-xl p-4">
                  <div className="font-medium">{it.title}</div>
                  <div className="text-sm text-gray-600">{it.category}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {it.number} • {it.area} • {it.hours}
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
