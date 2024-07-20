-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: seminario
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `academic_degree`
--

DROP TABLE IF EXISTS `academic_degree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_degree` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `description` varchar(200) NOT NULL,
  `link` text,
  PRIMARY KEY (`id`),
  KEY `fk_academic_degree_user_idx` (`user_id`),
  CONSTRAINT `fk_academic_degree_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`person_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_degree`
--

LOCK TABLES `academic_degree` WRITE;
/*!40000 ALTER TABLE `academic_degree` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_degree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `academic_field`
--

DROP TABLE IF EXISTS `academic_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stage_id` tinyint NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_acadmicfield_stage_idx` (`stage_id`),
  CONSTRAINT `fk_acadmicfield_stage` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_field`
--

LOCK TABLES `academic_field` WRITE;
/*!40000 ALTER TABLE `academic_field` DISABLE KEYS */;
INSERT INTO `academic_field` VALUES (1,1,'Catequético Vocacional'),(2,1,'Comunitario Pastoral'),(3,1,'Humano-Cultural'),(4,1,'Iniciación Pastoral'),(5,2,'Filosofía del Hombre'),(6,2,'Filosofía del Conocimiento'),(7,2,'Filosofía Ética'),(8,2,'Filosofía de la Naturaleza y de la Ciencia'),(9,2,'Filosofía del Ser'),(10,2,'Filosofía de la Religión'),(11,2,'Historia de la Cultura'),(12,2,'Historia de la Filosofía'),(13,2,'Síntesis'),(14,2,'Lenguas clásicas'),(15,2,'Investigación'),(16,2,'Instrumentales'),(17,2,'Filosofía social y política'),(18,2,'Filosofía de la Cultura'),(19,2,'Idiomas modernos'),(20,3,'Teología Bíblica'),(21,3,'Teología Fundamental'),(22,3,'Teología Dogmática'),(23,3,'Teología Moral'),(24,3,'Teología Espiritual'),(25,3,'Teología pastoral'),(26,3,'Liturgia'),(27,3,'Historia Eclesiástica'),(28,3,'Derecho Canónico ');
/*!40000 ALTER TABLE `academic_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `academic_term`
--

DROP TABLE IF EXISTS `academic_term`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academic_term` (
  `id` int NOT NULL AUTO_INCREMENT,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `semester` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_term`
--

