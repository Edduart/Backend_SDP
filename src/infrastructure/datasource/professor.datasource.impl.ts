import { prisma } from "../../data/postgres";
import {
  CreateProfessor,
  PersonEntity,
  PhoneEntity,
  SocialMediaEntity,
  ProfessorDataSource,
  ProfessorEntity,
} from "../../domain";

import {
  CreateUser,
  CreatePersonFunc,
  UpdatePersonFunc,
} from "./utils/user.functions";

export class ProfessorDataSourceImpl implements ProfessorDataSource {
  async create(createDto: CreateProfessor): Promise<ProfessorEntity> {
    //check if user exists
    console.log(createDto.user.person.id);
    const exists = await prisma.user.findUnique({
      where: { person_id: createDto.user.person.id },
    });
    if (exists) throw "Persona ya existe!";
    //create user frist
    await CreateUser(createDto.user);

    //now i create the person
    //console.log(createDto.person);
    //await CreatePersonFunc(createDto.person);
    // then professor

    await prisma.professor.create({
      data: {
        id: createDto.user.person.id,
        status_id: 1,
      },
    });
    const resultIndividual = await this.get(
      createDto.user.person.id,
      undefined
    ); //this can be improved => check in future
    return resultIndividual[0];
  }

  async get(id?: string, status_id?: number): Promise<ProfessorEntity[]> {
    let retunrFromDB;
    //if (!id && !status_id) {
    //console.log("going for all");

    retunrFromDB = await prisma.professor.findMany({
      select: {
        id: true,
        status_id: true,
        user: {
          include: {
            person: {
              include: {
                phone_number: true,
                social_media: {
                  include: {
                    social_media_category_social_media_social_media_categoryTosocial_media_category:
                      { select: { description: true } },
                  },
                },
              },
            },
          },
        },
      },
    });
    /* } else {
      retunrFromDB = await prisma.person.findMany({
        where: {
          OR: [{ id: id }],
        },
        include: {
          phone_number: true,
          social_media: {
            include: {
              social_media_category_social_media_social_media_categoryTosocial_media_category:
                { select: { description: true } },
            },
          },
        },
      });
    }*/
    //mapeo de los datos
    //console.log(retunrFromDB);

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
              sociales.social_media_category_social_media_social_media_categoryTosocial_media_category,
          });
        });

      return ProfessorEntity.fromObject(person, socials, phones, status);
    });
    return professors;
  }
}
