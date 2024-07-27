import { Router } from "express";
import { InstructionDataSourceImple } from "../../infrastructure";
import { InstructionRepositoryImpl } from "../../infrastructure/repositories/instruction.repository";
import { InstructionController } from "../instruction/instruction_controller";

const router = Router();
const datasource = new InstructionDataSourceImple();
const instructionRepository = new InstructionRepositoryImpl(datasource);
const instructionController = new InstructionController(instructionRepository);

router.post('/', instructionController.create);
module.exports = router;