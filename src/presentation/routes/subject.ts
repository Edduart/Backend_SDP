import { Router } from "express";
import { SubjectDataSourceImpl, SubjectRepositoryImpl } from "../../infrastructure";
import { SubjectControler } from "../subject/subject.controler";


const router = Router();
const datasource = new SubjectDataSourceImpl();
const Repository = new SubjectRepositoryImpl(datasource);
const subControl = new SubjectControler(Repository);

router.post('/', subControl.Create);
router.get('/', subControl.Get);
module.exports= router;