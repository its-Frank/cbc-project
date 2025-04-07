import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

// Helper function to get user from token
async function getUserFromToken() {
  const token = cookies().get("auth-token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as any;
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    // Get user from token
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Check if user has teacher role
    if (user.role !== "teacher" && user.role !== "admin") {
      return NextResponse.json(
        { error: "Access denied. Insufficient permissions." },
        { status: 403 }
      );
    }

    const { taskName, taskDescription, dueDate } = await req.json();

    // Validate input
    if (!taskName || !taskDescription || !dueDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user has a teacher record
    const teachers = await db.query(
      "SELECT TeacherID FROM Teachers WHERE UserID = ?",
      [user.id]
    );

    let teacherId;

    if (teachers.length === 0) {
      // Create a teacher record if it doesn't exist
      console.log("Creating teacher record for user:", user.id);
      try {
        const result = await db.query(
          "INSERT INTO Teachers (UserID, HireDate) VALUES (?, CURDATE())",
          [user.id]
        );

        teacherId = result.insertId;
        console.log("Created teacher record with ID:", teacherId);
      } catch (dbError) {
        console.error("Failed to create teacher record:", dbError);
        return NextResponse.json(
          {
            error: "Failed to create teacher record",
            details:
              dbError instanceof Error ? dbError.message : String(dbError),
          },
          { status: 500 }
        );
      }
    } else {
      teacherId = teachers[0].TeacherID;
    }

    // Create task
    try {
      const result = await db.query(
        `INSERT INTO Tasks 
         (TeacherID, TaskName, TaskDescription, DueDate) 
         VALUES (?, ?, ?, ?)`,
        [teacherId, taskName, taskDescription, dueDate]
      );

      return NextResponse.json(
        {
          message: "Task created successfully",
          taskId: result.insertId,
        },
        { status: 201 }
      );
    } catch (dbError) {
      console.error("Failed to create task:", dbError);
      return NextResponse.json(
        {
          error: "Failed to create task",
          details: dbError instanceof Error ? dbError.message : String(dbError),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Get user from token
    const user = await getUserFromToken();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    let query = "";
    let params: any[] = [];

    if (user.role === "student") {
      // Students see all available tasks
      query = `
        SELECT t.*, CONCAT(u.FirstName, ' ', u.LastName) as TeacherName
        FROM Tasks t
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        JOIN Users u ON tc.UserID = u.UserID
        ORDER BY t.DueDate ASC
      `;
    } else if (user.role === "teacher") {
      // Teachers see only their tasks
      query = `
        SELECT t.*
        FROM Tasks t
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        WHERE tc.UserID = ?
        ORDER BY t.DueDate ASC
      `;
      params = [user.id];
    } else if (user.role === "parent") {
      // Parents see tasks assigned to their children
      query = `
        SELECT DISTINCT t.*, CONCAT(u.FirstName, ' ', u.LastName) as TeacherName
        FROM Tasks t
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        JOIN Users u ON tc.UserID = u.UserID
        JOIN Students s ON s.ParentID = (SELECT ParentID FROM Parents WHERE UserID = ?)
        ORDER BY t.DueDate ASC
      `;
      params = [user.id];
    } else if (user.role === "admin") {
      // Admins see all tasks
      query = `
        SELECT t.*, CONCAT(u.FirstName, ' ', u.LastName) as TeacherName
        FROM Tasks t
        JOIN Teachers tc ON t.TeacherID = tc.TeacherID
        JOIN Users u ON tc.UserID = u.UserID
        ORDER BY t.DueDate ASC
      `;
    }

    const tasks = await db.query(query, params);

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Get tasks error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
