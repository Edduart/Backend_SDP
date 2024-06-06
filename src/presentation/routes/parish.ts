import { Router } from "express";
import { ParishController } from "../parish/parish.controller";
import { ParishDatasourceimpl } from "../../infrastructure/datasource/parish.datasource.impl";
import { ParishRepositoryImpl } from "../../infrastructure/repositories/parish.repository.imple";

const router = Router();
const datasource = new ParishDatasourceimpl();
const parishRepository = new ParishRepositoryImpl(datasource);
const parishController = new ParishController(parishRepository);

router.post("/", parishController.createParish);
/*router.get("/", dioceseController.getDioceses);
router.get("/search", dioceseController.getDioceseByName);
router.get("/:id", dioceseController.getDioceseById);
router.put("/:id", dioceseController.updateDioceseById);
router.delete("/:id", dioceseController.deleteDiocese);*/
module.exports = router;



