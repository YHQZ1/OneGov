// Centralize API endpoints here so it’s easy to tweak later.
const API = {
  citizenServices: "/api/admin/public-services",          // GET/POST
  businesses: "/api/admin/businesses",                    // GET ?status=pending; POST /:id/approve, /:id/reject
  events: "/api/admin/events",                            // GET/POST
  polls: "/api/admin/polls",                              // GET/POST
  grievances: "/api/admin/grievances",                    // GET ?status=pending ; POST /:id/update
  feedback: "/api/admin/feedback",                        // GET ?status=new
  emergency: "/api/admin/emergency-services",             // GET/POST
};

export default API;
