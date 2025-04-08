"use client";

import Cover from "@/components/Cover";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignOutAltIcon } from "react-line-awesome";
import { useUserStore } from "@/store/useUserStore";
import UpdateProfile from "@/app/account/owner/components/UpdateProfile";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    image: {
      id: string;
      url: string;
      width: string;
      height: string;
    } | null;
    description: string | null;
  };
  isOwner?: boolean;
}

export default function UserProfile({
  user,
  isOwner = false,
}: UserProfileProps) {
  const router = useRouter();
  const userStore = useUserStore((state) => state.user);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (!userStore) {
    return <div>Loading...</div>;
  }

  const currentUser = isOwner ? userStore : user;

  return (
    <div>
      <Cover />
      <div className="p-8 relative z-5">
        <div className="max-w-4xl mx-auto mt-[-90px]">
          <Avatar size="big" image={currentUser?.image?.url} username={currentUser.name} />
          <div className="flex justify-between items-center mt-9">
            <Typography variant="title" className="text-txt">
              {currentUser.name}
            </Typography>
            {isOwner && (
              <div className="hidden sm:flex">
                <UpdateProfile />
              </div>
            )}
          </div>
          <div className="mt-2.5">
            <Typography variant="paragraph" className="text-primary-stroke">
              {currentUser.email}
            </Typography>
            {isOwner && (
              <div className="flex sm:hidden mt-4">
                <UpdateProfile />
              </div>
            )}
            <Typography variant="paragraph" className="text-txt mt-7.5">
              {currentUser.description}
            </Typography>
          </div>
          {isOwner && (
            <div className="mt-15">
              <Button
                variant="secondary"
                onClick={handleSignOut}
                before={<SignOutAltIcon style={{ fontSize: 25 }} />}
              >
                Выйти
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
