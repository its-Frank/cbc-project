const express = require("express")
const router = express.Router()
const db = require("../db")

// Get feedback for a specific project
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

    // Get feedback
    const feedback = await db.query(
      `SELECT f.*, CONCAT(u.FirstName, ' ', u.LastName) as UserName, r.RoleName as UserRole
       FROM Feedback f
       JOIN Users u ON f.UserID = u.UserID
       JOIN Roles r ON u.RoleID = r.RoleID
       WHERE f.ProjectID = ?
       ORDER BY f.FeedbackDate DESC`,
      [projectId],
    )

    return res.json({ feedback })
  } catch (error) {
    console.error("Get feedback error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Add feedback to a project
router.post("/project/:id", async (req, res) => {
  try {
    const { id: projectId } = req.params
    const { feedbackText } = req.body
    const userId = req.user.id

    // Validate input
    if (!feedbackText) {
      return res.status(400).json({ error: "Feedback text is required" })
    }

    // Check if user has access to this project
    let accessQuery = ""
    let accessParams = []
    const { role } = req.user

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

    // Add feedback
    await db.query("INSERT INTO Feedback (ProjectID, UserID, FeedbackText) VALUES (?, ?, ?)", [
      projectId,
      userId,
      feedbackText,
    ])

    return res.status(201).json({ message: "Feedback added successfully" })
  } catch (error) {
    console.error("Add feedback error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

