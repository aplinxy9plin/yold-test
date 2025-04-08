"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Typography } from "./ui/Typography";
import { Button } from "./ui/Button";
import { Avatar } from "./ui/Avatar";
import { useUser } from "@/hooks/useUser";

export default function Header() {
  const { data: session } = useSession();
  const { user } = useUser();

  return (
    <header className="bg-white right-0bg-white shadow w-full z-10 relative">
      <div className="h-20 mx-auto px-4 sm:px-6 lg:px-8 flex items-center w-full">
        <div className="flex justify-between items-center h-16 w-full">
          <Link
            href="/accounts-list"
            className="flex items-center space-x-4 h-full"
          >
            <div className="flex-shrink-0">
              <Image src="/logo.svg" alt="Logo" width={80} height={50} />
            </div>
            <Typography
              variant="paragraph"
              className="max-w-[240px] hidden sm:block"
            >
              Разрабатываем и запускаем сложные веб проекты
            </Typography>
          </Link>

          <div>
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/account/owner" className="flex items-center gap-5">
                  <Typography variant="paragraph">{user?.name}</Typography>
                  <Avatar
                    size="mini"
                    image={user?.image?.url}
                    username={user?.name}
                  />
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="secondary">Войти</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
