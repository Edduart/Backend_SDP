import { Router } from "express";
import { EnrollmentController } from "../enrollment/enrollment.controller";
import { EnrollmentDataSourceImpl } from "../../infrastructure/datasource/";
import { EnrollmentRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new EnrollmentDataSourceImpl();
const enrollmentRepository = new EnrollmentRepositoryImpl(dataSource);
const enrollmentController = new EnrollmentController(enrollmentRepository);
router.get("/count", 
  ValidatorTo.ValidarToken, 
  enrollmentController.Getcounts);
router.get("/academic-status/:seminarian_id",
  ValidatorTo.ValidarToken, 
  enrollmentController.getAcademicStatus);
router.get("/seminarian-stage/", 
  ValidatorTo.ValidarToken, 
  enrollmentController.getStageOfSeminarian);
router.get("/equivalency-list/:seminarian_id", 
  ValidatorTo.ValidarToken, 
  enrollmentController.getSubjectAllowToEnrollEquivalency);
router.get("/seminarian-academic-term/",
  ValidatorTo.ValidarToken, 
  enrollmentController.getAcademicTermByEnrollment);
router.post("/create-by-equivalence/",  
  ValidatorTo.ValidarToken, 
  enrollmentController.createEnrollmentByEquivalence);
router.post("/",      ValidatorTo.ValidarToken, enrollmentController.create);
router.get("/",       ValidatorTo.ValidarToken, enrollmentController.get);
router.put("/:id",    ValidatorTo.ValidarToken, enrollmentController.update);
router.delete("/:id", ValidatorTo.ValidarToken, enrollmentController.delete);
module.exports = router;
