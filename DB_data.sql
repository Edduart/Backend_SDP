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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_degree`
--

LOCK TABLES `academic_degree` WRITE;
/*!40000 ALTER TABLE `academic_degree` DISABLE KEYS */;
INSERT INTO `academic_degree` VALUES (21,'V-123456789','test of description','www.facebook.com'),(22,'V-1234567891','test of description','www.facebook.com'),(23,'V-1234567892','test of description','www.facebook.com'),(24,'V-1234567893','test of description','www.facebook.com'),(25,'V-1234567894','test of description','www.facebook.com'),(26,'V-1234567895','test of description','www.facebook.com'),(27,'V-898087','',''),(28,'V-7755675581','INGENIERO','www.facebook.com');
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
INSERT INTO `academic_field` VALUES (1,1,'CATEQUÉTICO VOCACIONAL'),(2,1,'COMUNITARIO PASTORAL'),(3,1,'HUMANO-CULTURAL'),(4,1,'INICIACIÓN PASTORAL'),(5,2,'FILOSOFÍA DEL HOMBRE'),(6,2,'FILOSOFÍA DEL CONOCIMIENTO'),(7,2,'FILOSOFÍA ÉTICA'),(8,2,'FILOSOFÍA DE LA NATURALEZA Y DE LA CIENCIA'),(9,2,'FILOSOFÍA DEL SER'),(10,2,'FILOSOFÍA DE LA RELIGIÓN'),(11,2,'HISTORIA DE LA CULTURA'),(12,2,'HISTORIA DE LA FILOSOFÍA'),(13,2,'SÍNTESIS'),(14,2,'LENGUAS CLÁSICAS'),(15,2,'INVESTIGACIÓN'),(16,2,'INSTRUMENTALES'),(17,2,'FILOSOFÍA SOCIAL Y POLÍTICA'),(18,2,'FILOSOFÍA DE LA CULTURA'),(19,2,'IDIOMAS MODERNOS'),(20,3,'TEOLOGÍA BÍBLICA'),(21,3,'TEOLOGÍA FUNDAMENTAL'),(22,3,'TEOLOGÍA DOGMÁTICA'),(23,3,'TEOLOGÍA MORAL'),(24,3,'TEOLOGÍA ESPIRITUAL'),(25,3,'TEOLOGÍA PASTORAL'),(26,3,'LITURGIA'),(27,3,'HISTORIA ECLESIÁSTICA'),(28,3,'DERECHO CANÓNICO');
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
  `semester` tinyint NOT NULL DEFAULT '1',
  `status` enum('ACTIVO','CULMINADO','EQUIVALENCIAS') NOT NULL DEFAULT 'ACTIVO',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `academic_term`
--

LOCK TABLES `academic_term` WRITE;
/*!40000 ALTER TABLE `academic_term` DISABLE KEYS */;
INSERT INTO `academic_term` VALUES (1,'2020-02-01','2025-02-01',1,'EQUIVALENCIAS'),(2,'2020-02-01','2025-02-01',1,'CULMINADO'),(3,'2025-02-01','2025-02-01',1,'CULMINADO'),(7,'2023-04-07','2024-10-31',1,'ACTIVO');
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
INSERT INTO `basic_worker` VALUES ('V-321654989','COCINERO'),('V-776765','COCINERO');
/*!40000 ALTER TABLE `basic_worker` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bitacora`
--

