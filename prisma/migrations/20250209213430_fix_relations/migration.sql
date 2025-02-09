/*
  Warnings:

  - You are about to drop the column `active` on the `user_attendant` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `user_attendant` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `user_requester` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_attendant" DROP COLUMN "active",
DROP COLUMN "resetToken";

-- AlterTable
ALTER TABLE "user_requester" DROP COLUMN "resetToken";

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "emergencyId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_emergencyId_fkey" FOREIGN KEY ("emergencyId") REFERENCES "emergency"("id") ON DELETE CASCADE ON UPDATE CASCADE;
