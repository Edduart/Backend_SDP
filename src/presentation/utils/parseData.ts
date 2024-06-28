import { CreatePhone, SocialMedia, PersonEntity } from "../../domain";
import { encode } from "../services/hashHandler";

interface UserData {
  person_id: string;
  parish_id: number;
  password: string;
  role_id: number;
}

export async function parsePersonData(req: any) {
  try {
    const origin = await JSON.parse(req.body.data);
    const imageFile = req.body.ayuda
      ? req.body.ayuda.replace(/\\/g, "/")
      : null;

    // Person Data Parsing
    const personData = new PersonEntity(
      origin.person.id,
      imageFile,
      origin.person.forename,
      origin.person.surname,
      origin.person.email,
      new Date(origin.person.birthdate),
      origin.person.medical_record,
      origin.person.bloodType
    );

    console.log(personData);
    // Social Media Data Parsing
    const socials: SocialMedia[] = origin.social.map(
      (social: { social_media_category: number; link: string }) =>
        new SocialMedia(social.social_media_category, social.link)
    );
    // Phone Data Parsing
    const phones: CreatePhone[] = origin.phone.map(
      (phone: { phone_numbre: string; description: string }) =>
        new CreatePhone(phone.phone_numbre, phone.description)
    );
    return { person: personData, socials, phones };
  } catch (error: unknown) {
    console.error("Error parsing person data:", error);
    throw new Error("An error occurred while processing person data.");
  }
}
// User Data Parsing
export async function parseUserData(req: any) {
  try {
    const origin = await JSON.parse(req.body.data); // check that is only a string
    const hashedPasword = await encode(origin.user.password);

    const userData: UserData = {
      person_id: origin.person.id,
      parish_id: origin.user.parish_id,
      password: hashedPasword,
      role_id: origin.user.role_id,
    };

    return userData
  } catch (error) {
    throw error
  }
}
