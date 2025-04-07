import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This is a proxy API route that forwards requests to the Express backend
export async function POST(req: Request) {
  try {
    const { endpoint, method, data } = await req.json();

    // Get the auth token from cookies
    const token = cookies().get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Determine the backend URL (use environment variable or default)
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";

    // Make the request to the backend
    const response = await fetch(`${backendUrl}/api${endpoint}`, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `auth-token=${token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    // Get the response data
    const responseData = await response.json().catch(() => null);

    // Return the response with the same status code
    return NextResponse.json(responseData || {}, { status: response.status });
  } catch (error) {
    console.error("Direct backend proxy error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
