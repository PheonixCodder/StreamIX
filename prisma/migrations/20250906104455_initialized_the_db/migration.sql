-- CreateTable
CREATE TABLE "public"."User" (
    "id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "externalUserId" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Stream" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "ingressId" TEXT,
    "serverUrl" TEXT,
    "streamKey" TEXT,
    "isLive" BOOLEAN NOT NULL DEFAULT false,
    "isChatEnabled" BOOLEAN NOT NULL DEFAULT true,
    "isChatDelayed" BOOLEAN NOT NULL DEFAULT false,
    "isChatFollowersOnly" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Follow" (
    "id" TEXT NOT NULL,
    "followerId" UUID NOT NULL,
    "followingId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Block" (
    "id" TEXT NOT NULL,
    "blockerId" UUID NOT NULL,
    "blockedId" UUID NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_externalUserId_key" ON "public"."User"("externalUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_ingressId_key" ON "public"."Stream"("ingressId");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_userId_key" ON "public"."Stream"("userId");

-- CreateIndex
CREATE INDEX "Stream_userId_idx" ON "public"."Stream"("userId");

-- CreateIndex
CREATE INDEX "Stream_ingressId_idx" ON "public"."Stream"("ingressId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_key" ON "public"."Follow"("followerId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followingId_key" ON "public"."Follow"("followingId");

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "public"."Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "public"."Follow"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "public"."Follow"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockerId_key" ON "public"."Block"("blockerId");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockedId_key" ON "public"."Block"("blockedId");

-- CreateIndex
CREATE INDEX "Block_blockerId_idx" ON "public"."Block"("blockerId");

-- CreateIndex
CREATE INDEX "Block_blockedId_idx" ON "public"."Block"("blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blockerId_blockedId_key" ON "public"."Block"("blockerId", "blockedId");

-- AddForeignKey
ALTER TABLE "public"."Stream" ADD CONSTRAINT "Stream_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Block" ADD CONSTRAINT "Block_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Block" ADD CONSTRAINT "Block_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
