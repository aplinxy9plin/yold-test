"use client";

import Link from "next/link";
import { UserResponse } from "@/lib/api";
import { useSession } from "next-auth/react";

interface UsersListProps {
  users: UserResponse[];
}

export default function UsersList({ users }: UsersListProps) {
  const { data: session } = useSession();
  return (
    <div className="bg-white shadow rounded-lg divide-y">
      {users.map((user) => (
        <Link
          key={user.slug}
          href={`/account/${
            session?.user.email !== user.email ? `guest/${user.slug}` : "owner"
          }`}
          className="block p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            {user.description && (
              <p className="text-sm text-gray-600">{user.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
