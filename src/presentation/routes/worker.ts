import { Router } from "express";
import { actualizar, guardar } from "../services/upload.worker";
import { WorkerDataSourceImpl, WorkerRepositoryImpl } from "../../infrastructure";
import { WorkerControler } from "../worker/worker.crontroller";
import { Request, Response, NextFunction } from 'express';
import { ValidatorTo } from "../services/TokenValidator";
const router = Router();
const datasource = new WorkerDataSourceImpl();
const Repository = new WorkerRepositoryImpl(datasource);
const WorkerControl = new WorkerControler(Repository);
//si el middleware lanza error se cancela toda la ejecicion

router.get('/socials', ValidatorTo.ValidarToken ,WorkerControl.GetSocials);
//el ValidarTokenH es la variante del middleware para situaciones como la del multer donde los resultados de la verificacion se manda por header
router.post('/:id',ValidatorTo.ValidarTokenH, (req: Request, res: Response, next: NextFunction) => {
    guardar.single('file')(req, res, async (err) => {
        if (err) {
            return next(err);
        }
        WorkerControl.create(req, res);
    });
});
router.put('/:id', ValidatorTo.ValidarTokenH, (req: Request, res: Response, next: NextFunction) => {
    actualizar.single('file')(req, res, async (err) => {
        if (err) {
            return next(err);
        }
        WorkerControl.update(req, res);
    });
});
router.get('/', ValidatorTo.ValidarToken, WorkerControl.get);
router.delete('/:id', ValidatorTo.ValidarToken,WorkerControl.deleteRole);

module.exports= router;