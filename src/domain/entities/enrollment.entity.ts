export class EnrollmentEntity {
  constructor(
    public seminarian_id: string,
    public subject_id: number,
    public academic_term_id: number,
    public status_id: number
  ) {}

  public static fromObject(object: { [key: string]: any }): EnrollmentEntity {
    const { seminarian_id, subject_id, academic_term_id, status_id } = object;
    if (!seminarian_id) throw "Id is required";
    if (!subject_id) throw "subject ID is required";
    if (!academic_term_id) throw "Academic term is required";
    if (!status_id) throw "status is required";

    return new EnrollmentEntity(
      seminarian_id,
      subject_id,
      academic_term_id,
      status_id
    );
  }
}
