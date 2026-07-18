-- DropForeignKey
ALTER TABLE "List" DROP CONSTRAINT "List_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "List" ADD CONSTRAINT "List_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
