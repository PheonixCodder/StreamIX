"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unBlockUser, blockGuestUser } from "@/lib/block-service";
import { db } from "@/lib/db";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const onBlock = async (id: string) => {
  //TODO: Adapt to disconnect from livestream
  //TODO: Allow ability to kick the user
  const self = await getSelf();

  let blockedUser;

  try {
    blockedUser = await blockUser(id);
  } catch {
    try {
      await blockGuestUser(id);
    } catch (err) {
      console.error("Failed to block guest:", err);
    }
  }

  try {
    await roomService.removeParticipant(self!.id, id);
  } catch {
    // Means user is not in the room
  }

  revalidatePath(`/u/${self?.username}/community`);
  revalidatePath(`/${self?.username}`);

  return blockedUser;
};

export const onUnblock = async (id: string) => {
  const unblockedUser = await unBlockUser(id);
  const self = await getSelf();

  revalidatePath(`/u/${self?.username}/community`);

  return unblockedUser;
};

export const isBlockedByUser = async (id: string, role: "user" | "guest") => {
  try {
    try {
      const self = await getSelf();
      const otherUser = await db.user.findUnique({
        where: {
          id,
        },
      });
      if (!otherUser) {
        throw new Error("User not found");
      }

      if (otherUser.id === self?.id) return false;

      const existingBlock = await db.block.findUnique({
        where: {
          blockerId_blockedId: {
            blockerId: otherUser.id,
            blockedId: self!.id,
          },
        },
      });

      return !!existingBlock;
    } catch (error) {
      const cookieStore = await cookies();
      const guestId = cookieStore.get("guest_id")?.value;
      const existingGuestBlock = await db.guestBlock.findUnique({
        where: {
          hostId_guestId: {
            hostId: id,
            guestId: guestId!,
          },
        },
      });

      return !!existingGuestBlock;
    }
  } catch {
    return false;
  }
};