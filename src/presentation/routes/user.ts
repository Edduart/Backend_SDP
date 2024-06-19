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
