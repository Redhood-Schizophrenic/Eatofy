/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `Staffs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "AvailableStockReport" (
    "id" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,
    "ItemId" TEXT NOT NULL,
    "Quantity" TEXT NOT NULL,
    "Unit" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Available',
    "Date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailableStockReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AvailableStockReport_id_key" ON "AvailableStockReport"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Staffs_Email_key" ON "Staffs"("Email");

-- AddForeignKey
ALTER TABLE "AvailableStockReport" ADD CONSTRAINT "AvailableStockReport_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableStockReport" ADD CONSTRAINT "AvailableStockReport_ItemId_fkey" FOREIGN KEY ("ItemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
