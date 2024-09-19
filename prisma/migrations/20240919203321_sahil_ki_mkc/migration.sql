-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "EatocoinsWallet" DOUBLE PRECISION DEFAULT 0;

-- CreateTable
CREATE TABLE "DarkModeSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DarkModeSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EatocoinsSettings" (
    "id" TEXT NOT NULL,
    "Visibility" BOOLEAN NOT NULL DEFAULT false,
    "CreditLimitAmt" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "CreditLimitPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "RedeemLimitAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "RedeemLimitPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EatocoinsSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DarkModeSettings_id_key" ON "DarkModeSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EatocoinsSettings_id_key" ON "EatocoinsSettings"("id");

-- AddForeignKey
ALTER TABLE "DarkModeSettings" ADD CONSTRAINT "DarkModeSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EatocoinsSettings" ADD CONSTRAINT "EatocoinsSettings_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
