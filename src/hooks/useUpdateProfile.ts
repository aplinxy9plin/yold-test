import { UpdateProfileData } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useUser } from "./useUser";
import { updateProfile } from "@/lib/api";

interface Session {
  user: {
    token: string;
  };
}

export function useUpdateProfile() {
  const { data: session } = useSession() as { data: Session | null };
  const { mutate: mutateUser } = useUser();

  const update = async (data: UpdateProfileData) => {
    if (!session?.user?.token) {
      throw new Error("Не авторизован");
    }

    try {
      const updatedUser = await updateProfile(session.user.token, data);
      await mutateUser();
      return updatedUser;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return {
    update,
  };
}
