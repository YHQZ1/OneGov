import { useMemo, useState } from "react";
import {
  Home,
  FileText,
  Briefcase,
  Calendar,
  User,
  Phone,
  ShieldAlert,
  Flame,
  Hospital,
  Bus,
  Building2,
  Plug,
  Droplets,
  AlarmSmoke,
} from "lucide-react";

const HOTLINES = [
  // Emergency (always first)
  {
    id: "police",
    category: "emergency",
    title: "Call Police",
    phone: "100",
    color: "bg-red-600",
    icon: ShieldAlert,
    badge: "24×7",
  },
  {
    id: "fire",
    category: "emergency",
    title: "Call Fire Department",
    phone: "101",
    color: "bg-blue-600",
    icon: Flame,
    badge: "24×7",
  },
  {
    id: "ambulance",
    category: "emergency",
    title: "Call Ambulance",
    phone: "102",
    color: "bg-green-600",
    icon: Hospital,
    badge: "24×7",
  },

  // Government
  {
    id: "rto",
    category: "government",
    title: "RTO / Transport Helpline",
    phone: "1800123456",
    hours: "Mon–Sat 9am–6pm",
    icon: Bus,
    verified: true,
  },
  {
    id: "municipal",
    category: "government",
    title: "Municipal Services",
    phone: "1800266221",
    badge: "Toll-free",
    icon: Building2,
  },
  {
    id: "cyber",
    category: "government",
    title: "Cybercrime Helpline",
    phone: "1930",
    badge: "24×7",
    icon: ShieldAlert,
    verified: true,
  },

  // Utilities
  {
    id: "electric",
    category: "utility",
    title: "Electricity Outage",
    phone: "1912",
    badge: "24×7",
    icon: Plug,
  },
  {
    id: "water",
    category: "utility",
    title: "Water Supply Issues",
    phone: "1916",
    icon: Droplets,
  },
  {
    id: "gas",
    category: "utility",
    title: "Gas Leak Emergency",
    phone: "1906",
    badge: "24×7",
    icon: AlarmSmoke,
  },
];

const SECTIONS = [
  { key: "emergency", title: "Emergency Services" },
  { key: "government", title: "Government Hotlines" },
  { key: "utility", title: "Utilities" },
];

export default function Emergency() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return HOTLINES.filter(
      (h) =>
        h.title.toLowerCase().includes(q) ||
        h.hours?.toLowerCase().includes(q) ||
        h.badge?.toLowerCase().includes(q)
    );
  }, [query]);

  function HotlineRow({ h }) {
    const Icon = h.icon ?? Phone;
    return (
      <div className="flex items-center justify-between bg-white rounded-lg shadow px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900">{h.title}</div>
            <div className="text-xs text-gray-500">
              {h.hours || h.badge || (h.verified ? "Verified" : "")}
              {h.verified ? (
                <span className="ml-2 inline-block text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">
                  Verified
                </span>
              ) : null}
              {h.badge ? (
                <span className="ml-2 inline-block text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                  {h.badge}
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <a
          href={`tel:${h.phone}`}
          className="flex items-center gap-2 rounded-full bg-gray-900 text-white text-sm px-3 py-2 hover:bg-gray-800"
        >
          <Phone className="w-4 h-4" />
          {h.phone}
        </a>
      </div>
    );
  }

  function EmergencyButtons() {
    const em = filtered.filter((h) => h.category === "emergency");
    return (
      <div className="space-y-3">
        {em.map((h) => (
          <a
            key={h.id}
            href={`tel:${h.phone}`}
            className={`w-full inline-flex items-center justify-center ${
              h.color ?? "bg-gray-900"
            } text-white rounded-lg py-3 font-semibold shadow`}
          >
            {h.icon ? <h.icon className="w-5 h-5 mr-2" /> : null}
            {h.title}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Map card you already have can sit above this */}

      {/* Search */}
      <div className="p-4">
        <input
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 shadow"
          placeholder="Search helplines (e.g., RTO, electricity, gas)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Emergency buttons */}
      <div className="px-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Emergency Services
        </h2>
        <EmergencyButtons />
      </div>

      {/* Sections */}
      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
        {SECTIONS.filter((s) => s.key !== "emergency").map((sec) => {
          const items = filtered.filter((h) => h.category === sec.key);
          if (!items.length) return null;
          return (
            <section key={sec.key}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {sec.title}
              </h3>
              <div className="space-y-3">
                {items.map((h) => (
                  <HotlineRow key={h.id} h={h} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
