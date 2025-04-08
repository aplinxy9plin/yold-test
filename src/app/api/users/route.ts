import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUsers } from "@/lib/api";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }

  try {
    const users = await getUsers(session.user.token);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Ошибка получения списка пользователей",
      },
      { status: 400 }
    );
  }
}
