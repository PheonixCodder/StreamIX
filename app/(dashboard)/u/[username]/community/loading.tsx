import {
  CommunityHeaderSkeleton,
  DataTableSkeleton,
} from "./_components/skeleton";

const CommunityPageLoading = () => {
  return (
    <div className="p-6">
      <CommunityHeaderSkeleton />
      <DataTableSkeleton />
    </div>
  );
};

export default CommunityPageLoading;
