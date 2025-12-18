"use client";

import { User } from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar";
import { useSidebarAnimation } from "@/hooks/useSidebarAnimation";
import { UserItem, UserItemSkeleton } from "./user-item";
import { motion, AnimatePresence } from "framer-motion";
import { Hint } from "@/components/hint";

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean }[] | null;
  })[];
}

const Recommended = ({ data }: RecommendedProps) => {
  const labelVisible = useSidebarAnimation();
  const { collapsed } = useSidebar((state) => state);

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {labelVisible && data.length > 0 && (
          <motion.div
            key="recommended-label"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0 }}
            className="pl-6 mb-4"
          >
            <p className="text-sm text-muted-foreground">Recommended</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.ul
        className="space-y-2 px-2"
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {data.map((user) => (
          <Hint key={user.id} label={user.username} side="right" asChild>
            <UserItem
              username={user.username}
              imageUrl={user.imageUrl}
              isLive={user.stream?.[0].isLive}
            />
          </Hint>
        ))}
      </motion.ul>
    </div>
  );
};

export default Recommended;

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
