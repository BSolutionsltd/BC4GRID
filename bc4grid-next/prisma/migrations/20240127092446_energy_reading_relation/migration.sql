/*
  Warnings:

  - You are about to drop the column `accumulatedEnergy` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "EnergyReading" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "smartMeterSN" TEXT NOT NULL,
    "accumulatedEnergy" REAL DEFAULT 0.0,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EnergyReading_smartMeterSN_fkey" FOREIGN KEY ("smartMeterSN") REFERENCES "User" ("smartMeterSN") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "smartMeterSN" TEXT
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "id", "image", "isAdmin", "isVerified", "name", "password", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "isAdmin", "isVerified", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_smartMeterSN_key" ON "User"("smartMeterSN");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "EnergyReading_smartMeterSN_idx" ON "EnergyReading"("smartMeterSN");
