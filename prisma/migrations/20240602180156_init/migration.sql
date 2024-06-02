/*
  Warnings:

  - You are about to drop the `ministry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `seminarian_ministry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `seminarian_ministry` DROP FOREIGN KEY `fk_seminarian_ministry_ministry`;

-- DropForeignKey
ALTER TABLE `seminarian_ministry` DROP FOREIGN KEY `fk_seminarian_ministry_seminarian`;

-- AlterTable
ALTER TABLE `seminarian` ADD COLUMN `Ministery` ENUM('Unkown', 'Admisión', 'Lectorado', 'Acolitado') NULL;

-- DropTable
DROP TABLE `ministry`;

-- DropTable
DROP TABLE `seminarian_ministry`;
