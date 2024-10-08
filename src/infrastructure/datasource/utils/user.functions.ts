import { CreatePerson, CreateUserDTO, UpdateUserDto } from "../../../domain";
import { prisma } from "../../../data/postgres";
import { person_BloodType } from "@prisma/client";
import { redes } from "../../../seed/data";

export async function UpdatePersonFunc(data: CreatePerson) {
  const check_exist = await prisma.person.findFirst({
    where: {
      id: data.id,
    },
    select: {
      id: true,
    },
  });
  if (check_exist == null) throw new Error("person does not exists");
  try {
    //deleting old phones and medias
    await prisma.phone_number.deleteMany({
      where: {
        person_id: data.id,
      },
    });
    await prisma.social_media.deleteMany({
      where: {
        person_id: data.id,
      },
    });
    //if there is media we create it all
    if (data.media != null) {
      const media_json = data.media.map((actual) => {
        return {
          person_id: data.id,
          social_media_category: actual.social_media_category,
          link: actual.link,
        };
      });
      await prisma.social_media.createMany({
        data: media_json,
      });
    }
    //if there is cellphones we create it all
    if (data.cellphone != null) {
      const cell_json = data.cellphone?.map((actual) => {
        return {
          person_id: data.id,
          phone_number: actual.phone_number,
          description: actual.description,
        };
      });
      await prisma.phone_number.createMany({
        data: cell_json,
      });
    }

    console.log(data.profile_picture_path);

    //now updating the person
    await prisma.person.update({
      where: {
        id: data.id,
      },
      data: {
        forename: data.forename,
        surname: data.surname,
        birthdate: data.birthdate,
        profile_picture_path: data.profile_picture_path,
        email: data.email,
        medical_record: data.medical_record,
        BloodType: data.Blood as person_BloodType,
      },
    });
  } catch (error) {
    throw new Error("Error updating person" + error);
  }
}

export async function CreatePersonFunc(data: CreatePerson) {
  const check_exist = await prisma.person.findFirst({
    where: {
      id: data.id,
    },
    select: {
      id: true,
    },
  });
  if (check_exist != null) return;

  console.log(data);
  try {
    //creating person
    const result_op = await prisma.person.create({
      data: {
        id: data.id,
        forename: data.forename,
        surname: data.surname,
        birthdate: data.birthdate,
        profile_picture_path: data.profile_picture_path,
        email: data.email,
        medical_record: data.medical_record,
        BloodType: data.Blood as person_BloodType,
      },
    });
    //if there is media we create it all
    if (data.media != null) {
      const media_json = data.media.map((actual) => {
        return {
          person_id: data.id,
          social_media_category: actual.social_media_category,
          link: actual.link,
        };
      });
      await prisma.social_media.createMany({
        data: media_json,
      });
    }
    //if there is cellphones we create it all
    if (data.cellphone != null) {
      const cell_json = data.cellphone?.map((actual) => {
        return {
          person_id: data.id,
          phone_number: actual.phone_number,
          description: actual.description,
        };
      });
      await prisma.phone_number.createMany({
        data: cell_json,
      });
    }
  } catch (error) {
    throw new Error("Error creating person" + error);
  }
}

export async function CreateUser(user: CreateUserDTO) {
  const check_exist = await prisma.user.findFirst({
    where: {
      person_id: user.person.id,
    },
    select: {
      person_id: true,
    },
  });
  if (check_exist != null) return;
  try {
    await prisma.$transaction(async (tx) => {
      // check if user db constraints exist

      console.log("promise run");
      const [parish, role] = await Promise.all([
        await prisma.parish.findUnique({
          where: { id: user.parish_id },
        }),
        await prisma.role.findUnique({
          where: { id: user.role },
        }),
      ]);

      console.log("promise run end");

      if (!parish) throw `parish Id does'nt exist`;
      if (!role) throw `role Id does'nt exist`;

      //start with creating the person
      await CreatePersonFunc(user.person);

      //create the user
      const result_op = await prisma.user.create({
        data: {
          person_id: user.person.id,
          parish_id: user.parish_id,
          status: true,
          Role_id: user.role,
          password: user.password,
          LastIn: null,
        },
      });
      //if there is degree we create it
      if (user.degree != undefined) {
        const degree_json = user.degree.map((actual) => {
          return {
            user_id: user.person.id,
            description: actual.description,
            link: actual.link,
          };
        });
        await prisma.academic_degree.createMany({
          data: degree_json,
        });
      }
    }); //transaction
  } catch (error: unknown) {
    throw { msj: "error creating user", error };
  }
}

export async function UpdateUserFunc(user: UpdateUserDto) {
  //check if user exist
  const check_exist = await prisma.user.findFirst({
    where: {
      person_id: user.person_id,
    },
    select: {
      person_id: true,
    },
  });
  if (check_exist == null) throw new Error("user does not exists");
  try {
    //deleting degrees
    await prisma.academic_degree.deleteMany({
      where: {
        user_id: user.person_id,
      },
    });
    //if there is degree we create it
    if (user.degree != undefined) {
      const degree_json = user.degree.map((actual) => {
        return {
          user_id: user.person_id,
          description: actual.description,
          link: actual.link,
        };
      });
      //console.log("user degree", degree_json);
      await prisma.academic_degree.createMany({
        data: degree_json,
      });
    }

    console.log("user in fuction", user.role_id);
    await prisma.user.update({
      where: {
        person_id: user.person_id,
      },
      data: {
        parish_id: user.parish_id,
        status: user.status,
        Role_id: user.role_id,
        password: user.password,
      },
    });
  } catch (error: unknown) {
    throw { msj: "error updating user", error };
  }
}
