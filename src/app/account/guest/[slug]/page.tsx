interface GuestAccountPageProps {
  params: {
    slug: string;
  };
}

export default function GuestAccountPage({ params }: GuestAccountPageProps) {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Профиль пользователя</h1>
      <div className="max-w-4xl mx-auto">
        {/* Здесь будет содержимое профиля пользователя */}
        <p>Slug: {params.slug}</p>
      </div>
    </div>
  );
} 