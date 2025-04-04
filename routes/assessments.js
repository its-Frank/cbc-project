const express = require("express")
const router = express.Router()
const db = require("../db")
const { checkRole } = require("../middleware/auth")

// Get all assessments (with role-based filtering)
router.get("/", async (req, res) => {
  try {
    const { role, id } = req.user
    let query = ""
    let params = []

    if (role === "student") {
      // Students can only see assessments of their own projects
      query = `
        SELECT a.*, c.CompetencyName, cr.CriteriaName, pl.LevelName, pl.ScoreValue,
               p.ProjectTitle, t.TaskName
        FROM Assessments a
        JOIN Competencies c ON a.CompetencyID = c.CompetencyID
        JOIN Criteria cr ON a.CriteriaID = cr.CriteriaID
        JOIN PerformanceLevels pl ON a.PerformanceLevelID = pl.PerformanceLevelID
        JOIN Projects p ON a.ProjectID = p.ProjectID
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Students s ON p.StudentID = s.StudentID
        WHERE s.UserID = ?
        ORDER BY a.AssessmentDate DESC
      `
      params = [id]
    } else if (role === "teacher") {
      // Teachers can see assessments they've made
      query = `
        SELECT a.*, c.CompetencyName, cr.CriteriaName, pl.LevelName, pl.ScoreValue,
               p.ProjectTitle, CONCAT(u.FirstName, ' ', u.LastName) as StudentName
        FROM Assessments a
        JOIN Competencies c ON a.CompetencyID = c.CompetencyID
        JOIN Criteria cr ON a.CriteriaID = cr.CriteriaID
        JOIN PerformanceLevels pl ON a.PerformanceLevelID = pl.PerformanceLevelID
        JOIN Projects p ON a.ProjectID = p.ProjectID
        JOIN Students s ON p.StudentID = s.StudentID
        JOIN Users u ON s.UserID = u.UserID
        JOIN Teachers tc ON a.TeacherID = tc.TeacherID
        WHERE tc.UserID = ?
        ORDER BY a.AssessmentDate DESC
      `
      params = [id]
    } else if (role === "parent") {
      // Parents can see assessments of their children's projects
      query = `
        SELECT a.*, c.CompetencyName, cr.CriteriaName, pl.LevelName, pl.ScoreValue,
               p.ProjectTitle, CONCAT(u.FirstName, ' ', u.LastName) as StudentName,
               t.TaskName
        FROM Assessments a
        JOIN Competencies c ON a.CompetencyID = c.CompetencyID
        JOIN Criteria cr ON a.CriteriaID = cr.CriteriaID
        JOIN PerformanceLevels pl ON a.PerformanceLevelID = pl.PerformanceLevelID
        JOIN Projects p ON a.ProjectID = p.ProjectID
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Students s ON p.StudentID = s.StudentID
        JOIN Users u ON s.UserID = u.UserID
        WHERE s.ParentID = (SELECT ParentID FROM Parents WHERE UserID = ?)
        ORDER BY a.AssessmentDate DESC
      `
      params = [id]
    } else if (role === "admin") {
      // Admins can see all assessments
      query = `
        SELECT a.*, c.CompetencyName, cr.CriteriaName, pl.LevelName, pl.ScoreValue,
               p.ProjectTitle, CONCAT(u.FirstName, ' ', u.LastName) as StudentName,
               t.TaskName
        FROM Assessments a
        JOIN Competencies c ON a.CompetencyID = c.CompetencyID
        JOIN Criteria cr ON a.CriteriaID = cr.CriteriaID
        JOIN PerformanceLevels pl ON a.PerformanceLevelID = pl.PerformanceLevelID
        JOIN Projects p ON a.ProjectID = p.ProjectID
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Students s ON p.StudentID = s.StudentID
        JOIN Users u ON s.UserID = u.UserID
        ORDER BY a.AssessmentDate DESC
      `
    }

    const assessments = await db.query(query, params)

    return res.json({ assessments })
  } catch (error) {
    console.error("Get assessments error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Get assessments for a specific project
router.get("/project/:id", async (req, res) => {
  try {
    const { id: projectId } = req.params
    const { role, id: userId } = req.user

    // Check if user has access to this project
    let accessQuery = ""
    let accessParams = []

    if (role === "student") {
      accessQuery = `
        SELECT p.*
        FROM Projects p
        JOIN Students s ON p.StudentID = s.StudentID
        WHERE p.ProjectID = ? AND s.UserID = ?
      `
      accessParams = [projectId, userId]
    } else if (role === "teacher") {
      accessQuery = `
        SELECT p.*
        FROM Projects p
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        WHERE p.ProjectID = ? AND tc.UserID = ?
      `
      accessParams = [projectId, userId]
    } else if (role === "parent") {
      accessQuery = `
        SELECT p.*
        FROM Projects p
        JOIN Students s ON p.StudentID = s.StudentID
        WHERE p.ProjectID = ? AND s.ParentID = (SELECT ParentID FROM Parents WHERE UserID = ?)
      `
      accessParams = [projectId, userId]
    } else if (role === "admin") {
      accessQuery = `SELECT * FROM Projects WHERE ProjectID = ?`
      accessParams = [projectId]
    }

    const projects = await db.query(accessQuery, accessParams)

    if (projects.length === 0) {
      return res.status(403).json({ error: "Access denied or project not found" })
    }

    // Get assessments
    const assessments = await db.query(
      `SELECT a.*, c.CompetencyName, cr.CriteriaName, pl.LevelName, pl.ScoreValue,
              CONCAT(u.FirstName, ' ', u.LastName) as TeacherName
       FROM Assessments a
       JOIN Competencies c ON a.CompetencyID = c.CompetencyID
       JOIN Criteria cr ON a.CriteriaID = cr.CriteriaID
       JOIN PerformanceLevels pl ON a.PerformanceLevelID = pl.PerformanceLevelID
       JOIN Teachers t ON a.TeacherID = t.TeacherID
       JOIN Users u ON t.UserID = u.UserID
       WHERE a.ProjectID = ?
       ORDER BY c.CompetencyName, cr.CriteriaName`,
      [projectId],
    )

    return res.json({ assessments })
  } catch (error) {
    console.error("Get project assessments error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Create assessments for a project (teachers only)
router.post("/project/:id", checkRole(["teacher", "admin"]), async (req, res) => {
  try {
    const { id: projectId } = req.params
    const { assessments, feedback } = req.body
    const userId = req.user.id

    // Validate input
    if (!assessments || !Array.isArray(assessments) || assessments.length === 0) {
      return res.status(400).json({ error: "Missing or invalid assessments" })
    }

    // Get teacher ID
    const teachers = await db.query("SELECT TeacherID FROM Teachers WHERE UserID = ?", [userId])

    if (teachers.length === 0) {
      return res.status(404).json({ error: "Teacher record not found" })
    }

    const teacherId = teachers[0].TeacherID

    // Check if teacher has access to this project
    const projects = await db.query(
      `SELECT p.*
       FROM Projects p
       JOIN Tasks t ON p.TaskID = t.TaskID
       WHERE p.ProjectID = ? AND (t.TeacherID = ? OR ? = 'admin')`,
      [projectId, teacherId, req.user.role],
    )

    if (projects.length === 0) {
      return res.status(403).json({ error: "Access denied or project not found" })
    }

    // Start a transaction
    await db.query("START TRANSACTION")

    try {
      // Insert assessments
      for (const assessment of assessments) {
        const { competencyId, criteriaId, performanceLevelId, comments } = assessment

        await db.query(
          `INSERT INTO Assessments 
           (ProjectID, TeacherID, CompetencyID, CriteriaID, PerformanceLevelID, Comments) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [projectId, teacherId, competencyId, criteriaId, performanceLevelId, comments || null],
        )
      }

      // Add feedback if provided
      if (feedback) {
        await db.query(`INSERT INTO Feedback (ProjectID, UserID, FeedbackText) VALUES (?, ?, ?)`, [
          projectId,
          userId,
          feedback,
        ])
      }

      // Update project status
      await db.query("UPDATE Projects SET Status = 'Assessed' WHERE ProjectID = ?", [projectId])

      // Commit transaction
      await db.query("COMMIT")

      return res.status(201).json({ message: "Assessment submitted successfully" })
    } catch (error) {
      // Rollback on error
      await db.query("ROLLBACK")
      throw error
    }
  } catch (error) {
    console.error("Create assessment error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

