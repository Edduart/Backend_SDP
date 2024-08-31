import { Router } from "express";
import {
  AcademicTermDataSourceImpl,
  AcademicTermRepositoryImpl,
  EnrollmentDataSourceImpl,
  EnrollmentRepositoryImpl,
} from "../../infrastructure";
import { AcademicTermController } from "../academic_Term/AcademicTerm";

import { EnrollmentController } from "../enrollment/enrollment.controller";

const router = Router();

const enrollmentDataSource = new EnrollmentDataSourceImpl();
const enrollmentRepository = new EnrollmentRepositoryImpl(enrollmentDataSource);

const datasource = new AcademicTermDataSourceImpl();
const courseRepository = new AcademicTermRepositoryImpl(datasource);
const Controller = new AcademicTermController(
  courseRepository,
  enrollmentRepository
);

router.post("/", Controller.Create);
router.get("/", Controller.Get);
router.get("/:id", Controller.Getid);
router.put("/", Controller.Update);
router.delete("/delete/:id", Controller.Deactivate);
router.put("/activate/:id", Controller.Activate);
module.exports = router;