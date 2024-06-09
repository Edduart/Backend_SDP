import { Router } from "express";
import { guardar } from "../services/upload.worker";
import { WorkerDataSourceImpl, WorkerRepositoryImpl } from "../../infrastructure";
import { WorkerControler } from "../worker/worker.crontroller";
const router = Router();
const datasource = new WorkerDataSourceImpl();
const Repository = new WorkerRepositoryImpl(datasource);
const WorkerControl = new WorkerControler(Repository);




router.post('/', guardar.single('file'), WorkerControl.create);
router.get('/', WorkerControl.get);


module.exports= router;