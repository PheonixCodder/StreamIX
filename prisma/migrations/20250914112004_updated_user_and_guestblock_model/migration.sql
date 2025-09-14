-- AddForeignKey
ALTER TABLE "public"."GuestBlock" ADD CONSTRAINT "GuestBlock_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
