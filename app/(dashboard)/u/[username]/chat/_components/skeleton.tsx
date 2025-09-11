import { Skeleton } from "@/components/ui/skeleton";

// Page header skeleton
export const ChatHeaderSkeleton = () => (
  <div className="mb-4">
    <Skeleton className="h-8 w-40" />
  </div>
);

// ToggleCard Skeleton
export const ToggleCardSkeleton = () => (
  <div className="rounded-xl bg-muted p-6">
    <div className="flex items-center justify-between">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-6 w-12 rounded-full" />
    </div>
  </div>
);
