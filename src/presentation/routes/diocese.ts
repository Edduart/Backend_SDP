import { Router } from "express";
import { DioceseController } from "../diocese/diocese.controller";
import { DioceseDataSourceImpl } from "../../infrastructure/datasource/";
import { DioceseRepositoryImpl } from "../../infrastructure/repositories/";

const router = Router();
const datasource = new DioceseDataSourceImpl();
const dioceseRepository = new DioceseRepositoryImpl(datasource);
const dioceseController = new DioceseController(dioceseRepository);

router.post("/", dioceseController.createDiocese);
router.get("/", dioceseController.getDioceses);
router.get("/search", dioceseController.getDioceseByName);
router.get("/:id", dioceseController.getDioceseById);
router.put("/:id", dioceseController.updateDioceseById);
router.delete("/:id", dioceseController.deleteDiocese);
module.exports = router;