DROP TABLE IF EXISTS `bitacora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bitacora` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `User_id` varchar(20) NOT NULL,
  `action` enum('DELETE','CREATE','UPDATE','LOGIN') NOT NULL,
  `table` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bitacora`
--

LOCK TABLES `bitacora` WRITE;
/*!40000 ALTER TABLE `bitacora` DISABLE KEYS */;
INSERT INTO `bitacora` VALUES (2,'V-1','LOGIN','USER','2024-08-31 20:02:30'),(3,'V-1','LOGIN','USER','2024-09-01 07:29:08'),(4,'V-1','LOGIN','USER','2024-09-02 14:43:03'),(5,'V-1','LOGIN','USER','2024-09-02 18:09:57'),(6,'V-1','LOGIN','USER','2024-09-02 18:40:13'),(7,'V-1','LOGIN','USER','2024-09-02 20:43:03'),(8,'V-1','LOGIN','USER','2024-09-02 21:00:39'),(9,'V-1','LOGIN','USER','2024-09-02 21:21:10'),(10,'V-1','LOGIN','USER','2024-09-03 01:17:00'),(11,'V-1','LOGIN','USER','2024-09-06 18:20:29'),(12,'V-1','LOGIN','USER','2024-09-06 21:51:08'),(13,'V-1','LOGIN','USER','2024-09-06 22:40:19'),(14,'V-1','LOGIN','USER','2024-09-07 17:20:15'),(15,'V-1','LOGIN','USER','2024-09-07 17:54:26'),(16,'V-1','LOGIN','USER','2024-09-07 18:06:27'),(17,'V-7755675581','LOGIN','USER','2024-09-07 18:07:01'),(18,'V-7755675581','LOGIN','USER','2024-09-07 18:07:54'),(19,'V-7755675581','LOGIN','USER','2024-09-07 18:11:18'),(20,'V-898087','LOGIN','USER','2024-09-07 18:11:58'),(21,'V-898087','LOGIN','USER','2024-09-07 18:13:06'),(22,'V-1','LOGIN','USER','2024-09-07 18:14:02'),(23,'V-7755675581','LOGIN','USER','2024-09-07 18:19:04'),(24,'V-7755675581','LOGIN','USER','2024-09-07 18:32:16'),(25,'V-1','LOGIN','USER','2024-09-07 18:33:17'),(26,'V-7755675581','LOGIN','USER','2024-09-07 18:34:46'),(27,'V-1','LOGIN','USER','2024-09-07 18:35:46'),(28,'V-7755675581','LOGIN','USER','2024-09-07 18:36:49'),(29,'V-1','LOGIN','USER','2024-09-07 18:47:31'),(30,'V-1','LOGIN','USER','2024-09-07 19:37:09'),(31,'V-1','LOGIN','USER','2024-09-08 15:15:21');
/*!40000 ALTER TABLE `bitacora` ENABLE KEYS */;
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
INSERT INTO `course` VALUES (1,1,'PROPEDÉUTICO',NULL),(2,2,'I FILOSOFÍA',NULL),(3,2,'II FILOSOFÍA',NULL),(4,2,'III FILOSOFÍA',NULL),(5,3,'I TEOLOGÍA',NULL),(6,3,'II TEOLOGÍA',NULL),(7,3,'III TEOLOGÍA',NULL),(8,3,'IV TEOLOGÍA',NULL);
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
INSERT INTO `diocese` VALUES (1,'ARQUIDIÓCESIS DE BARQUISIMETO','MONSEÑOR. VÍCTOR HUGO BASABE'),(2,'ARQUIDIÓCESIS DE BOLÍVAR','MONSEÑOR. ULISES ANTONIO GUTIÉRREZ REYES'),(3,'ARQUIDIÓCESIS DE CALABOZO','MONSEÑOR. MANUEL FELIPE DÍAZ'),(4,'ARQUIDIÓCESIS DE CARACAS','CARDENAL. BALTAZAR ENRIQUE PORRAS CARDOZO'),(5,'ARQUIDIÓCESIS DE CORO','MONSEÑOR. MARIANO PARRA'),(6,'ARQUIDIÓCESIS DE CUMANÁ','MONSEÑOR. JESÚS GONZÁLEZ DE ZÁRATE'),(7,'ARQUIDIÓCESIS DE MARACAIBO','MONSEÑOR. JOSÉ LUIS AZUAJE AYALA'),(8,'ARQUIDIÓCESIS DE MÉRIDA','EMMO. CARDENAL. BALTAZAR PORRAS CARDOZO'),(9,'ARQUIDIÓCESIS DE VALENCIA','MONSEÑOR. SAÚL FIGUEROA ALBORNOZ'),(10,'DIÓCESIS DE ACARIGUA','MONSEÑOR. GERARDO ERNESTO SALAS ARJONA'),(11,'DIÓCESIS DE BARCELONA','MONSEÑOR. JORGE ANÍBAL QUINTERO'),(12,'DIÓCESIS DE BARINAS','MONSEÑOR. ALFONSO GUERRERO CONTRERAS'),(13,'DIÓCESIS DE CABIMAS','Monseñor. Ángel Francisco Caraballo Fermín'),(14,'DIÓCESIS DE CARORA','MONSEÑOR. CARLOS ENRIQUE CURIEL HERRERA'),(15,'DIÓCESIS DE CARÚPANO','MONSEÑOR. JAIME VILLARROEL RODRÍGUEZ'),(16,'DIÓCESIS DE CIUDAD GUAYANA','OBISPO. PRESBÍTERO. JORGE ANÍBAL QUINTERO'),(17,'DIÓCESIS DE EL TIGRE','MONSEÑOR. JOSÉ MANUEL ROMERO BARRIOS '),(18,'DIÓCESIS DE EL VIGÍA - SAN CARLOS DEL ZULIA','MONSEÑOR. JUAN DE DIOS PEÑA'),(19,'DIÓCESIS DE GUANARE','MONSEÑOR. JOSÉ DE LA TRINIDAD VALERA ANGULO'),(20,'DIÓCESIS DE GUARENAS','MONSEÑOR. TULIO LUIS RAMÍREZ PADILLA'),(21,'DIÓCESIS DE GUASDUALITO','MONSEÑOR. PABLO MODESTO GONZÁLEZ PÉREZ'),(22,'DIÓCESIS DE LA GUAIRA','MONSEÑOR. RAÚL BIORD CASTILLO'),(23,'DIÓCESIS DE LOS TEQUES','MONSEÑOR. FREDDY FUENMAYOR SUÁREZ'),(24,'DIÓCESIS DE MACHIQUES','MONSEÑOR. NICOLÁS GREGORIO NAVA ROJAS'),(25,'DIÓCESIS DE MARACAY','MONSEÑOR. ENRIQUE JOSÉ PARRAVANO MARINO'),(26,'DIÓCESIS DE MARGARITA','MONSEÑOR. FERNANDO CASTRO AGUAYO'),(27,'DIÓCESIS DE MATURÍN','MONSEÑOR. ENRIQUE PÉREZ LAVADO'),(28,'DIÓCESIS DE PETARE','MONSEÑOR. JUAN CARLOS BRAVO SALAZAR'),(29,'DIÓCESIS DE PUERTO CABELLO','Monseñor. Saúl Figueroa Albornoz'),(30,'DIÓCESIS DE PUNTO FIJO','MONSEÑOR. CARLOS ALFREDO CABEZAS MENDOZA'),(31,'DIÓCESIS DE SAN CARLOS','MONSEÑOR. POLITO RODRÍGUEZ MÉNDEZ'),(32,'DIÓCESIS DE SAN CRISTÓBAL','MONSEÑOR. MARIO DEL VALLE MORONTA RODRÍGUEZ'),(33,'DIÓCESIS DE SAN FELIPE','MONSEÑOR. VÍCTOR HUGO BASABE'),(34,'DIÓCESIS DE SAN FERNANDO DE APURE','MONSEÑOR. ALFREDO ENRIQUE TORRES RONDÓN'),(35,'DIÓCESIS DE TRUJILLO','MONSEÑOR. JOSÉ TRINIDAD VALERA ANGULO'),(36,'DIÓCESIS DE VALLE DE LA PASCUA','MONSEÑOR. RAMÓN JOSÉ APONTE FERNÁNDEZ');
/*!40000 ALTER TABLE `diocese` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `enrollment_id` int NOT NULL AUTO_INCREMENT,
  `seminarian_id` varchar(20) NOT NULL,
  `subject_id` int NOT NULL,
  `academic_term_id` int NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'CURSANDO' COMMENT '0 = cursando, 1 = cursada',
  PRIMARY KEY (`enrollment_id`,`seminarian_id`,`subject_id`,`academic_term_id`),
  KEY `fk_enrollment_subject_idx` (`subject_id`),
  KEY `fk_enrollment_seminarian_idx` (`seminarian_id`),
  KEY `fk_enrollment_academic_term_idx` (`academic_term_id`),
  CONSTRAINT `fk_enrollment_academic_term` FOREIGN KEY (`academic_term_id`) REFERENCES `academic_term` (`id`),
  CONSTRAINT `fk_enrollment_seminarian` FOREIGN KEY (`seminarian_id`) REFERENCES `seminarian` (`id`),
  CONSTRAINT `fk_enrollment_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='materias matriculadas';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` VALUES (12,'V-123456789',1,2,'CURSANDO'),(24,'V-1234567891',1,2,'CURSANDO'),(25,'V-123456789',3,2,'CURSANDO'),(26,'V-1234567891',7,7,'CURSANDO'),(27,'V-1234567892',1,7,'CURSANDO'),(28,'V-1234567892',10,7,'CURSANDO'),(29,'V-1234567892',9,7,'CURSANDO'),(30,'V-1234567892',8,7,'CURSANDO'),(31,'V-1234567892',6,7,'CURSANDO'),(32,'V-1234567892',7,7,'CURSANDO'),(33,'V-1234567892',4,7,'CURSANDO'),(34,'V-1234567892',3,7,'CURSANDO');
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
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
INSERT INTO `foreigner_seminarian` VALUES ('V-123456789','Seminario Extranjero','2',2),('V-1234567891','Seminario Extranjero','2',2),('V-1234567892','Seminario Extranjero','2',2),('V-1234567893','Seminario Extranjero','2',2),('V-1234567894','Seminario Extranjero','2',2),('V-1234567895','Seminario Extranjero','2',2),('V-898087','Seminario Extranjero','2',2);
/*!40000 ALTER TABLE `foreigner_seminarian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Curso` varchar(200) NOT NULL,
  `link` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (1,'PROPEDÉUTICO','weso'),(2,'I FILOSOFÍA',NULL),(3,'II FILOSOFÍA',NULL),(4,'III FILOSOFÍA',NULL),(5,'I TEOLOGÍA',NULL),(6,'II TEOLOGÍA',NULL),(7,'III TEOLOGÍA',NULL),(8,'IV TEOLOGÍA',NULL);
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
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
  CONSTRAINT `fk_professor_instructor` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`),
  CONSTRAINT `fk_professor_subject_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instruction`
