import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const Logo = async () => {
        const user = await currentUser()
    
  return (
    <Link href={`/u/${user?.username}`}>
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full p-1 mr-10 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/twitch.svg" alt="StreamIX" height="32" width="32" />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="text-lg font-semibold">StreamIX</p>
          <p className="text-xs text-muted-foreground">Creator Dashboard</p>
        </div>
      </div>
    </Link>
  );
};
