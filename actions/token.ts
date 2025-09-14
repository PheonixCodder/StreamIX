"use server";

import { v4 } from "uuid";
import { AccessToken } from "livekit-server-sdk";

import { getSelf } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { isBlockedByUser } from "@/actions/block";
import { cookies } from "next/headers";

export const createViewerToken = async (hostIdentity: string) => {
  let self;

  try {
    self = await getSelf();
  } catch {
    const cookieStore = await cookies();
    let guestId = cookieStore.get("guest_id")?.value;
    let guestUsername = cookieStore.get("guest_username")?.value;

    if (!guestId || !guestUsername) {
      guestId = v4();
      guestUsername = `guest#${Math.floor(Math.random() * 1000)}`;
      cookieStore.set("guest_id", guestId, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      cookieStore.set("guest_username", guestUsername, {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    self = { id: guestId, username: guestUsername };
  }

  const host = await getUserById(hostIdentity);
  if (!host) {
    throw new Error("User not found");
  }

  const isHost = self?.id === host.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${self?.id}` : self?.id,
      name: self?.username,
    }
  );

  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
};
