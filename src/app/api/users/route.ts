import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUsers } from "@/lib/api";

export async function GET() {
  console.log("API route: GET /api/users");
  
  const session = await getServerSession(authOptions);
  console.log("Session:", session);

  if (!session?.user?.token) {
    console.log("No session or token");
    return NextResponse.json(
      { message: "Не авторизован" },
      { status: 401 }
    );
  }

  try {
    console.log("Fetching users with token:", session.user.token);
    const users = await getUsers(session.user.token);
    console.log("Users fetched successfully:", users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Ошибка получения списка пользователей" },
      { status: 400 }
    );
  }
} 