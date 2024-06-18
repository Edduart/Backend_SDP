import { Router } from "express";
import { guardar } from "../services/upload.worker";
import {
  ProfessorDataSourceImpl,
  ProfessorRepositoryImpl,
} from "../../infrastructure";
import { ProfessorController } from "../professor/professor.controller";
const router = Router();
const datasource = new ProfessorDataSourceImpl();
const repository = new ProfessorRepositoryImpl(datasource);
const professorController = new ProfessorController(repository);

router.post("/", guardar.single("file"), professorController.create);
router.get("/", professorController.get);

module.exports = router;
