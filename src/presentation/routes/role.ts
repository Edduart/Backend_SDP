import { Router } from "express";
import { RoleController } from "../role/role.controller";
import { RoleDataSourceImpl } from "../../infrastructure/datasource/";
import { RoleRepositoryImpl } from "../../infrastructure/repositories/";
import { ValidatorCreateUser, ValidatorEdit } from "../validators/role";

const router = Router();
const datasource = new RoleDataSourceImpl();
const Repository = new RoleRepositoryImpl(datasource);
const RoleControl = new RoleController(Repository);

router.post('/', ValidatorCreateUser,RoleControl.createRole);
router.get("/", RoleControl.getRole);
router.get("/one/", RoleControl.getOne);
router.delete("/:id", RoleControl.deleteRole);
router.get("/permi/",RoleControl.getAllPermissions);
router.put("/", ValidatorEdit, RoleControl.UpdateRole);
module.exports= router;
