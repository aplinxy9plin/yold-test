import { headers } from "next/headers";
import RegisterForm from "./components/RegisterForm";
import AuthFooter from "@/components/AuthFooter";

export default async function RegisterPage() {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  const error = referer ? new URL(referer).searchParams.get("error") : null;
  const decodedError = error ? decodeURIComponent(error) : null;

  return (
    <div className="min-h-screen bg-white sm:bg-background-secondary absolute inset-0 flex items-center justify-center">
      <RegisterForm initialError={decodedError} />
      <AuthFooter />
    </div>
  );
}
