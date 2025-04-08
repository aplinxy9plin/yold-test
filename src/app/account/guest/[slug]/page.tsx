"use client";

import UserProfile from "@/components/UserProfile";
import { useUserBySlug } from "@/hooks/useUserBySlug";
import { use } from "react";

interface GuestAccountPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GuestAccountPage({ params }: GuestAccountPageProps) {
  const { slug } = use(params); // ✅ разворачиваем промис
  const { user, isLoading, error } = useUserBySlug(slug);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <UserProfile user={user} />
    </div>
  );
}
