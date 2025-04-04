"use server";
import { redirect } from "next/navigation";

async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  try {
    // Validate inputs
    if (!email || !password || !role) {
      throw new Error("Please fill in all fields");
    }

    // Use a hardcoded URL if the environment variable is not set
    // Since we're running on the same server, we can use a relative URL
    const apiUrl = "/api/auth/login";

    // Call the API to login
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        return { success: false, error: error.error || "Login failed" };
      } else {
        // Handle non-JSON response (like HTML)
        const text = await response.text();
        console.error("Non-JSON response:", text);
        return {
          success: false,
          error: "Server error. Please try again later.",
        };
      }
    }

    const data = await response.json();

    // Check if user role matches selected role
    if (data.user.role.toLowerCase() !== role.toLowerCase()) {
      return {
        success: false,
        error: `You are not registered as a ${role}. Please select the correct role.`,
      };
    }

    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Login error:", error);
    return {
      success: false,
      error: error.message || "Please check your credentials and try again.",
    };
  }
}

async function redirectToDashboard(role: string) {
  redirect(`/dashboard/${role.toLowerCase()}`);
}

export { loginAction, redirectToDashboard };
