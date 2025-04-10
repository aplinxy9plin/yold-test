import useSWRImmutable from "swr/immutable";
import { UserResponse } from "@/lib/api";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("Ошибка при загрузке данных");
    const data = await res.json();
    error.message = data.message || "Ошибка при загрузке данных";
    throw error;
  }
  return res.json();
};

export function useUsers() {
  const { data: users, error, mutate } = useSWRImmutable<UserResponse[]>("/api/users", fetcher);

  return {
    users,
    isLoading: !error && !users,
    isError: error,
    mutate,
  };
} 