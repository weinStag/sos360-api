-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'CREATED';

-- DropForeignKey
ALTER TABLE "emergency" DROP CONSTRAINT "emergency_user_attendantId_fkey";

-- AlterTable
ALTER TABLE "emergency" ALTER COLUMN "user_attendantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "emergency" ADD CONSTRAINT "emergency_user_attendantId_fkey" FOREIGN KEY ("user_attendantId") REFERENCES "user_attendant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
