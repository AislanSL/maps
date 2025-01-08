/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Polygon` table. All the data in the column will be lost.
  - Added the required column `geometry` to the `Polygon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Polygon" DROP COLUMN "coordinates",
ADD COLUMN     "geometry" JSONB NOT NULL;
