import useSWR from "swr";
import { useSession } from "next-auth/react";
import { getUser } from "@/lib/api";

export function useUser() {
  const { data: session, status } = useSession();
  const { data: user, error, mutate } = useSWR(
    status === "authenticated" && session?.user?.token ? ["user", session.user.token] : null,
    () => getUser(session!.user!.token),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    user,
    isLoading: status === "loading" || (!error && !user),
    isError: error,
    mutate,
  };
} 