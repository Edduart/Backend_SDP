import { Router } from "express";
import { RoleController } from "../role/role.controller";
import { RoleDataSourceImpl } from "../../infrastructure/datasource/role.datasource.implementation";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/role.repositories.implementation";
import { ValidatorCreateUser, ValidatorEdit } from "../validators/role";

const router = Router();
const datasource = new RoleDataSourceImpl();
const Repository = new RoleRepositoryImpl(datasource);
const RoleControl = new RoleController(Repository);

router.post('/', ValidatorCreateUser,RoleControl.CreateRole);
router.get("/", RoleControl.GetRole);
router.get("/one/", RoleControl.getOne);
router.delete("/:id", RoleControl.DeleteRole);
router.get("/permi/",RoleControl.GetAllPermissions);
router.put("/", ValidatorEdit, RoleControl.UpdateRole);
module.exports= router;
