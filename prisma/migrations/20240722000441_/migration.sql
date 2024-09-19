-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
