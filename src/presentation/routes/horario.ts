import { Router } from "express";
import { HorarioDataSourceImplementation, HorarioRepositoryImpl } from "../../infrastructure";
import { HorarioController } from "../horario/horario.controller";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();

const datasource = new HorarioDataSourceImplementation();
const Repository = new HorarioRepositoryImpl(datasource);
const control = new HorarioController(Repository);

router.get('/', control.Get);
router.put('/', /*ValidatorTo.ValidarToken, */ control.Update)


module.exports= router;