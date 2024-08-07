import { Router } from "express";
import { InstructorController } from "../instructor/instructor.controller";
import { InstructorDataSourceImple } from "../../infrastructure";
import { InstructorRepositoryImpl } from "../../infrastructure";

const router = Router();
const datasource = new InstructorDataSourceImple();
const instructorRepository = new InstructorRepositoryImpl(
  datasource
);
const instructorController = new InstructorController(
  instructorRepository
);

router.post("/", instructorController.createInstructor);
router.get("/", instructorController.getInstructors);
router.get("/:id", instructorController.getInstructorById);
router.put("/:id", instructorController.updateInstructorById);
router.delete("/:id", instructorController.deleteInstructor);
module.exports = router;
