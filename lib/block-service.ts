import { db } from "./db";
import { getSelf } from "./auth-service";


export const blockGuestUser = async (guestId: string) => {
  const self = await getSelf();

  // Prevent blocking self or host accidentally
  if (self!.id === guestId) {
    throw new Error("Cannot block yourself");
  }

  const existingGuestBlock = await db.guestBlock.findUnique({
    where: {
      hostId_guestId: {
        hostId: self!.id,
        guestId,
      },
    },
  });

  if (existingGuestBlock) {
    throw new Error("Already blocked");
  }

  return await db.guestBlock.create({
    data: {
      hostId: self!.id,
      guestId,
    },
  });
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self!.id === id) {
    throw new Error("Cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self!.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (existingBlock) {
    throw new Error("Already Blocked");
  }

  const block = await db.block.create({
    data: {
      blockerId: self!.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });
  return block;
};

export const unBlockUser = async (id: string) => {
  const self = await getSelf();

  if (self!.id === id) {
    throw new Error("Cannot unblock yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!otherUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self!.id,
        blockedId: otherUser.id,
      },
    },
  });

  if (!existingBlock) {
    throw new Error("User is not Blocked");
  }

  const unBlock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unBlock;
};

export const getBlockedUser = async () => {
  const self = await getSelf();

  const blockedUser = await db.block.findMany({
    where: {
      blockerId: self?.id,
    },
    include: {
      blocked: true,
    },
  });
  return blockedUser;
};
