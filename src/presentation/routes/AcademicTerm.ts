import { Router } from "express";
import {
  AcademicTermDataSourceImpl,
  AcademicTermRepositoryImpl,
  EnrollmentDataSourceImpl,
  EnrollmentRepositoryImpl,
} from "../../infrastructure";
import { AcademicTermController } from "../academic_Term/AcademicTerm";

import { EnrollmentController } from "../enrollment/enrollment.controller";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();

const enrollmentDataSource = new EnrollmentDataSourceImpl();
const enrollmentRepository = new EnrollmentRepositoryImpl(enrollmentDataSource);

const datasource = new AcademicTermDataSourceImpl();
const courseRepository = new AcademicTermRepositoryImpl(datasource);
const Controller = new AcademicTermController(
  courseRepository,
  enrollmentRepository
);

router.post("/",              ValidatorTo.ValidarToken, Controller.Create);
router.get("/",               ValidatorTo.ValidarToken, Controller.Get);
router.get("/:id",            ValidatorTo.ValidarToken, Controller.Getid);
router.put("/",               ValidatorTo.ValidarToken, Controller.Update);
router.delete("/delete/:id",  ValidatorTo.ValidarToken, Controller.Deactivate);
router.put("/activate/:id",   ValidatorTo.ValidarToken, Controller.Activate);
module.exports = router;