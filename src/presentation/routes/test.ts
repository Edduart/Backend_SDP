import { Router } from "express";
import { TestController } from "../test/test.controller";
import { TestDataSourceImpl } from "../../infrastructure/datasource/";
import { TestRepositoryImpl } from "../../infrastructure/repositories/";

import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new TestDataSourceImpl();
const testRepository = new TestRepositoryImpl(dataSource);
const testController = new TestController(testRepository);

router.get("/notas/:id",        ValidatorTo.ValidarToken,testController.notas);
router.get("/by-subject/",      ValidatorTo.ValidarToken,testController.getTestBySubject);
router.get("/for-test-score/",  ValidatorTo.ValidarToken,testController.getTestForTestScore);
router.get(
  "/average-test-score-by-subject/",
  ValidatorTo.ValidarToken,testController.getAverageGradeBySubject
);

router.get("/lista",  ValidatorTo.ValidarToken,testController.SeminarianListWithNotes)
router.post("/",      ValidatorTo.ValidarToken,testController.create);
router.get("/",       ValidatorTo.ValidarToken,testController.get);
router.put("/:id",    ValidatorTo.ValidarToken,testController.update);
router.delete("/:id", ValidatorTo.ValidarToken,testController.delete);
module.exports = router;
