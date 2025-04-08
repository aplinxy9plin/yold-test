import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getUser } from "@/lib/api";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export function useUser() {
  const { data: session, status } = useSession();
  const { data: user, error, mutate } = useSWR(
    status === "authenticated" && session?.user?.token ? ["user", session.user.token] : null,
    () => getUser(session!.user!.token),
    {
      revalidateOnFocus: false,
    }
  );
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return {
    user,
    isLoading: status === "loading" || (!error && !user),
    isError: error,
    mutate,
  };
} 