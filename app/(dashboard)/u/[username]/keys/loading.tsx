import {
  KeysHeaderSkeleton,
  UrlCardSkeleton,
  KeyCardSkeleton,
} from "./_components/skeleton";

const KeysPageLoading = () => {
  return (
    <div className="p-6 space-y-4">
      <KeysHeaderSkeleton />
      <UrlCardSkeleton />
      <KeyCardSkeleton />
    </div>
  );
};

export default KeysPageLoading;