LOCK TABLES `academic_term` WRITE;
/*!40000 ALTER TABLE `academic_term` DISABLE KEYS */;
/*!40000 ALTER TABLE `academic_term` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basic_worker`
--

DROP TABLE IF EXISTS `basic_worker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basic_worker` (
  `person_id` varchar(20) NOT NULL,
  `job_position` enum('MANTENIMIENTO','COCINERO','TRANSPORTISTA') NOT NULL,
  PRIMARY KEY (`person_id`),
  KEY `fk_basic_worker_position_idx` (`job_position`),
  CONSTRAINT `fk_basic_worker_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_worker`
--

LOCK TABLES `basic_worker` WRITE;
/*!40000 ALTER TABLE `basic_worker` DISABLE KEYS */;
/*!40000 ALTER TABLE `basic_worker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `stage_id` tinyint NOT NULL,
  `description` varchar(200) NOT NULL,
  `instructor_id` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_course_stage_idx` (`stage_id`),
  KEY `fk_course_instructor_idx` (`instructor_id`),
  CONSTRAINT `fk_course_instructor` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`professor_id`),
  CONSTRAINT `fk_course_stage` FOREIGN KEY (`stage_id`) REFERENCES `stage` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,'Propedéutico',NULL),(2,2,'I Filosofía',NULL),(3,2,'II Filosofía',NULL),(4,2,'III Filosofía',NULL),(5,3,'I Teología',NULL),(6,3,'II Teología',NULL),(7,3,'III Teología',NULL),(8,3,'IV Teología',NULL);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diocese`
--

DROP TABLE IF EXISTS `diocese`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diocese` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `holder` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diocese`
--

LOCK TABLES `diocese` WRITE;
/*!40000 ALTER TABLE `diocese` DISABLE KEYS */;
INSERT INTO `diocese` VALUES (1,'Arquidiócesis de Barquisimeto','Monseñor. Víctor Hugo Basabe'),(2,'Arquidiócesis de Bolívar ','Monseñor. Ulises Antonio Gutiérrez Reyes'),(3,'Arquidiócesis de Calabozo','Monseñor. Manuel Felipe Díaz'),(4,'Arquidiócesis de Caracas','Cardenal. Baltazar Enrique Porras Cardozo'),(5,'Arquidiócesis de Coro','Monseñor. Mariano Parra'),(6,'Arquidiócesis de Cumaná','Monseñor. Jesús González De Zárate'),(7,'Arquidiócesis de Maracaibo','Monseñor. José Luis Azuaje Ayala'),(8,'Arquidiócesis de Mérida','Emmo. Cardenal. Baltazar Porras Cardozo'),(9,'Arquidiócesis de Valencia ','Monseñor. Saúl Figueroa Albornoz'),(10,'Diócesis de Acarigua','Monseñor. Gerardo Ernesto Salas Arjona'),(11,'Diócesis de Barcelona','Monseñor. Jorge Aníbal Quintero'),(12,'Diócesis de Barinas','Monseñor. Alfonso Guerrero Contreras'),(13,'Diócesis de Cabimas','Monseñor. Ángel Francisco Caraballo Fermín'),(14,'Diócesis de Carora','Monseñor. Carlos Enrique Curiel Herrera'),(15,'Diócesis de Carúpano','Monseñor. Jaime Villarroel Rodríguez'),(16,'Diócesis de Ciudad Guayana','Obispo. Presbítero. Jorge Aníbal Quintero'),(17,'Diócesis de El Tigre','Monseñor. José Manuel Romero Barrios '),(18,'Diócesis de El Vigía - San Carlos del Zulia','Monseñor. Juan de Dios Peña'),(19,'Diócesis de Guanare','Monseñor. José de la Trinidad Valera Angulo'),(20,'Diócesis de Guarenas','Monseñor. Tulio Luis Ramírez Padilla'),(21,'Diócesis de Guasdualito','Monseñor. Pablo Modesto González Pérez'),(22,'Diócesis de La Guaira','Monseñor. Raúl Biord Castillo'),(23,'Diócesis de Los Teques','Monseñor. Freddy Fuenmayor Suárez'),(24,'Diócesis de Machiques','Monseñor. Nicolás Gregorio Nava Rojas'),(25,'Diócesis de Maracay','Monseñor. Enrique José Parravano Marino'),(26,'Diócesis de Margarita','Monseñor. Fernando Castro Aguayo'),(27,'Diócesis de Maturín','Monseñor. Enrique Pérez Lavado'),(28,'Diócesis de Petare','Monseñor. Juan Carlos Bravo Salazar'),(29,'Diócesis de Puerto Cabello','Monseñor. Saúl Figueroa Albornoz'),(30,'Diócesis de Punto Fijo','Monseñor. Carlos Alfredo Cabezas Mendoza'),(31,'Diócesis de San Carlos','Monseñor. Polito Rodríguez Méndez'),(32,'Diócesis de San Cristóbal','Monseñor. Mario del Valle Moronta Rodríguez'),(33,'Diócesis de San Felipe','Monseñor. Víctor Hugo Basabe'),(34,'Diócesis de San Fernando de Apure','Monseñor. Alfredo Enrique Torres Rondón'),(35,'Diócesis de Trujillo','Monseñor. José Trinidad Valera Angulo'),(36,'Diócesis de Valle de la Pascua','Monseñor. Ramón José Aponte Fernández');
/*!40000 ALTER TABLE `diocese` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `seminarian_id` varchar(20) NOT NULL,
  `subject_id` int NOT NULL,
  `academic_term_id` int NOT NULL,
  `status_id` tinyint NOT NULL COMMENT '0 = cursando, 1 = cursada',
  PRIMARY KEY (`seminarian_id`,`subject_id`,`academic_term_id`),
  KEY `fk_seminarian_subject_subject_idx` (`subject_id`),
  KEY `fk_seminarian_academic_term_idx` (`academic_term_id`),
  KEY `fk_enrollment_enrollment_status_idx` (`status_id`),
  CONSTRAINT `fk_enrollment_enrollment_status` FOREIGN KEY (`status_id`) REFERENCES `enrollment_status` (`id`),
  CONSTRAINT `fk_seminarian_academic_term` FOREIGN KEY (`academic_term_id`) REFERENCES `academic_term` (`id`),
  CONSTRAINT `fk_seminarian_subject_seminarian` FOREIGN KEY (`seminarian_id`) REFERENCES `seminarian` (`id`),
  CONSTRAINT `fk_seminarian_subject_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='materias matriculadas';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment_status`
--

DROP TABLE IF EXISTS `enrollment_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment_status` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Pienso que los status deberían ser 0 = activa, 1 = pasada, 2 = reprobada y 3 =  retirada';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment_status`
--

LOCK TABLES `enrollment_status` WRITE;
/*!40000 ALTER TABLE `enrollment_status` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrollment_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foreigner_seminarian`
--

DROP TABLE IF EXISTS `foreigner_seminarian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foreigner_seminarian` (
  `id` varchar(20) NOT NULL,
  `seminary_name` varchar(200) NOT NULL,
  `stage` enum('1','2','3') NOT NULL,
  `stage_year` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_foreigner_seminarian_seminarian` FOREIGN KEY (`id`) REFERENCES `seminarian` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foreigner_seminarian`
--

LOCK TABLES `foreigner_seminarian` WRITE;
/*!40000 ALTER TABLE `foreigner_seminarian` DISABLE KEYS */;
/*!40000 ALTER TABLE `foreigner_seminarian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instruction`
--

DROP TABLE IF EXISTS `instruction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instruction` (
  `professor_id` varchar(20) DEFAULT NULL,
  `subject_id` int NOT NULL,
  `academic_term_id` int NOT NULL,
  PRIMARY KEY (`subject_id`,`academic_term_id`),
  KEY `fk_professor_subject_subject_idx` (`subject_id`),
  KEY `fk_professo_subject_academic_term_idx` (`academic_term_id`) /*!80000 INVISIBLE */,
  KEY `fk_test_instruction_idx` (`subject_id`,`academic_term_id`),
  KEY `fk_professor_instructor_idx` (`professor_id`),
  CONSTRAINT `fk_professo_subject_academic_term` FOREIGN KEY (`academic_term_id`) REFERENCES `academic_term` (`id`),
  CONSTRAINT `fk_professor_instructor` FOREIGN KEY (`professor_id`) REFERENCES `instructor` (`professor_id`),
  CONSTRAINT `fk_professor_subject_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruction`
