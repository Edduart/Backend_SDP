-- CreateTable
CREATE TABLE `academic_degree` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `link` TEXT NULL,

    INDEX `fk_academic_degree_user_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `academic_term` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `basic_worker` (
    `person_id` VARCHAR(20) NOT NULL,
    `job_position` ENUM('Mantenimiento', 'Cocinero', 'Transportista') NOT NULL,

    INDEX `fk_basic_worker_position_idx`(`job_position`),
    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stage_id` TINYINT NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `instructor_id` VARCHAR(20) NULL,

    INDEX `fk_course_instructor_idx`(`instructor_id`),
    INDEX `fk_course_stage_idx`(`stage_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diocese` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NOT NULL,
    `holder` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `diocese_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment` (
    `seminarian_id` VARCHAR(20) NOT NULL,
    `subject_id` INTEGER NOT NULL,
    `academic_term_id` INTEGER NOT NULL,
    `status_id` TINYINT NOT NULL,

    INDEX `fk_enrollment_enrollment_status_idx`(`status_id`),
    INDEX `fk_seminarian_academic_term_idx`(`academic_term_id`),
    INDEX `fk_seminarian_subject_subject_idx`(`subject_id`),
    PRIMARY KEY (`seminarian_id`, `subject_id`, `academic_term_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enrollment_status` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `foreigner_seminarian` (
    `id` VARCHAR(20) NOT NULL,
    `seminary_name` VARCHAR(200) NOT NULL,
    `stage` ENUM('1', '2', '3') NOT NULL,
    `stage_year` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instruction` (
    `professor_id` VARCHAR(20) NOT NULL,
    `subject_id` INTEGER NOT NULL,
    `academic_term_id` INTEGER NOT NULL,

    INDEX `fk_professo_subject_academic_term_idx`(`academic_term_id`),
    INDEX `fk_professor_subject_subject_idx`(`subject_id`),
    PRIMARY KEY (`professor_id`, `subject_id`, `academic_term_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instructor` (
    `professor_id` VARCHAR(20) NOT NULL,
    `starting_date` DATE NOT NULL,
    `position_id` TINYINT NOT NULL,

    UNIQUE INDEX `instructor_professor_id_key`(`professor_id`),
    INDEX `fk_instructor_instructor_position_idx`(`position_id`),
    INDEX `fk_instructor_professor_idx`(`professor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instructor_position` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parish` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diocese_id` INTEGER NOT NULL,
    `name` TEXT NOT NULL,
    `patron` VARCHAR(100) NOT NULL,

    INDEX `fk_parish_diocese_idx`(`diocese_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `person` (
    `id` VARCHAR(20) NOT NULL,
    `profile_picture_path` TEXT NULL,
    `forename` VARCHAR(100) NOT NULL,
    `surname` VARCHAR(100) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `birthdate` DATE NOT NULL,
    `medical_record` TEXT NULL,
    `BloodType` ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN') NULL DEFAULT 'UNKNOWN',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phone_number` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone_number` VARCHAR(20) NOT NULL,
    `person_id` VARCHAR(20) NOT NULL,
    `description` VARCHAR(100) NOT NULL,

    INDEX `fk_phone_number_person_idx`(`person_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professor` (
    `id` VARCHAR(20) NOT NULL,
    `status_id` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permission` (
    `role_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `role_id_idx`(`role_id`),
    INDEX `role_permission_idx`(`permission_id`),
    PRIMARY KEY (`role_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seminarian` (
    `id` VARCHAR(20) NOT NULL,
    `apostleships` TEXT NULL,
    `status_id` TINYINT NOT NULL,
    `location_id` TINYINT NOT NULL,
    `Ministery` ENUM('Unkown', 'Admisión', 'Lectorado', 'Acolitado') NULL,

    INDEX `fk_seminarian_seminarian_location_idx`(`location_id`),
    INDEX `fl_seminarian_seminarian_status_idx`(`status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seminarian_location` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seminarian_status` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_media` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` VARCHAR(20) NOT NULL,
    `social_media_category` INTEGER NOT NULL,
    `link` VARCHAR(2000) NOT NULL,

    INDEX `fk_social_media_person_idx`(`person_id`),
    INDEX `fk_social_media_social_media_category_idx`(`social_media_category`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `social_media_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stage` (
    `id` TINYINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `course_id` INTEGER NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `precedent` INTEGER NULL,

    INDEX `fk_subject_course_idx`(`course_id`),
    INDEX `fk_subject_precedent_idx`(`precedent`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `test` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_id` INTEGER NOT NULL,
    `professor_id` VARCHAR(20) NOT NULL,
    `academic_term_id` INTEGER NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `maximum_score` DECIMAL(5, 2) NOT NULL,

    INDEX `fk_test_subject_idx`(`subject_id`, `professor_id`, `academic_term_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `test_score` (
    `test_id` INTEGER NOT NULL,
    `seminarian_id` VARCHAR(20) NOT NULL,
    `subject_id` INTEGER NOT NULL,
    `academic_term_id` INTEGER NOT NULL,
    `score` DECIMAL(5, 2) NOT NULL,

    INDEX `fk_test_score_enrollment_idx`(`seminarian_id`, `subject_id`, `academic_term_id`),
    PRIMARY KEY (`test_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `person_id` VARCHAR(20) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `parish_id` INTEGER NOT NULL,
    `password` TEXT NULL,
    `Role_id` INTEGER NOT NULL,

    INDEX `Role_id_idx`(`Role_id`),
    INDEX `fk_user_parish_idx`(`parish_id`),
    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `academic_degree` ADD CONSTRAINT `fk_academic_degree_user` FOREIGN KEY (`user_id`) REFERENCES `user`(`person_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `basic_worker` ADD CONSTRAINT `fk_basic_worker_person` FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `fk_course_instructor` FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`professor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course` ADD CONSTRAINT `fk_course_stage` FOREIGN KEY (`stage_id`) REFERENCES `stage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `fk_enrollment_enrollment_status` FOREIGN KEY (`status_id`) REFERENCES `enrollment_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `fk_seminarian_academic_term` FOREIGN KEY (`academic_term_id`) REFERENCES `academic_term`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `fk_seminarian_subject_seminarian` FOREIGN KEY (`seminarian_id`) REFERENCES `seminarian`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enrollment` ADD CONSTRAINT `fk_seminarian_subject_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `foreigner_seminarian` ADD CONSTRAINT `fk_foreigner_seminarian_seminarian` FOREIGN KEY (`id`) REFERENCES `seminarian`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `instruction` ADD CONSTRAINT `fk_professo_subject_academic_term` FOREIGN KEY (`academic_term_id`) REFERENCES `academic_term`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `instruction` ADD CONSTRAINT `fk_professor_subject_professor` FOREIGN KEY (`professor_id`) REFERENCES `professor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `instruction` ADD CONSTRAINT `fk_professor_subject_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `instructor` ADD CONSTRAINT `fk_instructor_instructor_position` FOREIGN KEY (`position_id`) REFERENCES `instructor_position`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `instructor` ADD CONSTRAINT `fk_instructor_professor` FOREIGN KEY (`professor_id`) REFERENCES `professor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `parish` ADD CONSTRAINT `fk_parish_diocese` FOREIGN KEY (`diocese_id`) REFERENCES `diocese`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `phone_number` ADD CONSTRAINT `fk_phone_number_person` FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `professor` ADD CONSTRAINT `fk_professor_user` FOREIGN KEY (`id`) REFERENCES `user`(`person_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `Relation_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_permission` ADD CONSTRAINT `Relation_role` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `seminarian` ADD CONSTRAINT `fk_seminarian_seminarian_location` FOREIGN KEY (`location_id`) REFERENCES `seminarian_location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `seminarian` ADD CONSTRAINT `fk_seminarian_user` FOREIGN KEY (`id`) REFERENCES `user`(`person_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `seminarian` ADD CONSTRAINT `fl_seminarian_seminarian_status` FOREIGN KEY (`status_id`) REFERENCES `seminarian_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `social_media` ADD CONSTRAINT `fk_social_media_person` FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `social_media` ADD CONSTRAINT `fk_social_media_social_media_category` FOREIGN KEY (`social_media_category`) REFERENCES `social_media_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `fk_subject_course` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `subject` ADD CONSTRAINT `fk_subject_precedent` FOREIGN KEY (`precedent`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `test` ADD CONSTRAINT `fk_test_instruction` FOREIGN KEY (`subject_id`, `professor_id`, `academic_term_id`) REFERENCES `instruction`(`subject_id`, `professor_id`, `academic_term_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `test_score` ADD CONSTRAINT `fk_test_score_enrollment` FOREIGN KEY (`seminarian_id`, `subject_id`, `academic_term_id`) REFERENCES `enrollment`(`seminarian_id`, `subject_id`, `academic_term_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `test_score` ADD CONSTRAINT `fk_test_score_test` FOREIGN KEY (`test_id`) REFERENCES `test`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `Role_id` FOREIGN KEY (`Role_id`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_parish` FOREIGN KEY (`parish_id`) REFERENCES `parish`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_person` FOREIGN KEY (`person_id`) REFERENCES `person`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
