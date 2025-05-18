/*
  Warnings:

  - You are about to drop the column `city` on the `Weather` table. All the data in the column will be lost.
  - Added the required column `name` to the `Weather` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Weather" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "temp" REAL NOT NULL DEFAULT 0.0,
    "condition" TEXT NOT NULL DEFAULT 'sunny',
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "maxTemp" REAL NOT NULL DEFAULT 0.0,
    "minTemp" REAL NOT NULL DEFAULT 0.0,
    "data" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Weather" ("country", "createdAt", "data", "id") SELECT "country", "createdAt", "data", "id" FROM "Weather";
DROP TABLE "Weather";
ALTER TABLE "new_Weather" RENAME TO "Weather";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
