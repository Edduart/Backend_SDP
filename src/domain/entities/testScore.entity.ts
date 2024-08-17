export class TestScoreEntity {
  constructor(
    public test_id: number,
    public seminarian_id: string,
    public score: number
  ) {}

  public static fromObject(object: { [key: string]: any }): TestScoreEntity {
    const { test_id, seminarian_id, score } = object;

    if (!test_id) throw "Id is required";
    if (!seminarian_id) throw "seminarian_id ID is required";
    if (!score) throw "score is required";

    return new TestScoreEntity(test_id, seminarian_id, score);
  }
}
