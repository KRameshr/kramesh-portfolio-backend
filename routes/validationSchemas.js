/**
 * Validation schemas for each POST/PUT endpoint.
 * Split into "required" (must be present + correct type) and
 * "optional" (if key present, must not be null + correct type).
 *
 * Required fields match the OpenAPI schema's `required` list.
 * Optional fields are all other properties in the OpenAPI schema.
 *
 * Usage in route files:
 *   const { validate } = require("../middleware/validate");
 *   const schemas = require("./validationSchemas");
 *   router.post("/", validate(schemas.createProject), createProject);
 */

const schemas = {
  // About — required: name, title, bio
  createAbout: {
    required: {
      name: "string",
      title: "string",
      bio: "string",
    },
    optional: {
      image_url: "string",
      resume_url: "string",
      github: "string",
      linkedin: "string",
      email: "string",
    },
  },
  updateAbout: {
    required: {
      name: "string",
      title: "string",
      bio: "string",
    },
    optional: {
      image_url: "string",
      resume_url: "string",
      github: "string",
      linkedin: "string",
      email: "string",
    },
  },

  // Projects — required: title, description, tech_stack
  createProject: {
    required: {
      title: "string",
      description: "string",
      tech_stack: "string",
    },
    optional: {
      image_url: "string",
      live_url: "string",
      github_url: "string",
      is_featured: "boolean",
    },
  },
  updateProject: {
    required: {
      title: "string",
      description: "string",
      tech_stack: "string",
    },
    optional: {
      image_url: "string",
      live_url: "string",
      github_url: "string",
      is_featured: "boolean",
    },
  },

  // Blogs — required: title, slug, content
  createBlog: {
    required: {
      title: "string",
      slug: "string",
      content: "string",
    },
    optional: {
      excerpt: "string",
      cover_image_url: "string",
      is_published: "boolean",
    },
  },
  updateBlog: {
    required: {
      title: "string",
      slug: "string",
      content: "string",
    },
    optional: {
      excerpt: "string",
      cover_image_url: "string",
      is_published: "boolean",
    },
  },

  // Certifications — required: institution_name, certificate_name
  createCertification: {
    required: {
      institution_name: "string",
      certificate_name: "string",
    },
    optional: {
      certificate_id: "string",
      description: "string",
      skills: "string",
      start_date: "string",
      end_date: "string",
      is_expired: "boolean",
      credential_url: "string",
      image_url: "string",
      display_order: "number",
    },
  },
  updateCertification: {
    required: {
      institution_name: "string",
      certificate_name: "string",
    },
    optional: {
      certificate_id: "string",
      description: "string",
      skills: "string",
      start_date: "string",
      end_date: "string",
      is_expired: "boolean",
      credential_url: "string",
      image_url: "string",
      display_order: "number",
    },
  },

  // Contact — required: name, email, message. subject is optional.
  createContact: {
    required: {
      name: "string",
      email: "string",
      message: "string",
    },
    optional: {
      subject: "string",
    },
  },
};

module.exports = schemas;
