import { modelData } from "./data/seederData";

import { modelPrismaData } from "./model/seederModel";
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
  Horarios
} from "./data/";
import { prisma } from "../data/postgres";
import { academic_term_status } from "@prisma/client";
/*
Object.values(modelData).forEach(model => {
  new modelPrismaData(model);
});
*/
main();
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function main() {
  try {
    await prisma.$transaction(async (tx) => {
      Horarios.forEach(async (Element)=>{
        await prisma.horarios.upsert({
          where: {ID: Element.ID},
          update: {},
          create: Element,
        })
      })
      
      console.log("Seeding: permissions");
      permsData.forEach(async (element) => {
        await prisma.permission.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: roles");
      rolesData.forEach(async (element) => {
        await prisma.role.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: role_permissions");
      rolePermissionsData.forEach(async (element) => {
        await prisma.role_permission.upsert({
          where: {
            role_id_permission_id: {
              role_id: element.role_id,
              permission_id: element.permission_id,
            },
          },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: diocesis");
      diocesesData.forEach(async (element) => {
        await prisma.diocese.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: parishes");
      parishData.forEach(async (element) => {
        await prisma.parish.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: categories");
      redData.forEach(async (element) => {
        await prisma.social_media_category.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: stages");
      stageData.forEach(async (element) => {
        await prisma.stage.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: academic fields");
      academicData.forEach(async (element) => {
        await prisma.academic_field.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      await delay(1000);
      console.log("Seeding: courses");
      coursesData.forEach(async (element) => {
        await prisma.course.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: super user");
      personsData.forEach(async (element) => {
        await prisma.person.upsert({
          where: { id: element.id },
          update: {},
          create: element,
        });
      });
      await delay(1000);
      console.log("Seeding: super person");
      usersData.forEach(async (element) => {
        await prisma.user.upsert({
          where: { person_id: element.person_id },
          update: {},
          create: element,
        });
      });
      await delay(2000);
      console.log("Seeding: academic terms");
      await prisma.academic_term.upsert({
        where: { id: 1 },
        update: {},
        create: {
          id: 1,
          start_date: new Date(2020, 1, 1),
          end_date: new Date(2025, 1, 1),
          semester: 1,
          status: academic_term_status.EQUIVALENCIAS,
        },
      });
      console.log("seeder completed");
    });
  } catch (error) {}
}
