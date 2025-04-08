"use client";

import Cover from "@/components/Cover";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PenIcon, SignOutAltIcon } from "react-line-awesome";
import UpdateProfile from "./UpdateProfile";
interface UserProfileProps {
  user: {
    name: string;
    email: string;
    image: string | null;
    description: string | null;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div>
      <Cover />
      <div className="p-8 relative z-5">
        <div className="max-w-4xl mx-auto mt-[-90px]">
          <Avatar size="big" image={user?.image} username={user.name} />
          <div className="flex justify-between items-center mt-9">
            <Typography variant="title" className="text-txt">
              {user.name}
            </Typography>
            <Button
              className="hidden sm:flex"
              variant="secondary"
              before={<PenIcon />}
            >
              Редактировать
            </Button>
            <UpdateProfile />
          </div>
          <div className="mt-2.5">
            <Typography variant="paragraph" className="text-primary-stroke">
              {user.email}
            </Typography>
            <Button
              className="flex sm:hidden mt-4"
              variant="secondary"
              before={<PenIcon />}
            >
              Редактировать
            </Button>
            <Typography variant="paragraph" className="text-txt">
              {user.description}
            </Typography>
          </div>
          <div className="mt-15">
            <Button
              variant="secondary"
              onClick={handleSignOut}
              before={<SignOutAltIcon style={{ fontSize: 25 }} />}
            >
              Выйти
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
