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

// Allowed frontend origins
const allowedOrigins = [
  "https://job-portal-zeta-blond.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin or from allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

// Handle preflight requests
app.options("*", cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    service: "job-portal-backend",
    timestamp: new Date().toISOString()
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "Backend is working!",
    allowedOrigins: allowedOrigins
  });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
