"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { LiveKitRoom } from "@livekit/components-react";
import Video, { VideoSkeleton } from "./video";

import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat, ChatSkeleton } from "./chat";
import ChatToggle from "./chat-toggle";
import Header, { HeaderSkeleton } from "./header";
import InfoCard from "./info-card";
import AboutCard from "./about-card";
import { AnimatePresence, motion } from "framer-motion";

type CustomStream = {
  id: string;
  isChatDelayed: boolean;
  isChatEnabled: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
};

type CustomUser = {
  id: string;
  username: string;
  bio: string | null;
  stream: CustomStream[] | null;
  imageUrl: string;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity, loading } = useViewerToken(user.id);
  console.log(token, name, identity, loading);
  
  const { collapsed } = useChatSidebar((state) => state);

  if (loading) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className="flex h-full"
      >
        {/* Main Content */}
        <div className="flex-1 space-y-4 overflow-y-auto pb-10 hidden-scrollbar">
          <Video hostName={user.username} hostIdentity={user.id} />
          <Header
            hostname={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostname={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>

        {/* Animated Chat Sidebar */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              key="chat-sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 360, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-background border-l"
            >
              <Chat
                viewerName={name}
                hostname={user.username}
                hostIdentity={user.id}
                isFollowing={isFollowing}
                isChatEnabled={stream.isChatEnabled}
                isChatDelayed={stream.isChatDelayed}
                isChatFollowersOnly={stream.isChatFollowersOnly}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1 space-y-4 overflow-y-auto pb-10 hidden-scrollbar">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="w-[360px] bg-background border-l">
        <ChatSkeleton />
      </div>
    </div>
  );
};