--

LOCK TABLES `instruction` WRITE;
/*!40000 ALTER TABLE `instruction` DISABLE KEYS */;
INSERT INTO `instruction` VALUES (NULL,1,1),(NULL,1,2),(NULL,2,1),(NULL,2,2),(NULL,2,7),(NULL,3,1),(NULL,3,2),(NULL,3,3),(NULL,3,7),(NULL,4,1),(NULL,4,7),(NULL,5,1),(NULL,5,7),(NULL,6,1),(NULL,6,7),(NULL,7,1),(NULL,7,7),(NULL,8,1),(NULL,8,7),(NULL,9,1),(NULL,9,7),(NULL,10,1),(NULL,10,7),(NULL,11,1),(NULL,11,7),(NULL,12,1),(NULL,12,7),(NULL,13,1),(NULL,13,7),(NULL,14,1),(NULL,14,7),(NULL,15,1),(NULL,15,7),(NULL,16,1),(NULL,16,7),(NULL,17,1),(NULL,17,7),(NULL,18,1),(NULL,18,7),(NULL,19,1),(NULL,19,7),(NULL,20,1),(NULL,20,7),(NULL,21,1),(NULL,21,7),(NULL,22,1),(NULL,22,7),(NULL,23,1),(NULL,24,1),(NULL,24,7),(NULL,25,1),(NULL,25,7),(NULL,26,1),(NULL,26,7),(NULL,27,1),(NULL,27,7),(NULL,28,1),(NULL,28,7),(NULL,29,1),(NULL,29,7),(NULL,30,1),(NULL,30,7),(NULL,31,1),(NULL,31,7),(NULL,32,1),(NULL,32,7),(NULL,33,1),(NULL,33,7),(NULL,34,1),(NULL,34,7),(NULL,35,1),(NULL,35,7),(NULL,36,1),(NULL,36,7),(NULL,37,1),(NULL,37,7),(NULL,38,1),(NULL,38,7),(NULL,39,1),(NULL,39,7),(NULL,40,1),(NULL,40,7),(NULL,41,1),(NULL,41,7),(NULL,42,1),(NULL,42,7),(NULL,43,1),(NULL,43,7),(NULL,44,1),(NULL,45,1),(NULL,45,7),(NULL,46,1),(NULL,46,7),(NULL,47,1),(NULL,47,7),(NULL,48,1),(NULL,48,7),(NULL,49,7),('V-7755675581',1,7),('V-7755675581',23,7),('V-7755675581',44,7);
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
  `instructor_position` enum('RECTOR','VICERECTOR','ACADEMICO','ASESOR PROPEDEUTICO','DIRECTOR ESPIRITUAL','DESACTIVADO','ECONOMO') DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parish`
--

LOCK TABLES `parish` WRITE;
/*!40000 ALTER TABLE `parish` DISABLE KEYS */;
INSERT INTO `parish` VALUES (1,1,'BASÍLICA MENOR SANTO CRISTO DE LA GRACIA','SANTÍSIMO SACRAMENTO'),(2,2,'BEATA MARÍA DE SAN JOSÉ','EL NAZARENO'),(3,3,'CRISTO REDENTOR','NUESTRA SEÑORA DE COROMOTO'),(4,4,'CRISTO REY','SANTOS APÓSTOLES'),(5,5,'DIVINA PASTORA','SANTÍSIMO SACRAMENTO'),(6,6,'DIVINO NIÑO (EL TRIGAL)','SAGRADO CORAZÓN DE JESÚS'),(7,7,'EL SALVADOR','NUESTRA SEÑORA DE COROMOTO'),(8,8,'ESPÍRITU SANTO (BQTO)','ESPÍRITU SANTO'),(9,9,'INMACULADA CONCEPCIÓN (BUENA VISTA)','NTRA SRA DE ALTAGRACIA'),(10,10,'INMACULADA CONCEPCIÓN (CUARA)','NTRA SRA DE ALTAGRACIA'),(11,11,'JESÚS DE NAZARET','SANTÍSIMA TRINIDAD'),(12,12,'LA MEDALLA MILAGROSA','SANTÍSIMO SACRAMENTO'),(14,14,'MARÍA AUXILIADORA','ESPÍRITU SANTO'),(15,15,'MARÍA AUXILIADORA (LA MIEL)','EL NAZARENO'),(16,16,'MARÍA REINA DE TODOS LOS SANTOS','NUESTRA SEÑORA DE COROMOTO'),(17,13,'LA RESURRECCIÓN DEL SEÑOR','SAN JOSÉ');
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
INSERT INTO `permission` VALUES (1,'PERMISO PARA CREAR INSTRUCTORES','C','INSTRUCTOR'),(2,'PERMISO PARA EDITAR INSTRUCTORES','U','INSTRUCTOR'),(3,'PERMISO PARA ELIMINAR INSTRUCTORES','D','INSTRUCTOR'),(4,'PERMISO PARA VER INSTRUCTORES','R','INSTRUCTOR'),(5,'PERMISO PARA CREAR USUARIOS','C','USER'),(6,'PERMISO PARA EDITAR USUARIOS','U','USER'),(7,'PERMISO PARA VER USUARIOS','R','USER'),(8,'PERMISO PARA ELIMINAR USUARIOS','D','USER'),(9,'PERMISO PARA CREAR SEMINARISTAS','C','SEMINARIAN'),(10,'PERMISO PARA EDITAR SEMINARISTAS','U','SEMINARIAN'),(11,'PERMISO PARA VER SEMINARISTAS','R','SEMINARIAN'),(12,'PERMISO PARA ELIMINAR SEMINARISTAS','D','SEMINARIAN'),(13,'PERMISO PARA CREAR TESTS','C','TEST'),(14,'PERMISO PARA EDITAR TESTS','U','TEST'),(15,'PERMISO PARA VER TESTS','R','TEST'),(16,'PERMISO PARA ELIMINAR TESTS','D','TEST'),(17,'PERMISO PARA CREAR ETAPAS','C','STAGE'),(18,'PERMISO PARA EDITAR ETAPAS','U','STAGE'),(19,'PERMISO PARA VER ETAPAS','R','STAGE'),(20,'PERMISO PARA ELIMINAR ETAPAS','D','STAGE'),(21,'PERMISO PARA CREAR CURSOS','C','COURSE'),(22,'PERMISO PARA EDITAR CURSOS','U','COURSE'),(23,'PERMISO PARA VER CURSOS','R','COURSE'),(24,'PERMISO PARA ELIMINAR CURSOS','D','COURSE'),(25,'PERMISO PARA CREAR MATERIAS','C','SUBJECT'),(26,'PERMISO PARA EDITAR MATERIAS','U','SUBJECT'),(27,'PERMISO PARA VER MATERIAS','R','SUBJECT'),(28,'PERMISO PARA ELIMINAR MATERIAS','D','SUBJECT'),(29,'PERMISO PARA VER LAS NOTAS PROPIAS UNICAMENTE','R','TESTS'),(30,'ACCESO TOTAL AL SISTEMA','A','ADMIN');
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
INSERT INTO `person` VALUES ('V-1',NULL,'None','Nobody','Noway@nowhere.com','2024-08-31',NULL,'UNKNOWN'),('V-123456789','wh1372200.ispot.cc/images/seminarian/V-321654789.jpeg','AQUILES BRINCO','RUCIO GOMEZ','No lo voy a poner','2001-04-27',NULL,'O+'),('V-1234567891',NULL,'AQUILES BRINCO','RUCIO GOMEZ','No lo voy a poner','2001-04-27',NULL,'O+'),('V-1234567892',NULL,'AQUILES BRINCO','RUCIO GOMEZ','No lo voy a poner','2001-04-27',NULL,'O+'),('V-1234567893',NULL,'AQUILES BRINCO','RUCIO GOMEZ','No lo voy a poner','2001-04-27',NULL,'O+'),('V-1234567894',NULL,'AQUILES BRINCO','RUCIO GOMEZ','No lo voy a poner','2001-04-27',NULL,'O+'),('V-1234567895',NULL,'AQUILES BRINCO','RUCIO GOMEZ','No lo voy a poner','2001-04-27',NULL,'O+'),('V-321654989','http://127.0.0.1:3000/images/worker/V-321654989.png','ANGEL EDUARDO','RODIGUEZ TORREALBA','thegodneko@gmail.com','2001-03-29','Estoy bien','O+'),('V-7755675581','http://127.0.0.1:3000/images/professor/V-7755675581.jpeg','NAMETEST','SURNAMETEST','email@test.com','2001-04-27',NULL,'O+'),('V-776765','http://127.0.0.1:3000/images/worker/V-776765.png','OLGA','PERNALETE','thegodneko@gmail.com','2001-04-27','Estoy bien','O+'),('V-898087','http://127.0.0.1:3000/images/seminarian/V-898087.png','AQUILES BRINCO','RUCIO GOMEZ','No lo voy a poner','2001-04-27',NULL,'O+');
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
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='descripción podría ser whatsapp, personal, familiar, amigo, etc.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone_number`
--

