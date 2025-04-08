"use client";

import Link from "next/link";
import { UserResponse } from "@/lib/api";
import { Avatar } from "@/components/ui/Avatar";
import { Typography } from "@/components/ui/Typography";
import { useUserStore } from "@/store/useUserStore";

interface UsersListProps {
  users: UserResponse[];
}

export default function UsersList({ users }: UsersListProps) {
  const userStore = useUserStore((state) => state.user);

  return (
    <div className="bg-white">
      {users.map((user) => (
        <Link
          key={user.slug}
          href={`/account/${
            userStore?.email !== user.email ? `guest/${user.slug}` : "owner"
          }`}
          className="block py-4 hover:bg-gray-50 transition-colors border-t border-strokes-secondary"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Avatar image={user.image?.url} username={user.name} />
              <div>
                <Typography
                  variant="button-text"
                  className="truncate max-w-[150px]"
                >
                  {user.name}
                </Typography>
                <Typography
                  variant="paragraph"
                  className="block sm:hidden truncate max-w-[150px] text-primary-stroke"
                >
                  {user.email}
                </Typography>
              </div>
            </div>
            <Typography
              variant="paragraph"
              className="hidden sm:block truncate max-w-[150px] text-primary-stroke"
            >
              {user.email}
            </Typography>
          </div>
        </Link>
      ))}
    </div>
  );
}
