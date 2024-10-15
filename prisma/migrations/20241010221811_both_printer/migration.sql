/*
  Warnings:

  - You are about to drop the `PrinterSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PrinterSettings" DROP CONSTRAINT "PrinterSettings_HotelId_fkey";

-- DropTable
DROP TABLE "PrinterSettings";

-- CreateTable
CREATE TABLE "KotPrinterSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "NetworkIP" TEXT,
    "Encoding" TEXT,
    "BluetoothMac" TEXT,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KotPrinterSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoicePrinterSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "NetworkIP" TEXT,
    "Encoding" TEXT,
    "BluetoothMac" TEXT,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvoicePrinterSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KotPrinterSettings_id_key" ON "KotPrinterSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvoicePrinterSettings_id_key" ON "InvoicePrinterSettings"("id");

-- AddForeignKey
ALTER TABLE "KotPrinterSettings" ADD CONSTRAINT "KotPrinterSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoicePrinterSettings" ADD CONSTRAINT "InvoicePrinterSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
