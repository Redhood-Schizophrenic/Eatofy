/*
  Warnings:

  - A unique constraint covering the columns `[HotelId,Description]` on the table `Notifications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notifications_HotelId_Description_key" ON "Notifications"("HotelId", "Description");
