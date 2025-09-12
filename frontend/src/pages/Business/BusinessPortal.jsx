import { useMemo, useState } from "react";
import {
  Building,
  ClipboardList,
  CheckCircle,
  XCircle,
  Home,
  List,
  Bell,
  Upload,
  X,
} from "lucide-react";

/* ===========================
   Business Navbar (centered)
   =========================== */
function BusinessNavbar({ onLogout }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Left side (unchanged) */}
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-700">OneGov</span>
        </div>

        {/* Center options (two items) */}
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium"
          >
            <Home className="w-4 h-4" /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium"
          >
            <List className="w-4 h-4" /> Business Listings
          </a>
        </div>

        {/* Right side (unchanged spacing) */}
        <div className="flex items-center gap-4">
          <button className="relative text-gray-600 hover:text-blue-600">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
          <button
            onClick={onLogout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ==================================
   Utility: image preview management
   ================================== */
function fileToPreview(file) {
  return URL.createObjectURL(file);
}

/* ===========================
   Main Business Portal Page
   =========================== */
export default function BusinessPortal() {
  const [status, setStatus] = useState("pending"); // "pending" | "approved" | "rejected"

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    phone: "",
    email: "",
    website: "",
    address: "",
    hours: "",
    gstin: "",
    tags: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]); // File[]
  const [galleryPreviews, setGalleryPreviews] = useState([]); // string[]

  const handleLogout = () => {
    console.log("User logged out!");
  };

  const categories = useMemo(
    () => [
      "Doctor / Clinic",
      "Restaurant / Cafe",
      "Retail / Shop",
      "Service Provider",
      "Education / Coaching",
      "Fitness / Wellness",
      "Other",
    ],
    []
  );

  /* ------------ Inputs ------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((d) => ({ ...d, [name]: value }));
  };

  /* ------------ Logo Upload ------------ */
  const onLogoChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setLogoFile(f);
    setLogoPreview(fileToPreview(f));
  };

  const clearLogo = () => {
    setLogoFile(null);
    if (logoPreview) URL.revokeObjectURL(logoPreview);
    setLogoPreview("");
  };

  /* ------------ Gallery Upload ------------ */
  const onGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const max = 6;
    const leftover = Math.max(0, max - galleryFiles.length);
    const selected = files.slice(0, leftover);

    const previews = selected.map(fileToPreview);
    setGalleryFiles((arr) => [...arr, ...selected]);
    setGalleryPreviews((arr) => [...arr, ...previews]);
  };

  const removeGalleryItem = (idx) => {
    setGalleryFiles((arr) => arr.filter((_, i) => i !== idx));
    setGalleryPreviews((arr) => {
      const url = arr[idx];
      if (url) URL.revokeObjectURL(url);
      return arr.filter((_, i) => i !== idx);
    });
  };

  // Enhanced validation function
  const validate = () => {
    const next = {};

    // Required fields
    if (!formData.name.trim()) next.name = "Business name is required.";
    if (!formData.category) next.category = "Please select a category.";
    if (!formData.phone.trim()) next.phone = "Phone is required.";
    if (!formData.address.trim()) next.address = "Address is required.";
    if (!formData.description.trim())
      next.description = "Please add a short description.";

    // Format validations
    if (formData.phone && !/^[\d\s\+\-\(\)]{10,15}$/.test(formData.phone))
      next.phone = "Enter a valid phone number.";

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email))
      next.email = "Enter a valid email.";

    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website))
      next.website = "Enter a valid website URL (include http:// or https://)";

    if (
      formData.gstin &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
        formData.gstin
      )
    )
      next.gstin = "Enter a valid GSTIN format.";

    return next;
  };

  /* ------------ Submit ------------ */
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    // Prepare payload for backend teammate
    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
    if (logoFile) payload.append("logo", logoFile);
    galleryFiles.forEach((f, i) => payload.append(`gallery_${i}`, f));

    // For now just log; backend will POST this to /api/business/setup
    console.log("Submitting Business Setup (FormData):");
    for (const [k, v2] of payload.entries()) {
      console.log(k, v2);
    }

    alert("Your business setup request has been submitted for admin approval.");
    setStatus("pending");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans">
      <BusinessNavbar onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Business Portal
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Register your business, manage services, and connect with
              citizens. Your setup must be approved by an admin before going
              live.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        {/* Status Section */}
        <div className="mb-8 text-center">
          {status === "pending" && (
            <div className="flex items-center justify-center gap-2 text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ClipboardList className="w-5 h-5" />
              <span>Your business request is pending admin approval.</span>
            </div>
          )}
          {status === "approved" && (
            <div className="flex items-center justify-center gap-2 text-green-600 bg-green-50 border border-green-200 rounded-lg p-4">
              <CheckCircle className="w-5 h-5" />
              <span>
                Your business is approved and live on the citizen portal!
              </span>
            </div>
          )}
          {status === "rejected" && (
            <div className="flex items-center justify-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-4">
              <XCircle className="w-5 h-5" />
              <span>
                Your business request was rejected. Please contact support.
              </span>
            </div>
          )}
        </div>

        {/* Business Setup Form (visible if pending or rejected) */}
        {(status === "pending" || status === "rejected") && (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" /> Business Setup
            </h2>

            {/* Logo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo (square preferred)
              </label>
              <div className="flex items-center gap-4">
                {logoPreview ? (
                  <div className="relative">
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="w-20 h-20 rounded-lg object-cover border"
                    />
                    <button
                      type="button"
                      onClick={clearLogo}
                      className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow hover:bg-gray-50"
                      aria-label="Remove logo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg border border-dashed flex items-center justify-center text-gray-400 text-xs">
                    No logo
                  </div>
                )}
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white cursor-pointer hover:bg-gray-50">
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={onLogoChange}
                  />
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Business Name"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <select
                  name="category"
                  className="w-full px-4 py-3 rounded-lg border bg-white"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-600 mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email (optional)"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="website"
                  placeholder="Website (optional)"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="hours"
                  placeholder="Operating Hours (e.g., 9 AM – 6 PM)"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.hours}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <input
                  type="text"
                  name="address"
                  placeholder="Address / Location"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">{errors.address}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <textarea
                  name="description"
                  placeholder="Short Description"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="gstin"
                  placeholder="GSTIN (optional)"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.gstin}
                  onChange={handleChange}
                />
              </div>

              <div>
                <input
                  type="text"
                  name="tags"
                  placeholder="Tags (comma separated e.g., bakery, cakes, snacks)"
                  className="w-full px-4 py-3 rounded-lg border"
                  value={formData.tags}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Images (up to 6)
              </label>
              <div className="flex items-center gap-3 mb-3">
                <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white cursor-pointer hover:bg-gray-50">
                  <Upload className="w-4 h-4" />
                  <span>Upload Images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={onGalleryChange}
                  />
                </label>
                <span className="text-sm text-gray-500">
                  {galleryFiles.length}/6 selected
                </span>
              </div>

              {galleryPreviews.length > 0 ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {galleryPreviews.map((src, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={src}
                        alt={`gallery-${idx}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(idx)}
                        className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow opacity-90 group-hover:opacity-100"
                        aria-label="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500">No images selected.</div>
              )}
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
              >
                Submit for Approval
              </button>
            </div>
          </form>
        )}

        {/* Manage Services placeholder (only if approved) */}
        {status === "approved" && (
          <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Manage Services / Listings
            </h2>
            <p className="text-gray-600 mb-4">
              Here you can add, edit, or remove your services. (Coming soon!)
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition">
              Add Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