LOCK TABLES `phone_number` WRITE;
/*!40000 ALTER TABLE `phone_number` DISABLE KEYS */;
INSERT INTO `phone_number` VALUES (1,'0532342','V-123456789','ddddd'),(104,'04129939243','V-776765','04129939243'),(105,'04129939243','V-776765','04129939243'),(106,'1234567','V-7755675581','1234567'),(107,'1234567','V-7755675581','1234567');
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
INSERT INTO `professor` VALUES ('V-7755675581',1);
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
INSERT INTO `role` VALUES (1,'SUPERADMIN','ADMINISTRADOR CON ACCESO TOTAL'),(2,'RECTOR','RECTOR PRINCIPAL'),(3,'VICE RECTOR','USUARIO ENCARGADO DEL APARTADO ACADEMICO'),(4,'PROFESOR','USUARIO CON CAPACIDAD PARA ASIGNAR NOTAS A LOS TESTS'),(5,'SEMINARIAN','PERFIL DE SEMINARISTA COMÚN'),(6,'INSTRUCTOR','PROFESOR E INSTRUCTOR'),(7,'PROPEDEUTICO','ASESOR DE PROPEDEUTICO');
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
INSERT INTO `role_permission` VALUES (1,30),(4,13),(4,14),(4,15),(4,16),(4,19),(4,27),(5,29);
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
  `stage` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_seminarian_user` FOREIGN KEY (`id`) REFERENCES `user` (`person_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seminarian`
--

LOCK TABLES `seminarian` WRITE;
/*!40000 ALTER TABLE `seminarian` DISABLE KEYS */;
INSERT INTO `seminarian` VALUES ('V-123456789','no se que va aqui','ACTIVO','EXTERNO','UNKOWN',2),('V-1234567891','no se que va aqui','ACTIVO','EXTERNO','UNKOWN',1),('V-1234567892','no se que va aqui','ACTIVO','EXTERNO','UNKOWN',1),('V-1234567893','no se que va aqui','ACTIVO','EXTERNO','UNKOWN',1),('V-1234567894','no se que va aqui','ACTIVO','EXTERNO','UNKOWN',1),('V-1234567895','no se que va aqui','ACTIVO','EXTERNO','UNKOWN',1),('V-898087','no se que va aqui','ACTIVO','EXTERNO','UNKOWN',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_media`
--

