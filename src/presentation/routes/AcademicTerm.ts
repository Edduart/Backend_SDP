import { Router } from "express";
import { AcademicTermDataSourceImpl, AcademicTermRepositoryImpl } from "../../infrastructure";
import { AcademicTermController } from "../academic_Term/AcademicTerm";

const router = Router();
const datasource = new AcademicTermDataSourceImpl();
const courseRepository = new AcademicTermRepositoryImpl(datasource);
const Controller = new AcademicTermController(courseRepository);

router.post("/", Controller.Create);
router.get("/", Controller.Get);

module.exports = router;