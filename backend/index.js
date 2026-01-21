import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// ========== FIXED CORS CONFIGURATION ==========
// Remove ALL other CORS configurations and use ONLY this:

// 1. Set CORS headers manually - THIS IS CRITICAL
app.use((req, res, next) => {
  // Always allow the Vercel frontend origin
  res.header("Access-Control-Allow-Origin", "https://job-portal-zeta-blond.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight for origin:", req.headers.origin);
    return res.status(200).end();
  }
  
  console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// 2. Remove ALL other CORS middleware calls
// DO NOT use app.use(cors()) or app.use(cors(corsOptions)) anywhere

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// ========== TEST ENDPOINTS ==========
// Add these to verify CORS is working

// Simple health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Job Portal Backend API",
    status: "running",
    corsOrigin: "https://job-portal-zeta-blond.vercel.app",
    timestamp: new Date().toISOString()
  });
});

// CORS test endpoint
app.get("/api/cors-test", (req, res) => {
  res.json({
    message: "CORS is working!",
    frontendOrigin: "https://job-portal-zeta-blond.vercel.app",
    requestOrigin: req.headers.origin,
    headersSent: {
      "Access-Control-Allow-Origin": res.getHeader("Access-Control-Allow-Origin"),
      "Access-Control-Allow-Credentials": res.getHeader("Access-Control-Allow-Credentials")
    }
  });
});

// Public job endpoint (temporarily without auth)
app.get("/api/v1/job/test", (req, res) => {
  res.json({
    message: "Public job endpoint",
    jobs: [],
    success: true,
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    requestedUrl: req.originalUrl,
    method: req.method
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at port ${PORT}`);
  console.log(`✅ CORS configured for: https://job-portal-zeta-blond.vercel.app`);
  console.log(`✅ Test endpoint: https://job-portal-fsh8.onrender.com/api/cors-test`);
});
