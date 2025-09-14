import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

interface CreatorPageProps {
  params: Promise<{
    username: string;
  }>;
}

const CreatorPage = async ({ params }: CreatorPageProps) => {
  const externalUser = await currentUser();
  const { username } = await params;
  const user = await getUserByUsername(username);
  console.log(user)

  if (!user || user.externalUserId !== externalUser?.id || !user.stream) {
    notFound();
  }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream[0]} isFollowing />
    </div>
  );
};

export default CreatorPage;
