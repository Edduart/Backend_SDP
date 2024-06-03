/*
  Warnings:

  - You are about to alter the column `job_position` on the `basic_worker` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.
  - You are about to drop the `basic_worker_position` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `basic_worker` DROP FOREIGN KEY `fk_basic_worker_position`;

-- DropForeignKey
ALTER TABLE `role_permission` DROP FOREIGN KEY `fk_role_permission_permission`;

-- DropForeignKey
ALTER TABLE `role_permission` DROP FOREIGN KEY `fk_role_permission_role`;

-- DropIndex
DROP INDEX `instruction_subject_id_professor_id_academic_term_id_key` ON `instruction`;

-- AlterTable
ALTER TABLE `basic_worker` MODIFY `job_position` ENUM('Mantenimiento', 'Cocinero', 'Transportista') NOT NULL;

-- AlterTable
ALTER TABLE `permission` MODIFY `id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `basic_worker_position`;

-- CreateIndex
CREATE INDEX `role_id_idx` ON `role_permission`(`role_id`);

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `Relation_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `Relation_role` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- RenameIndex
ALTER TABLE `role_permission` RENAME INDEX `fk_role_permission_permission_idx` TO `role_permission_idx`;
