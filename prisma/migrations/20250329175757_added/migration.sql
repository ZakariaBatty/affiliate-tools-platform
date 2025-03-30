/*
  Warnings:

  - You are about to drop the column `image` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `pricingDetails` on the `Tool` table. All the data in the column will be lost.
  - The `pricing` column on the `Tool` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `longDescription` to the `Tool` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "image",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ComparisonTool" ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Tool" DROP COLUMN "pricingDetails",
ADD COLUMN     "longDescription" TEXT NOT NULL,
DROP COLUMN "pricing",
ADD COLUMN     "pricing" JSONB;

-- AlterTable
ALTER TABLE "ToolRating" ADD COLUMN     "review" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';
