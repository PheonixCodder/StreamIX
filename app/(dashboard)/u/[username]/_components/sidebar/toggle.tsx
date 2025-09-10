"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebar } from "@/store/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useCreatorSidebar((state) => state);
  const label = collapsed ? "Expand" : "Collapse";

  return (
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
          className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full"
        >
          <motion.p layout className="font-semibold text-primary">
            Dashboard
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
  );
};

export default Toggle;
