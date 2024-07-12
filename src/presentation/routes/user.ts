import { Router } from "express";
import { UserDataSourceImplementation, UserRepositoryImpl } from "../../infrastructure";
import { UserControler } from "../user/user.controller";
import { ValidatorTo } from "../services/TokenValidator";
import { ValidatorLogin } from "../validators/login";

const router = Router();
const datasource = new UserDataSourceImplementation();
const Repository = new UserRepositoryImpl(datasource);
const UserControl = new UserControler(Repository);

router.get('/', UserControl.getAll);
router.get("/:id", UserControl.getById);
router.get("/user-by-type/:type", UserControl.getByType);
router.post('/Login/', ValidatorLogin, UserControl.Login);
router.post('/logout', ValidatorTo.Eliminate);
router.post('/pass', ValidatorTo.ValidarToken, ValidatorLogin, UserControl.ChangePass)

module.exports= router;