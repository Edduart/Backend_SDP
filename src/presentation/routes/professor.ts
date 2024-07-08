import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { updateFile } from "../services/upload.service";
import {
  ProfessorDataSourceImpl,
  ProfessorRepositoryImpl,
  UserRepositoryImpl,
} from "../../infrastructure";
import { ProfessorController } from "../professor/professor.controller";
const router = Router();

//const userDatasource = new UserDataSourceImple();
//const userRepostory = new UserRepositoryImpl(userDatasource);

const datasource = new ProfessorDataSourceImpl();
const repository = new ProfessorRepositoryImpl(datasource);
const professorController = new ProfessorController(repository,);

router.post("/", updateFile.single("file"), professorController.create);
//router.get("/", professorController.get);

router.post("/:id",
  (req: Request, res: Response, next: NextFunction) => {
  updateFile.single("file")(req, res, (err) => {
    if (err) {
      return next(err);
      }
    professorController.create(req, res);
  });
});

module.exports = router;
