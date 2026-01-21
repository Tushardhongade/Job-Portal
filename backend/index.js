import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

const app = express();

// ========== SIMPLE, FORCEFUL CORS ==========
// This runs for EVERY request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  
  // FORCE set headers - no conditions
  res.setHeader("Access-Control-Allow-Origin", "https://job-portal-zeta-blond.vercel.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  
  // Immediate response for preflight
  if (req.method === "OPTIONS") {
    console.log("[CORS] Sending preflight response");
    return res.status(200).end();
  }
  
  next();
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
console.log(`PORT from env: ${process.env.PORT}`); // Debug log

// ========== PUBLIC ENDPOINTS FOR TESTING ==========
// Test if server is alive
app.get("/", (req, res) => {
  res.json({
    app: "Job Portal API",
    status: "running",
    cors: "configured for https://job-portal-zeta-blond.vercel.app",
    port: PORT,
    timestamp: new Date().toISOString(),
    envPort: process.env.PORT,
    nodeEnv: process.env.NODE_ENV
  });
});

// CORS test endpoint
app.get("/cors-test", (req, res) => {
  res.json({
    success: true,
    message: "CORS is configured correctly!",
    headers: {
      "Access-Control-Allow-Origin": res.getHeader("Access-Control-Allow-Origin"),
      "Access-Control-Allow-Credentials": res.getHeader("Access-Control-Allow-Credentials")
    },
    requestOrigin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
});

// Public job endpoint (TEMPORARY - remove auth requirement)
app.get("/api/v1/job/get", (req, res) => {
  console.log("PUBLIC job endpoint called with query:", req.query);
  
  // Return success without auth
  res.json({
    success: true,
    message: "Public job endpoint (no auth required)",
    jobs: [],
    count: 0,
    query: req.query,
    timestamp: new Date().toISOString()
  });
});

// Public user endpoint (TEMPORARY)
app.post("/api/v1/user/login", (req, res) => {
  console.log("PUBLIC login endpoint called");
  
  // Return dummy login response
  res.json({
    success: true,
    message: "Login endpoint (public for testing)",
    user: { id: 1, email: "test@example.com" },
    token: "dummy-token-for-testing"
  });
});

// ========== REGULAR ROUTES ==========
// These come AFTER our public test endpoints
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Error handling
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server started on port ${PORT}`);
  console.log(`🌐 CORS configured for: https://job-portal-zeta-blond.vercel.app`);
  console.log(`🔗 Test URL: https://job-portal-fsh8.onrender.com/cors-test`);
  console.log(`🔗 Job endpoint: https://job-portal-fsh8.onrender.com/api/v1/job/get?keyword=test`);
});
