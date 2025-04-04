const express = require("express");
const router = express.Router();
const db = require("../db");
const { checkRole } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only images, PDFs, and Office documents are allowed."
        )
      );
    }
  },
});

// Get all projects (with role-based filtering)
router.get("/", async (req, res) => {
  try {
    const { role, id } = req.user;
    let query = "";
    let params = [];

    if (role === "student") {
      // Students can only see their own projects
      query = `
        SELECT p.*, t.TaskName, s.StudentID
        FROM Projects p
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Students s ON p.StudentID = s.StudentID
        JOIN Users u ON s.UserID = u.UserID
        WHERE u.UserID = ?
        ORDER BY p.SubmissionDate DESC
      `;
      params = [id];
    } else if (role === "teacher") {
      // Teachers can see projects related to their tasks
      query = `
        SELECT p.*, t.TaskName, s.StudentID, 
               CONCAT(u.FirstName, ' ', u.LastName) as StudentName
        FROM Projects p
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Students s ON p.StudentID = s.StudentID
        JOIN Users u ON s.UserID = u.UserID
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        WHERE tc.UserID = ?
        ORDER BY p.SubmissionDate DESC
      `;
      params = [id];
    } else if (role === "parent") {
      // Parents can see their children's projects
      query = `
        SELECT p.*, t.TaskName, s.StudentID, 
               CONCAT(u.FirstName, ' ', u.LastName) as StudentName
        FROM Projects p
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Students s ON p.StudentID = s.StudentID
        JOIN Users u ON s.UserID = u.UserID
        WHERE s.ParentID = (SELECT ParentID FROM Parents WHERE UserID = ?)
        ORDER BY p.SubmissionDate DESC
      `;
      params = [id];
    } else if (role === "admin") {
      // Admins can see all projects
      query = `
        SELECT p.*, t.TaskName, s.StudentID, 
               CONCAT(u.FirstName, ' ', u.LastName) as StudentName
        FROM Projects p
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Students s ON p.StudentID = s.StudentID
        JOIN Users u ON s.UserID = u.UserID
        ORDER BY p.SubmissionDate DESC
      `;
    }
    const projects = await db.query(query, params);
    // Get attachments for each project
    for (const project of projects) {
      const attachments = await db.query(
        `SELECT * FROM ProjectAttachments WHERE ProjectID = ?`,
        [project.ProjectID]
      );
      project.attachments = attachments;
    }

    return res.json({ projects });
  } catch (error) {
    console.error("Get projects error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific project by ID
router.get("/:id", async (req, res) => {
  try {
    const { id: projectId } = req.params;
    const { role, id: userId } = req.user;

    // Base query to get project details
    let query = `
      SELECT p.*, t.TaskName, t.TaskDescription, t.DueDate,
             CONCAT(u.FirstName, ' ', u.LastName) as StudentName,
             s.Grade
      FROM Projects p
      JOIN Tasks t ON p.TaskID = t.TaskID
      JOIN Students s ON p.StudentID = s.StudentID
      JOIN Users u ON s.UserID = u.UserID
      WHERE p.ProjectID = ?
    `;

    // Add role-based access control
    if (role === "student") {
      query += ` AND s.UserID = ?`;
    } else if (role === "teacher") {
      query += ` AND t.TeacherID = (SELECT TeacherID FROM Teachers WHERE UserID = ?)`;
    } else if (role === "parent") {
      query += ` AND s.ParentID = (SELECT ParentID FROM Parents WHERE UserID = ?)`;
    }

    // For admin, no additional conditions needed

    const params = role === "admin" ? [projectId] : [projectId, userId];
    const projects = await db.query(query, params);

    if (projects.length === 0) {
      return res
        .status(404)
        .json({ error: "Project not found or access denied" });
    }

    const project = projects[0];

    // Get attachments
    const attachments = await db.query(
      `SELECT * FROM ProjectAttachments WHERE ProjectID = ?`,
      [projectId]
    );
    project.attachments = attachments;

    // Get feedback
    const feedback = await db.query(
      `SELECT f.*, CONCAT(u.FirstName, ' ', u.LastName) as UserName, r.RoleName as UserRole
       FROM Feedback f
       JOIN Users u ON f.UserID = u.UserID
       JOIN Roles r ON u.RoleID = r.RoleID
       WHERE f.ProjectID = ?
       ORDER BY f.FeedbackDate DESC`,
      [projectId]
    );
    project.feedback = feedback;

    // Get assessments if user is teacher or admin
    if (
      role === "teacher" ||
      role === "admin" ||
      (role === "student" && project.Status === "Assessed")
    ) {
      const assessments = await db.query(
        `SELECT a.*, c.CompetencyName, cr.CriteriaName, pl.LevelName, pl.ScoreValue
         FROM Assessments a
         JOIN Competencies c ON a.CompetencyID = c.CompetencyID
         JOIN Criteria cr ON a.CriteriaID = cr.CriteriaID
         JOIN PerformanceLevels pl ON a.PerformanceLevelID = pl.PerformanceLevelID
         WHERE a.ProjectID = ?`,
        [projectId]
      );
      project.assessments = assessments;
    }

    return res.json({ project });
  } catch (error) {
    console.error("Get project error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Submit a new project (students only)
router.post(
  "/",
  checkRole(["student"]),
  upload.array("files", 5),
  async (req, res) => {
    try {
      const { title, description, taskId } = req.body;
      const files = req.files;
      const userId = req.user.id;

      // Validate input
      if (!title || !description || !taskId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Get student ID
      const students = await db.query(
        "SELECT StudentID FROM Students WHERE UserID = ?",
        [userId]
      );

      if (students.length === 0) {
        return res.status(404).json({ error: "Student record not found" });
      }

      const studentId = students[0].StudentID;

      // Create project
      const result = await db.query(
        `INSERT INTO Projects 
       (StudentID, TaskID, ProjectTitle, ProjectDescription, Status) 
       VALUES (?, ?, ?, ?, 'Submitted')`,
        [studentId, taskId, title, description]
      );

      const projectId = result.insertId;

      // Save file attachments
      if (files && files.length > 0) {
        for (const file of files) {
          await db.query(
            `INSERT INTO ProjectAttachments 
           (ProjectID, FileName, FilePath, FileType) 
           VALUES (?, ?, ?, ?)`,
            [projectId, file.originalname, file.path, file.mimetype]
          );
        }
      }

      return res.status(201).json({
        message: "Project submitted successfully",
        projectId,
      });
    } catch (error) {
      console.error("Submit project error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Update project status (teachers only)
router.patch(
  "/:id/status",
  checkRole(["teacher", "admin"]),
  async (req, res) => {
    try {
      const { id: projectId } = req.params;
      const { status } = req.body;

      // Validate status
      const validStatuses = [
        "Submitted",
        "Under Review",
        "Assessed",
        "Returned",
      ];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      // Update project status
      await db.query("UPDATE Projects SET Status = ? WHERE ProjectID = ?", [
        status,
        projectId,
      ]);

      return res.json({ message: "Project status updated successfully" });
    } catch (error) {
      console.error("Update project status error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
