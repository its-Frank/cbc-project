const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { verifyToken } = require("./middleware/auth");
const path = require("path");
const next = require("next");

// Load environment variables
dotenv.config();

// Determine if we're in development or production
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Import routes
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/projects");
const taskRoutes = require("./routes/tasks");
const assessmentRoutes = require("./routes/assessments");
const competencyRoutes = require("./routes/competencies");
const feedbackRoutes = require("./routes/feedback");
const userRoutes = require("./routes/users");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;
// Prepare Next.js and then start the server
nextApp.prepare().then(() => {
  // Middleware
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  // Health check route
  app.get("/api/health", (req, res) => {
    res
      .status(200)
      .json({ status: "ok", message: "CBC-EDU Triad API is running" });
  });

  // API Routes
  app.use("/api/auth", authRoutes);
  app.use("/api/projects", verifyToken, projectRoutes);
  app.use("/api/tasks", verifyToken, taskRoutes);
  app.use("/api/assessments", verifyToken, assessmentRoutes);
  app.use("/api/competencies", verifyToken, competencyRoutes);
  app.use("/api/feedback", verifyToken, feedbackRoutes);
  app.use("/api/users", verifyToken, userRoutes);

  // Serve static files from the uploads directory
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  // Let Next.js handle all other routes
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(
      `Frontend and API are both available at http://localhost:${PORT}`
    );
  });
});
