-- AlterTable
ALTER TABLE "pc_post" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "pc_user" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
