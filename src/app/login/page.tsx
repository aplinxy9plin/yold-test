import { headers } from "next/headers";
import LoginForm from "./components/LoginForm";
import AuthFooter from "@/components/AuthFooter";
export default async function LoginPage() {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const url = referer ? new URL(referer) : null;

  const error = url?.searchParams.get("error");
  const decodedError = error ? decodeURIComponent(error) : null;

  return (
    <div className="min-h-screen bg-white sm:bg-background-secondary absolute inset-0 flex items-center justify-center">
      <LoginForm initialError={decodedError} />
      <AuthFooter isLogin />
    </div>
  );
}
