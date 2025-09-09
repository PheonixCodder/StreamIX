"use client";

import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

export const Toggle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {collapsed ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:flex w-full items-center justify-center pt-4 mb-4"
          >
            <Hint label={label} side="right" asChild>
              <Button onClick={onExpand} variant={"ghost"} className="h-auto p-2">
                <ArrowRightFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="p-3 pl-6 mb-2 flex items-center justify-between w-full"
          >
            <motion.p layout className="font-semibold text-primary">
              For you
            </motion.p>
            <Hint label={label} side="right" asChild>
              <Button
                className="h-auto p-2 ml-auto"
                variant={"ghost"}
                onClick={onCollapse}
              >
                <ArrowLeftFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const ToggleSkeleton = () => {
  return (
    <div className="p-3 mb-2 pl-6 hidden lg:flex items-center justify-between w-full">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};