LOCK TABLES `social_media` WRITE;
/*!40000 ALTER TABLE `social_media` DISABLE KEYS */;
INSERT INTO `social_media` VALUES (86,'V-123456789',2,'ya lo mando'),(87,'V-123456789',3,'ya lo mando'),(88,'V-1234567891',2,'ya lo mando'),(89,'V-1234567891',3,'ya lo mando'),(90,'V-1234567892',2,'ya lo mando'),(91,'V-1234567892',3,'ya lo mando'),(92,'V-1234567893',2,'ya lo mando'),(93,'V-1234567893',3,'ya lo mando'),(94,'V-1234567894',2,'ya lo mando'),(95,'V-1234567894',3,'ya lo mando'),(96,'V-1234567895',2,'ya lo mando'),(97,'V-1234567895',3,'ya lo mando'),(98,'V-898087',2,'ya lo mando'),(99,'V-898087',3,'ya lo mando'),(100,'V-321654989',3,'ya lo mando 2'),(102,'V-776765',3,'ya lo mando 2'),(103,'V-7755675581',2,'http//www.google.com');
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
INSERT INTO `social_media_category` VALUES (1,'FACEBOOK','localhost:3000/images/icons/facebook.svg'),(2,'X (TWITTER)','localhost:3000/images/icons/x.svg'),(3,'LINKEDIN','localhost:3000/images/icons/link.svg'),(4,'GITHUB','localhost:3000/images/icons/github.svg'),(5,'YOUTUBE','localhost:3000/images/icons/youtube.svg'),(6,'TIKTOK','localhost:3000/images/icons/tiktok.svg'),(7,'PINTEREST','localhost:3000/images/icons/pinte.svg'),(8,'THREADS','localhost:3000/images/icons/threa.svg'),(9,'INSTAGRAM','localhost:3000/images/icons/insta.svg'),(10,'TWITCH','localhost:3000/images/icons/twit.svg'),(11,'DISCORD','localhost:3000/images/icons/discord.svg');
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
INSERT INTO `stage` VALUES (1,'I  ETAPA PROPEDÉUTICO'),(2,'II ETAPA DISCIPULAR'),(3,'III ETAPA CONFIGURATIVA');
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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,1,'INTRODUCCIÓN A LA LECTURA DE LA SAGRADA ESCRITURA I',1,NULL,1,1),(2,1,'INTRODUCCIÓN A LA LECTURA DE LA SAGRADA ESCRITURA II',1,1,2,1),(3,1,'INTRODUCCIÓN A LA ESPIRITUALIDAD CRISTIANA',1,NULL,1,1),(4,1,'CATECISMO DE LA IGLESIA CATÓLICA I',1,NULL,1,1),(5,1,'CATECISMO DE LA IGLESIA CATÓLICA II',1,4,2,1),(6,1,'INTRODUCCIÓN AL CONCILIO. VATICANO II Y MAGISTERIO DE LA IGLESIA',1,NULL,1,1),(7,1,'INTRODUCCIÓN A LA ESPIRITUALIDAD PRESBITERAL',1,NULL,1,1),(8,1,'ELEMENTOS DE HISTORIA DE LA IGLESIA UNIVERSAL ',1,NULL,1,1),(9,1,'ELEMENTOS DE HISTORIA DE LA IGLESIA LOCAL',1,NULL,1,1),(10,1,'HAGIOGRAFÍA DE LOS SANTOS Y BEATOS DE LA REGIÓN Y DIÓCESIS',1,NULL,1,1),(11,2,'INTRODUCCIÓN A LA ORACIÓN Y A LA LITURGIA I',1,NULL,1,2),(12,2,'INTRODUCCIÓN A LA ORACIÓN Y A LA LITURGIA II',1,11,1,2),(13,2,'ELEMENTOS DE PSICOLOGÍA',1,NULL,1,3),(14,2,'ELEMENTOS DE CULTURA HUMANÍSTICA I',1,NULL,1,3),(15,2,'ELEMENTOS DE CULTURA HUMANÍSTICA II',1,14,1,3),(16,2,'LENGUAJE Y COMUNICACIÓN I',1,NULL,1,3),(17,2,'LENGUAJE Y COMUNICACIÓN II',1,16,1,3),(18,2,'GRAMÁTICA Y REDACCIÓN I',1,NULL,1,3),(19,2,'GRAMÁTICA Y REDACCIÓN II',1,18,1,3),(20,2,'TÉCNICAS DE ESTUDIO',1,NULL,1,3),(21,3,'PRIMEROS AUXILIOS ',1,NULL,1,3),(22,3,'LOS VALORES',1,NULL,1,3),(23,3,'AFECTIVIDAD Y SEXUALIDAD',1,NULL,1,3),(24,3,'URBANIDAD',1,NULL,1,3),(25,3,'MUSICA',1,NULL,1,3),(26,4,'DEPORTES',1,NULL,1,3),(27,4,'INFORMÁTICA',1,NULL,1,3),(28,4,'REALIDAD DIOCESANA',1,NULL,1,4),(29,5,'LATIN I',1,NULL,1,14),(30,5,'LÓGICA I',1,NULL,1,6),(31,5,'PSICOLOGÍA GENERAL',1,NULL,1,1),(32,5,'HISTORIA DE LA CULTURA',1,NULL,1,1),(33,5,'HISTORIA DE LA FILOSOFIA-ANTIGUA',1,NULL,1,1),(34,6,'ÉTICA I',1,NULL,1,1),(35,6,'DOCUMENTOS SACERDOTALES',1,NULL,1,1),(36,6,'TEORÍA DEL CONOCIMIENTO',1,NULL,1,1),(37,6,'PEDAGOGÍA PASTORAL',1,NULL,1,1),(38,7,'GRIEGO I',1,NULL,1,1),(39,7,'SEMINARIO LAUDATO SI',1,NULL,1,1),(40,7,'TEODICEA',1,NULL,1,1),(41,7,'HISTORIA DE LA FILOSOFIA MODERNA',1,NULL,1,1),(42,7,'FILOSOFIA DE LA NATURALEZA',1,NULL,1,1),(43,8,'TECNICA DE LA DOCUMENTACIÓN I',1,NULL,1,1),(44,8,'ANTROPOLOGÍA FILOSOFICA I',1,NULL,1,1),(45,8,'SOCIOLOGÍA',1,NULL,1,1),(46,8,'METAFÍSICA I',1,NULL,1,1),(47,8,'ORIENTACIÓN A LA TESINA I',1,NULL,1,1),(48,8,'SINTESIS FILOSÓFICA I',1,NULL,1,1),(49,8,'FILOSOFIA DE LA EDUCACIÓN',1,NULL,1,1);
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
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `maximum_score` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_test_instructor_idx` (`subject_id`,`academic_term_id`),
  KEY `fk_test_instruction_idx` (`subject_id`,`academic_term_id`),
  CONSTRAINT `fk_test_instruction` FOREIGN KEY (`subject_id`, `academic_term_id`) REFERENCES `instruction` (`subject_id`, `academic_term_id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,1,2,'exmanen 1',1,25.00),(2,1,2,'examen 2',1,25.00),(3,1,2,'examen 3',1,15.00),(4,1,2,'examen 4',1,35.00),(5,3,2,'examen 1',1,50.00),(6,3,2,'exmane 2',1,50.00),(56,1,1,'EXAMEN UNICO',1,100.00),(57,2,1,'EXAMEN UNICO',1,100.00),(58,3,1,'EXAMEN UNICO',1,100.00),(59,4,1,'EXAMEN UNICO',1,100.00),(60,5,1,'EXAMEN UNICO',1,100.00),(61,6,1,'EXAMEN UNICO',1,100.00),(62,7,1,'EXAMEN UNICO',1,100.00),(63,8,1,'EXAMEN UNICO',1,100.00),(64,9,1,'EXAMEN UNICO',1,100.00),(65,10,1,'EXAMEN UNICO',1,100.00),(66,11,1,'EXAMEN UNICO',1,100.00),(67,12,1,'EXAMEN UNICO',1,100.00),(68,13,1,'EXAMEN UNICO',1,100.00),(69,14,1,'EXAMEN UNICO',1,100.00),(70,15,1,'EXAMEN UNICO',1,100.00),(71,16,1,'EXAMEN UNICO',1,100.00),(72,17,1,'EXAMEN UNICO',1,100.00),(73,18,1,'EXAMEN UNICO',1,100.00),(74,19,1,'EXAMEN UNICO',1,100.00),(75,20,1,'EXAMEN UNICO',1,100.00),(76,21,1,'EXAMEN UNICO',1,100.00),(77,22,1,'EXAMEN UNICO',1,100.00),(78,23,1,'EXAMEN UNICO',1,100.00),(79,24,1,'EXAMEN UNICO',1,100.00),(80,25,1,'EXAMEN UNICO',1,100.00),(81,26,1,'EXAMEN UNICO',1,100.00),(82,27,1,'EXAMEN UNICO',1,100.00),(83,28,1,'EXAMEN UNICO',1,100.00),(84,29,1,'EXAMEN UNICO',1,100.00),(85,30,1,'EXAMEN UNICO',1,100.00),(86,31,1,'EXAMEN UNICO',1,100.00),(87,32,1,'EXAMEN UNICO',1,100.00),(88,33,1,'EXAMEN UNICO',1,100.00),(89,34,1,'EXAMEN UNICO',1,100.00),(90,35,1,'EXAMEN UNICO',1,100.00),(91,36,1,'EXAMEN UNICO',1,100.00),(92,37,1,'EXAMEN UNICO',1,100.00),(93,38,1,'EXAMEN UNICO',1,100.00),(94,39,1,'EXAMEN UNICO',1,100.00),(95,40,1,'EXAMEN UNICO',1,100.00),(96,41,1,'EXAMEN UNICO',1,100.00),(97,42,1,'EXAMEN UNICO',1,100.00),(98,43,1,'EXAMEN UNICO',1,100.00),(99,44,1,'EXAMEN UNICO',1,100.00),(100,45,1,'EXAMEN UNICO',1,100.00),(101,46,1,'EXAMEN UNICO',1,100.00),(102,47,1,'EXAMEN UNICO',1,100.00),(103,48,1,'EXAMEN UNICO',1,100.00),(104,23,7,'EXAMEN 1',1,50.00),(105,23,7,'EXAMEN 2',1,50.00),(106,1,7,'EWE 1',1,50.00),(107,1,7,'EWE 2',1,50.00);
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
  `score` decimal(5,2) NOT NULL,
  `enrollment_id` int NOT NULL,
  `last_edited_date` datetime DEFAULT NULL,
  PRIMARY KEY (`test_id`,`enrollment_id`),
  KEY `fk_test_score_enrollment_idx` (`enrollment_id`),
  CONSTRAINT `fk_test_score_enrollment` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment` (`enrollment_id`),
  CONSTRAINT `fk_test_score_test` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_score`
