const express = require("express")
const router = express.Router()
const db = require("../db")
const { checkRole } = require("../middleware/auth")

// Get all competencies
router.get("/", async (req, res) => {
  try {
    const competencies = await db.query("SELECT * FROM Competencies ORDER BY CompetencyName")

    return res.json({ competencies })
  } catch (error) {
    console.error("Get competencies error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Get all criteria for competencies
router.get("/criteria", async (req, res) => {
  try {
    const criteria = await db.query(
      `SELECT cr.*, c.CompetencyName
       FROM Criteria cr
       JOIN Competencies c ON cr.CompetencyID = c.CompetencyID
       ORDER BY c.CompetencyName, cr.CriteriaName`,
    )

    return res.json({ criteria })
  } catch (error) {
    console.error("Get criteria error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Get all performance levels
router.get("/performance-levels", async (req, res) => {
  try {
    const levels = await db.query("SELECT * FROM PerformanceLevels ORDER BY ScoreValue")

    return res.json({ levels })
  } catch (error) {
    console.error("Get performance levels error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Get student competency progress
router.get("/progress/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params
    const { role, id } = req.user

    // Check if user has access to this student's data
    let hasAccess = false

    if (role === "admin") {
      hasAccess = true
    } else if (role === "teacher") {
      // Teachers can see progress of students in their classes
      const access = await db.query(
        `SELECT COUNT(*) as count
         FROM Projects p
         JOIN Tasks t ON p.TaskID = t.TaskID
         JOIN Teachers tc ON t.TeacherID = tc.TeacherID
         WHERE p.StudentID = ? AND tc.UserID = ?`,
        [studentId, id],
      )
      hasAccess = access[0].count > 0
    } else if (role === "parent") {
      // Parents can see their children's progress
      const access = await db.query(
        `SELECT COUNT(*) as count
         FROM Students s
         JOIN Parents p ON s.ParentID = p.ParentID
         WHERE s.StudentID = ? AND p.UserID = ?`,
        [studentId, id],
      )
      hasAccess = access[0].count > 0
    } else if (role === "student") {
      // Students can only see their own progress
      const access = await db.query(
        `SELECT COUNT(*) as count
         FROM Students s
         WHERE s.StudentID = ? AND s.UserID = ?`,
        [studentId, id],
      )
      hasAccess = access[0].count > 0
    }

    if (!hasAccess) {
      return res.status(403).json({ error: "Access denied" })
    }

    // Get student info
    const students = await db.query(
      `SELECT s.*, CONCAT(u.FirstName, ' ', u.LastName) as StudentName
       FROM Students s
       JOIN Users u ON s.UserID = u.UserID
       WHERE s.StudentID = ?`,
      [studentId],
    )

    if (students.length === 0) {
      return res.status(404).json({ error: "Student not found" })
    }

    const student = students[0]

    // Get competency progress
    const progress = await db.query(
      `SELECT c.CompetencyID, c.CompetencyName, 
              AVG(pl.ScoreValue) as AverageScore,
              COUNT(DISTINCT a.ProjectID) as ProjectCount,
              MAX(pl.ScoreValue) as MaxScore
       FROM Competencies c
       LEFT JOIN Assessments a ON c.CompetencyID = a.CompetencyID
       LEFT JOIN PerformanceLevels pl ON a.PerformanceLevelID = pl.PerformanceLevelID
       LEFT JOIN Projects p ON a.ProjectID = p.ProjectID
       WHERE p.StudentID = ? OR p.StudentID IS NULL
       GROUP BY c.CompetencyID
       ORDER BY c.CompetencyName`,
      [studentId],
    )

    // Calculate percentage for each competency
    for (const comp of progress) {
      // Get max possible score
      const maxPossible = await db.query("SELECT MAX(ScoreValue) as MaxPossible FROM PerformanceLevels")

      if (comp.AverageScore !== null) {
        comp.PercentageScore = Math.round((comp.AverageScore / maxPossible[0].MaxPossible) * 100)
      } else {
        comp.PercentageScore = 0
      }
    }

    return res.json({ student, progress })
  } catch (error) {
    console.error("Get student progress error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Add new competency (admin only)
router.post("/", checkRole(["admin"]), async (req, res) => {
  try {
    const { competencyName, competencyDescription } = req.body

    // Validate input
    if (!competencyName) {
      return res.status(400).json({ error: "Competency name is required" })
    }

    // Check if competency already exists
    const existing = await db.query("SELECT * FROM Competencies WHERE CompetencyName = ?", [competencyName])

    if (existing.length > 0) {
      return res.status(409).json({ error: "Competency already exists" })
    }

    // Create competency
    const result = await db.query("INSERT INTO Competencies (CompetencyName, CompetencyDescription) VALUES (?, ?)", [
      competencyName,
      competencyDescription || null,
    ])

    return res.status(201).json({
      message: "Competency created successfully",
      competencyId: result.insertId,
    })
  } catch (error) {
    console.error("Create competency error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

