-- CreateEnum
CREATE TYPE "TransType" AS ENUM ('CREDIT', 'DEBIT');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "lastname" VARCHAR(50) NOT NULL,
    "firstname" VARCHAR(50) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "roleAppId" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_app" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(20) NOT NULL,

    CONSTRAINT "role_app_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_account" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(50) NOT NULL,

    CONSTRAINT "type_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "balance" DECIMAL(9,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "typeAccountId" INTEGER NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_transaction" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "icon" VARCHAR(30) NOT NULL,

    CONSTRAINT "category_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(50) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(9,2) NOT NULL,
    "type" "TransType" NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "srcAccountId" INTEGER NOT NULL,
    "destAccountId" INTEGER NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "own_account" (
    "userId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "own_account_pkey" PRIMARY KEY ("userId","accountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "user_roleAppId_idx" ON "user"("roleAppId");

-- CreateIndex
CREATE UNIQUE INDEX "role_app_label_key" ON "role_app"("label");

-- CreateIndex
CREATE UNIQUE INDEX "type_account_label_key" ON "type_account"("label");

-- CreateIndex
CREATE INDEX "account_typeAccountId_idx" ON "account"("typeAccountId");

-- CreateIndex
CREATE INDEX "account_isActive_idx" ON "account"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "category_transaction_label_key" ON "category_transaction"("label");

-- CreateIndex
CREATE INDEX "transaction_date_idx" ON "transaction"("date");

-- CreateIndex
CREATE INDEX "transaction_type_idx" ON "transaction"("type");

-- CreateIndex
CREATE INDEX "transaction_ownerId_date_idx" ON "transaction"("ownerId", "date");

-- CreateIndex
CREATE INDEX "transaction_srcAccountId_date_idx" ON "transaction"("srcAccountId", "date");

-- CreateIndex
CREATE INDEX "transaction_destAccountId_date_idx" ON "transaction"("destAccountId", "date");

-- CreateIndex
CREATE INDEX "own_account_accountId_idx" ON "own_account"("accountId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_roleAppId_fkey" FOREIGN KEY ("roleAppId") REFERENCES "role_app"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_typeAccountId_fkey" FOREIGN KEY ("typeAccountId") REFERENCES "type_account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category_transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_srcAccountId_fkey" FOREIGN KEY ("srcAccountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_destAccountId_fkey" FOREIGN KEY ("destAccountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_account" ADD CONSTRAINT "own_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "own_account" ADD CONSTRAINT "own_account_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
