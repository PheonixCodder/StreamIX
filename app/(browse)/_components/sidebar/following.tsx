"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-Item";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarAnimation } from "@/hooks/useSidebarAnimation";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean }[] | null;
    };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar((state) => state);
  const labelVisible = useSidebarAnimation(); // delay label rendering

  if (!data.length) return null;

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {labelVisible && (
          <motion.div
            key="following-label"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="pl-6 mb-4"
          >
            <p className="text-sm text-muted-foreground">Following</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.ul
        className="space-y-2 px-2"
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.[0].isLive}
          />
        ))}
      </motion.ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};
