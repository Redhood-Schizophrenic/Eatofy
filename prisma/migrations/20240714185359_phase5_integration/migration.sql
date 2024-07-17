/*
  Warnings:

  - You are about to drop the column `GSTAmount` on the `Bills` table. All the data in the column will be lost.
  - You are about to drop the column `OrderId` on the `Bills` table. All the data in the column will be lost.
  - You are about to drop the column `StaffId` on the `Bills` table. All the data in the column will be lost.
  - You are about to drop the column `HotelId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `TableId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `WaiterId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `customersId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `CancelledOrders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderMenus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `HotelId` to the `Bills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Type` to the `Bills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `WaiterId` to the `Bills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Bills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `BillId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `MenuId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Quantity` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalAmount` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotelsId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_OrderId_fkey";

-- DropForeignKey
ALTER TABLE "Bills" DROP CONSTRAINT "Bills_StaffId_fkey";

-- DropForeignKey
ALTER TABLE "CancelledOrders" DROP CONSTRAINT "CancelledOrders_MenuId_fkey";

-- DropForeignKey
ALTER TABLE "CancelledOrders" DROP CONSTRAINT "CancelledOrders_OrderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderMenus" DROP CONSTRAINT "OrderMenus_MenuId_fkey";

-- DropForeignKey
ALTER TABLE "OrderMenus" DROP CONSTRAINT "OrderMenus_OrderId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_HotelId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_TableId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_WaiterId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_customersId_fkey";

-- AlterTable
ALTER TABLE "Bills" DROP COLUMN "GSTAmount",
DROP COLUMN "OrderId",
DROP COLUMN "StaffId",
ADD COLUMN     "CGSTAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "CGSTRate" TEXT NOT NULL DEFAULT '2.5 %',
ADD COLUMN     "DiscountRate" TEXT,
ADD COLUMN     "HotelId" TEXT NOT NULL,
ADD COLUMN     "SGSTAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "SGSTRate" TEXT NOT NULL DEFAULT '2.5 %',
ADD COLUMN     "TableId" TEXT,
ADD COLUMN     "Type" TEXT NOT NULL,
ADD COLUMN     "WaiterId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "TotalAmount" SET DEFAULT 0.0,
ALTER COLUMN "MenuTotal" SET DEFAULT 0.0,
ALTER COLUMN "DiscountPrice" DROP NOT NULL,
ALTER COLUMN "DiscountPrice" DROP DEFAULT,
ALTER COLUMN "PaymentMode" SET DEFAULT 'None',
ALTER COLUMN "Status" SET DEFAULT 'Active';

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "HotelId",
DROP COLUMN "TableId",
DROP COLUMN "Type",
DROP COLUMN "WaiterId",
DROP COLUMN "customersId",
ADD COLUMN     "BillId" TEXT NOT NULL,
ADD COLUMN     "MenuId" TEXT NOT NULL,
ADD COLUMN     "Note" TEXT,
ADD COLUMN     "Quantity" TEXT NOT NULL,
ADD COLUMN     "TotalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hotelsId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CancelledOrders";

-- DropTable
DROP TABLE "OrderMenus";

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "ExpenseName" TEXT NOT NULL,
    "Note" TEXT,
    "Date" TEXT NOT NULL,
    "PayableTo" TEXT NOT NULL,
    "AmountPayable" DOUBLE PRECISION NOT NULL,
    "AmountPaid" DOUBLE PRECISION NOT NULL,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "PaymentStatus" TEXT NOT NULL DEFAULT 'Unpaid',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceChecklist" (
    "id" TEXT NOT NULL,
    "ComplianceName" TEXT NOT NULL,
    "Description" TEXT,
    "Document" BYTEA,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ComplianceChecklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Expenses_id_key" ON "Expenses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ComplianceChecklist_id_key" ON "ComplianceChecklist"("id");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_MenuId_fkey" FOREIGN KEY ("MenuId") REFERENCES "Menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_BillId_fkey" FOREIGN KEY ("BillId") REFERENCES "Bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_hotelsId_fkey" FOREIGN KEY ("hotelsId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_TableId_fkey" FOREIGN KEY ("TableId") REFERENCES "Tables"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_WaiterId_fkey" FOREIGN KEY ("WaiterId") REFERENCES "Staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceChecklist" ADD CONSTRAINT "ComplianceChecklist_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
