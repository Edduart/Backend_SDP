import { Router } from "express";
import { Request, Response, NextFunction } from "express";
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

//router.post("/", guardar.single("file"), professorController.create);
router.get("/", professorController.get);
router.post("/:id", (req: Request, res: Response, next: NextFunction) => {
  guardar.single("file")(req, res, (err) => {
    if (err) {
      return next(err);
    }
    professorController.create(req, res);
  });
});

module.exports = router;
