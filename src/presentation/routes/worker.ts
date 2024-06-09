import { Router } from "express";
import { guardar } from "../services/upload.worker";
import { WorkerDataSourceImpl, WorkerRepositoryImpl } from "../../infrastructure";
import { WorkerControler } from "../worker/worker.crontroller";
const router = Router();
const datasource = new WorkerDataSourceImpl();
const Repository = new WorkerRepositoryImpl(datasource);
const WorkerControl = new WorkerControler(Repository);



//si el middleware lanza error se cancela toda la ejecicion
router.post('/:id', (req, res, next) => {
    guardar.single('file')(req, res, (err) => {
        if (err) {
            return next(err);
        }
        WorkerControl.create(req, res);
    });
});
router.get('/', WorkerControl.get);


module.exports= router;