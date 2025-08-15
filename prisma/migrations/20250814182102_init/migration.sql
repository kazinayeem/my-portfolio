/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "public"."Post_authorId_idx";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "authorId",
ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'ADMIN';
