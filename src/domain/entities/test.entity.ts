export class TestEntity {
  constructor(
    public id: number,
    public subject_id: number,
    public academic_term_id: number,
    public description: string,
    public status: boolean,
    public maximum_score: number
  ) {}

  public static fromObject(object: { [key: string]: any }): TestEntity {
    let {
      id,
      subject_id,
      academic_term_id,
      description,
      status,
      maximum_score,
    } = object;

    if (!id) throw "Id is required";
    if (!subject_id) throw "subject ID is required";
    if (!academic_term_id) throw "Academic term is required";
    if (!description) throw "description is required";
    if (!status) throw "status is required";
    if (!maximum_score) throw "maximum_score is required";
    //if (maximum_score) maximum_score = maximum_score.Tofixed(2);

    return new TestEntity(
      id,
      subject_id,
      academic_term_id,
      description,
      status,
      maximum_score
    );
  }
}
