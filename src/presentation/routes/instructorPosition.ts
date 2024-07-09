import { Router } from "express";
import { InstructorPositionController } from "../InstructorPosition/instructiorPosition.controller";
import { InstructorPositionDataSourceImple } from "../../infrastructure/";
import { InstructorPositionRepositoryImpl } from "../../infrastructure/";

const router = Router();
const datasource = new InstructorPositionDataSourceImple();
const instructorPositionRepository = new InstructorPositionRepositoryImpl(
  datasource
);
const instructorPositionController = new InstructorPositionController(
  instructorPositionRepository
);

router.get("/", instructorPositionController.getInstructorPositions);
router.get("/:id", instructorPositionController.getinstructorPositionById);

module.exports = router;