--

LOCK TABLES `instruction` WRITE;
/*!40000 ALTER TABLE `instruction` DISABLE KEYS */;
/*!40000 ALTER TABLE `instruction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `professor_id` varchar(20) NOT NULL,
  `starting_date` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  `instructor_position` enum('RECTOR','VICERECTOR','ACADEMICO','ASESOR PROPEDEUTICO','DIRECTOR ESPIRITUAL','ECONOMO') DEFAULT NULL,
  PRIMARY KEY (`professor_id`),
  KEY `fk_instructor_professor_idx` (`professor_id`),
  CONSTRAINT `instructor_professor` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parish`
--

DROP TABLE IF EXISTS `parish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parish` (
  `id` int NOT NULL AUTO_INCREMENT,
  `diocese_id` int NOT NULL,
  `name` text NOT NULL,
  `patron` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_parish_diocese_idx` (`diocese_id`),
  CONSTRAINT `fk_parish_diocese` FOREIGN KEY (`diocese_id`) REFERENCES `diocese` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parish`
--

LOCK TABLES `parish` WRITE;
/*!40000 ALTER TABLE `parish` DISABLE KEYS */;
INSERT INTO `parish` VALUES (1,1,'BASÍLICA MENOR SANTO CRISTO DE LA GRACIA','SANTÍSIMO SACRAMENTO'),(2,2,'BEATA MARÍA DE SAN JOSÉ','EL NAZARENO'),(3,3,'CRISTO REDENTOR','NUESTRA SEÑORA DE COROMOTO'),(4,4,'CRISTO REY','SANTOS APÓSTOLES'),(5,5,'DIVINA PASTORA','SANTÍSIMO SACRAMENTO'),(6,6,'DIVINO NIÑO (EL TRIGAL)','SAGRADO CORAZÓN DE JESÚS'),(7,7,'EL SALVADOR','NUESTRA SEÑORA DE COROMOTO'),(8,8,'ESPÍRITU SANTO (BQTO)','ESPÍRITU SANTO'),(9,9,'INMACULADA CONCEPCIÓN (BUENA VISTA)','NTRA SRA DE ALTAGRACIA'),(10,10,'INMACULADA CONCEPCIÓN (CUARA)','NTRA SRA DE ALTAGRACIA'),(11,11,'JESÚS DE NAZARET','SANTÍSIMA TRINIDAD'),(12,12,'LA MEDALLA MILAGROSA','SANTÍSIMO SACRAMENTO'),(14,14,'MARÍA AUXILIADORA','ESPÍRITU SANTO'),(15,15,'MARÍA AUXILIADORA (LA MIEL)','EL NAZARENO'),(16,16,'MARÍA REINA DE TODOS LOS SANTOS','NUESTRA SEÑORA DE COROMOTO'),(84,13,'LA RESURRECCIÓN DEL SEÑOR','SAN JOSÉ'),(100,13,'LA RESURRECCIÓN DEL SEÑOR','SAN JOSÉ');
/*!40000 ALTER TABLE `parish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `type` varchar(1) NOT NULL,
  `table` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Permiso para crear instructores','C','instructor'),(2,'Permiso para editar instructores','U','instructor'),(3,'Permiso para eliminar instructores','D','instructor'),(4,'Permiso para ver instructores','R','instructor'),(5,'Permiso para crear usuarios','C','user'),(6,'Permiso para editar usuarios','U','user'),(7,'Permiso para ver usuarios','R','user'),(8,'Permiso para eliminar usuarios','D','user'),(9,'Permiso para crear seminaristas','C','seminarian'),(10,'Permiso para editar seminaristas','U','seminarian'),(11,'Permiso para ver seminaristas','R','seminarian'),(12,'Permiso para eliminar seminaristas','D','seminarian'),(13,'Permiso para crear tests','C','test'),(14,'Permiso para editar tests','U','test'),(15,'Permiso para ver tests','R','test'),(16,'Permiso para eliminar tests','D','test'),(17,'Permiso para crear etapas','C','stage'),(18,'Permiso para editar etapas','U','stage'),(19,'Permiso para ver etapas','R','stage'),(20,'Permiso para eliminar etapas','D','stage'),(21,'Permiso para crear cursos','C','course'),(22,'Permiso para editar cursos','U','course'),(23,'Permiso para ver cursos','R','course'),(24,'Permiso para eliminar cursos','D','course'),(25,'Permiso para crear materias','C','subject'),(26,'Permiso para editar materias','U','subject'),(27,'Permiso para ver materias','R','subject'),(28,'Permiso para eliminar materias','D','subject'),(29,'Permiso para ver las notas propias unicamente','R','Tests'),(30,'Acceso total al sistema','A','Admin');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` varchar(20) NOT NULL,
  `profile_picture_path` text,
  `forename` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `birthdate` date NOT NULL,
  `medical_record` text,
  `BloodType` enum('A+','A-','B+','B-','AB+','AB-','O+','O-','UNKNOWN') NOT NULL DEFAULT 'UNKNOWN',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES ('1',NULL,'None','Nobody','Noway@nowhere.com','2024-07-20',NULL,'UNKNOWN');
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone_number`
--

DROP TABLE IF EXISTS `phone_number`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone_number` (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(20) NOT NULL,
  `person_id` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_phone_number_person_idx` (`person_id`),
  CONSTRAINT `fk_phone_number_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='descripción podría ser whatsapp, personal, familiar, amigo, etc.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_number`
--

LOCK TABLES `phone_number` WRITE;
/*!40000 ALTER TABLE `phone_number` DISABLE KEYS */;
/*!40000 ALTER TABLE `phone_number` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `professor`
--

DROP TABLE IF EXISTS `professor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professor` (
  `id` varchar(20) NOT NULL,
  `status_id` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_professor_user` FOREIGN KEY (`id`) REFERENCES `user` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professor`
--

LOCK TABLES `professor` WRITE;
/*!40000 ALTER TABLE `professor` DISABLE KEYS */;
/*!40000 ALTER TABLE `professor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'SuperAdmin','Administrador con acceso total'),(2,'Rector','Rector principal'),(3,'Vice Rector','Usuario encargado del apartado academico'),(4,'Profesor','Usuario con capacidad para asignar notas a los tests'),(5,'Seminarian','Perfil de seminarista común'),(6,'Instructor','Profesor e instructor');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `role_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`permission_id`),
  KEY `role_id_idx` (`role_id`),
  KEY `role_permission_idx` (`permission_id`),
  CONSTRAINT `Relation_permission` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Relation_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,30),(5,29);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seminarian`
--

DROP TABLE IF EXISTS `seminarian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seminarian` (
  `id` varchar(20) NOT NULL,
  `apostleships` text,
  `status` enum('ACTIVO','RETIRADO','AÑO PASTORAL','CULMINADO') NOT NULL,
  `Location` enum('EXTERNO','INTERNO') NOT NULL,
  `Ministery` enum('UNKOWN','ADMISIÓN','LECTORADO','ACOLITADO') DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_seminarian_user` FOREIGN KEY (`id`) REFERENCES `user` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seminarian`
--

LOCK TABLES `seminarian` WRITE;
/*!40000 ALTER TABLE `seminarian` DISABLE KEYS */;
/*!40000 ALTER TABLE `seminarian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_media`
--

DROP TABLE IF EXISTS `social_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_media` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` varchar(20) NOT NULL,
  `social_media_category` int NOT NULL,
  `link` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_social_media_social_media_category_idx` (`social_media_category`),
  KEY `fk_social_media_person_idx` (`person_id`),
  CONSTRAINT `fk_social_media_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `fk_social_media_social_media_category` FOREIGN KEY (`social_media_category`) REFERENCES `social_media_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_media`
--

LOCK TABLES `social_media` WRITE;
/*!40000 ALTER TABLE `social_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_media_category`
--

DROP TABLE IF EXISTS `social_media_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_media_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `icon` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_media_category`
--

LOCK TABLES `social_media_category` WRITE;
/*!40000 ALTER TABLE `social_media_category` DISABLE KEYS */;
INSERT INTO `social_media_category` VALUES (1,'Facebook','localhost:3000/images/icons/facebook.svg'),(2,'X (Twitter)','localhost:3000/images/icons/x.svg'),(3,'LinkedIn','localhost:3000/images/icons/link.svg'),(4,'GitHub','localhost:3000/images/icons/github.svg'),(5,'YouTube','localhost:3000/images/icons/youtube.svg'),(6,'Tiktok','localhost:3000/images/icons/tiktok.svg'),(7,'Pinterest','localhost:3000/images/icons/pinte.svg'),(8,'Threads','localhost:3000/images/icons/threa.svg'),(9,'Instagram','localhost:3000/images/icons/insta.svg'),(10,'Twitch','localhost:3000/images/icons/twit.svg'),(11,'Discord','localhost:3000/images/icons/discord.svg');
/*!40000 ALTER TABLE `social_media_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stage`
--

DROP TABLE IF EXISTS `stage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stage` (
  `id` tinyint NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stage`
--

LOCK TABLES `stage` WRITE;
/*!40000 ALTER TABLE `stage` DISABLE KEYS */;
INSERT INTO `stage` VALUES (1,'I  Etapa Propedéutico'),(2,'II Etapa Discipular'),(3,'III Etapa Configurativa');
/*!40000 ALTER TABLE `stage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `description` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `precedent` int DEFAULT NULL,
  `semester` int NOT NULL,
  `academic_field_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_subject_precedent_idx` (`precedent`),
  KEY `fk_subject_course_idx` (`course_id`),
  KEY `fk_subject_academicfield_idx` (`academic_field_id`),
  CONSTRAINT `fk_subject_academicfield` FOREIGN KEY (`academic_field_id`) REFERENCES `academic_field` (`id`),
  CONSTRAINT `fk_subject_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  CONSTRAINT `fk_subject_precedent` FOREIGN KEY (`precedent`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject_id` int NOT NULL,
  `academic_term_id` int NOT NULL,
  `description` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `maximum_score` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_test_instructor_idx` (`subject_id`,`academic_term_id`),
  KEY `fk_test_instruction_idx` (`subject_id`,`academic_term_id`),
  CONSTRAINT `fk_test_instruction` FOREIGN KEY (`subject_id`, `academic_term_id`) REFERENCES `instruction` (`subject_id`, `academic_term_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_score`
--

DROP TABLE IF EXISTS `test_score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_score` (
  `test_id` int NOT NULL,
  `seminarian_id` varchar(20) NOT NULL,
  `score` decimal(5,2) NOT NULL,
  PRIMARY KEY (`test_id`),
  KEY `fk_test_score_enrollment_idx` (`seminarian_id`),
  CONSTRAINT `fk_test_score_test` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  CONSTRAINT `fk_text_enrrolment` FOREIGN KEY (`seminarian_id`) REFERENCES `enrollment` (`seminarian_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_score`
--

LOCK TABLES `test_score` WRITE;
/*!40000 ALTER TABLE `test_score` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_score` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `person_id` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `parish_id` int NOT NULL,
  `password` text,
  `Role_id` int NOT NULL,
  `LastIn` date DEFAULT NULL,
  PRIMARY KEY (`person_id`),
  KEY `fk_user_parish_idx` (`parish_id`),
  KEY `Role_id_idx` (`Role_id`),
  CONSTRAINT `fk_user_parish` FOREIGN KEY (`parish_id`) REFERENCES `parish` (`id`),
  CONSTRAINT `fk_user_person` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`),
  CONSTRAINT `Role_id` FOREIGN KEY (`Role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1',1,1,'$2b$10$5j7lHV9y6cmER4OyfKXhwuHBEMDSsNERXKLCU74ai0jmf4TAeblqe',1,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-20 15:36:47
