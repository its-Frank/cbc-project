const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user already exists
    const existingUser = await db.query("SELECT * FROM Users WHERE Email = ?", [
      email,
    ]);

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // Get role ID
    const roleResult = await db.query(
      "SELECT RoleID FROM Roles WHERE RoleName = ?",
      [role]
    );

    if (roleResult.length === 0) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const roleId = roleResult[0].RoleID;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await db.query(
      "INSERT INTO Users (FirstName, LastName, Email, PasswordHash, RoleID) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, hashedPassword, roleId]
    );

    const userId = result.insertId;

    // Create role-specific record
    if (role === "student") {
      await db.query(
        "INSERT INTO Students (UserID, RegistrationDate) VALUES (?, CURDATE())",
        [userId]
      );
    } else if (role === "teacher") {
      await db.query(
        "INSERT INTO Teachers (UserID, HireDate) VALUES (?, CURDATE())",
        [userId]
      );
    } else if (role === "parent") {
      await db.query("INSERT INTO Parents (UserID) VALUES (?)", [userId]);
    }

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user
    const users = await db.query(
      `SELECT u.UserID, u.FirstName, u.LastName, u.Email, u.PasswordHash, r.RoleName 
       FROM Users u
       JOIN Roles r ON u.RoleID = r.RoleID
       WHERE u.Email = ?`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login
    await db.query(
      "UPDATE Users SET LastLogin = CURRENT_TIMESTAMP WHERE UserID = ?",
      [user.UserID]
    );

    // Create session token
    const token = jwt.sign(
      {
        id: user.UserID,
        email: user.Email,
        role: user.RoleName,
        name: `${user.FirstName} ${user.LastName}`,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res.json({
      user: {
        id: user.UserID,
        email: user.Email,
        name: `${user.FirstName} ${user.LastName}`,
        role: user.RoleName,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Logout user
router.post("/logout", (req, res) => {
  res.clearCookie("auth-token");
  return res.json({ message: "Logged out successfully" });
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    const token =
      req.cookies["auth-token"] ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    const users = await db.query(
      `SELECT u.UserID, u.FirstName, u.LastName, u.Email, r.RoleName 
       FROM Users u
       JOIN Roles r ON u.RoleID = r.RoleID
       WHERE u.UserID = ?`,
      [decoded.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = users[0];

    return res.json({
      user: {
        id: user.UserID,
        email: user.Email,
        name: `${user.FirstName} ${user.LastName}`,
        role: user.RoleName,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
