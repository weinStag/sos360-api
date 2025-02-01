/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `contact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "emergency" DROP CONSTRAINT "emergency_user_requesterId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "contact_phone_key" ON "contact"("phone");

-- AddForeignKey
ALTER TABLE "emergency" ADD CONSTRAINT "emergency_user_requesterId_fkey" FOREIGN KEY ("user_requesterId") REFERENCES "user_requester"("id") ON DELETE CASCADE ON UPDATE CASCADE;
