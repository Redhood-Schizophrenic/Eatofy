-- CreateTable
CREATE TABLE "PrinterSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "NetworkIP" TEXT,
    "Encoding" TEXT,
    "BluetoothMac" TEXT,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrinterSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrinterSettings_id_key" ON "PrinterSettings"("id");

-- AddForeignKey
ALTER TABLE "PrinterSettings" ADD CONSTRAINT "PrinterSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
