import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password, role } = await req.json();

    // Validate input
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.query("SELECT * FROM Users WHERE Email = ?", [
      email,
    ]);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Get role ID
    const roleResult = await db.query(
      "SELECT RoleID FROM Roles WHERE RoleName = ?",
      [role]
    );

    if (roleResult.length === 0) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const roleId = roleResult[0].RoleID;

    // Hash password
    const hashedPassword = await hash(password, 10);

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

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
