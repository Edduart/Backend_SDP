import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { uploadFile, updateFile } from "../services/upload.service";
import {
  ProfessorDataSourceImpl,
  ProfessorRepositoryImpl,
  InstructorDataSourceImple,
  InstructorRepositoryImpl,
} from "../../infrastructure";
import { ProfessorController } from "../professor/professor.controller";
import { ValidatorTo } from "../services/TokenValidator";

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
router.get("/ficha/:id", ValidatorTo.ValidarToken, professorController.ficha);
router.get("/:id", ValidatorTo.ValidarToken, professorController.get);
router.post("/:id", ValidatorTo.ValidarTokenH, (req: Request, res: Response) => {
  uploadFile.single("file")(req, res, (err) => {
    if (err) {
      console.log("error file size")
      res.status(400).json({ ImageError1: err.message });
    } else {
      if (!req.file) {
        req.body.ayuda = "images" + req.baseUrl + req.url;
        console.log("no file", req.body.ayuda);
      }
      professorController.create(req, res);
    }
  });
});
router.put("/:id", ValidatorTo.ValidarTokenH,(req: Request, res: Response) => {
  updateFile.single("file")(req, res, (err) => {
    if (err) {
      console.log("error multer");
      res.status(400).json({ ImageError: err.message });
    } else {
      if (!req.file) {
        req.body.ayuda = "images" + req.baseUrl + req.url;
        console.log("no file", req.body.ayuda);
      }
      professorController.update(req, res);
    }
  });
});
router.delete("/:id", ValidatorTo.ValidarToken, professorController.delete);
module.exports = router;
