import { prisma } from "../../data/postgres"
import {
  academics as academicData,
  permissions as permsData,
  dioceses as diocesesData,
  redes as redData,
  stages as stageData,
  parishes as parishData,
  roles as rolesData,
  course as coursesData,
  rolePermissions as rolePermissionsData,
  person as personsData,
  user as usersData,
} from "./";


// Agregar los datos del seeder aqui 

export const modelData = {
  permission: { model: prisma.permission.createMany, data: permsData },
  diocese: { model: prisma.diocese.createMany, data: diocesesData },
  redes: { model: prisma.social_media_category.createMany, data: redData },
  stage: { model: prisma.stage.createMany, data: stageData },
  parish: { model: prisma.parish.createMany, data: parishData },
  academic_field: {model: prisma.academic_field.createMany,data: academicData,},
  course: { model: prisma.course.createMany, data: coursesData },
  role: { model: prisma.role.createMany, data: rolesData },
  role_permission: {model: prisma.role_permission.createMany,data: rolePermissionsData,},
  person: { model: prisma.person.createMany, data: personsData },
  user: { model: prisma.user.createMany, data: usersData },
};
