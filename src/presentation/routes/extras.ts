import { Router } from "express";
import { ValidatorTo } from "../services/TokenValidator";
import { ExtraController } from "../extra/extra.controller";

const router = Router();
const ExtraControl = new ExtraController();


router.get("/blood/", ValidatorTo.ValidarToken, ExtraControl.Blood);
router.get("/work/", ValidatorTo.ValidarToken, ExtraControl.Work);
module.exports= router;
