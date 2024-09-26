/*
  Warnings:

  - You are about to drop the `GSTSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GSTSettings" DROP CONSTRAINT "GSTSettings_HotelId_fkey";

-- DropTable
DROP TABLE "GSTSettings";

-- CreateTable
CREATE TABLE "GstSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "GSTPercent" DOUBLE PRECISION DEFAULT 0.0,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GstSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GstSettings_id_key" ON "GstSettings"("id");

-- AddForeignKey
ALTER TABLE "GstSettings" ADD CONSTRAINT "GstSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
