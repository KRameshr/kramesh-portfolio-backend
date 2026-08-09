# kramesh.dev — Backend API

REST API for Kuruba Ramesh's personal portfolio — built with Node.js, Express.js and MongoDB.

## 🔗 Live API

[https://kramesh-portfolio-backend.onrender.com](https://kramesh-portfolio-backend.onrender.com)

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Image Storage:** Cloudinary
- **Email:** Nodemailer (Gmail)
- **Security:** Helmet, CORS, express-rate-limit
- **Contract Testing:** Specmatic 3.0 (Open Source Config V3)
- **Deployment:** Render

---

## 📁 Folder Structure

```text
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── cloudinary.js      # Cloudinary setup
├── controllers/
│   ├── authController.js
│   ├── aboutController.js
│   ├── projectsController.js
│   ├── skillsController.js
│   ├── blogsController.js
│   ├── certificationController.js
│   ├── educationController.js
│   ├── experienceController.js
│   └── contactController.js
├── middleware/
│   ├── auth.js            # JWT protect middleware
│   ├── upload.js          # Multer memory storage
│   └── simulateError.js   # Test-only middleware for 500 error paths
├── models/
│   ├── About.js
│   ├── Project.js
│   ├── Skill.js
│   ├── Blog.js
│   ├── Certification.js
│   ├── Education.js
│   ├── Experience.js
│   └── Contact.js
├── routes/
│   ├── auth.js
│   ├── about.js
│   ├── projects.js
│   ├── skills.js
│   ├── blogs.js
│   ├── certifications.js
│   ├── education.js
│   ├── experience.js
│   └── contact.js
├── examples/              # Externalized JSON examples for Specmatic validation
├── openapi.yaml           # OpenAPI 3.0 Contract Specification
├── specmatic.yaml         # Specmatic Config V3 file
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

---

## 📊 System Architecture

### Backend Flow Diagram
![Backend Flow Architecture](Backed.snapchart.png)

### Database Schema Map
![Database Snapchart](db,snapchart.png)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: Local instance or MongoDB Atlas
- **Java JRE**: 17+ (*Required for running Specmatic CLI*)

### 2. Clone the repo
```bash
git clone https://github.com/KRameshr/kramesh-portfolio-backend.git
cd kramesh-portfolio-backend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Create `.env` file
```env
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
```

### 5. Run development server
```bash
npm run dev
```

Server runs on `http://localhost:3000`

---

## 🧪 Contract Testing with Specmatic

This project leverages the latest **Specmatic Open Source Version** with **Specmatic Config V3 (`specmatic.yaml`)** to run API contract tests against all endpoints in `openapi.yaml`.

### 1. Configuration (`specmatic.yaml`)
```yaml
version: 3
contracts:
  - openapi.yaml
```

### 2. Validate External Examples
All test data is controlled via JSON examples in the `examples/` directory. Validate them against the spec before testing:
```bash
npx specmatic examples validate
```

### 3. Run Contract Tests
1. Start the server in test mode:
   ```bash
   NODE_ENV=test npm start
   ```
2. Execute Specmatic Contract Tests:
   ```bash
   npx specmatic test
   ```

---

## 📊 Test Coverage & Results

We have achieved **100% API coverage** across all 9 resources in the backend:

- **Total Specmatic Contract Tests:** 341 Passed
- **Total Jest Unit/Integration Tests:** 345 Passed
- **Coverage:** 100% Verified

| Resource Path | Specmatic Contract Test Status | Coverage |
| :--- | :--- | :--- |
| `/api/about` | ✅ Passed | 100% |
| `/api/auth` | ✅ Passed | 100% |
| `/api/blogs` | ✅ Passed | 100% |
| `/api/certifications` | ✅ Passed | 100% |
| `/api/contact` | ✅ Passed | 100% |
| `/api/education` | ✅ Passed | 100% |
| `/api/experience` | ✅ Passed | 100% |
| `/api/projects` | ✅ Passed | 100% |
| `/api/skills` | ✅ Passed | 100% |

---

## 📡 API Endpoints

### Public Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/about` | Get about info |
| GET | `/api/projects` | Get all projects |
| GET | `/api/skills` | Get all skills |
| GET | `/api/blogs` | Get published blogs |
| GET | `/api/blogs/:slug` | Get blog by slug |
| GET | `/api/certifications` | Get certifications |
| GET | `/api/education` | Get education |
| GET | `/api/experience` | Get experience |
| POST | `/api/contact` | Send contact message |

### Admin Routes (JWT Required)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Admin login |
| PUT | `/api/about` | Update about |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/skills` | Create skill |
| PUT | `/api/skills/:id` | Update skill |
| DELETE | `/api/skills/:id` | Delete skill |
| GET | `/api/blogs/all` | Get all blogs (inc drafts) |
| POST | `/api/blogs` | Create blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |
| POST | `/api/certifications` | Add certification |
| PUT | `/api/certifications/:id` | Update certification |
| DELETE | `/api/certifications/:id` | Delete certification |
| POST | `/api/education` | Add education |
| PUT | `/api/education/:id` | Update education |
| DELETE | `/api/education/:id` | Delete education |
| POST | `/api/experience` | Add experience |
| PUT | `/api/experience/:id` | Update experience |
| DELETE | `/api/experience/:id` | Delete experience |
| GET | `/api/contact/messages` | Get all messages |
| DELETE | `/api/contact/messages/:id` | Delete message |

---

## 🔐 Authentication

Admin login returns a JWT token valid for 7 days.

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@email.com",
  "password": "yourpassword"
}
```

Use token in header for protected routes:
```http
Authorization: Bearer <token>
```

---

## ⚙️ CI/CD Pipeline

Specmatic contract tests are integrated into **GitHub Actions** (`.github/workflows/ci.yml`). On every Push or Pull Request:
1. Provisions Node.js, Java JRE 17, and MongoDB service containers.
2. Runs `npx specmatic examples validate` to check example validities.
3. Spawns the server and runs `npx specmatic test`.
4. Uploads auto-generated Specmatic HTML Coverage reports as GitHub Actions artifacts.

---

## 🎭 Frontend Mock Server Setup

Specmatic can be used as a stub server during frontend development:
```bash
npx specmatic stub
```

---

## 📦 Scripts

```bash
npm start      # Production
npm run dev    # Development with nodemon
npm test       # Run tests
```

---

## 🌐 Deployment

Deployed on **Render** (free tier)
- Auto-deploy on GitHub push
- Environment variables set in Render dashboard
- Cron job on cron-job.org pings `/health` every 14 mins to prevent sleep

---

## 🔗 Frontend Repository
[https://github.com/KRameshr/kramesh-portfolio-frontend](https://github.com/KRameshr/kramesh-portfolio-frontend)

---

## 👨‍💻 Author

**Kuruba Ramesh** — Full Stack Developer
- Portfolio: [krameshdev.vercel.app](https://krameshdev.vercel.app)
- GitHub: [github.com/KRameshr](https://github.com/KRameshr)
- LinkedIn: [linkedin.com/in/kurubaramesh](https://linkedin.com/in/kurubaramesh)
