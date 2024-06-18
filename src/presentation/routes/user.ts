import { Router } from "express";
import { UserDataSourceImplementation, UserRepositoryImplementation } from "../../infrastructure";
import { UserControler } from "../user/user.controller";

const router = Router();
const datasource = new UserDataSourceImplementation();
const Repository = new UserRepositoryImplementation(datasource);
const UserControl = new UserControler(Repository);

router.post('/Login/', UserControl.Login);


module.exports= router;