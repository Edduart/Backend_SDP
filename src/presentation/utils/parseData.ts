import { envs } from "../../config/envs";

import { instructor_position } from "@prisma/client";
import {
  ProfessorEntity,
  BloodType,
  CreateDegree,
  CreatePerson,
  CreatePhone,
  CreateSocialMedia,
  CreateUserDTO,
  UpdateUserDto,
  PersonEntity,
  PhoneEntity,
  DegreeEntity,
  SocialMediaEntity,
  ParishEntity,
} from "../../domain";
import { encode } from "../services/hashHandler";
import { formatDate } from "../../presentation/utils/formatDate";

const serverAddress: string = envs.SERVER_ADDRESS;

export async function parsePersonData(req: any, path: any) {
  try {
    
    const origin = await JSON.parse(req);
    const imagePath = serverAddress + path.replace(/\\/g, "/");
  
    // Social Media Data Parsing
    const socials: CreateSocialMedia[] | null = origin?.persona?.social?.map(
      (social: { social_media_category: number; link: string }) =>
        new CreateSocialMedia(social.social_media_category, social.link)
    );
    // Phone Data Parsing
    const phones: CreatePhone[] | null = origin.persona.phone?.map(
      (phone: { phone_number: string; description: string }) =>

        new CreatePhone(phone.phone_number, phone.description.toUpperCase())
    );
    // Person Data Parsing
    const personData = new CreatePerson(
      origin?.persona?.id,
      imagePath,
      origin?.persona?.forename?.toUpperCase(),
      origin?.persona?.surname?.toUpperCase(),
      origin?.persona?.email,
      origin?.persona?.birthdate != null
        ? new Date(origin.persona.birthdate)
        : new Date("2024-01-01"),
      origin?.persona?.medical_record,
      origin?.persona?.BloodType as BloodType,
      phones,
      socials
    );
    //se retorna el dto de persona entero con todo y media/phones
    return personData;
  } catch (error: unknown) {
    console.error("Error parsing person data:", error);
    throw { msj: "An error occurred while processing person data", error };
  }
} // fine
// User Data Parsing
export async function parseUserData(req: any, person: CreatePerson) {
  try {
    const origin = await JSON.parse(req);
    const hashedPassword = await encode(origin.persona.id);
    const degrees: CreateDegree[] | undefined =
      origin.user.degree != null
        ? origin.user.degree.map(
            (degree_Actual: { description: string; link: string }) =>
              new CreateDegree(
                origin.persona.id,
                degree_Actual.description.toUpperCase(),
                degree_Actual.link
              )
          )
        : undefined;
    const parsed_parish_id = Number(origin.user.parish_id);
    if (Number.isNaN(parsed_parish_id) || !Number.isInteger(parsed_parish_id) || parsed_parish_id < 0) {
        throw new Error("Parish id invalid, must be a non negative integer")
    }
    const userData = new CreateUserDTO(
      person,
      degrees,
      parsed_parish_id,
      origin.user.role,
      hashedPassword
    );
    return userData;
  } catch (error) {
    console.error("Error parsing user data:", error);
    throw { msj: "An error occurred while processing user data", error };
  }
}

export async function parseInstructorData(req: any) {
  try {
    const origin = await JSON.parse(req);
    const { is_instructor, starting_date, instructor_position, status } =
      origin.instructor;
    if (is_instructor == false) return null;
    const professor_id = origin.persona.id;
    const instructorData = {
      professor_id,
      starting_date,
      instructor_position,
      status,
    };
    return instructorData;
  } catch (error) {
    throw error;
  }
}

export async function parseUserDataUpdate(req: any) {
  try {
    const origin = await JSON.parse(req);
    //const hashedPassword = await encode(origin.persona.id);
    const degrees: CreateDegree[] | undefined = origin.user.degree.map(
      (degree_Actual: { description: string; link: string }) =>
        new CreateDegree(
          origin.persona.id,
          degree_Actual.description.toUpperCase(),
          degree_Actual.link
        )
    );

    const userData = new UpdateUserDto(
      origin.persona.id,
      degrees,
      origin.user.parish_id,
      origin.user?.role
    );
    return { userData };
  } catch (error) {
    throw error;
  }
}

export async function parseProfessorGet(returnFromDB: Array<any>) {
  const professors: ProfessorEntity[] = returnFromDB.map((professor) => {
    let person: PersonEntity = PersonEntity.fromdb(professor.user.person); //datos de persona
    person.date_String = formatDate(person.birthdate.toISOString())!;
    const status = professor.status_id;
    const Role_id = professor.user.Role_id;
    const userStatus = professor.user.status;

    let user: ParishEntity = professor.user.parish;

    const phones: PhoneEntity[] = professor.user.person.phone_number.map(
      (phone: any) => {
        return PhoneEntity.fromdb(phone);
      }
    );
    const socials: SocialMediaEntity[] = professor.user.person.social_media.map(
      (socials: any) => {
        return SocialMediaEntity.fromdb({
          link: socials.link,
          social_media_category: socials.social_media_category,
        });
      }
    );
    //if (professor.user?.academic_degree != null)
    const degrees: DegreeEntity[] = professor.user.academic_degree.map(
      (degrees: any) => {
        return DegreeEntity.fromdb(degrees);
      }
    );
    let instructor;
    if (professor.instructor != null) {
      instructor = {
        professor_id: professor.instructor?.professor_id,
        starting_date: professor.instructor?.starting_date,
        instructor_position: professor.instructor
          ?.instructor_position as instructor_position,
        status: professor.instructor.status,
        starting_date_string: formatDate(
          professor.instructor.starting_date.toISOString()
        ),
      };
    } else {
      instructor = { is_instructor: false };
    }
    return ProfessorEntity.fromObject(
      person,
      socials,
      phones,
      status,
      userStatus,
      degrees,
      instructor,
      Role_id,
      user
    );
  });
  return professors;
}
