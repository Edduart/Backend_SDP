import { person_BloodType, social_media } from "@prisma/client";
import { prisma } from "../../data/postgres";
import { SocialMedia } from "../../domain/dtos/socialmedia/socialmedia.create";
import {
  BloodType,
  CreateProfessor,
  PersonEntity,
  PhoneEntity,
  SocialMediaEntity,
  ProfessorDataSource,
  ProfessorEntity,
} from "../../domain";

export class ProfessorDataSourceImpl implements ProfessorDataSource {
  async create(createDto: CreateProfessor): Promise<ProfessorEntity> {
    prisma.$transaction(async () => {
      const createPerson = await prisma.person.create({
        data: {
          id: createDto.persona.id,
          forename: createDto.persona.forename,
          surname: createDto.persona.surname,
          birthdate: createDto.persona.birthdate,
          profile_picture_path: createDto.persona.profile_picture_path,
          email: createDto.persona.email,
          medical_record: createDto.persona.medical_record,
          BloodType: createDto.persona.BloodType as person_BloodType,
        },
      });
      if (createDto.social != null) {
        const dataSocialMedia = createDto.social.map((social) => {
          return {
            person_id: createPerson.id,
            social_media_category: social.social_media_category,
            link: social.link,
          };
        });
        await prisma.social_media.createMany({
          data: dataSocialMedia,
        });
      }
      if (createDto.telefono != null) {
        const dataCellPhone = createDto.telefono.map((cellPhone) => {
          return {
            person_id: createPerson.id,
            phone_number: cellPhone.phone_numbre,
            description: cellPhone.description,
          };
        });
        await prisma.phone_number.createMany({
          data: dataCellPhone,
        });
      }
      await prisma.professor.create({
        data: {
          id: createPerson.id,
          status_id: 1,
        },
      });
    });
    const resultIndividual = await this.get(createDto.persona.id, undefined); //this can be improved => check in future
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
