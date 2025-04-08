import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getUser } from "@/lib/api";
import UserProfile from "@/components/UserProfile";

export default async function OwnerAccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.token) {
    redirect("/login");
  }

  try {
    const user = await getUser(session.user.token);
    return <UserProfile isOwner user={user} />;
  } catch {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            Произошла ошибка при загрузке данных пользователя
          </div>
        </div>
      </div>
    );
  }
}
