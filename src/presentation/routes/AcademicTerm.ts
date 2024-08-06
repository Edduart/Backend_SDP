import { Router } from "express";
import { AcademicTermDataSourceImpl, AcademicTermRepositoryImpl } from "../../infrastructure";
import { AcademicTermController } from "../academic_Term/AcademicTerm";

const router = Router();
const datasource = new AcademicTermDataSourceImpl();
const courseRepository = new AcademicTermRepositoryImpl(datasource);
const Controller = new AcademicTermController(courseRepository);

router.post("/", Controller.Create);
router.get("/", Controller.Get);
router.get("/:id", Controller.Getid);
router.put("/", Controller.Update);
router.delete("/delete/:id", Controller.Deactivate);
router.put("/activate/:id", Controller.Activate);
module.exports = router;