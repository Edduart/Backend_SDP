import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { updateFile } from "../services/upload.service";
import {
  ProfessorDataSourceImpl,
  ProfessorRepositoryImpl,
  InstructorDataSourceImple,
  InstructorRepositoryImpl
} from "../../infrastructure";
import { ProfessorController } from "../professor/professor.controller";
const router = Router();

const instructorDatasource = new InstructorDataSourceImple();
const instructorRepostory = new InstructorRepositoryImpl(instructorDatasource);

const datasource = new ProfessorDataSourceImpl();
const repository = new ProfessorRepositoryImpl(datasource);
const professorController = new ProfessorController(
  repository,
  instructorRepostory
);

router.get("/", professorController.get);

router.post("/:id", (req: Request, res: Response, next: NextFunction) => {
  updateFile.single("file")(req, res, (err) => {
    if (err) {
      return res.status(500).json({msj: "Unexpected error on the image file" ,error: err });
    } else {
      professorController.create(req, res);
    }
  });
});

module.exports = router;
