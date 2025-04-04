const express = require("express")
const router = express.Router()
const db = require("../db")
const { checkRole } = require("../middleware/auth")

// Get all tasks (with role-based filtering)
router.get("/", async (req, res) => {
  try {
    const { role, id } = req.user
    let query = ""
    let params = []

    if (role === "student") {
      // Students see all available tasks
      query = `
        SELECT t.*, CONCAT(u.FirstName, ' ', u.LastName) as TeacherName
        FROM Tasks t
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        JOIN Users u ON tc.UserID = u.UserID
        ORDER BY t.DueDate ASC
      `
    } else if (role === "teacher") {
      // Teachers see only their tasks
      query = `
        SELECT t.*
        FROM Tasks t
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        WHERE tc.UserID = ?
        ORDER BY t.DueDate ASC
      `
      params = [id]
    } else if (role === "parent") {
      // Parents see tasks assigned to their children
      query = `
        SELECT DISTINCT t.*, CONCAT(u.FirstName, ' ', u.LastName) as TeacherName
        FROM Tasks t
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        JOIN Users u ON tc.UserID = u.UserID
        JOIN Students s ON s.ParentID = (SELECT ParentID FROM Parents WHERE UserID = ?)
        ORDER BY t.DueDate ASC
      `
      params = [id]
    } else if (role === "admin") {
      // Admins see all tasks
      query = `
        SELECT t.*, CONCAT(u.FirstName, ' ', u.LastName) as TeacherName
        FROM Tasks t
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        JOIN Users u ON tc.UserID = u.UserID
        ORDER BY t.DueDate ASC
      `
    }

    const tasks = await db.query(query, params)

    return res.json({ tasks })
  } catch (error) {
    console.error("Get tasks error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Get a specific task by ID
router.get("/:id", async (req, res) => {
  try {
    const { id: taskId } = req.params

    const tasks = await db.query(
      `SELECT t.*, CONCAT(u.FirstName, ' ', u.LastName) as TeacherName
       FROM Tasks t
       JOIN Teachers tc ON t.TeacherID = tc.TeacherID
       JOIN Users u ON tc.UserID = u.UserID
       WHERE t.TaskID = ?`,
      [taskId],
    )

    if (tasks.length === 0) {
      return res.status(404).json({ error: "Task not found" })
    }

    return res.json({ task: tasks[0] })
  } catch (error) {
    console.error("Get task error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Create a new task (teachers only)
router.post("/", checkRole(["teacher", "admin"]), async (req, res) => {
  try {
    const { taskName, taskDescription, dueDate } = req.body
    const userId = req.user.id

    // Validate input
    if (!taskName || !taskDescription || !dueDate) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Get teacher ID
    const teachers = await db.query("SELECT TeacherID FROM Teachers WHERE UserID = ?", [userId])

    if (teachers.length === 0) {
      return res.status(404).json({ error: "Teacher record not found" })
    }

    const teacherId = teachers[0].TeacherID

    // Create task
    const result = await db.query(
      `INSERT INTO Tasks 
       (TeacherID, TaskName, TaskDescription, DueDate) 
       VALUES (?, ?, ?, ?)`,
      [teacherId, taskName, taskDescription, dueDate],
    )

    return res.status(201).json({
      message: "Task created successfully",
      taskId: result.insertId,
    })
  } catch (error) {
    console.error("Create task error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Update a task (teachers only)
router.put("/:id", checkRole(["teacher", "admin"]), async (req, res) => {
  try {
    const { id: taskId } = req.params
    const { taskName, taskDescription, dueDate } = req.body
    const userId = req.user.id

    // Validate input
    if (!taskName || !taskDescription || !dueDate) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Check if teacher owns this task
    const tasks = await db.query(
      `SELECT t.*
       FROM Tasks t
       JOIN Teachers tc ON t.TeacherID = tc.TeacherID
       WHERE t.TaskID = ? AND tc.UserID = ?`,
      [taskId, userId],
    )

    if (tasks.length === 0 && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. You don't own this task." })
    }

    // Update task
    await db.query(
      `UPDATE Tasks 
       SET TaskName = ?, TaskDescription = ?, DueDate = ? 
       WHERE TaskID = ?`,
      [taskName, taskDescription, dueDate, taskId],
    )

    return res.json({ message: "Task updated successfully" })
  } catch (error) {
    console.error("Update task error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

// Delete a task (teachers only)
router.delete("/:id", checkRole(["teacher", "admin"]), async (req, res) => {
  try {
    const { id: taskId } = req.params
    const userId = req.user.id

    // Check if teacher owns this task
    const tasks = await db.query(
      `SELECT t.*
       FROM Tasks t
       JOIN Teachers tc ON t.TeacherID = tc.TeacherID
       WHERE t.TaskID = ? AND tc.UserID = ?`,
      [taskId, userId],
    )

    if (tasks.length === 0 && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied. You don't own this task." })
    }

    // Check if task has associated projects
    const projects = await db.query("SELECT COUNT(*) as count FROM Projects WHERE TaskID = ?", [taskId])

    if (projects[0].count > 0) {
      return res.status(400).json({
        error: "Cannot delete task with associated projects. Update the task instead.",
      })
    }

    // Delete task
    await db.query("DELETE FROM Tasks WHERE TaskID = ?", [taskId])

    return res.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Delete task error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router

