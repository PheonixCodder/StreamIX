import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

import { db } from "@/lib/db";
import { resetIngresses } from "@/actions/ingress";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // For this guide, you simply log the payload to the console
    const eventType = evt.type;

    if (eventType === "user.created") {
      await db.user.create({
        data: {
          externalUserId: evt.data.id,
          username: evt.data.username!,
          imageUrl: evt.data.image_url,
          stream: {
            create: {
              name: `${evt.data.username}'s stream`,
            },
          },
        },
      });
    }

    if (eventType === "user.updated") {
      await db.user.update({
        where: {
          externalUserId: evt.data.id,
        },
        data: {
          username: evt.data.username!,
          imageUrl: evt.data.image_url,
        },
      });
    }

    if (eventType === "user.deleted") {
      await resetIngresses(evt.data.id!);

      await db.user.delete({
        where: {
          externalUserId: evt.data.id,
        },
      });
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("", { status: 400 });
  }
}
