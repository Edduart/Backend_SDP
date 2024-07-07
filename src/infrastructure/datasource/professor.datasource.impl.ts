import { prisma } from "../../data/postgres";
import {
  CreateProfessor,
  PersonEntity,
  PhoneEntity,
  SocialMediaEntity,
  ProfessorDataSource,
  ProfessorEntity,
} from "../../domain";

import { CreatePersonFunc, UpdatePersonFunc } from "./utils/user.functions";

export class ProfessorDataSourceImpl implements ProfessorDataSource {
  async create(createDto: CreateProfessor): Promise<ProfessorEntity> {
    prisma.$transaction(async () => {
      
      //await CreateUser(data.user); //create user frist

      const exists = await prisma.person.findFirst({
        where: { id: createDto.person.id },
      });
      if (exists) {
        throw `Usuario ya tiene un nombre registrado`;
      }
      //now i create the person
      await CreatePersonFunc(createDto.person);

      await prisma.professor.create({
        data: {
          id: createDto.person.id,
          status_id: 1,
        },
      });
    });
    const resultIndividual = await this.get(createDto.person.id, undefined); //this can be improved => check in future
    return resultIndividual[0];
  }

  async get(id?: string, status_id?: number): Promise<ProfessorEntity[]> {
    let retunrFromDB;
    if (!id && !status_id) {
      //console.log("going for all");
      retunrFromDB = await prisma.person.findMany({
        include: {
          phone_number: true,
          professor: true,
          social_media: {
            include: {
              social_media_category_social_media_social_media_categoryTosocial_media_category:
                { select: { description: true } },
            },
          },
        },
      });
    } else {
      retunrFromDB = await prisma.person.findMany({
        where: {
          OR: [
            { id: id },
            {
              professor: {
                status_id: status_id,
              },
            },
          ],
        },
        include: {
          phone_number: true,
          professor: true,
          social_media: {
            include: {
              social_media_category_social_media_social_media_categoryTosocial_media_category:
                { select: { description: true } },
            },
          },
        },
      });
    }
    //mapeo de los datos
    const professors: ProfessorEntity[] = retunrFromDB.map((professor) => {
      const person: PersonEntity = PersonEntity.fromdb(professor); //datos de persona
      const phones: PhoneEntity[] = professor.phone_number.map(
        (phoneatributer) => {
          return PhoneEntity.fromdb(phoneatributer);
        }
      );
      const socials: SocialMediaEntity[] = professor.social_media.map(
        (sociales) => {
          return SocialMediaEntity.fromdb({
            link: sociales.link,
            social_media_category: sociales.social_media_category_social_media_social_media_categoryTosocial_media_category
          });
        }
      );
      return ProfessorEntity.fromObject(
        person,
        socials,
        phones,
        professor.professor?.status_id! // check this status must be !null, never
      );
    });
    return professors;
  }
}
