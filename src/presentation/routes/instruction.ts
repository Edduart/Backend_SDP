import { Router } from "express";
import { InstructionDataSourceImple } from "../../infrastructure";
import { InstructionRepositoryImpl } from "../../infrastructure/repositories/instruction.repository";
import { InstructionController } from "../instruction/instruction_controller";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const datasource = new InstructionDataSourceImple();
const instructionRepository = new InstructionRepositoryImpl(datasource);
const instructionController = new InstructionController(instructionRepository);
router.get('/', ValidatorTo.ValidarToken, instructionController.get);
router.put('/', ValidatorTo.ValidarToken, instructionController.create);
module.exports = router;