const express = require("express");
const router = express.Router();
const db = require("../db");
const { checkRole } = require("../middleware/auth");
// Replace any bcrypt imports in this file
const bcrypt = require("bcryptjs");

// Get user profile
router.get("/profile", async (req, res) => {
  try {
    const userId = req.user.id;

    const users = await db.query(
      `SELECT u.UserID, u.FirstName, u.LastName, u.Email, r.RoleName,
              u.CreatedAt, u.LastLogin
       FROM Users u
       JOIN Roles r ON u.RoleID = r.RoleID
       WHERE u.UserID = ?`,
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    // Get role-specific information
    if (user.RoleName === "student") {
      const students = await db.query(
        `SELECT s.*, CONCAT(p.FirstName, ' ', p.LastName) as ParentName
         FROM Students s
         LEFT JOIN Parents pr ON s.ParentID = pr.ParentID
         LEFT JOIN Users p ON pr.UserID = p.UserID
         WHERE s.UserID = ?`,
        [userId]
      );

      if (students.length > 0) {
        user.roleInfo = students[0];
      }
    } else if (user.RoleName === "teacher") {
      const teachers = await db.query(
        "SELECT * FROM Teachers WHERE UserID = ?",
        [userId]
      );

      if (teachers.length > 0) {
        user.roleInfo = teachers[0];
      }
    } else if (user.RoleName === "parent") {
      const parents = await db.query("SELECT * FROM Parents WHERE UserID = ?", [
        userId,
      ]);

      if (parents.length > 0) {
        user.roleInfo = parents[0];

        // Get children
        const children = await db.query(
          `SELECT s.*, CONCAT(u.FirstName, ' ', u.LastName) as StudentName
           FROM Students s
           JOIN Users u ON s.UserID = u.UserID
           WHERE s.ParentID = ?`,
          [parents[0].ParentID]
        );

        user.children = children;
      }
    }

    return res.json({ user });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update user profile
router.put("/profile", async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, email } = req.body;

    // Validate input
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email is already in use by another user
    const existingUsers = await db.query(
      "SELECT * FROM Users WHERE Email = ? AND UserID != ?",
      [email, userId]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    // Update user
    await db.query(
      "UPDATE Users SET FirstName = ?, LastName = ?, Email = ? WHERE UserID = ?",
      [firstName, lastName, email, userId]
    );

    return res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Change password
router.put("/change-password", async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Current and new passwords are required" });
    }

    // Get current user
    const users = await db.query("SELECT * FROM Users WHERE UserID = ?", [
      userId,
    ]);

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      users[0].PasswordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await db.query("UPDATE Users SET PasswordHash = ? WHERE UserID = ?", [
      hashedPassword,
      userId,
    ]);

    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Get all students (teachers and admins only)
router.get("/students", checkRole(["teacher", "admin"]), async (req, res) => {
  try {
    const { role, id } = req.user;
    let query = "";
    let params = [];

    if (role === "teacher") {
      // Teachers can see students who have submitted projects for their tasks
      query = `
        SELECT DISTINCT s.*, CONCAT(u.FirstName, ' ', u.LastName) as StudentName
        FROM Students s
        JOIN Users u ON s.UserID = u.UserID
        JOIN Projects p ON s.StudentID = p.StudentID
        JOIN Tasks t ON p.TaskID = t.TaskID
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        WHERE tc.UserID = ?
        ORDER BY u.LastName, u.FirstName
      `;
      params = [id];
    } else if (role === "admin") {
      // Admins can see all students
      query = `
        SELECT s.*, CONCAT(u.FirstName, ' ', u.LastName) as StudentName
        FROM Students s
        JOIN Users u ON s.UserID = u.UserID
        ORDER BY u.LastName, u.FirstName
      `;
    }

    const students = await db.query(query, params);

    return res.json({ students });
  } catch (error) {
    console.error("Get students error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
