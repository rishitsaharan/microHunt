/*
  Warnings:

  - You are about to drop the column `numberVotes` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `roastRating` on the `Product` table. All the data in the column will be lost.
  - Made the column `productRating` on table `Feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "productRating" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "numberVotes",
DROP COLUMN "roastRating",
ADD COLUMN     "numberFeedback" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "numberRoasts" INTEGER NOT NULL DEFAULT 0;
