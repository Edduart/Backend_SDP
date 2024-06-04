import { Router } from "express";
import { DioceseController } from "../diocese/diocese.controller";
import { DioceseDatasourceImpl } from "../../infrastructure/datasource/diocese.datasource.impl";
import { DioceseRepositoryImpl } from "../../infrastructure/repositories/diocese.repository.imple";

const router = Router();
const datasource = new DioceseDatasourceImpl();
const dioceseRepository = new DioceseRepositoryImpl(datasource);
const dioceseController = new DioceseController(dioceseRepository);

router.post("/", dioceseController.CreateDiocese);
router.get("/", dioceseController.getDioceses);
router.get("/:id", dioceseController.GetDioceseById);
router.put("/:id", dioceseController.updateDioceseById);
router.delete("/:id", dioceseController.DeleteDiocese);
module.exports = router;

