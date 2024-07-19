import { instructor_position } from "@prisma/client";
import { prisma } from "../../data/postgres";
import {
  CreateProfessor,
  PersonEntity,
  PhoneEntity,
  DegreeEntity,
  InstructorEntity,
  SocialMediaEntity,
  ProfessorDataSource,
  ProfessorEntity,
  UpdateProfessorDto,
  UpdateUserDto,
  GetProfessorDto
} from "../../domain";

import {
  CreateUser,
  CreatePersonFunc,
  UpdatePersonFunc,
  UpdateUserFunc,
} from "./utils/user.functions";

import { parseProfessorGet } from '../../presentation/utils/parseData';

export class ProfessorDataSourceImpl implements ProfessorDataSource {
  async update(data: UpdateProfessorDto): Promise<object> {
    const professorExist = await prisma.professor.findUnique({
      where: { id: data.person.id },
    });
    if (professorExist == null) throw "Professor doesn't exist!";
    await UpdatePersonFunc(data.person);
    await UpdateUserFunc(data.user);
    await prisma.professor.update({
      where: { id: data.person.id },
      data: { status_id: data.status_id },
    });
    return { msj: "Professor Updated!" };
  }

  async delete(id: string): Promise<object> {
    const professorExist = await prisma.professor.findUnique({
      where: { id: id },
    });
    if (professorExist == null) throw "Professor doesn't exist!!";
    const userExist = await prisma.user.findUnique({
      where: { person_id: id },
    });
    if (userExist == null) throw "User doesn't exist!";
    await prisma.user.update({
      where: { person_id: id },
      data: { status: false },
    });
    await prisma.professor.update({
      where: { id: id },
      data: { status_id: 0 },
    });
    const isInstructor = await prisma.instructor.findUnique({
      where: { professor_id: id },
    });
    if (isInstructor != null) {
      await prisma.instructor.update({
        where: { professor_id: id },
        data: { status: 0 },
      });
    }
    return { success: true, msj: "Profesor desactivado" };
  }

  async create(createDto: CreateProfessor): Promise<ProfessorEntity> {
    const exists = await prisma.user.findUnique({
      where: { person_id: createDto.user.person.id },
    });
    if (exists) throw "Persona ya existe!";
    await CreateUser(createDto.user);
    await prisma.professor.create({
      data: {
        id: createDto.user.person.id,
        status_id: 1,
      },
    });
    const DtoForResponse = new GetProfessorDto(
      createDto.user.person.id
    );
    const resultIndividual = await this.get(DtoForResponse);
    return resultIndividual[0]; // check error in get
  }

  async get(filter: GetProfessorDto): Promise<ProfessorEntity[]> {
    const returnFromDB = await prisma.professor.findMany({
      where: { id: filter.id, status_id: filter.status },
      select: {
        id: true,
        status_id: true,
        instructor: true,
        user: {
          include: {
            academic_degree: true,
            parish: { select: { id: true, diocese_id: true } },
            person: {
              include: {
                user: true,
                phone_number: true,
                social_media: {
                  include: {
                    social_media_category_social_media_social_media_categoryTosocial_media_category:
                      {
                        select: {
                          social_media_social_media_social_media_categoryTosocial_media_category:
                            { select: { id: true } },
                        },
                      },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (returnFromDB.length === 0) throw "No se encontraron coincidencias con los parametros especificados!"  
    console.log(returnFromDB);
    return parseProfessorGet(returnFromDB);;
  }
}
