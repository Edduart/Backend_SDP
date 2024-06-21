import { Router } from "express";
import { ParishController } from "../parish/parish.controller";
import { ParishDatasourceimpl } from "../../infrastructure/datasource/parish.datasource.impl";
import { ParishRepositoryImpl } from "../../infrastructure/repositories/parish.repository.imple";

const router = Router();
const datasource = new ParishDatasourceimpl();
const parishRepository = new ParishRepositoryImpl(datasource);
const parishController = new ParishController(parishRepository);

router.post("/", parishController.createParish);
router.get("/", parishController.getParishes);
router.get("/:id", parishController.GetParishById);
router.get("/search/:name", parishController.getParishByname);
router.put("/:id", parishController.UpdateParishById);
router.delete("/:id", parishController.deleteParishById);
module.exports = router;



