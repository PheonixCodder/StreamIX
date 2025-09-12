import { headers } from "next/headers";
import { WebhookReceiver, WebhookEvent } from "livekit-server-sdk";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  console.log(1)
  // Ensure raw body
  const body = await req.text();
  const headerPayload = await headers();
  const authHeader = headerPayload.get("Authorization");

  if (!authHeader) {
    return new NextResponse("Missing Authorization header", { status: 400 });
  }

  let event: WebhookEvent;
  try {
    // Optionally set clockTolerance, if you want to allow a bit of time skew
    event = await receiver.receive(
      body,
      authHeader /* authHeader param */,
      false /* skipAuth */,
      "5s" /* clock tolerance */
    );
  } catch (err) {
    console.error("WebhookReceiver.receive failed:", err);
    return new NextResponse("Invalid webhook or authorization", {
      status: 401,
    });
  }

  switch (event.event) {
    case "ingress_started":
      if (event.ingressInfo?.ingressId) {
        await db.stream.update({
          where: { ingressId: event.ingressInfo.ingressId },
          data: { isLive: true },
        });
      }
      return new NextResponse(
        JSON.stringify({ message: "Stream marked live" }),
        { status: 200 }
      );

    case "ingress_ended":
      if (event.ingressInfo?.ingressId) {
        await db.stream.update({
          where: { ingressId: event.ingressInfo.ingressId },
          data: { isLive: false },
        });
      }
      return new NextResponse(
        JSON.stringify({ message: "Stream marked ended" }),
        { status: 200 }
      );

    // optionally handle other events you care about
    default:
      return new NextResponse(JSON.stringify({ message: "Event ignored" }), {
        status: 200,
      });
  }
}
