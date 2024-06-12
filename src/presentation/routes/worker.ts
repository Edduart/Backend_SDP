import { Router } from "express";
import { guardar } from "../services/upload.worker";
import { WorkerDataSourceImpl, WorkerRepositoryImpl } from "../../infrastructure";
import { WorkerControler } from "../worker/worker.crontroller";
import { Request, Response, NextFunction } from 'express';
const router = Router();
const datasource = new WorkerDataSourceImpl();
const Repository = new WorkerRepositoryImpl(datasource);
const WorkerControl = new WorkerControler(Repository);
//si el middleware lanza error se cancela toda la ejecicion


router.post('/:id', (req: Request, res: Response, next: NextFunction) => {
    guardar.single('file')(req, res, (err) => {
        if (err) {
            return next(err);
        }
        console.log(req.body.data);
        WorkerControl.create(req, res);
    });
});
router.get('/', WorkerControl.get);
router.delete('/:id', WorkerControl.deleteRole);

module.exports= router;