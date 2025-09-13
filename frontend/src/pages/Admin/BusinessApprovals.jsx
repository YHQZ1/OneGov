import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import API from "./_api";

export default function BusinessApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API.businesses}?status=pending`);
      const data = await r.json().catch(() => ({}));
      setPending(Array.isArray(data.items) ? data.items : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const act = async (id, action) => {
    const endpoint =
      action === "approve"
        ? `${API.businesses}/${id}/approve`
        : `${API.businesses}/${id}/reject`;
    const res = await fetch(endpoint, { method: "POST" });
    if (!res.ok) return alert(`${action} failed`);
    fetchPending();
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Local Business Approvals</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Review and approve business setup requests. Only approved businesses appear to citizens.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        {loading && <p className="text-gray-600">Loading…</p>}
        {pending.length === 0 ? (
          <div className="text-gray-600">No pending requests.</div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {pending.map((b) => (
              <div key={b.id} className="bg-white border rounded-xl p-5 shadow-sm">
                <div className="text-lg font-semibold">{b.name}</div>
                <div className="text-sm text-gray-600">{b.category}</div>
                <div className="text-xs text-gray-500 mt-1">{b.address}</div>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => act(b.id, "approve")}
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve
                  </button>
                  <button
                    onClick={() => act(b.id, "reject")}
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
