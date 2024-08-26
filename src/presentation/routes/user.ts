import { Router } from "express";
import { UserDataSourceImplementation, UserRepositoryImpl } from "../../infrastructure";
import { UserControler } from "../user/user.controller";
import { ValidatorTo } from "../services/TokenValidator";
import { ValidatorLogin } from "../validators/login";

const router = Router();
const datasource = new UserDataSourceImplementation();
const Repository = new UserRepositoryImpl(datasource);
const UserControl = new UserControler(Repository);

router.get('/', ValidatorTo.ValidarToken, UserControl.getAll);
router.get("/user-by-type/", UserControl.getByType);
router.get("/:id", UserControl.getById);
router.post('/Login/', ValidatorLogin, UserControl.Login);
router.post('/logout', ValidatorTo.Eliminate);
router.post('/reset', UserControl.Reset);
router.post('/pass', ValidatorTo.ValidarToken, ValidatorLogin, UserControl.ChangePass)

module.exports= router;