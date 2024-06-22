import { Router } from "express";
import { UserDataSourceImplementation, UserRepositoryImplementation } from "../../infrastructure";
import { UserControler } from "../user/user.controller";
import { ValidatorTo } from "../services/TokenValidator";

const router = Router();
const datasource = new UserDataSourceImplementation();
const Repository = new UserRepositoryImplementation(datasource);
const UserControl = new UserControler(Repository);

router.post('/Login/', UserControl.Login);
router.post('/logout', ValidatorTo.Eliminate)

module.exports= router;