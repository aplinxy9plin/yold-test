"use client";

import { useUsers } from "@/hooks/useUsers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import UsersList from "./components/UsersList";

export default function AccountsListPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { users, isLoading, isError } = useUsers();

  console.log("Page state:", { session, status, users, isLoading, isError });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 text-red-500 p-4 rounded-md">
            Произошла ошибка при загрузке списка пользователей
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Список пользователей</h1>
        <UsersList users={users || []} />
      </div>
    </div>
  );
} 