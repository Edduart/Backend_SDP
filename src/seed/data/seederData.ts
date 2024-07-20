import { prisma } from "../../data/postgres"
import {
  academics as academicData,
  permissions as permsData,
  dioceses as diocesesData,
  redes as redData,
  stages as stageData,
  parishes as parishData,
  roles as rolesData,
  course as couserData,
  role_permissions as RP_Data,
  person_user as PData,
  user as UData
} from "./";


// Agregar los datos del seeder aqui 

export const modelData = {
  permission: { model: prisma.permission.createMany, data: permsData },
  diocese: { model: prisma.diocese.createMany, data: diocesesData },
  redes: { model: prisma.social_media_category.createMany, data: redData },
  stage: { model: prisma.stage.createMany, data: stageData },
  parishe: { model: prisma.parish.createMany,data: parishData},
  academic_field: {model: prisma.academic_field.createMany, data: academicData},
  course: {model: prisma.course.createMany, data: couserData},
  role: {model: prisma.role.createMany, data: rolesData},
  role_permission: {model: prisma.role_permission.createMany, data: RP_Data},
  person: {model: prisma.person.createMany, data: PData},
  user: {model: prisma.user.createMany, data: UData},
};
