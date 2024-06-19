import { person_BloodType } from "@prisma/client";
import { prisma } from "../../data/postgres";
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
    try {
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
        const resultIndividual = await this.get(
          createPerson.id,
          undefined
        );
        return resultIndividual[0];
      });
    } catch (error: any) {
      throw new Error("Something went wrong" + error);
    }
    const resultIndividual = await this.get(createDto.persona.id, undefined);
    return resultIndividual[0];
  }

  async get(
    id: string | undefined,
    status_id: number | undefined,
  ): Promise<ProfessorEntity[]> {
    /* si ambas variables son undefined se procede con el select all, sin embargo si una de las variables es undefined
      se procede con el filtro, pues prisma controla el undefined como una forma de ignorar dicha comparacion 
      y null como un valor */
    let retunrFromDB;
    if (id === undefined && status_id === undefined) {
      retunrFromDB = await prisma.person.findMany({
        select: {
          id: true,
          profile_picture_path: true,
          forename: true,
          surname: true,
          email: true,
          birthdate: true,
          medical_record: true,
          BloodType: true,
          phone_number: {
            select: {
              phone_number: true,
              description: true,
            },
          },
          social_media: {
            select: {
              link: true,
              //Esta es la llave de relacion generada por prisma automaticamente, por ello el nombre extraño, por favor ignorarlo
              social_media_category_social_media_social_media_categoryTosocial_media_category:
                {
                  select: {
                    description: true,
                  },
                },
            },
          },
          professor: {
            select: {
              status_id: true,
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
        select: {
          id: true,
          profile_picture_path: true,
          forename: true,
          surname: true,
          email: true,
          birthdate: true,
          medical_record: true,
          BloodType: true,
          phone_number: {
            select: {
              phone_number: true,
              description: true,
            },
          },
          social_media: {
            select: {
              link: true,
              //Esta es la llave de relacion generada por prisma automaticamente, por ello el nombre extraño, por favor ignorarlo
              social_media_category_social_media_social_media_categoryTosocial_media_category:
                {
                  select: {
                    description: true,
                  },
                },
            },
          },
          professor: {
            select: {
              status_id: true,
            },
          },
        },
      });
    }

    const workers: ProfessorEntity[] = retunrFromDB.map((professor) => {
      //creo a la persona otra cosa, worker es basicamente persona debido a que el select empezó por persona
      const person: PersonEntity = PersonEntity.fromdb({
        id: professor.id,
        profile_picture_path: professor.profile_picture_path,
        forename: professor.forename,
        surname: professor.surname,
        email: professor.email,
        fecha: professor.birthdate,
        medical_record: professor.medical_record,
        BloodType: professor.BloodType as BloodType,
      });
      const phones: PhoneEntity[] = professor.phone_number.map(
        (phoneatributer) => {
          //creo los arrays de telefonos, en caso de que existan
          return PhoneEntity.fromdb({
            id: null,
            phone_number: phoneatributer.phone_number,
            person_id: null,
            description: phoneatributer.description,
          });
        }
      );
      const socials: SocialMediaEntity[] = professor.social_media.map(
        (sociales) => {
          //ahora creo el array de redes sociales, en caso de que existan
          return SocialMediaEntity.fromdb({
            id: null,
            person_id: null,
            //esta tira es debido al nombre de la relacion
            social_Cate:
              sociales
                .social_media_category_social_media_social_media_categoryTosocial_media_category
                .description,
            link: sociales.link,
          });
        }
      );
      //ahora si a crear la entidad trabajador
      return ProfessorEntity.fromObject(
        person,
        socials,
        phones,
        professor.professor?.status_id! // check this status must be !null, never
      );
    });

    return workers;
  }
}
