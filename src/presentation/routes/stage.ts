import { Router } from "express";
import { StageController } from "../stage/stage.controller";
import { StageDataSourceImple } from "../../infrastructure/";
import { StageRepositoryImpl } from "../../infrastructure/";

const router = Router();
const datasource = new StageDataSourceImple();
const stageRepository = new StageRepositoryImpl(datasource);
const stageController = new StageController(stageRepository);

router.post("/", stageController.createStage);
router.get("/", stageController.getStages);
router.get("/:id", stageController.getStageById);
router.put("/:id", stageController.updateStageById);
router.delete("/:id", stageController.deleteStageById);
module.exports = router;
