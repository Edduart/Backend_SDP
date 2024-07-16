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
} from "../../domain";

import {
  CreateUser,
  CreatePersonFunc,
  UpdatePersonFunc,
  UpdateUserFunc,
} from "./utils/user.functions";

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
    const isInstrutor = await prisma.instructor.findUnique({
      where: { professor_id: id },
    });
    if (isInstrutor != null) {
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
    const resultIndividual = await this.get();
    return resultIndividual[0]; // check error in get
  }

  async get(): Promise<ProfessorEntity[]> {
    const retunrFromDB = await prisma.professor.findMany({
      select: {
        id: true,
        status_id: true,
        instructor: { include: { professor: true } },
        user: {
          include: {
            academic_degree: true,
            parish: { select: { diocese_id: true } },
            person: {
              include: {
                user: true,
                phone_number: true,
                social_media: {
                  include: {
                    social_media_category_social_media_social_media_categoryTosocial_media_category:
                      { select: { id: true } },
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log(retunrFromDB[0], retunrFromDB[0].user.person);

    const professors: ProfessorEntity[] = retunrFromDB.map((professor) => {
      const person: PersonEntity = PersonEntity.fromdb(professor.user.person); //datos de persona
      const status = professor.status_id;
      const phones: PhoneEntity[] = professor.user.person.phone_number.map(
        (phoneatributer) => {
          return PhoneEntity.fromdb(phoneatributer);
        }
      );
      const socials: SocialMediaEntity[] =
        professor.user.person.social_media.map((sociales) => {
          return SocialMediaEntity.fromdb({
            link: sociales.link,
            social_media_category:
              sociales.id,
          });
        });
              /*const degrees: DegreeEntity[] =
                professor.user.academic_degree.map((phoneatributer) => {
                  return PhoneEntity.fromdb(phoneatributer);
                });*/
      return ProfessorEntity.fromObject(person, socials, phones, status);
    });
    return professors;
  }
}