--

LOCK TABLES `test_score` WRITE;
/*!40000 ALTER TABLE `test_score` DISABLE KEYS */;
INSERT INTO `test_score` VALUES (1,20.00,12,'2024-09-02 03:46:10'),(1,18.00,24,'2024-09-02 03:45:00'),(2,15.00,12,'2024-09-02 03:46:10'),(2,19.00,24,'2024-09-02 03:45:00'),(3,15.00,12,NULL),(4,15.00,12,NULL),(5,10.00,25,NULL),(6,18.00,25,NULL),(106,16.00,27,'2024-09-07 18:37:35'),(107,0.00,27,'2024-09-07 18:37:35');
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
INSERT INTO `user` VALUES ('V-1',1,1,'$2b$10$5j7lHV9y6cmER4OyfKXhwuHBEMDSsNERXKLCU74ai0jmf4TAeblqe',1,'2024-09-08'),('V-123456789',1,1,'$2b$10$Ml8u0QMhkhhgbg/52JGF.ev9CDw07i65suB3vYyoLkyCRc5USKrhO',5,NULL),('V-1234567891',1,1,'$2b$10$lo6Hgww8i3IT3RhbFDPK3OPVlKfqW66LF8ws8.0y9hEuljh31cU9C',5,NULL),('V-1234567892',1,1,'$2b$10$3pdq.xqncHLE3Jjqo0p/WOnfLWJOfs8ty.V300vWKWW4PbUzQz6ou',5,NULL),('V-1234567893',1,1,'$2b$10$aM3qXxqStbavAdzHtd3TOOJuR5T2535w4rbvi0fJKlwhPtcnJl63i',5,NULL),('V-1234567894',1,1,'$2b$10$AISHJUPjKUSnbFbBShUfgO4f.b2ou2pG0B0KcGVqosLcPs58zs44.',5,NULL),('V-1234567895',1,1,'$2b$10$vx3mOa43dEIQq9oqpEJNZ.fsOvq9/T7CNvilumj8KbbmIW2LJRz0C',5,NULL),('V-7755675581',1,1,'$2b$10$2MEK4X8kxuGMWrzxMgjxJex8eEgWTuwgxWxzTm1EVEm3Y35FZ3Sti',4,'2024-09-07'),('V-898087',1,1,'$2b$10$MsSHaqFM7JdeKWuZi9dlD.8r6nuFBjNI3s3dYjy1l.0um0S1pqwtu',5,'2024-09-07');
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

-- Dump completed on 2024-09-08 11:45:53
