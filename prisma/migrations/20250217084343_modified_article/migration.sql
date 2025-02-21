/*
  Warnings:

  - Added the required column `category` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
