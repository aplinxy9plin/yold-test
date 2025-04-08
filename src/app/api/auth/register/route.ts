import { NextResponse } from "next/server";
import { register } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { message: "Необходимо указать email, пароль и имя" },
        { status: 400 }
      );
    }

    const { value: token } = await register({ email, password, name });
    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Ошибка регистрации" },
      { status: 400 }
    );
  }
} 