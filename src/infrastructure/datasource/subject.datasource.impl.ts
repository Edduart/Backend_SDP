import { prisma } from "../../data/postgres";
import {
  subjectPensumDTO,
  academicFieldEntity,
  CreateSubjectDTO,
  GetSubjectDTO,
  instruction_dto,
  Stage_PensumDTO,
  SubjectDataSource,
  SubjectDeliver,
  SubjectEntity,
  UpdateSubjectDTO,
} from "../../domain";

export class SubjectDataSourceImpl implements SubjectDataSource {
  async Get_fields(): Promise<academicFieldEntity[]> {
    const results = await prisma.academic_field.findMany({
      include: {
        stage: true,
      },
    });
    const fields: academicFieldEntity[] = results.map((field_actual) =>
      academicFieldEntity.fromObject(field_actual)
    );
    return fields;
  }

  async get_instruction(data: GetSubjectDTO): Promise<SubjectDeliver[]> {
    const result = await prisma.subject.findMany({
      where: {
        AND: {
          description: {
            contains: data.description,
          },
          id: data.id,
          course_id: data.course_id,
          academic_field: {
            id: data.academic_field_id,
            stage_id: data.stage_id,
          },
        },
      },
      include: {
        instruction: true,
        course: true,
        academic_field: {
          include: {
            stage: true,
          },
        },
        subject: {
          include: {
            academic_field: {
              include: {
                stage: true,
              },
            },
          },
        },
      },
    });
    const results: SubjectDeliver[] = result.map((subject) => {
      const subject_actual = SubjectDeliver.fromObject(subject);
      subject_actual.instruction = subject.instruction.map((instructions) => {
        return instruction_dto.fromObject(instructions);
      });
      return subject_actual;
    });

    return results;
  }
  async Delete(id: number): Promise<SubjectEntity> {
    const result = await prisma.subject.findFirst({
      where: { id: id },
      select: { status: true },
    });
    if (result == null) throw new Error("Subject does not exists");
    const result_p = await prisma.subject.findMany({
      where: { precedent: id },
    });
    if (result_p.length > 0)
      throw new Error(
        "can not delete as it precents: " + result_p[0].description
      );
    const auxiliary_boolean = !result.status;
    const delete_u = await prisma.subject.update({
      where: { id: id },
      data: { status: auxiliary_boolean, precedent: null },
    });
    const subjet_deleted = await this.get(
      GetSubjectDTO.FindDto(delete_u.id, false)
    );
    return subjet_deleted[0];
  }
  async Update(data: UpdateSubjectDTO): Promise<SubjectEntity> {
    const result = await prisma.subject.findFirst({
      where: { description: data.description, id: { not: data.id } },
    });
    if (result != null) {
      throw new Error("Subject with same name already exists");
    }
    const result_u = await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    const subjet_created = await this.get(GetSubjectDTO.FindDto(result_u.id));
    return subjet_created[0];
  }
  async get(data: GetSubjectDTO): Promise<SubjectEntity[]> {
    const result = await prisma.subject.findMany({
      where: {
        AND: {
          description: {
            contains: data.description,
          },
          id: data.id,
          course_id: data.course_id,
          academic_field: {
            id: data.academic_field_id,
            stage_id: data.stage_id,
          },
        },
      },
      include: {
        course: true,
        academic_field: {
          include: {
            stage: true,
          },
        },
        subject: {
          include: {
            academic_field: {
              include: {
                stage: true,
              },
            },
          },
        },
      },
    });
    const results: SubjectEntity[] = result.map((subject) => {
      return SubjectEntity.fromObject(subject);
    });
    return results;
  }
  async create(data: CreateSubjectDTO): Promise<SubjectEntity> {
    const result_name = await prisma.subject.findFirst({
      where: { description: data.description },
    });
    if (result_name != null)
      throw new Error("Subject with same name already exists");
    if (data.precedent != null) {
      await this.CheckPrecedent(data.precedent, data.course_id, data.semester);
    }
    const subject = await prisma.subject.create({
      data: data,
    });
    const subjectEquivalence = await prisma.instruction.create({
      data: {
        subject_id: subject.id,
        academic_term_id: 1,
      },
    });
    const subjectDescription: string = `EVALUACION DE EQUIVALENCIA: ${subject.description}`;
    await prisma.test.create({
      data: {
        subject_id: subjectEquivalence.subject_id,
        academic_term_id: subjectEquivalence.academic_term_id,
        description: subjectDescription,
        maximum_score: 100,
      },
    });
    const subjet_created = await this.get(GetSubjectDTO.FindDto(subject.id));
    return subjet_created[0];
  }
  async CheckPrecedent(
    id: number,
    course: number,
    semester: number
  ): Promise<boolean> {
    const subjet_pre = await prisma.subject.findFirst({
      where: { id: id, status: true },
    });
    if (subjet_pre != null) {
      if (subjet_pre.course_id < course) return true;
      if (subjet_pre.course_id == course) {
        if (subjet_pre.semester < semester) {
          return true;
        } else
          throw new Error(
            "La materia que prela no puede ser de un semestre mayor o igual"
          );
      } else
        throw new Error("La materia que prela no puede ser de un curso mayor");
    } else throw new Error("La materia que prela no existe o está desactivada");
  }
  async Pensum(): Promise<Stage_PensumDTO[]> {
    const stages = await prisma.stage.findMany({
      include: {
        academic_field: {
          include: {
            subject: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
    });
    let subjects: subjectPensumDTO[];
    const pensum: Stage_PensumDTO[] = stages.map((stage_actual) => {
      subjects = [];
      stage_actual.academic_field.map((field_actual) => {
        field_actual.subject.map((materia_actual) => {
          subjects.push(
            new subjectPensumDTO(
              materia_actual.subject != null
                ? materia_actual.subject.description
                : " ",
              materia_actual.description
            )
          );
        });
      });

      return new Stage_PensumDTO(subjects, stage_actual.description);
    });
    return pensum;
  }
}
