import { Router } from "express";
import { ValidatorTo } from "../services/TokenValidator";
import { Request, Response, NextFunction } from "express";
import { profile, profileU } from "../services/upload.seminarian";
import {
  SeminarianDataSourceImpl,
  SeminarianRepositoryImpl,
} from "../../infrastructure";
import { SeminarianControler } from "../seminarian/seminarian.controller";

import { uploadFile, updateFile } from "../services/upload.service";

const router = Router();
const datasource = new SeminarianDataSourceImpl();
const Repository = new SeminarianRepositoryImpl(datasource);
const SeminarianControl = new SeminarianControler(Repository);
router.get("/ficha/:id",        ValidatorTo.ValidarToken, SeminarianControl.ficha);
router.get("/carcaCulmin/:id",  ValidatorTo.ValidarToken, SeminarianControl.getCartaCulminacione);
router.get("/constance/:id",    ValidatorTo.ValidarToken, SeminarianControl.GetConstance);
router.post(
  "/create/:id",
  ValidatorTo.ValidarTokenH,
  (req: Request, res: Response) => {
    uploadFile.single("picture")(req, res, async (err) => {
      if (err) {
        res.status(400).json({ ImageError: err.message });
      } else {
        if (!req.file) {
          const preparePath: string =
            "images" + req.baseUrl + req.url + ".jpeg";
          const newImagePath = preparePath.replace("/create/", "/");
          req.body.ayuda = newImagePath;
          console.log("no file", req.body.ayuda);
        }
        SeminarianControl.Create(req, res);
      }
    });
  }
);
router.put(
  "/update/:id",
  ValidatorTo.ValidarTokenH,
  (req: Request, res: Response) => {
    updateFile.single("picture")(req, res, async (err) => {
      if (err) {
        res.status(400).json({ ImageError: err.message });
      } else {
        SeminarianControl.update(req, res);
      }
    });
  }
);
router.get(
  "/seminarianlist",
  ValidatorTo.ValidarToken, SeminarianControl.CreateList
);
router.get("/getsem", ValidatorTo.ValidarToken, SeminarianControl.get);
router.delete("/:id", ValidatorTo.ValidarToken, SeminarianControl.delete);
module.exports = router;
