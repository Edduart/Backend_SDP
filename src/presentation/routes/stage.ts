import { Router } from "express";
import { StageController } from "../stage/stage.controller";
import { StageDataSourceImple } from "../../infrastructure/";
import { StageRepositoryImpl } from "../../infrastructure/";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const datasource = new StageDataSourceImple();
const stageRepository = new StageRepositoryImpl(datasource);
const stageController = new StageController(stageRepository);

router.get("/",     ValidatorTo.ValidarToken, stageController.getStages);
router.get("/:id",  ValidatorTo.ValidarToken, stageController.getStageById);

module.exports = router;
