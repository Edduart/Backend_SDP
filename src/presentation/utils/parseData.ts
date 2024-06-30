import { BloodType, CreateDegree, CreatePerson, CreatePhone, CreateSocialMedia, CreateUserDTO } from "../../domain";
import { encode } from "../services/hash_handler";

interface UserData {
  person_id: string;
  parish_id: number;
  password: string;
  role_id: number;
}



export async function parsePersonData(req: any) {
  try {
    console.log(req);
    const origin = await JSON.parse(req);
    const imageFile = req.body.ayuda
      ? req.body.ayuda.replace(/\\/g, "/")
      : null;
    // Social Media Data Parsing
    const socials: CreateSocialMedia[] = origin.social.map(
      (social: { social_media_category: string; link: string }) =>
        new CreateSocialMedia(social.social_media_category, social.link)
    );
    // Phone Data Parsing
    const phones: CreatePhone[] = origin.phone.map(
      (phone: { phone_numbre: string; description: string }) =>
        new CreatePhone(phone.phone_numbre, phone.description)
    );
    // Person Data Parsing
    const personData = new CreatePerson(
      origin.person.id,
      imageFile,
      origin.person.forename,
      origin.person.surname,
      origin.person.email,
      new Date(origin.person.birthdate),
      origin.person.medical_record,
      origin.person.Blood as BloodType, 
      phones, socials
    );
    //se retorna el dto de persona entero con todo y media/phones
    return personData ;
  } catch (error: unknown) {
    console.error("Error parsing person data:", error);
    throw new Error("An error occurred while processing person data.");
  }
}
// User Data Parsing
export async function parseUserData(req: any, person: CreatePerson) {
  try {
    console.log(req);
    const origin = await JSON.parse(req); // check that is only a string
    const hashedPasword = await encode(origin.person_id);

    const degrees: CreateDegree[] | undefined = origin.Degree?.map((degree_Actual: { description: string; link: string }) =>
        new CreateDegree(origin.person.id, degree_Actual.description, degree_Actual.link)
    );

    const userData = new CreateUserDTO(person, degrees, origin.parish_name, origin.role, hashedPasword); 

    return userData
  } catch (error) {
    throw error
  }
}
