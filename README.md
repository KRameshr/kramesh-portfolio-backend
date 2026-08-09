# kramesh.dev — Backend API

REST API for Kuruba Ramesh's personal portfolio — built with Node.js, Express.js and MongoDB.

## 🔗 Live API
https://kramesh-portfolio-backend.onrender.com
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

## 📁 Folder Structure

backend/├── config/│   ├── db.js              # MongoDB connection│   └── cloudinary.js      # Cloudinary setup├── controllers/│   ├── authController.js│   ├── aboutController.js│   ├── projectsController.js│   ├── skillsController.js│   ├── blogsController.js│   ├── certificationController.js│   ├── educationController.js│   ├── experienceController.js│   └── contactController.js├── middleware/│   ├── auth.js            # JWT protect middleware│   ├── upload.js          # Multer memory storage│   └── simulateError.js   # Test-only middleware for 500 error paths├── models/│   ├── About.js│   ├── Project.js│   ├── Skill.js│   ├── Blog.js│   ├── Certification.js│   ├── Education.js│   ├── Experience.js│   └── Contact.js├── routes/│   ├── auth.js│   ├── about.js│   ├── projects.js│   ├── skills.js│   ├── blogs.js│   ├── certifications.js│   ├── education.js│   ├── experience.js│   └── contact.js├── examples/              # Externalized JSON examples for Specmatic validation├── openapi.yaml           # OpenAPI 3.0 Contract Specification├── specmatic.yaml         # Specmatic Config V3 file├── .env.example├── .gitignore├── package.json└── server.js
## 📊 System Architecture

### Backend Flow Diagram
![Backend Flow Architecture](Backed.snapchart.png)

### Database Schema Map
![Database Snapchart](db,snapchart.png)

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: Local instance or MongoDB Atlas
- **Java JRE**: 17+ (*Required for running Specmatic CLI*)

### 2. Clone the repo
```bash
git clone [https://github.com/KRameshr/kramesh-portfolio-backend.git](https://github.com/KRameshr/kramesh-portfolio-backend.git)
cd kramesh-portfolio-backend
3. Install dependenciesBashnpm install
4. Create .env fileCode snippetPORT=3000
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
5. Run development serverBashnpm run dev
Server runs on http://localhost:3000🧪 Contract Testing with SpecmaticThis project leverages the latest Specmatic Open Source Version with Specmatic Config V3 (specmatic.yaml) to run API contract tests against all endpoints in openapi.yaml.1. Configuration (specmatic.yaml)YAMLversion: 3
contracts:
  - openapi.yaml
2. Validate External ExamplesAll test data is controlled via JSON examples in the examples/ directory. Validate them against the spec before testing:Bashnpx specmatic examples validate
3. Run Contract TestsStart the server in test mode:BashNODE_ENV=test npm start
Execute Specmatic Contract Tests:Bashnpx specmatic test
📊 Test Coverage & ResultsWe have achieved 100% API coverage across all 9 resources in the backend:Total Specmatic Contract Tests: 341 PassedTotal Jest Unit/Integration Tests: 345 PassedCoverage: 100% VerifiedResource PathSpecmatic Contract Test StatusCoverage/api/about✅ Passed100%/api/auth✅ Passed100%/api/blogs✅ Passed100%/api/certifications✅ Passed100%/api/contact✅ Passed100%/api/education✅ Passed100%/api/experience✅ Passed100%/api/projects✅ Passed100%/api/skills✅ Passed100%📡 API EndpointsPublic RoutesMethodEndpointDescriptionGET/api/aboutGet about infoGET/api/projectsGet all projectsGET/api/skillsGet all skillsGET/api/blogsGet published blogsGET/api/blogs/:slugGet blog by slugGET/api/certificationsGet certificationsGET/api/educationGet educationGET/api/experienceGet experiencePOST/api/contactSend contact messageAdmin Routes (JWT Required)MethodEndpointDescriptionPOST/api/auth/loginAdmin loginPUT/api/aboutUpdate aboutPOST/api/projectsCreate projectPUT/api/projects/:idUpdate projectDELETE/api/projects/:idDelete projectPOST/api/skillsCreate skillPUT/api/skills/:idUpdate skillDELETE/api/skills/:idDelete skillGET/api/blogs/allGet all blogs (inc drafts)POST/api/blogsCreate blogPUT/api/blogs/:idUpdate blogDELETE/api/blogs/:idDelete blogPOST/api/certificationsAdd certificationPUT/api/certifications/:idUpdate certificationDELETE/api/certifications/:idDelete certificationPOST/api/educationAdd educationPUT/api/education/:idUpdate educationDELETE/api/education/:idDelete educationPOST/api/experienceAdd experiencePUT/api/experience/:idUpdate experienceDELETE/api/experience/:idDelete experienceGET/api/contact/messagesGet all messagesDELETE/api/contact/messages/:idDelete message🔐 AuthenticationAdmin login returns a JWT token valid for 7 days.BashPOST /api/auth/login
Content-Type: application/json

{
  "email": "admin@email.com",
  "password": "yourpassword"
}
Use token in header for protected routes:Authorization: Bearer <token>
⚙️ CI/CD PipelineSpecmatic contract tests are integrated into GitHub Actions (.github/workflows/ci.yml). On every Push or Pull Request:Provisions Node.js, Java JRE 17, and MongoDB service containers.Runs npx specmatic examples validate to check example validities.Spawns the server and runs npx specmatic test.Uploads auto-generated Specmatic HTML Coverage reports as GitHub Actions artifacts.🎭 Frontend Mock Server SetupSpecmatic can be used as a stub server during frontend development:Bashnpx specmatic stub
📦 ScriptsBashnpm start      # Production
npm run dev    # Development with nodemon
npm test       # Run tests
🌐 DeploymentDeployed on Render (free tier)Auto-deploy on GitHub pushEnvironment variables set in Render dashboardCron job on cron-job.org pings /health every 14 mins to prevent sleep🔗 Frontend Repositoryhttps://github.com/KRameshr/kramesh-portfolio-frontend👨‍💻 AuthorKuruba Ramesh — Full Stack DeveloperPortfolio: krameshdev.vercel.appGitHub: github.com/KRameshrLinkedIn: linkedin.com/in/kurubaramesh
---
