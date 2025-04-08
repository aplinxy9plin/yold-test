import { getUserBySlug } from "@/lib/api";
import useSWR from "swr";

export function useUserBySlug(slug: string) {
  const {
    data: user,
    isLoading,
    error,
  } = useSWR(slug ? [`user`, slug] : null, () => getUserBySlug(slug), {
    revalidateOnFocus: false,
  });

  return { user, isLoading, error };
}
