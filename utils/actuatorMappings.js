// utils/actuatorMappings.js
//
// Specmatic's API coverage feature expects an actuator endpoint shaped like
// Spring Boot's GET /actuator/mappings (v3 format):
//   { contexts: { application: { mappings: { dispatcherServlets: {
//       dispatcherServlet: [ { details: { requestMappingConditions: {
//           methods: [...], patterns: [...] } } }, ... ]
//   } } } } }
//
// Node/Express has no built-in equivalent, so this module introspects our
// own route files and re-shapes them into that same structure.
//
// NOTE: this mirrors the *documented* Spring Boot actuator response shape.
// It hasn't been verified against Specmatic's parser directly - if API
// coverage still looks wrong after wiring this up, treat that as a real
// bug report to debug against, not a sign this whole approach is wrong.

const routeMounts = [
  { prefix: "/api/auth", router: require("../routes/auth") },
  { prefix: "/api/about", router: require("../routes/about") },
  { prefix: "/api/projects", router: require("../routes/projects") },
  { prefix: "/api/skills", router: require("../routes/skills") },
  { prefix: "/api/blogs", router: require("../routes/blogs") },
  { prefix: "/api/contact", router: require("../routes/contact") },
  { prefix: "/api/education", router: require("../routes/education") },
  {
    prefix: "/api/certifications",
    router: require("../routes/certifications"),
  },
  { prefix: "/api/experience", router: require("../routes/experience") },
];

// Express uses ':id' for path params; OpenAPI/Spring-style uses '{id}'.
const toOpenApiStyle = (path) => path.replace(/:([^/]+)/g, "{$1}");

const buildActuatorMappings = () => {
  const dispatcherServlet = [];

  routeMounts.forEach(({ prefix, router }) => {
    (router.stack || []).forEach((layer) => {
      if (!layer.route) return; // skip non-route middleware layers

      const routePath = layer.route.path === "/" ? "" : layer.route.path;
      const fullPath = toOpenApiStyle(`${prefix}${routePath}`);

      const methods = Object.keys(layer.route.methods)
        .filter((method) => layer.route.methods[method])
        .map((method) => method.toUpperCase());

      dispatcherServlet.push({
        details: {
          handlerMethod: {
            className: "ExpressRoute",
            name: fullPath,
          },
          requestMappingConditions: {
            consumes: [],
            headers: [],
            methods,
            params: [],
            patterns: [fullPath],
            produces: [],
          },
        },
      });
    });
  });

  return {
    contexts: {
      application: {
        mappings: {
          dispatcherServlets: {
            dispatcherServlet,
          },
        },
      },
    },
  };
};

module.exports = buildActuatorMappings;
