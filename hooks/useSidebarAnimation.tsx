// hooks/useSidebarAnimation.ts
import { useEffect, useState } from "react";
import { useSidebar } from "@/store/use-sidebar";

export const useSidebarAnimation = (delay = 300) => {
  const { collapsed } = useSidebar((state) => state);
  const [showContent, setShowContent] = useState(!collapsed);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!collapsed) {
      // Wait before showing label
      timeout = setTimeout(() => setShowContent(true), delay);
    } else {
      // Immediately hide on collapse
      setShowContent(false);
    }

    return () => clearTimeout(timeout);
  }, [collapsed, delay]);

  return showContent;
};
