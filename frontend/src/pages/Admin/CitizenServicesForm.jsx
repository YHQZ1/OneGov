import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  Link as LinkIcon,
  Plus,
  X,
} from "lucide-react";

/* ===========================
   Templates (prefills)
   =========================== */
const SERVICE_TEMPLATES = [
  {
    key: "birthCertificate",
    label: "Certificates → Birth Certificate",
    defaults: {
      title: "Birth Certificate Issuance",
      serviceType: "Other",
      description:
        "Apply for a birth certificate. Upload required documents and track status.",
      process:
        "Fill application → Upload hospital/birth proof → Pay fee (if any) → Track status → Download certificate",
      hours: "Mon–Fri 09:00–17:00",
      eligibility: "Resident of jurisdiction; valid birth proof",
    },
  },
  {
    key: "deathCertificate",
    label: "Certificates → Death Certificate",
    defaults: {
      title: "Death Certificate Issuance",
      serviceType: "Other",
      description: "Apply for a death certificate for a deceased relative.",
      process:
        "Submit form → Upload death proof → Verification → Pay fee → Download certificate",
      hours: "Mon–Fri 09:00–17:00",
      eligibility: "Next of kin / authorized applicant",
    },
  },
  {
    key: "marriageCertificate",
    label: "Certificates → Marriage Certificate",
    defaults: {
      title: "Marriage Certificate Issuance",
      serviceType: "Other",
      description:
        "Register marriage and obtain a legal marriage certificate.",
      process:
        "Fill couple details → Upload proofs → Schedule appointment (if needed) → Verification → Certificate issuance",
      hours: "Mon–Fri 09:00–17:00",
      eligibility: "Adult residents; required identity and address proofs",
    },
  },
  {
    key: "aadhaarUpdate",
    label: "Identity → Aadhaar Update/Enrollment",
    defaults: {
      title: "Aadhaar Enrollment/Update Facilitation",
      serviceType: "Other",
      description:
        "Guidance and facilitation for Aadhaar enrollment/update with UIDAI.",
      process:
        "Locate nearest center → Book slot (if needed) → Carry required documents → Biometric/Update process",
      hours: "Mon–Sat 09:00–18:00",
      eligibility: "As per UIDAI norms",
    },
  },
  {
    key: "panServices",
    label: "Finance → PAN Application/Update",
    defaults: {
      title: "PAN Card Application & Update",
      serviceType: "Other",
      description:
        "Apply for a new PAN card, update details, or request a reprint.",
      process:
        "Online form → Upload KYC documents → Pay fee → Track status → Receive PAN",
      hours: "24x7 (online portal)",
      eligibility: "Indian citizen/eligible entities",
    },
  },
  {
    key: "utilities",
    label: "Utilities → Electricity/Water/Sanitation",
    defaults: {
      title: "Utility Services (Bills, New Connection, Complaints)",
      serviceType: "Other",
      description:
        "Pay bills, request new connections, report outages or water/sanitation issues.",
      process:
        "Select utility → Enter account/connection details → Pay/Submit request → Track status",
      hours: "24x7 (online), field visits as scheduled",
      eligibility: "Consumers in service area",
    },
  },
  {
    key: "agriculture",
    label: "Agriculture → Subsidies/Insurance",
    defaults: {
      title: "Agriculture Subsidy & Crop Insurance",
      serviceType: "Other",
      description:
        "Apply for farmer subsidies, crop insurance and check market advisories.",
      process:
        "Register/Verify farmer ID → Choose scheme → Upload land/crop details → Submit → Track",
      hours: "Mon–Fri 09:00–17:00",
      eligibility: "Registered farmers; scheme-specific criteria",
    },
  },
  {
    key: "eduHealth",
    label: "Education & Health → Scholarships/Ayushman",
    defaults: {
      title: "Scholarships & Health Schemes (Ayushman Bharat)",
      serviceType: "Medical",
      description:
        "Apply for education scholarships and avail health scheme benefits.",
      process:
        "Check eligibility → Fill form → Upload documents → Verification → Approval",
      hours: "24x7 (online); hospital hours vary",
      eligibility: "Scheme-specific eligibility",
    },
  },
  {
    key: "msme",
    label: "Business/MSME → Udyam, Loans",
    defaults: {
      title: "MSME (Udyam) Registration & Schemes",
      serviceType: "Other",
      description:
        "Register MSME, explore incentives, and apply for credit-linked schemes.",
      process:
        "Udyam registration → Download certificate → Select scheme → Apply",
      hours: "Mon–Fri 09:00–17:00",
      eligibility: "Micro/Small/Medium enterprises",
    },
  },
  {
    key: "legalPolice",
    label: "Legal & Police → e-Complaint/Legal Aid",
    defaults: {
      title: "Online Police Complaint & Legal Aid",
      serviceType: "LegalAid",
      description:
        "File e-complaints and access government-supported legal aid services.",
      process:
        "Describe incident → Attach evidence (optional) → Submit → Track FIR/e-complaint status",
      hours: "24x7 (complaints); legal aid hours vary",
      eligibility: "Residents; case-specific",
    },
  },
  {
    key: "passport",
    label: "Passport & Citizenship",
    defaults: {
      title: "Passport Application & Appointment",
      serviceType: "Other",
      description:
        "Apply for new passport/renewal, schedule appointments and track status.",
      process:
        "Online form → Document upload → Pay fee → Schedule PSK → Track status",
      hours: "24x7 (online); PSK hours vary",
      eligibility: "Indian citizens per MEA norms",
    },
  },
  {
    key: "eseva",
    label: "e-Seva Kendras / Help Desks",
    defaults: {
      title: "e-Seva Kendra (In-Person Assistance)",
      serviceType: "Other",
      description:
        "Physical assistance centers for e-filing and government services support.",
      process:
        "Locate nearest center → Carry required documents → Assisted filing → Receive acknowledgment",
      hours: "Mon–Sat 09:00–18:00",
      eligibility: "Open to citizens",
    },
  },
];

