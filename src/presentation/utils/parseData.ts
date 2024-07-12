import {
  BloodType,
  CreateDegree,
  CreatePerson,
  CreatePhone,
  CreateSocialMedia,
  CreateUserDTO,
  UpdateUserDto
} from "../../domain";
import { encode } from "../services/hash_handler";

interface UserData {
  person_id: string;
  parish_id: number;
  password: string;
  role_id: number;
}

export async function parsePersonData(req: any, path: any) {
  try {
    const origin = await JSON.parse(req);
    const imageFile = path ? path.replace(/\\/g, "/") : null;
    // Social Media Data Parsing
    const socials: CreateSocialMedia[] | null = origin.persona.social?.map(
      (social: { social_media_category: string; link: string }) =>
        new CreateSocialMedia(social.social_media_category, social.link)
    );
    // Phone Data Parsing
    const phones: CreatePhone[] | null = origin.persona.phone?.map(
      (phone: { phone_number: string; description: string }) =>
        new CreatePhone(phone.phone_number, phone.description)
    );
    // Person Data Parsing
    const personData = new CreatePerson(
      origin.persona.id,
      imageFile,
      origin.persona.forename,
      origin.persona.surname,
      origin.persona.email,
      new Date(origin.persona.birthdate),
      origin.persona.medical_record,
      origin.persona.BloodType as BloodType,
      phones,
      socials
    );
    //se retorna el dto de persona entero con todo y media/phones
    return personData;
  } catch (error: unknown) {
    console.error("Error parsing person data:", error);
    throw new Error("An error occurred while processing person data.");
  }
} // fine
// User Data Parsing
export async function parseUserData(req: any, person: CreatePerson) {
  try {
    const origin = await JSON.parse(req); // check that is only a string
    const hashedPasword = await encode(origin.persona.id);
    const degrees: CreateDegree[] | undefined = origin.user.degree.map(
      (degree_Actual: { description: string; link: string }) =>
        new CreateDegree(
          origin.persona.id,
          degree_Actual.description,
          degree_Actual.link
        )
    );
    const userData = new CreateUserDTO(
      person,
      degrees,
      origin.user.parish_id,
      origin.user.role,
      hashedPasword
    );
    return userData;
  } catch (error) {
    throw error;
  }
}

export async function parseInstructoData(req: any) {
  try {
    const origin = await JSON.parse(req);
    const { is_instructor, starting_date, instructor_position } =
      origin.instructor;
    if (is_instructor == false) return null;
    const professor_id  = origin.persona.id;
    const instructorData = {
      professor_id,
      starting_date,
      instructor_position,
    };
    return instructorData;
  } catch (error) {
    throw error;
  }
}

export async function parseUserDataUpdate(req: any) {
  try {
    const origin = await JSON.parse(req); 
    const hashedPasword = await encode(origin.persona.id);
    const degrees: CreateDegree[] | undefined = origin.user.degree.map(
      (degree_Actual: { description: string; link: string }) =>
        new CreateDegree(
          origin.persona.id,
          degree_Actual.description,
          degree_Actual.link
        )
    );


    console.log("data desde origen", origin);

    const statusUpdate = origin.professor.status_id

    const userData = new UpdateUserDto(
      origin.persona.id,
      origin.user.status,
      degrees,
      origin.user.parish_id,
      origin.user.role,
      hashedPasword
    );
    return { userData, statusUpdate };
  } catch (error) {
    throw error;
  }
}