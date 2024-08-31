/*
  Warnings:

  - Added the required column `PerPrice` to the `PurchasedStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Price` to the `PurchasedStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SupplierType` to the `Suppliers` table without a default value. This is not possible if the table is not empty.
  - Made the column `Address` on table `Suppliers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "PurchasedStock" ADD COLUMN     "PerPrice" TEXT NOT NULL,
ADD COLUMN     "Price" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Suppliers" ADD COLUMN     "SupplierType" TEXT NOT NULL,
ALTER COLUMN "Address" SET NOT NULL;
