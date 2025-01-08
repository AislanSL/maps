/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Circle` table. All the data in the column will be lost.
  - Added the required column `center` to the `Circle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `radius` to the `Circle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Circle" DROP COLUMN "coordinates",
ADD COLUMN     "center" JSONB NOT NULL,
ADD COLUMN     "radius" DOUBLE PRECISION NOT NULL;
