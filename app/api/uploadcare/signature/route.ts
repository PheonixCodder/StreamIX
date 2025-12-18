import { NextResponse } from "next/server";
import { generateSecureSignature } from "@uploadcare/signed-uploads";

export function GET() {
  const secret = process.env.UPLOADCARE_SECRET_KEY!;
  const { secureSignature, secureExpire } = generateSecureSignature(secret, {
    lifetime: 60 * 1000, // valid for 1 minute
  });

  return NextResponse.json({
    secureSignature,
    secureExpire: Math.floor(Number(secureExpire) / 1000), // Uploadcare expects seconds
  });
}
