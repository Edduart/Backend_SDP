import { Router } from "express";
import { DioceseController } from "../diocese/diocese.controller";
import { DioceseDataSourceImpl } from "../../infrastructure/datasource/";
import { DioceseRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const datasource = new DioceseDataSourceImpl();
const dioceseRepository = new DioceseRepositoryImpl(datasource);
const dioceseController = new DioceseController(dioceseRepository);

router.post("/", ValidatorTo.ValidarToken, dioceseController.createDiocese);
router.get("/", ValidatorTo.ValidarToken, dioceseController.getDioceses);
router.get("/search", ValidatorTo.ValidarToken, dioceseController.getDioceseByName);
router.get("/:id", ValidatorTo.ValidarToken, dioceseController.getDioceseById);
router.put("/:id", ValidatorTo.ValidarToken, dioceseController.updateDioceseById);
router.delete("/:id", ValidatorTo.ValidarToken, dioceseController.deleteDiocese);
module.exports = router;

