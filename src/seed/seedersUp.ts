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
  subject as subjectsData,
} from "./data/";
import { prisma } from "../data/postgres";
import { academic_term_status } from "@prisma/client";
/*
Object.values(modelData).forEach(model => {
  new modelPrismaData(model);
});
*/
main();

async function main(){
  try {
    await prisma.$transaction(async (tx) => {
      permsData.forEach(async element => {
        await prisma.permission.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      rolesData.forEach(async element => {
        await prisma.role.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      rolePermissionsData.forEach(async element => {
        await prisma.role_permission.upsert({where: {role_id_permission_id: {role_id: element.role_id,permission_id: element.permission_id,},}, update: {},create: element,});
      });
      diocesesData.forEach(async element => {
        await prisma.diocese.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      parishData.forEach(async element => {
        await prisma.parish.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      redData.forEach(async element => {
        await prisma.social_media_category.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      stageData.forEach(async element => {
        await prisma.stage.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      academicData.forEach(async element => {
        await prisma.academic_field.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      coursesData.forEach(async element => {
        await prisma.course.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      personsData.forEach(async element => {
        await prisma.person.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      usersData.forEach(async element => {
        await prisma.user.upsert({where: {person_id: element.person_id,}, update: {},create: element,});
      });
      subjectsData.forEach(async element => {
        await prisma.subject.upsert({where: {id: element.id,}, update: {},create: element,});
      });
      await prisma.academic_term.upsert({where:{id: 1}, update:{}, create:{id: 1,start_date: new Date(2020,1,1),end_date: new Date(2025,1,1),semester: 1,status: academic_term_status.EQUIVALENCIAS,}});
      for (let i = 1; i < subjectsData.length; i++) {
        await prisma.instruction.upsert({where:{subject_id_academic_term_id:{
          academic_term_id: 1,
          subject_id: i
        }}, update:{}, create:{
          subject_id: i,
          academic_term_id: 1
        }
      })
      }
      console.log("seeder completed")
    })
  } catch (error) {
    
  }
  
  
}
