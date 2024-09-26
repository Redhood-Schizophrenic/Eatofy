-- CreateTable
CREATE TABLE "Hotels" (
    "id" TEXT NOT NULL,
    "HotelName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "HashedPassword" TEXT NOT NULL,
    "SaltPassword" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Speciality" TEXT[],
    "HotelLogo" BYTEA,
    "Contacts" TEXT[],
    "Website" TEXT,
    "FSSAICode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "id" TEXT NOT NULL,
    "SubscriptionName" TEXT NOT NULL,
    "Price" DOUBLE PRECISION NOT NULL,
    "Validity" INTEGER NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel_Subscription" (
    "id" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,
    "SubscriptionId" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL,
    "StartDate" TEXT NOT NULL,
    "EndDate" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hotel_Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sections" (
    "id" TEXT NOT NULL,
    "SectionName" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "HotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tables" (
    "id" TEXT NOT NULL,
    "TableName" TEXT NOT NULL,
    "SectionId" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "PersonsOccupiable" TEXT DEFAULT '4',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TableReservation" (
    "id" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "Time" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "Note" TEXT,
    "NoOfPersons" TEXT,
    "CustomerId" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,

    CONSTRAINT "TableReservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuCategory" (
    "id" TEXT NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Description" TEXT,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "HotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dishes" (
    "id" TEXT NOT NULL,
    "DishName" TEXT NOT NULL,
    "Code" TEXT NOT NULL,
    "Description" TEXT,
    "Type" TEXT NOT NULL,
    "DishImage" BYTEA,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "CategoryId" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menus" (
    "id" TEXT NOT NULL,
    "SectionId" TEXT NOT NULL,
    "DishId" TEXT NOT NULL,
    "Code" TEXT,
    "Price" DOUBLE PRECISION NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suppliers" (
    "id" TEXT NOT NULL,
    "SupplierName" TEXT NOT NULL,
    "Contact" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "GSTIN" TEXT NOT NULL,
    "Address" TEXT,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "HotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemCategories" (
    "id" TEXT NOT NULL,
    "CategoryName" TEXT NOT NULL,
    "Description" TEXT,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "ItemName" TEXT NOT NULL,
    "Description" TEXT,
    "HotelId" TEXT NOT NULL,
    "CategoryId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasedInvoice" (
    "id" TEXT NOT NULL,
    "InvoiceNo" TEXT,
    "Date" TEXT NOT NULL,
    "PaymentMode" TEXT,
    "TotalAmount" DOUBLE PRECISION NOT NULL,
    "BalanceAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "PaymentStatus" TEXT NOT NULL DEFAULT 'Paid',
    "SupplierId" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasedInvoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasedStock" (
    "id" TEXT NOT NULL,
    "InvoiceId" TEXT NOT NULL,
    "ItemId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "Quantity" TEXT NOT NULL,
    "Unit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PurchasedStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailableStock" (
    "id" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,
    "ItemId" TEXT NOT NULL,
    "Quantity" TEXT NOT NULL,
    "Unit" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Available',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AvailableStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyStock" (
    "id" TEXT NOT NULL,
    "ItemId" TEXT NOT NULL,
    "Quantity" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "Date" TEXT NOT NULL,

    CONSTRAINT "DailyStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staffs" (
    "id" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Contact" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "HashedPassword" TEXT NOT NULL,
    "SaltPassword" TEXT NOT NULL,
    "DepartmentName" TEXT NOT NULL,
    "Designation" TEXT NOT NULL,
    "Role" TEXT NOT NULL,
    "Salary" DOUBLE PRECISION NOT NULL,
    "Incentive" DOUBLE PRECISION,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "HotelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffAttendance" (
    "id" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "Arrival" TEXT NOT NULL,
    "Departure" TEXT NOT NULL,
    "Type" TEXT NOT NULL DEFAULT 'Absent',
    "Note" TEXT,
    "StaffId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" TEXT NOT NULL,
    "CustomerName" TEXT,
    "Contact" TEXT,
    "Email" TEXT,
    "HotelId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerOccassion" (
    "id" TEXT NOT NULL,
    "Occassion" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "CustomerId" TEXT NOT NULL,

    CONSTRAINT "CustomerOccassion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "Quantity" TEXT NOT NULL,
    "Note" TEXT,
    "TotalAmount" DOUBLE PRECISION NOT NULL,
    "MenuId" TEXT NOT NULL,
    "BillId" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hotelsId" TEXT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bills" (
    "id" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "TableId" TEXT,
    "WaiterId" TEXT NOT NULL,
    "HotelId" TEXT NOT NULL,
    "CustomerId" TEXT,
    "TotalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "CGSTRate" TEXT NOT NULL DEFAULT '2.5 %',
    "SGSTRate" TEXT NOT NULL DEFAULT '2.5 %',
    "SGSTAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "CGSTAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "MenuTotal" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "BalanceAmount" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "DiscountRate" TEXT,
    "DiscountPrice" DOUBLE PRECISION,
    "PaymentMode" TEXT NOT NULL DEFAULT 'None',
    "Status" TEXT NOT NULL DEFAULT 'Active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CancelledOrders" (
    "id" TEXT NOT NULL,
    "Reason" TEXT NOT NULL,
    "OrderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CancelledOrders_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "Hotels_id_key" ON "Hotels"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Hotels_HotelName_key" ON "Hotels"("HotelName");

-- CreateIndex
CREATE UNIQUE INDEX "Hotels_Email_key" ON "Hotels"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_id_key" ON "Subscriptions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_SubscriptionName_key" ON "Subscriptions"("SubscriptionName");

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_Subscription_id_key" ON "Hotel_Subscription"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sections_id_key" ON "Sections"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Tables_id_key" ON "Tables"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TableReservation_id_key" ON "TableReservation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MenuCategory_id_key" ON "MenuCategory"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Dishes_id_key" ON "Dishes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Menus_id_key" ON "Menus"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_id_key" ON "Suppliers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemCategories_id_key" ON "ItemCategories"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Items_id_key" ON "Items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedInvoice_id_key" ON "PurchasedInvoice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedStock_id_key" ON "PurchasedStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AvailableStock_id_key" ON "AvailableStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DailyStock_id_key" ON "DailyStock"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Staffs_id_key" ON "Staffs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "StaffAttendance_id_key" ON "StaffAttendance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customers_id_key" ON "Customers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerOccassion_id_key" ON "CustomerOccassion"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Orders_id_key" ON "Orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Bills_id_key" ON "Bills"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CancelledOrders_id_key" ON "CancelledOrders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Expenses_id_key" ON "Expenses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ComplianceChecklist_id_key" ON "ComplianceChecklist"("id");

-- AddForeignKey
ALTER TABLE "Hotel_Subscription" ADD CONSTRAINT "Hotel_Subscription_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel_Subscription" ADD CONSTRAINT "Hotel_Subscription_SubscriptionId_fkey" FOREIGN KEY ("SubscriptionId") REFERENCES "Subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tables" ADD CONSTRAINT "Tables_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tables" ADD CONSTRAINT "Tables_SectionId_fkey" FOREIGN KEY ("SectionId") REFERENCES "Sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableReservation" ADD CONSTRAINT "TableReservation_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TableReservation" ADD CONSTRAINT "TableReservation_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategory" ADD CONSTRAINT "MenuCategory_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dishes" ADD CONSTRAINT "Dishes_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dishes" ADD CONSTRAINT "Dishes_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus" ADD CONSTRAINT "Menus_DishId_fkey" FOREIGN KEY ("DishId") REFERENCES "Dishes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menus" ADD CONSTRAINT "Menus_SectionId_fkey" FOREIGN KEY ("SectionId") REFERENCES "Sections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suppliers" ADD CONSTRAINT "Suppliers_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemCategories" ADD CONSTRAINT "ItemCategories_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "ItemCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedInvoice" ADD CONSTRAINT "PurchasedInvoice_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedInvoice" ADD CONSTRAINT "PurchasedInvoice_SupplierId_fkey" FOREIGN KEY ("SupplierId") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedStock" ADD CONSTRAINT "PurchasedStock_InvoiceId_fkey" FOREIGN KEY ("InvoiceId") REFERENCES "PurchasedInvoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedStock" ADD CONSTRAINT "PurchasedStock_ItemId_fkey" FOREIGN KEY ("ItemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableStock" ADD CONSTRAINT "AvailableStock_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailableStock" ADD CONSTRAINT "AvailableStock_ItemId_fkey" FOREIGN KEY ("ItemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyStock" ADD CONSTRAINT "DailyStock_ItemId_fkey" FOREIGN KEY ("ItemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Staffs" ADD CONSTRAINT "Staffs_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffAttendance" ADD CONSTRAINT "StaffAttendance_StaffId_fkey" FOREIGN KEY ("StaffId") REFERENCES "Staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerOccassion" ADD CONSTRAINT "CustomerOccassion_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "Bills" ADD CONSTRAINT "Bills_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CancelledOrders" ADD CONSTRAINT "CancelledOrders_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceChecklist" ADD CONSTRAINT "ComplianceChecklist_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
