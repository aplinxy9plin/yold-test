"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EnvelopeIcon, LockIcon, EyeIcon } from "react-line-awesome";
import { isEmail } from "@/lib/utils";

interface LoginFormProps {
  initialError?: string | null;
}

export default function LoginForm({ initialError }: LoginFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(initialError || null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
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
    } catch {
      setError("Произошла ошибка при входе");
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
      <Typography variant="title">Вход в Yoldi Agency</Typography>
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            maxLength={300}
            before={<EnvelopeIcon style={{ fontSize: "25px" }} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={isEmailError}
          />
        </div>
        <div>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="Пароль"
            maxLength={300}
            before={<LockIcon style={{ fontSize: "25px" }} />}
            after={
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <EyeIcon style={{ fontSize: "25px" }} />
              </button>
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <Button
        className="w-full text-center"
        variant="primary"
        type="submit"
        disabled={isDisabled}
      >
        {isLoading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
}
