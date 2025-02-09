-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('WRITER', 'EDITOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "PostCategory" AS ENUM ('NEWS', 'REVIEW', 'INTERVIEW', 'OPINION', 'CURIOSITY', 'QUIZ', 'ESPORT');

-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('PLAYSTATION', 'XBOX', 'PC', 'NINTENDO', 'MOBILE');

-- CreateTable
CREATE TABLE "pc_user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "login" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "image" TEXT NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'WRITER',
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pc_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pc_post" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "content" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "PostCategory" NOT NULL DEFAULT 'NEWS',
    "platform" "PlatformType"[],
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "pc_post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pc_tag" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(32) NOT NULL,

    CONSTRAINT "pc_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "pc_user_login_key" ON "pc_user"("login");

-- CreateIndex
CREATE INDEX "_PostToTag_B_index" ON "_PostToTag"("B");

-- AddForeignKey
ALTER TABLE "pc_post" ADD CONSTRAINT "pc_post_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "pc_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pc_post" ADD CONSTRAINT "pc_post_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "pc_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "pc_post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "pc_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
