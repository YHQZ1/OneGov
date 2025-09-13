import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Navigation } from "lucide-react";
import Navbar from "../../components/Navbar";

const handleLogout = () => {
  console.log("User logged out!");
};

export default function Transportation() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [nearbyStops, setNearbyStops] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(false);

  const mapRef = useRef(null);

  // Load Google Maps script dynamically
  useEffect(() => {
    const existingScript = document.getElementById("google-maps");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-maps";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.body.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  // Initialize the map
  const initMap = () => {
    if (mapRef.current && window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.209 }, // Default: New Delhi
        zoom: 13,
      });

      // Example marker
      new window.google.maps.Marker({
        position: { lat: 28.6139, lng: 77.209 },
        map,
        title: "Default Center",
      });
    }
  };

  // Simulate nearby stops (replace with backend API later)
  useEffect(() => {
    setNearbyStops([
      { id: 1, name: "Central Bus Station", distance: "300m" },
      { id: 2, name: "Metro Station - Gate A", distance: "500m" },
      { id: 3, name: "City Hospital Stop", distance: "750m" },
    ]);
  }, []);

  const handleSearchRoutes = async () => {
    setLoading(true);
    console.log("Fetching routes for:", origin, "→", destination);

    // TODO: replace with backend call to Directions API
    setTimeout(() => {
      setRoutes([
        { id: 1, summary: "Bus 21 → Metro Blue", time: "35 mins", transfers: 1 },
        { id: 2, summary: "Direct Metro Red Line", time: "28 mins", transfers: 0 },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-spline-sans overflow-x-hidden">
      <Navbar notificationsCount={3} onLogout={handleLogout} />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Plan Your Commute with Transit
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Find nearby bus and metro stops, check routes, and get there faster with live directions.
            </p>

            {/* Search form */}
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Enter origin (or use My Location)"
                className="px-4 py-3 rounded-lg text-gray-900"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter destination"
                className="px-4 py-3 rounded-lg text-gray-900"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <button
                onClick={handleSearchRoutes}
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2 transition"
              >
                <Search className="w-5 h-5" />
                <span>Find Routes</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
        {/* Nearby Stops */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" /> Nearby Stops
          </h2>
          <div className="space-y-3">
            {nearbyStops.map((stop) => (
              <div
                key={stop.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="font-medium text-gray-800">{stop.name}</div>
                <div className="text-sm text-gray-500">{stop.distance}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Routes */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-600" /> Routes
          </h2>

          {loading && <p className="text-gray-600">Loading routes...</p>}

          {!loading && routes.length === 0 && (
            <p className="text-gray-500">Enter origin and destination to view routes.</p>
          )}

          <div className="space-y-4">
            {routes.map((route) => (
              <div
                key={route.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="font-medium text-gray-800">{route.summary}</div>
                <div className="text-sm text-gray-500">
                  {route.time} • {route.transfers} transfer(s)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map container */}
      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Map</h2>
        <div
          ref={mapRef}
          className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500"
        />
      </div>
    </div>
  );
}
