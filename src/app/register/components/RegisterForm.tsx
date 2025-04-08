"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerUser } from "@/lib/api";
import { signIn } from "next-auth/react";
import { isEmail } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";

interface RegisterFormProps {
  initialError?: string | null;
}

export default function RegisterForm({ initialError }: RegisterFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(initialError || null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    try {
      await registerUser({ email, password, name });

      // Автоматически входим после успешной регистрации
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push("/account/owner");
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при регистрации"
      );
    } finally {
      setIsLoading(false);
    }
  }

  const isDisabled = isLoading || !email || !password || !isEmail(email);
  const isEmailError = !!(email && !isEmail(email));

  return (
    <form
      className="w-full h-full pt-28 sm:pt-7.5 sm:h-auto sm:max-w-[400px] p-7.5 rounded-[5px] bg-white space-y-6"
      onSubmit={handleSubmit}
    >
      <Typography variant="title">Регистрация в Yoldi Agency</Typography>
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <Input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Имя"
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email"
          maxLength={300}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={isEmailError}
        />

        <Input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Пароль"
          maxLength={300}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        className="w-full text-center"
        variant="primary"
        type="submit"
        disabled={isDisabled}
      >
        {isLoading ? "Создание..." : "Создать аккаунт"}
      </Button>
    </form>
  );
}
