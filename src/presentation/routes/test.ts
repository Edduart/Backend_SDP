import { Router } from "express";
import { TestController } from "../test/test.controller";
import { TestDataSourceImpl } from "../../infrastructure/datasource/";
import { TestRepositoryImpl } from "../../infrastructure/repositories/";

import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const dataSource = new TestDataSourceImpl();
const testRepository = new TestRepositoryImpl(dataSource);
const testController = new TestController(testRepository);




//router.post("/", enrollmentController.create);
router.get("/", testController.get);
//router.put("/", enrollmentController.update);
//router.delete("/", enrollmentController.delete);
module.exports = router;
