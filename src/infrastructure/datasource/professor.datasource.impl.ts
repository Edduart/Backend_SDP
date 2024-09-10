import { instructor_position } from "@prisma/client";
import { prisma } from "../../data/postgres";
import {
  CreateProfessor,
  ProfessorDataSource,
  ProfessorEntity,
  UpdateProfessorDto,
  GetProfessorDto,
  ProfesorFichaDTO,
  SocialMediaDTO,
} from "../../domain";

import {
  CreateUser,
  UpdatePersonFunc,
  UpdateUserFunc,
} from "./utils/user.functions";

import { FilterEnum } from "../../presentation/utils/filterEnum";

import { parseProfessorGet } from "../../presentation/utils/parseData";

export class ProfessorDataSourceImpl implements ProfessorDataSource {
  async Ficha(id: string): Promise<ProfesorFichaDTO> {
    const result = await prisma.professor.findFirst({
      where: {
        id: id,
      },
      include: {
        user: {
          include: {
            academic_degree: true,
            person: {
              include: {
                phone_number: true,
                social_media: {
                  include: {
                    social_media_category_social_media_social_media_categoryTosocial_media_category:
                      true,
                  },
                },
              },
            },
            parish: { include: { diocese: true } },
          },
        },
      },
    });
    if (result == null) throw new Error("Instructor does not exists");
    const cellpones: string[] = result.user.person.phone_number.map(
      (cellphone) => {
        return cellphone.phone_number;
      }
    );
    const redes: SocialMediaDTO[] = result.user.person.social_media.map(
      (socialdata) => {
        return new SocialMediaDTO(
          socialdata.social_media_category_social_media_social_media_categoryTosocial_media_category.description,
          socialdata.link
        );
      }
    );
    let instruction_Grade = "PROFESOR";
    if (result.user.academic_degree.length > 0) {
      instruction_Grade = result.user.academic_degree[0].description;
    }
    const dto = new ProfesorFichaDTO(
      result.id,
      result.user.person.profile_picture_path,
      result.user.person.forename,
      result.user.person.surname,
      result.user.person.birthdate,
      result.user.parish.name,
      result.user.parish.diocese.name,
      cellpones,
      redes,
      instruction_Grade
    );
    return dto;
  }
  async update(dto: UpdateProfessorDto): Promise<object> {
    const professorExist = await prisma.professor.findUnique({
      where: { id: dto.person.id },
    });
    if (professorExist == null) throw "Professor doesn't exist!";
    if (dto.instructor_position) {
      const getInstructorById = await prisma.instructor.findUnique({
        where: { professor_id: dto.person.id },
      });
      if (!getInstructorById) throw `instructor with ID: ${dto.instructor_position} no found`;
      const instructorPositions = await prisma.instructor.findMany({
        where: {
          NOT: { instructor_position: "DESACTIVADO" },
        },
        select: { instructor_position: true },
      });
      const filteredInstructorPosition =
        FilterEnum.filterInstructorPosition(instructorPositions);
      console.log({ msj: "inside update", filteredInstructorPosition });
      if (dto.instructor_position) {
        if (
          !(dto.instructor_position == getInstructorById.instructor_position)
        ) {
          if (
            !Object.keys(filteredInstructorPosition).includes(
              dto.instructor_position
            )
          ) {
            throw "there is other instructor with the same position";
          }
        }
      }
    }
    await UpdatePersonFunc(dto.person);
    await UpdateUserFunc(dto.user);
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
        data: { status: 0, instructor_position: "DESACTIVADO" },
      });
    }
    return { success: true, msj: "Profesor desactivado" };
  }

  async create(createDto: CreateProfessor): Promise<ProfessorEntity> {
    const exists = await prisma.user.findUnique({
      where: { person_id: createDto.user.person.id },
    });
    if (exists) throw "Person already exist";
    if (createDto.instructor_position) {
      const checkInstructorPosition = await prisma.instructor.findMany({
        where: {
          instructor_position:
            createDto.instructor_position as instructor_position,
        },
      });
      if (checkInstructorPosition.length > 0)
        throw `there is already one instructor in the position: ${createDto.instructor_position}`;
    }
    await CreateUser(createDto.user);
    await prisma.professor.create({
      data: {
        id: createDto.user.person.id,
        status_id: 1,
      },
    });
    const dtoForResponse = new GetProfessorDto(createDto.user.person.id);
    const resultIndividual = await this.get(dtoForResponse);
    return resultIndividual[0];
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
    if (returnFromDB.length === 0)
      throw "No se encontraron coincidencias con los parametros especificados!";
    console.log(returnFromDB);
    return parseProfessorGet(returnFromDB);
  }
}
