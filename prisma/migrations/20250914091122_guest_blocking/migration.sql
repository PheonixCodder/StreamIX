/*
  Warnings:

  - The primary key for the `Block` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Stream` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `Block` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Follow` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id` on the `Stream` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Block" DROP CONSTRAINT "Block_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Block_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Follow" DROP CONSTRAINT "Follow_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Follow_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Stream" DROP CONSTRAINT "Stream_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Stream_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "public"."GuestBlock" (
    "id" TEXT NOT NULL,
    "hostId" UUID NOT NULL,
    "guestId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GuestBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestBlock_hostId_guestId_key" ON "public"."GuestBlock"("hostId", "guestId");
