-- CreateEnum
CREATE TYPE "Service" AS ENUM ('POLICE', 'FIREMAN', 'MEDIC');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'FINISHED');

-- CreateTable
CREATE TABLE "user_requester" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_requester_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_attendant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "service" "Service" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_attendant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "emergency" (
    "id" TEXT NOT NULL,
    "type" "Service" NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_requesterId" TEXT NOT NULL,
    "user_attendantId" TEXT NOT NULL,

    CONSTRAINT "emergency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_requester_email_key" ON "user_requester"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_requester_cpf_key" ON "user_requester"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_requester_phone_key" ON "user_requester"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_attendant_email_key" ON "user_attendant"("email");

-- AddForeignKey
ALTER TABLE "emergency" ADD CONSTRAINT "emergency_user_requesterId_fkey" FOREIGN KEY ("user_requesterId") REFERENCES "user_requester"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emergency" ADD CONSTRAINT "emergency_user_attendantId_fkey" FOREIGN KEY ("user_attendantId") REFERENCES "user_attendant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
