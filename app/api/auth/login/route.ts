import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
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
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await compare(password, user.PasswordHash);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Update last login
    await db.query(
      "UPDATE Users SET LastLogin = CURRENT_TIMESTAMP WHERE UserID = ?",
      [user.UserID]
    );

    // Create session token
    const token = sign(
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
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({
      user: {
        id: user.UserID,
        email: user.Email,
        name: `${user.FirstName} ${user.LastName}`,
        role: user.RoleName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
