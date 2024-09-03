import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { uploadFile, updateFile } from "../services/upload.service";
import {
  ProfessorDataSourceImpl,
  ProfessorRepositoryImpl,
  InstructorDataSourceImple,
  InstructorRepositoryImpl
} from "../../infrastructure";
import { ProfessorController } from "../professor/professor.controller";
const router = Router();

const instructorDataSource = new InstructorDataSourceImple();
const instructorRepository = new InstructorRepositoryImpl(instructorDataSource);

const dataSource = new ProfessorDataSourceImpl();
const repository = new ProfessorRepositoryImpl(dataSource);
const professorController = new ProfessorController(
  repository,
  instructorRepository
);

// TODO check token

router.get("/", professorController.get);

router.post("/:id", (req: Request, res: Response, next: NextFunction) => {
  uploadFile.single("file")(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ msj: "Unexpected error on the image file", error: err });
    } else {
      professorController.create(req, res);
    }
  });
});
router.put("/:id", (req: Request, res: Response, next: NextFunction) => {
  updateFile.single("file")(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ msj: "Unexpected error on the image file", error: err });
    } else {
      professorController.update(req, res);
    }
  });
});
router.delete("/:id", professorController.delete);

module.exports = router;
