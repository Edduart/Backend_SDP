import { instructor_position } from "@prisma/client";
import { prisma } from "../../data/postgres";
import {
  CreateInstructorDto,
  InstructorDataSource,
  InstructorEntity,
  instructorFichaDTO,
  SocialMediaDTO,
  UpdateInstructorDto,
} from "../../domain";

export class InstructorDataSourceImple implements InstructorDataSource {
  async Ficha(id: string): Promise<instructorFichaDTO> {
    const person = await prisma.instructor.findFirst({
      where: {
        professor_id: id,
      },
      include: {
        professor: {
          include: {
            user: {
              include: {
                academic_degree: true,
                person: {
                  include: {
                    phone_number: true,
                    social_media: {
                      include: {
                        social_media_category_social_media_social_media_categoryTosocial_media_category:
                          true,
                      },
                    },
                  },
                },
                parish: {
                  include: {
                    diocese: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (person == null) throw new Error("Instructor does not exists");
    const cellpones: string[] = person.professor.user.person.phone_number.map(
      (cellphone) => {
        return cellphone.phone_number;
      }
    );
    const redes: SocialMediaDTO[] =
      person.professor.user.person.social_media.map((socialdata) => {
        return new SocialMediaDTO(
          socialdata.social_media_category_social_media_social_media_categoryTosocial_media_category.description,
          socialdata.link
        );
      });
    let instruction_Grade = "PROFESOR";
    if (person.professor.user.academic_degree.length > 0) {
      instruction_Grade = person.professor.user.academic_degree[0].description;
    }
    const dto = new instructorFichaDTO(
      person.professor_id,
      person.professor.user.person.profile_picture_path,
      person.professor.user.person.forename,
      person.professor.user.person.surname,
      person.professor.user.person.birthdate,
      person.starting_date,
      person.instructor_position as string,
      person.professor.user.parish.name,
      person.professor.user.parish.diocese.name,
      cellpones,
      redes,
      instruction_Grade
    );
    return dto;
  }
  async create(createDto: CreateInstructorDto): Promise<InstructorEntity> {
    const createInstructor = await prisma.instructor.create({
      data: {
        professor_id: createDto.professor_id,
        status: createDto.status,
        starting_date: createDto.starting_date,
        instructor_position:
          createDto.instructor_position as instructor_position,
      },
    });
    await prisma.user.update({
      where: { person_id: createDto.professor_id },
      data: {
        Role_id: createDto.instructor_role,
      },
    });
    return InstructorEntity.fromObject(createInstructor);
  }
  async updateById(updateDto: UpdateInstructorDto): Promise<InstructorEntity> {
    console.log(updateDto);

    await this.findById(updateDto.professor_id);

    const updateInstructor = await prisma.instructor.update({
      where: { professor_id: updateDto.professor_id },
      data: {
        starting_date: updateDto.starting_date,
        instructor_position:
          updateDto.instructor_position as instructor_position,
        status: updateDto.status,
      },
    });
    return InstructorEntity.fromObject(updateInstructor);
  }
  async getAll(): Promise<InstructorEntity[]> {
    const getInstructors = await prisma.instructor.findMany();
    return getInstructors.map((Instructors) =>
      InstructorEntity.fromObject(Instructors)
    );
  }
  async findById(id: string): Promise<InstructorEntity> {
    const getInstructorById = await prisma.instructor.findUnique({
      where: { professor_id: id },
    });
    if (!getInstructorById) throw "Instructor with ID: ${id} no found";
    return InstructorEntity.fromObject(getInstructorById);
  }
  async deleteById(id: string): Promise<InstructorEntity> {
    const deleteInstructor = await prisma.instructor.update({
      where: { professor_id: id },
      data: { status: 0, instructor_position: "DESACTIVADO" },
    });
    await prisma.user.update({
      where: { person_id: id },
      data: {
        Role_id: 4,
      },
    });

    return InstructorEntity.fromObject(deleteInstructor);
  }
}
