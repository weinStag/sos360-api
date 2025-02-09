-- AlterTable
ALTER TABLE "user_attendant" ADD COLUMN     "resetToken" TEXT;

-- AlterTable
ALTER TABLE "user_requester" ADD COLUMN     "resetToken" TEXT;

-- CreateTable
CREATE TABLE "geoLoc" (
    "id" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "emergencyId" TEXT NOT NULL,

    CONSTRAINT "geoLoc_pkey" PRIMARY KEY ("id")
);

-- AddForeignkey
ALTER TABLE "geoLoc" ADD CONSTRAINT "geoLoc_emergencyId_fkey" FOREIGN KEY ("emergencyId") REFERENCES "emergency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
