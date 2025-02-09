/*
  Warnings:

  - Added the required column `userRequesterId` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_emergencyId_fkey";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "userRequesterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_attendant" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "resetToken" TEXT;

-- AlterTable
ALTER TABLE "user_requester" ADD COLUMN     "resetToken" TEXT;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userRequesterId_fkey" FOREIGN KEY ("userRequesterId") REFERENCES "user_requester"("id") ON DELETE CASCADE ON UPDATE CASCADE;
