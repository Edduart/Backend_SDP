import { Router } from "express";
import { SubjectDataSourceImpl, SubjectRepositoryImpl } from "../../infrastructure";
import { SubjectControler } from "../subject/subject.controler";
import { ValidatorTo } from "../services/TokenValidator";


const router = Router();
const datasource = new SubjectDataSourceImpl();
const Repository = new SubjectRepositoryImpl(datasource);
const subControl = new SubjectControler(Repository);
router.get('/pensum',   ValidatorTo.ValidarToken, subControl.Pensum);
router.put('/',         ValidatorTo.ValidarToken, subControl.Update);
router.post('/',        ValidatorTo.ValidarToken, subControl.Create);
router.get('/',         ValidatorTo.ValidarToken, subControl.Get);
router.get('/fields',   ValidatorTo.ValidarToken, subControl.Get_Field);
router.get('/inst',     ValidatorTo.ValidarToken, subControl.Get_inst);
router.delete('/:id',   ValidatorTo.ValidarToken, subControl.Delete);
module.exports= router;