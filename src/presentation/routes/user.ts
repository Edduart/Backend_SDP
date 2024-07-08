import { Router } from "express";
import { UserController } from "../user/user.controller";
import { UserDataSourceImple } from "../../infrastructure/";
import { UserRepositoryImpl } from "../../infrastructure/";

const router = Router();
const datasource = new UserDataSourceImple();
const userRepository = new UserRepositoryImpl(datasource);
const userController = new UserController(userRepository);

router.get("/", userController.getUsers);

module.exports = router;

/*import { Router } from "express";
import { UserDataSourceImplementation, UserRepositoryImplementation } from "../../infrastructure";
import { UserControler } from "../user/user.controller";
import { ValidatorTo } from "../services/TokenValidator";
import { ValidatorLogin } from "../validators/login";

const router = Router();
const datasource = new UserDataSourceImplementation();
const Repository = new UserRepositoryImplementation(datasource);
const UserControl = new UserControler(Repository);

router.post('/Login/', ValidatorLogin, UserControl.Login);
router.post('/logout', ValidatorTo.Eliminate);
router.post('/pass', ValidatorTo.ValidarToken, ValidatorLogin, UserControl.ChangePass)

module.exports= router;*/