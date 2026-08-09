# kramesh.dev — Backend API

REST API for Kuruba Ramesh's personal portfolio — built with Node.js, Express.js and MongoDB, with an OpenAPI-first contract enforced through [Specmatic](https://specmatic.io/).

## 🔗 Live API

[https://kramesh-portfolio-backend.onrender.com](https://kramesh-portfolio-backend.onrender.com)

---

## 🛠️ Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB Atlas (Mongoose)
- Authentication: JWT (JSON Web Token)
- Image Storage: Cloudinary
- Email: Nodemailer (Gmail)
- Security: Helmet, CORS, express-rate-limit
- Contract Testing: Specmatic 3.0 (OpenAPI 3.0, schema resiliency)
- Testing: Jest, Supertest
- Deployment: Render

---

## 📁 Folder Structure

kramesh-portfolio-backend/
├── config/
│ ├── db.js # MongoDB connection + strict Mongoose casting
│ └── cloudinary.js # Cloudinary setup
├── controllers/
│ ├── authController.js
│ ├── aboutController.js
│ ├── projectsController.js
│ ├── skillsController.js
│ ├── blogsController.js
│ ├── certificationController.js
│ ├── educationController.js
│ ├── experienceController.js
│ └── contactController.js
├── middleware/
│ ├── auth.js # JWT protect middleware
│ ├── upload.js # Multer memory storage
│ └── simulateError.js # Test-only middleware for 500 error paths
├── models/
│ ├── About.js
│ ├── Project.js
│ ├── Skill.js
│ ├── Blog.js
│ ├── Certification.js
│ ├── Education.js
│ ├── Experience.js
│ └── Contact.js
├── routes/
│ ├── auth.js
│ ├── about.js
│ ├── projects.js
│ ├── skills.js
│ ├── blogs.js
│ ├── certifications.js
│ ├── education.js
│ ├── experience.js
│ └── contact.js
├── utils/
│ ├── handleError.js # Central error → HTTP status mapper
│ └── actuatorMappings.js # Route inventory for Specmatic API coverage
├── seed/
│ ├── admin.js # Seeds the admin user
│ ├── specmaticTestData.js # Seeds fixed-ID records for contract tests
│ └── generateTestToken.js # Generates a valid JWT for contract tests
├── tests/
│ ├── auth.test.js
│ ├── projects.test.js
│ ├── contract.test.js # Surfaces Specmatic results inside Jest
│ └── specmaticGlobalSetup.js # Runs Specmatic before the Jest suite
├── openapi_examples/ # Named request/response examples for Specmatic
├── .env.example
├── .gitignore
├── jest.config.json
├── openapi.yaml # OpenAPI 3.0 contract for the API
├── specmatic.yaml # Specmatic config v3
├── package.json
└── server.js

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js: v18 or higher
- MongoDB: Local instance or MongoDB Atlas
- Java JRE: 17+ (Required for running Specmatic CLI)

### 2. Clone the repo

git clone [https://github.com/KRameshr/kramesh-portfolio-backend.git](https://github.com/KRameshr/kramesh-portfolio-backend.git)
cd kramesh-portfolio-backend

### 3. Install dependencies

npm install

### 4. Create .env file

PORT=3000
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_NAME=krameshdev
DB_STRING=your_cluster_string
JWT_SECRET=your_jwt_secret
NODE_ENV=test
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

### 5. Run development server

npm run dev

---

## 🧪 Contract Testing with Specmatic

This project leverages Specmatic with Specmatic Config V3 (specmatic.yaml) to run API contract tests against all endpoints in openapi.yaml.

1. Seed deterministic test data:
   node seed/specmaticTestData.js

2. Run Jest unit tests and Specmatic contract tests:
   npm test

---

## 📊 Test Coverage & Results

- Total Specmatic Contract Tests: 341 Passed
- Total Jest Unit/Integration Tests: 345 Passed
- Coverage: 100% Verified

| Resource Path       | Specmatic Contract Test Status | Coverage |
| :------------------ | :----------------------------- | :------- |
| /api/about          | ✅ Passed                      | 100%     |
| /api/auth           | ✅ Passed                      | 100%     |
| /api/blogs          | ✅ Passed                      | 100%     |
| /api/certifications | ✅ Passed                      | 100%     |
| /api/contact        | ✅ Passed                      | 100%     |
| /api/education      | ✅ Passed                      | 100%     |
| /api/experience     | ✅ Passed                      | 100%     |
| /api/projects       | ✅ Passed                      | 100%     |
| /api/skills         | ✅ Passed                      | 100%     |

---

## 📡 API Endpoints

### Public Routes

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | /api/about          | Get about info       |
| GET    | /api/projects       | Get all projects     |
| GET    | /api/skills         | Get all skills       |
| GET    | /api/blogs          | Get published blogs  |
| GET    | /api/blogs/:slug    | Get blog by slug     |
| GET    | /api/certifications | Get certifications   |
| GET    | /api/education      | Get education        |
| GET    | /api/experience     | Get experience       |
| POST   | /api/contact        | Send contact message |

### Admin Routes (JWT Required)

| Method | Endpoint          | Description                |
| ------ | ----------------- | -------------------------- |
| POST   | /api/auth/login   | Admin login                |
| PUT    | /api/about        | Update about               |
| POST   | /api/projects     | Create project             |
| PUT    | /api/projects/:id | Update project             |
| DELETE | /api/projects/:id | Delete project             |
| POST   | /api/skills       | Create skill               |
| PUT    | /api/skills/:id   | Update skill               |
| DELETE | /api/skills/:id   | Delete skill               |
| GET    | /api/blogs/all    | Get all blogs (inc drafts) |
| POST   | /api/blogs        | Create blog                |
| PUT    | /api/blogs/:id    | Update blog                |
| DELETE | /api/blogs/:id    | Delete blog                |

---

## 👨‍💻 Author

Kuruba Ramesh — Full Stack Developer

- Portfolio: [https://krameshdev.vercel.app](https://krameshdev.vercel.app)
- GitHub: [https://github.com/KRameshr](https://github.com/KRameshr)
- LinkedIn: [https://linkedin.com/in/kurubaramesh](https://linkedin.com/in/kurubaramesh)
