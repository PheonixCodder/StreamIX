import { Skeleton } from "@/components/ui/skeleton";

// Page header skeleton
export const KeysHeaderSkeleton = () => (
  <div className="flex items-center justify-between mb-4">
    <Skeleton className="h-8 w-40" />
    {/* Optional ConnectModal Skeleton if needed later */}
    <Skeleton className="h-10 w-48 rounded-md" />
  </div>
);

// Skeleton for UrlCard
export const UrlCardSkeleton = () => (
  <div className="rounded-xl bg-muted p-6">
    <div className="flex items-center gap-x-10">
      <Skeleton className="h-5 w-24" />
      <div className="space-y-2 w-full">
        <div className="w-full flex items-center gap-x-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

// Skeleton for KeyCard
export const KeyCardSkeleton = () => (
  <div className="rounded-xl bg-muted p-6">
    <div className="flex items-center gap-x-6">
      <Skeleton className="h-5 w-24" />
      <div className="space-y-2 w-full">
        <div className="w-full flex items-center gap-x-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);
