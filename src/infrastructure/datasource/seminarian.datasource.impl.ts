import {
  foreigner_seminarian_stage,
  seminarian_Location,
  seminarian_Ministery,
  seminarian_status,
} from "@prisma/client";
import { prisma } from "../../data/postgres";
import {
  BloodType,
  CreateSeminarian,
  DegreeEntity,
  ForeingSeminarianEntity,
  GetSeminarianDTO,
  Locations_enum,
  PersonEntity,
  PhoneEntity,
  seminarian_status_enum,
  SeminarianDataSource,
  SeminarianEntity,
  seminarianMinistery_ENUM,
  SocialMediaEntity,
  UpdateSeminarian,
} from "../../domain";
import { CreateUser, UpdatePersonFunc } from "./utils/user.functions";

export class SeminarianDataSourceImpl implements SeminarianDataSource {
  async get(data: GetSeminarianDTO): Promise<SeminarianEntity[]> {
    let where_clause_foreing = undefined;
    //if the foreing clause is not undefined we pass to assing data
    if (data.foreing != undefined) {
      //if it is true i sent to select all seminarian that has foreing data
      //if it is false, i  sent to select all seminarian that has not foreing data
      where_clause_foreing = data.foreing ? { isNot: null } : { is: null };
    }
    const result = await prisma.person.findMany({
      where: {
        id: {
          contains: data.id,
        },
        surname: {
          contains: data.surname,
        },
        forename: {
          contains: data.forename,
        },
        birthdate: {
          gte: data.first_Date,
          lte: data.second_Date,
        },
        user: {
          parish_id: data.parish_id,
          Role_id: 5,
          parish: {
            diocese_id: data.diocese_id,
          },
          seminarian: {
            status: data.status as seminarian_status,
            Location: data.location as seminarian_Location,
            Ministery: data.ministery as seminarian_Ministery,
            foreigner_seminarian: where_clause_foreing,
          },
        },
      },
      include: {
        phone_number: true,
        social_media: true,
        user: {
          include: {
            academic_degree:true,
            parish:{
              include:{
                diocese:true,
              }
            },
            seminarian: {
              include: {
                foreigner_seminarian: true,
              },
            },
          },
        },
      },
    });

    const results: SeminarianEntity[] = result.map((person_actual) => {
      //create the person
      const person = PersonEntity.fromdb({
        id: person_actual.id,
        profile_picture_path: person_actual.profile_picture_path,
        forename: person_actual.forename,
        surname: person_actual.surname,
        email: person_actual.email,
        birthdate: person_actual.birthdate,
        medical_record: person_actual.medical_record,
        BloodType: person_actual.BloodType as BloodType
      }); //person creator
      const cellphones: PhoneEntity[] = person_actual.phone_number.map(
        (cellphone_actual) => {
          return PhoneEntity.fromdb({
            phone_number: cellphone_actual.phone_number,
            description: cellphone_actual.description,
          });
        }
      ); //cellphone creator
      const media: SocialMediaEntity[] = person_actual.social_media.map(
        (social_Actual) => {
          return SocialMediaEntity.fromdb({
            social_media_category:social_Actual.social_media_category,
            link: social_Actual.link,
          });
        }
      ); //media creator
      person.cellpones = cellphones;
      person.medias = media;
      let foreing = undefined;
      if (person_actual.user?.seminarian?.foreigner_seminarian != null) {
        foreing = ForeingSeminarianEntity.fromdb({
          seminary_name:
            person_actual.user?.seminarian?.foreigner_seminarian.seminary_name,
          stage: person_actual.user?.seminarian?.foreigner_seminarian.stage,
          stage_year:
            person_actual.user?.seminarian?.foreigner_seminarian.stage_year
        });
      }
      const seminarian = SeminarianEntity.fromdb({
        id: person_actual.user?.seminarian?.id,
        apostleships: person_actual.user?.seminarian?.apostleships,
        location: person_actual.user?.seminarian?.Location as Locations_enum,
        Ministery: person_actual.user?.seminarian?.Ministery as seminarianMinistery_ENUM,
        status: person_actual.user?.seminarian?.status as seminarian_status_enum,
        parish_id: person_actual.user?.parish_id,
        diocesi_id: person_actual.user?.parish.diocese_id
      }); //seminarian creator
      seminarian.person = person;
      seminarian.foreing_Data = foreing;
      if(person_actual.user?.academic_degree != null){
        const degrees: DegreeEntity[] = person_actual.user.academic_degree.map((degree_actual)=>{
          return DegreeEntity.fromdb(degree_actual);
        });
        seminarian.degrees = degrees;
      }
      return seminarian;
    });

    return results;
  }
  async Delete(id: string): Promise<string | null | undefined> {
    const check_exist = await prisma.seminarian.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
      },
    });
    if (check_exist == null) throw new Error("seminarian does not exists");
    const path = await prisma.person.findFirst({
      where: {
        id: id,
      },
      select: {
        profile_picture_path: true,
      },
    });
    try {
      const result_u = await prisma.user.update({
        where: {
          person_id: id,
        },
        data: {
          status: false,
        },
      });
      const result_s = await prisma.seminarian.update({
        where: {
          id: id,
        },
        data: {
          status: seminarian_status.Retirado,
        },
      });
      return path?.profile_picture_path;
    } catch (error) {
      throw new Error("Unable to delete seminarian" + error);
    }
  }
  async Update(data: UpdateSeminarian): Promise<string> {
    const check_exist = await prisma.seminarian.findFirst({where: {id: data.person.id,},select: {id: true,},});
    if (check_exist == null) throw new Error("seminarian does not exists");
    try {
      //updating the person data
      await UpdatePersonFunc(data.person);
      try {
        await prisma.foreigner_seminarian.delete({
          where: { id: data.person.id },
        });
      } catch (error) {}

      //create de foreing data
      if (data.foreing_Data != undefined) {
        //deleting old foreing data

        await prisma.foreigner_seminarian.create({
          data: {
            id: data.person.id,
            seminary_name: data.foreing_Data.seminary_name,
            stage: data.foreing_Data
              .stage as unknown as foreigner_seminarian_stage,
            stage_year: data.foreing_Data.stage_year,
          },
        });
      }
      //now updating the seminarian data
      const result = await prisma.seminarian.update({
        where: {
          id: data.person.id,
        },
        data: {
          apostleships: data.apostleships,
          Location: data.location as seminarian_Location,
          Ministery: data.ministery as seminarian_Ministery,
        },
      });
      return result.id;
    } catch (error) {
      throw new Error("Unable to update seminarian" + error);
    }
  }
  async create(data: CreateSeminarian): Promise<string> {
    try {
      const user = await prisma.person.findFirst({where:{id: data.user.person.id,}});
      if(user != undefined){throw new Error("Someone with the same id already exits");}

      const result = await prisma.$transaction(async (tx) => {
        await CreateUser(data.user);
      //creating foreing
      if (data.foreing_Data != undefined) {
        //call to create if foreing data
        const result = await prisma.seminarian.create({
          data: {
            id: data.user.person.id,
            apostleships: data.apostleships,
            status: seminarian_status.Activo,
            Location: data.location as seminarian_Location,
            Ministery: data.ministery as seminarian_Ministery,
            foreigner_seminarian: {
              connectOrCreate: {
                where: {
                  id: data.user.person.id,
                },
                create: {
                  seminary_name: data.foreing_Data.seminary_name,
                  stage: data.foreing_Data
                    .stage as unknown as foreigner_seminarian_stage,
                  stage_year: data.foreing_Data.stage_year,
                },
              },
            },
          },
          include: {
            foreigner_seminarian: true,
          },
        });
        return result.id;
      }
      //create for not foreing seminarians
      const result = await prisma.seminarian.create({
        data: {
          id: data.user.person.id,
          apostleships: data.apostleships,
          status: seminarian_status.Activo,
          Location: data.location as seminarian_Location,
          Ministery: data.ministery as seminarian_Ministery,
        },
      });
      return result.id;
      });
      
      return result;
      
    } catch (error) {
      throw new Error("Unable to create seminarian" + error);
    }
  }
}
