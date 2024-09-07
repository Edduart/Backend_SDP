import { Router } from "express";
import { TestScoreController } from "../testScore/testScore.controller";
import { TestScoreDataSourceImpl } from "../../infrastructure/datasource/";
import { TestScoreRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new TestScoreDataSourceImpl();
const testScoreRepository = new TestScoreRepositoryImpl(dataSource);
const testScoreController = new TestScoreController(testScoreRepository);

router.post("/",    ValidatorTo.ValidarToken, testScoreController.create);
router.get("/",     ValidatorTo.ValidarToken, testScoreController.get);
router.put("/",     ValidatorTo.ValidarToken, testScoreController.update);
//router.delete("/", enrollmentController.delete);
module.exports = router;
