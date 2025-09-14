import { notFound } from "next/navigation";

import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { isBlockedByUser } from "@/actions/block";
import { StreamPlayer } from "@/components/stream-player";
import { currentUser } from "@clerk/nextjs/server";

type UserPageProps = {
  params: Promise<{ username: string }>;
};

async function UserPage({ params }: UserPageProps) {
  const resolvedParams = await params;
  const { username } = resolvedParams;
  const externalUser = await currentUser();
  const user = await getUserByUsername(username);
  if (!user || !user.stream) {
    notFound();
  }
  let isBlocked;
  if (externalUser) {
    isBlocked = await isBlockedByUser(user.id, "user");
  } else {
    isBlocked = await isBlockedByUser(user.id, "guest");
  }

  const isFollowing = await isFollowingUser(user.id)

  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayer
      user={user}
      stream={user.stream[0]}
      isFollowing={isFollowing}
    />
  );
}

export default UserPage;
