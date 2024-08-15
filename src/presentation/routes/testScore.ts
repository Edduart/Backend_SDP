import { Router } from "express";
import { TestScoreController } from "../testScore/testScore.controller";
import { TestScoreDataSourceImpl } from "../../infrastructure/datasource/";
import { TestScoreRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new TestScoreDataSourceImpl();
const enrollmentRepository = new TestScoreRepositoryImpl(dataSource);
const enrollmentController = new TestScoreController(enrollmentRepository);

//router.post("/", enrollmentController.create);
router.get("/", enrollmentController.get);
//router.put("/", enrollmentController.update);
//router.delete("/", enrollmentController.delete);
module.exports = router;