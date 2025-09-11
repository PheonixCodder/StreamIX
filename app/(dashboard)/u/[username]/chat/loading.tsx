import { ChatHeaderSkeleton, ToggleCardSkeleton } from "./_components/skeleton";

const ChatPageLoading = () => {
  return (
    <div className="p-6 space-y-4">
      <ChatHeaderSkeleton />
      <ToggleCardSkeleton />
      <ToggleCardSkeleton />
      <ToggleCardSkeleton />
    </div>
  );
};

export default ChatPageLoading;
