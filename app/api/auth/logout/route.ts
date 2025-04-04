import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Await the cookies() function
  const cookieStore = await cookies();

  // Clear the auth cookie
  cookieStore.delete("auth-token");

  return NextResponse.json({ message: "Logged out successfully" });
}
