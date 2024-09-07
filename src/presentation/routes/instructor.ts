import { Router } from "express";
import { InstructorController } from "../instructor/instructor.controller";
import { InstructorDataSourceImple } from "../../infrastructure";
import { InstructorRepositoryImpl } from "../../infrastructure";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const datasource = new InstructorDataSourceImple();
const instructorRepository = new InstructorRepositoryImpl(
  datasource
);
const instructorController = new InstructorController(
  instructorRepository
);
router.get("/ficha/:id",  ValidatorTo.ValidarToken, instructorController.ficha)
router.post("/",          ValidatorTo.ValidarToken, instructorController.createInstructor);
router.get("/",           ValidatorTo.ValidarToken, instructorController.getInstructors);
router.get("/:id",        ValidatorTo.ValidarToken, instructorController.getInstructorById);
router.put("/:id",        ValidatorTo.ValidarToken, instructorController.updateInstructorById);
router.delete("/:id",     ValidatorTo.ValidarToken, instructorController.deleteInstructor);
module.exports = router;
