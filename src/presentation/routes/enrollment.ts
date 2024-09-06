import { Router } from "express";
import { EnrollmentController } from "../enrollment/enrollment.controller";
import { EnrollmentDataSourceImpl } from "../../infrastructure/datasource/";
import { EnrollmentRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new EnrollmentDataSourceImpl();
const enrollmentRepository = new EnrollmentRepositoryImpl(dataSource);
const enrollmentController = new EnrollmentController(enrollmentRepository);
router.get("/count", enrollmentController.Getcounts);
router.get(
  "/academic-status/:seminarian_id",
  enrollmentController.getAcademicStatus
);
router.get("/seminarian-stage/", enrollmentController.getStageOfSeminarian);
router.get("/equivalency-list/:seminarian_id", enrollmentController.getSubjectAllowToEnrollEquivalency);
router.get(
  "/seminarian-academic-term/",
  enrollmentController.getAcademicTermByEnrollment
);

router.post(
  "/create-by-equivalence/",
  enrollmentController.createEnrollmentByEquivalence
);

router.post("/", enrollmentController.create);
router.get("/", enrollmentController.get);
router.put("/:id", enrollmentController.update);
router.delete("/:id", enrollmentController.delete);
module.exports = router;
