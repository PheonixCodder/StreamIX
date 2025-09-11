import { Skeleton } from "@/components/ui/skeleton";

// Header skeleton
export const CommunityHeaderSkeleton = () => (
  <div className="mb-4">
    <Skeleton className="h-8 w-48" />
  </div>
);

// Table skeleton
export const DataTableSkeleton = () => {
  const rows = Array.from({ length: 5 });

  return (
    <div>
      {/* Filter input skeleton */}
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-64 rounded-md" />
      </div>

      {/* Table header skeleton */}
      <div className="rounded-md border">
        <div className="border-b">
          <div className="flex px-4 py-2">
            <Skeleton className="h-4 w-32 mr-8" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Rows */}
        <div>
          {rows.map((_, index) => (
            <TableRowSkeleton key={index} />
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  );
};

// A single table row skeleton
const TableRowSkeleton = () => (
  <div className="flex items-center px-4 py-3 border-b">
    {/* Avatar + Username */}
    <div className="flex items-center gap-4 w-1/2">
      <Skeleton className="h-8 w-8 rounded-full" />
      <Skeleton className="h-4 w-32" />
    </div>

    {/* Date */}
    <div className="w-1/4">
      <Skeleton className="h-4 w-24" />
    </div>

    {/* Action button */}
    <div className="w-1/4 text-right">
      <UnlockButtonSkeleton />
    </div>
  </div>
);

// Unlock button skeleton
export const UnlockButtonSkeleton = () => (
  <Skeleton className="h-4 w-20" />
);
