import { Router } from "express";
import { ValidatorTo } from "../services/TokenValidator";
import { ExtraController } from "../extra/extra.controller";

const router = Router();
const extraControl = new ExtraController();


router.get("/blood/", ValidatorTo.ValidarToken, extraControl.Blood);
router.get("/work/", ValidatorTo.ValidarToken, extraControl.Work);
router.get(
  "/instructors/",
  ValidatorTo.ValidarToken,
  extraControl.GetInstructors
);
router.get(
  "/get-enrollment-status/",
  ValidatorTo.ValidarToken,
  extraControl.getEnrollmentStatusEnum
);
module.exports= router;
