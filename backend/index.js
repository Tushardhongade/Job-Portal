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

// Fixed CORS configuration
const corsOptions = {
  origin: "https://job-portal-zeta-blond.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200
};

// Apply CORS middleware - MUST come before routes
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// Explicitly handle OPTIONS preflight
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://job-portal-zeta-blond.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Test endpoint
app.get("/api/test-cors", (req, res) => {
  res.json({ 
    message: "CORS is working!",
    origin: req.headers.origin,
    allowedOrigin: "https://job-portal-zeta-blond.vercel.app"
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
  console.log(`CORS configured for: https://job-portal-zeta-blond.vercel.app`);
});
