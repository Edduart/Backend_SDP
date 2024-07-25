export class EnrollmentEntity {
  constructor(
    public seminarian_id: string,
    public subject_id: number,
    public academic_term_id: number,
    public status: EnrollmentStatus
  ) {}

  public static fromObject(object: { [key: string]: any }): EnrollmentEntity {
    const { seminarian_id, subject_id, academic_term_id, status } = object;

    if (!seminarian_id) throw "Id is required";
    if (!subject_id) throw "subject ID is required";
    if (!academic_term_id) throw "Academic term is required";
    if (!status) throw "status is required";

    return new EnrollmentEntity(
      seminarian_id,
      subject_id,
      academic_term_id,
      status
    );
  }
}

export enum EnrollmentStatus {
  CURSANDO = "CURSANDO",
  APROVADO = "APROVADO",
  REPROBADO = "REPROBADO",
  RETIRADO = "RETIRADO",
}
