import { Router } from "express";
import { TestController } from "../test/test.controller";
import { TestDataSourceImpl } from "../../infrastructure/datasource/";
import { TestRepositoryImpl } from "../../infrastructure/repositories/";

import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new TestDataSourceImpl();
const testRepository = new TestRepositoryImpl(dataSource);
const testController = new TestController(testRepository);

router.get("/notas/:id", testController.notas);
router.get("/by-subject/", testController.getTestBySubject);
router.get("/for-test-score/", testController.getTestForTestScore);
router.get("/lista", testController.SeminarianListWithNotes)
router.post("/", testController.create);
router.get("/", testController.get);
router.put("/:id", testController.update);
router.delete("/:id", testController.delete);
module.exports = router;
