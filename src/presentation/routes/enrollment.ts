import { Router } from "express";
import { EnrollmentController } from "../enrollment/enrollment.controller";
import { EnrollmentDataSourceImpl } from "../../infrastructure/datasource/";
import { EnrollmentRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new EnrollmentDataSourceImpl();
const enrollmentRepository = new EnrollmentRepositoryImpl(dataSource);
const enrollmentController = new EnrollmentController(enrollmentRepository);

router.get(
  "/academic-status/:seminarian_id",
  enrollmentController.getAcademicStatus
);

router.post("/", enrollmentController.create);
router.get("/", enrollmentController.get);
router.put("/", enrollmentController.update);
router.delete("/", enrollmentController.delete);
module.exports = router;