/* ===========================
   Main Admin Page (Citizen Services)
   =========================== */
export default function AdminCitizenServices() {
  const [statusBanner, setStatusBanner] = useState(null); // {type, text}
  const [submitting, setSubmitting] = useState(false);

  // Existing services (GET)
  const [services, setServices] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/admin/public-services");
        const data = await r.json().catch(() => ({}));
        setServices(Array.isArray(data.items) ? data.items : []);
      } catch {
        // ignore for MVP
      }
    })();
  }, []);

  const [form, setForm] = useState({
    title: "",
    serviceType: "Other", // Helpline | ReliefCenter | Shelter | Medical | LegalAid | Other
    description: "",
    process: "",
    contact: { phone: "", email: "", sms: "", whatsapp: "" },
    area: "",
    hours: "",
    eligibility: "",
    resources: [""],
    status: "Active", // Active | Inactive
  });

  const serviceTypes = useMemo(
    () => ["Helpline", "ReliefCenter", "Shelter", "Medical", "LegalAid", "Other"],
    []
  );

  const onTemplateSelect = (key) => {
    const t = SERVICE_TEMPLATES.find((x) => x.key === key);
    if (!t) return;
    setForm((prev) => ({
      ...prev,
      title: t.defaults.title || prev.title,
      serviceType: t.defaults.serviceType || prev.serviceType,
      description: t.defaults.description || prev.description,
      process: t.defaults.process || prev.process,
      hours: t.defaults.hours || prev.hours,
      eligibility: t.defaults.eligibility || prev.eligibility,
    }));
  };

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));
  const setContact = (name, value) =>
    setForm((f) => ({ ...f, contact: { ...f.contact, [name]: value } }));
  const setResource = (idx, value) =>
    setForm((f) => {
      const next = [...f.resources];
      next[idx] = value;
      return { ...f, resources: next };
    });
  const addResource = () =>
    setForm((f) => ({ ...f, resources: [...(f.resources || []), ""] }));
  const removeResource = (idx) =>
    setForm((f) => ({
      ...f,
      resources: (f.resources || []).filter((_, i) => i !== idx),
    }));

  const validate = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required.";
    if (!form.serviceType) errors.serviceType = "Select a service type.";
    if (!form.area.trim()) errors.area = "Area (Ward/District/City) is required.";
    if (
      !form.contact ||
      (!form.contact.phone && !form.contact.email && !form.contact.whatsapp)
    ) {
      errors.contact =
        "At least one contact method (phone/email/whatsapp) is required.";
    }
    return errors;
  };
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusBanner(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setSubmitting(true);
      const payload = {
        title: form.title,
        serviceType: form.serviceType,
        description: form.description || undefined,
        process: form.process || undefined,
        contact: form.contact,
        area: form.area,
        hours: form.hours || undefined,
        eligibility: form.eligibility || undefined,
        resources:
          (form.resources || [])
            .map((r) => r.trim())
            .filter(Boolean).length > 0
            ? form.resources.map((r) => r.trim()).filter(Boolean)
            : undefined,
        status: form.status,
      };

      const res = await fetch("/api/admin/public-services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || `HTTP ${res.status}`);
      }

      setStatusBanner({
        type: "success",
        text: "Service created successfully. Citizens will see it once applicable.",
      });

      // Refresh list after create
      try {
        const r = await fetch("/api/admin/public-services");
        const data = await r.json().catch(() => ({}));
        setServices(Array.isArray(data.items) ? data.items : []);
      } catch {}

      // Optionally reset fields here
      // setForm({ ...form, title: "", description: "", process: "", area: "", contact: { phone:"", email:"", sms:"", whatsapp:"" }, resources: [""] });

    } catch (err) {
      setStatusBanner({
        type: "error",
        text: `Failed to create service: ${err.message}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Admin — Create Citizen Services
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Publish and manage citizen-facing services such as certificates, identity,
              utilities, agriculture, education/health, legal, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <div className="container mx-auto px-4 py-10">
        {/* Banner */}
        {statusBanner && (
          <div
            className={`mb-6 rounded-lg border p-4 ${
              statusBanner.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {statusBanner.text}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6 border border-gray-100"
        >
          {/* Top row: Template helper + Service Type */}
          <div className="mb-6 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Use a Template (optional)
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border bg-white"
                defaultValue=""
                onChange={(e) => onTemplateSelect(e.target.value)}
              >
                <option value="">Select template</option>
                {SERVICE_TEMPLATES.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Prefills common fields; you can edit anything after.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Type
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border bg-white"
                value={form.serviceType}
                onChange={(e) => setField("serviceType", e.target.value)}
              >
                {serviceTypes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.serviceType && (
                <p className="text-sm text-red-600 mt-1">{errors.serviceType}</p>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border"
              placeholder="e.g., Birth Certificate Issuance"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-sm text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description & Process */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Description
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="Brief description of the service and scope"
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Process (Step-by-step)
              </label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="How to access the service (steps, fees, SLAs)"
                value={form.process}
                onChange={(e) => setField("process", e.target.value)}
              />
            </div>
          </div>

          {/* Area / Hours / Status */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area (Ward / District / City)
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="e.g., Ward 3, Central District"
                value={form.area}
                onChange={(e) => setField("area", e.target.value)}
              />
              {errors.area && (
                <p className="text-sm text-red-600 mt-1">{errors.area}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="24x7 or Mon–Fri 09:00–17:00"
                value={form.hours}
                onChange={(e) => setField("hours", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border bg-white"
                value={form.status}
                onChange={(e) => setField("status", e.target.value)}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Eligibility */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Eligibility (optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border"
              placeholder="Who can apply / avail"
              value={form.eligibility}
              onChange={(e) => setField("eligibility", e.target.value)}
            />
          </div>

          {/* Contacts */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact
            </label>
            <div className="grid md:grid-cols-4 gap-4">
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="Phone"
                value={form.contact.phone}
                onChange={(e) => setContact("phone", e.target.value)}
              />
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="Email"
                value={form.contact.email}
                onChange={(e) => setContact("email", e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="SMS"
                value={form.contact.sms}
                onChange={(e) => setContact("sms", e.target.value)}
              />
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border"
                placeholder="WhatsApp"
                value={form.contact.whatsapp}
                onChange={(e) => setContact("whatsapp", e.target.value)}
              />
            </div>
            {errors.contact && (
              <p className="text-sm text-red-600 mt-1">{errors.contact}</p>
            )}
          </div>

          {/* Resources (dynamic list) */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resources (links to PDFs/forms/pages)
            </label>
            <div className="space-y-3">
              {(form.resources || []).map((r, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                    <LinkIcon className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    className="flex-1 px-4 py-3 rounded-lg border"
                    placeholder="https://..."
                    value={r}
                    onChange={(e) => setResource(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    className="p-2 rounded-lg border hover:bg-gray-50"
                    onClick={() => removeResource(idx)}
                    aria-label="Remove resource"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addResource}
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white hover:bg-gray-50"
            >
              <Plus className="w-4 h-4" /> Add another link
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium px-6 py-3 rounded-lg transition"
            >
              {submitting ? "Saving..." : "Create Service"}
            </button>

            <button
              type="button"
              onClick={() =>
                alert(
                  JSON.stringify(
                    {
                      ...form,
                      resources: form.resources.map((r) => r.trim()).filter(Boolean),
                    },
                    null,
                    2
                  )
                )
              }
              className="px-4 py-3 rounded-lg border hover:bg-gray-50"
            >
              Preview JSON
            </button>

            <div className="ml-auto flex items-center text-gray-500 text-sm">
              <FileText className="w-4 h-4 mr-1" />
              POST → <code className="ml-1">/api/admin/public-services</code>
            </div>
          </div>
        </form>

        {/* Existing services list (from GET) */}
        <div className="max-w-4xl mx-auto mt-10">
          <h3 className="text-lg font-semibold mb-3">Existing Services</h3>
          {services.length === 0 ? (
            <div className="text-gray-500">No services yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <div key={s.id || s.title} className="bg-white border rounded-xl p-4">
                  <div className="font-medium">{s.title}</div>
                  <div className="text-sm text-gray-600">
                    {s.service_type || s.serviceType}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{s.area}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
